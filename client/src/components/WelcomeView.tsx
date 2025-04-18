import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { Message } from "./ChatUI";
import iagoLogo from "../assets/iago-logo.png";
import { ArrowRightCircle } from "lucide-react";

interface WelcomeViewProps {
  onSendMessage: (message: Message) => void;
  onFirstMessage: () => void;
}

const WelcomeView = ({ onSendMessage, onFirstMessage }: WelcomeViewProps) => {
  const [inputValue, setInputValue] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const prompt = inputValue.trim();
    if (!prompt) return;
    
    // Create user message
    const userMessage: Message = {
      id: uuidv4(),
      content: prompt,
      sender: "user",
      timestamp: Date.now()
    };
    
    // Send message
    onSendMessage(userMessage);
    
    // Clear input
    setInputValue("");
    
    // Notify parent that first message was sent
    onFirstMessage();
  };

  return (
    <div className="flex flex-col items-center justify-center h-full px-4 md:px-6">
      <div className="flex flex-col items-center mb-8 text-center max-w-2xl">
        <div className="w-24 h-24 mb-6">
          <img 
            src={iagoLogo} 
            alt="Iago" 
            className="w-full h-full object-contain animate-pulse" 
          />
        </div>
        
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-50 mb-4">
          Meet Iago
        </h1>
        
        <p className="text-lg text-gray-700 dark:text-gray-300">
          Your Clever AI Sidekick, Ready to Dive into Articles, Web Data, and Complex Prompts in Seconds.
        </p>
      </div>
      
      <form onSubmit={handleSubmit} className="w-full max-w-xl">
        <div className="relative">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Ask me anything or paste a URL..."
            className="w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-full py-4 pl-6 pr-14 text-gray-900 dark:text-gray-100 shadow-lg focus:ring-2 focus:ring-primary focus:outline-none transition-all"
          />
          <button
            type="submit"
            disabled={!inputValue.trim()}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 text-primary p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors disabled:opacity-50"
          >
            <ArrowRightCircle className="w-6 h-6" />
          </button>
        </div>
      </form>
    </div>
  );
};

export default WelcomeView;