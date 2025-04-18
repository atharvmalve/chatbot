/**
 * Sends a chat message to the backend API
 * @param prompt User's message/prompt
 * @returns Response from the API
 */
export async function sendChatMessage(prompt: string): Promise<{ response: string }> {
  const response = await fetch('/api/chat', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ prompt }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || `Error: ${response.status}`);
  }

  return response.json();
}
