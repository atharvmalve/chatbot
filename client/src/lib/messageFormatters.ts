/**
 * Formats the message text with basic styling
 * @param text The message text to format
 * @returns Formatted HTML
 */
export function formatMessage(text: string): string {
  // Escape HTML to prevent XSS
  let escapedText = escapeHTML(text);
  
  // Bold text between asterisks
  escapedText = escapedText.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
  
  // Italics
  escapedText = escapedText.replace(/\*(.*?)\*/g, '<em>$1</em>');
  
  // Replace newlines with <br>
  escapedText = escapedText.replace(/\n/g, '<br>');
  
  // Detect and style specific AI response formats (🧠 MEMORY, 📄 ARTICLE, 🔍 SEARCH)
  const memoryPattern = /🧠 MEMORY:(.*?)(?=📄 ARTICLE:|🔍 SEARCH:|$)/s;
  const articlePattern = /📄 ARTICLE:(.*?)(?=🧠 MEMORY:|🔍 SEARCH:|$)/s;
  const searchPattern = /🔍 SEARCH:(.*?)(?=🧠 MEMORY:|📄 ARTICLE:|$)/s;
  
  // Apply special formatting for AI response types
  const memoryMatch = escapedText.match(memoryPattern);
  const articleMatch = escapedText.match(articlePattern);
  const searchMatch = escapedText.match(searchPattern);
  
  if (memoryMatch || articleMatch || searchMatch) {
    if (memoryMatch) {
      escapedText = escapedText.replace(memoryPattern, '<span class="font-medium">🧠 MEMORY:</span>$1');
    }
    if (articleMatch) {
      escapedText = escapedText.replace(articlePattern, '<span class="font-medium">📄 ARTICLE:</span>$1');
    }
    if (searchMatch) {
      escapedText = escapedText.replace(searchPattern, '<span class="font-medium">🔍 SEARCH:</span>$1');
    }
  }
  
  return escapedText;
}

/**
 * Escapes HTML to prevent XSS
 * @param text Text to escape
 * @returns Escaped HTML
 */
export function escapeHTML(text: string): string {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}
