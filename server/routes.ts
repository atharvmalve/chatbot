import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import express from "express";
import { default as fetch } from "node-fetch";
import axios from "axios";
import * as cheerio from "cheerio";

// Constants - migrated from the provided backend code
const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY || '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';
const SERP_API_KEY = process.env.SERP_API_KEY || '4de277c8461c5629c67f1d870fac2c57cd86ba8978b63425fa499649729cf7b8';

// Global state - migrated from the provided backend code
let savedArticle = { url: '', content: '' };

// Utility function to extract text from a URL
async function extractTextFromURL(url: string) {
  const response = await fetch(url);
  const rawHTML = await response.text();
  const $ = cheerio.load(rawHTML);

  // Extract title
  const title = $('title').text().trim();

  // Try to get abstract
  const abstract =
    $('[class*="abstract"]').text().trim() ||
    $('[id*="abstract"]').text().trim() ||
    '';

  // Extract main text (cut if too long)
  const bodyText = $('p').text().trim().replace(/\s+/g, ' ').slice(0, 8000);

  return `${title ? `Title: ${title}\n` : ''}${abstract ? `Abstract: ${abstract}\n` : ''}${bodyText ? `Content:\n${bodyText}` : ''}`;
}

// Utility function to search the web
async function searchWeb(query: string) {
  const url = `https://serpapi.com/search.json?q=${encodeURIComponent(query)}&api_key=${SERP_API_KEY}&engine=google`;
  const res = await axios.get(url);
  const results = res.data.organic_results || [];
  return results.map((r: any) => `- ${r.title}: ${r.snippet}`).join('\n');
}

export async function registerRoutes(app: Express): Promise<Server> {
  // Create route for chat endpoint
  app.post('/api/chat', async (req, res) => {
    const { prompt } = req.body;

    if (!prompt) {
      return res.status(400).json({ error: "Prompt is required" });
    }

    try {
      const urlMatch = prompt.match(/https?:\/\/[^\s]+/);
      const url = urlMatch ? urlMatch[0] : null;

      if (url) {
        const article = await extractTextFromURL(url);
        savedArticle = { url, content: article };
      }

      const systemPrompt = `
You are a smart agent that can answer using:
-  MEMORY: your own brain
-  ARTICLE: recent article provided
-  SEARCH: real-time web search

Reply in one of the formats:
-  [query here] → if you need a web search to help
- [answer] → if article is enough
-  [answer] → if your knowledge is enough
`;

      const userMessage = `
${savedArticle.content ? `Article:\n${savedArticle.content}\n\n` : ''}
User: ${prompt}
`;

      const openrouterRes = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          model: 'mistralai/mixtral-8x7b-instruct',
          messages: [
            { role: 'system', content: systemPrompt },
            { role: 'user', content: userMessage }
          ]
        })
      });

      const firstReply = await openrouterRes.json() as any;
      const replyContent = firstReply.choices?.[0]?.message?.content || '';

      // If it asks for search, run it
      if (replyContent.startsWith('🔍 SEARCH:')) {
        const query = replyContent.replace('🔍 SEARCH:', '').trim();
        const searchResults = await searchWeb(query);

        const finalReply = await fetch('https://openrouter.ai/api/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            model: 'mistralai/mixtral-8x7b-instruct',
            messages: [
              { role: 'system', content: 'You received this web search. Use it to answer the original question.' },
              { role: 'user', content: `Search results:\n${searchResults}\n\nOriginal question: ${prompt}` }
            ]
          })
        });

        const finalData = await finalReply.json() as any;
        return res.json({ response: finalData.choices?.[0]?.message?.content || 'Error' });
      }

      return res.json({ response: replyContent });

    } catch (err: any) {
      console.error(err);
      return res.status(500).json({ error: err.message || 'Something went wrong.' });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
