import { useState, FormEvent, useRef, useEffect } from "react";
import { sendChatMessage } from "../lib/chatApi";
import { Message } from "./ChatUI";
import { v4 as uuidv4 } from "uuid";
import { Send } from "lucide-react";

interface MessageInputProps {
  onSendMessage: (message: Message) => void;
  setIsLoading: (isLoading: boolean) => void;
  setError: (error: string | null) => void;
}

const MessageInput = ({ onSendMessage, setIsLoading, setError }: MessageInputProps) => {
  const [inputValue, setInputValue] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  // Focus the input field on component mount
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    const userInput = inputValue.trim();
    if (!userInput) return;
    
    // Clear input
    setInputValue("");
    
    // Reset any previous error
    setError(null);
    
    // Add user message
    const userMessage: Message = {
      id: uuidv4(),
      content: userInput,
      sender: "user",
      timestamp: Date.now()
    };
    
    onSendMessage(userMessage);
    
    // Set loading state
    setIsLoading(true);
    
    try {
      // Call the API
      const response = await sendChatMessage(userInput);
      
      // Add bot response
      const botMessage: Message = {
        id: uuidv4(),
        content: response.response,
        sender: "bot",
        timestamp: Date.now()
      };
      
      onSendMessage(botMessage);
    } catch (err) {
      // Handle error
      setError(err instanceof Error ? err.message : "An unknown error occurred");
    } finally {
      // Clear loading state
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 p-4 md:p-6 transition-colors">
      <div className="max-w-4xl mx-auto">
        <form onSubmit={handleSubmit} className="flex items-center gap-2">
          <div className="flex-1 relative">
            <input 
              type="text" 
              ref={inputRef}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className="w-full border border-gray-300 dark:border-gray-700 rounded-full py-3 pl-4 pr-10 text-sm md:text-base 
                bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 
                focus:bg-white dark:focus:bg-gray-700 transition-colors 
                focus:ring-2 focus:ring-primary focus:outline-none"
              placeholder="Ask Iago anything or paste a URL..."
              required
            />
          </div>
          <button 
            type="submit" 
            disabled={!inputValue.trim()}
            className="bg-primary text-white rounded-full p-3 hover:bg-opacity-90 focus:outline-none 
              focus:ring-2 focus:ring-primary focus:ring-opacity-50 transition-all send-button
              disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send className="w-5 h-5" />
          </button>
        </form>
      </div>
    </div>
  );
};

export default MessageInput;
