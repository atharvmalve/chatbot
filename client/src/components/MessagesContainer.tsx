import { useEffect, useRef } from "react";
import UserMessage from "./UserMessage";
import BotMessage from "./BotMessage";
import LoadingIndicator from "./LoadingIndicator";
import { Message } from "./ChatUI";
import iagoLogo from "../assets/iago-logo.png";

interface MessagesContainerProps {
  messages: Message[];
  isLoading: boolean;
  error: string | null;
}

const MessagesContainer = ({ messages, isLoading, error }: MessagesContainerProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom whenever messages change or loading state changes
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  return (
    <div 
      ref={containerRef}
      className="flex-1 overflow-y-auto p-4 md:p-6 messages-container bg-[var(--background)] transition-colors"
    >
      <div className="max-w-4xl mx-auto space-y-4">
        {messages.map((message) => (
          message.sender === "user" ? (
            <UserMessage 
              key={message.id} 
              content={message.content} 
            />
          ) : (
            <BotMessage 
              key={message.id} 
              content={message.content} 
            />
          )
        ))}
        
        {isLoading && (
          <div className="flex items-start mb-6 message-animation">
            <div className="flex-shrink-0 h-10 w-10 rounded-full flex items-center justify-center mr-3">
              <img 
                src={iagoLogo} 
                alt="Iago" 
                className="h-full w-full object-contain"
              />
            </div>
            <LoadingIndicator />
          </div>
        )}
        
        {error && (
          <div className="flex items-start mb-6 message-animation">
            <div className="flex-shrink-0 h-8 w-8 rounded-full bg-red-500 flex items-center justify-center text-white text-sm mr-3">
              !
            </div>
            <div className="max-w-[85%] md:max-w-[75%] bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-100 rounded-2xl rounded-tl-none py-3 px-4 shadow-sm transition-colors">
              <p className="text-sm md:text-base">
                Sorry, there was an error: {error}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MessagesContainer;
