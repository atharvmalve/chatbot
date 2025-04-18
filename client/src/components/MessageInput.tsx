import { useState, FormEvent, useRef, useEffect } from "react";
import { sendChatMessage } from "../lib/chatApi";
import { Message } from "./ChatUI";
import { v4 as uuidv4 } from "uuid";

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
    <div className="bg-white border-t border-gray-200 p-4 md:p-6">
      <div className="max-w-4xl mx-auto">
        <form onSubmit={handleSubmit} className="flex items-center gap-2">
          <div className="flex-1 relative">
            <input 
              type="text" 
              ref={inputRef}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className="w-full border border-gray-300 rounded-full py-3 pl-4 pr-10 text-sm md:text-base bg-gray-50 focus:bg-white transition-colors message-input"
              placeholder="Type your message or paste a URL..."
              required
            />
            <button 
              type="button" 
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-primary transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M18.375 12.739l-7.693 7.693a.75.75 0 01-1.06 0l-7.693-7.693a.75.75 0 011.06-1.06l6.963 6.962 6.963-6.962a.75.75 0 111.06 1.06z" />
              </svg>
            </button>
          </div>
          <button 
            type="submit" 
            className="bg-primary text-white rounded-full p-3 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 transition-all send-button"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
            </svg>
          </button>
        </form>
      </div>
    </div>
  );
};

export default MessageInput;
