import { useState, useEffect } from "react";
import ChatHeader from "./ChatHeader";
import MessagesContainer from "./MessagesContainer";
import MessageInput from "./MessageInput";
import WelcomeView from "./WelcomeView";
import { v4 as uuidv4 } from "uuid";

export type Message = {
  id: string;
  content: string;
  sender: 'user' | 'bot';
  timestamp: number;
};

const WELCOME_MESSAGE = "Hello! I'm Iago, your clever AI sidekick. I can help you with information, answer questions, analyze articles, or search the web. Feel free to ask me anything or share a link!";

const ChatUI = () => {
  const [isFirstVisit, setIsFirstVisit] = useState(true);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Check if this is the first visit
  useEffect(() => {
    const hasVisited = localStorage.getItem("iago_visited");
    
    if (!hasVisited) {
      setIsFirstVisit(true);
    } else {
      setIsFirstVisit(false);
      
      // If not first visit, show the welcome message
      if (messages.length === 0) {
        setMessages([{
          id: uuidv4(),
          content: WELCOME_MESSAGE,
          sender: "bot",
          timestamp: Date.now()
        }]);
      }
    }
  }, []);

  const addMessage = (message: Message) => {
    setMessages((prev) => [...prev, message]);
  };

  const handleFirstMessage = () => {
    // Mark that the user has visited before
    localStorage.setItem("iago_visited", "true");
    setIsFirstVisit(false);
    
    // Add welcome message only if it's the first message
    if (messages.length === 0) {
      setMessages([{
        id: uuidv4(),
        content: WELCOME_MESSAGE,
        sender: "bot",
        timestamp: Date.now()
      }]);
    }
  };

  return (
    <div className="flex flex-col h-screen max-h-screen overflow-hidden bg-[var(--background)] transition-colors">
      <ChatHeader />
      
      {isFirstVisit ? (
        <WelcomeView 
          onSendMessage={addMessage} 
          onFirstMessage={handleFirstMessage} 
        />
      ) : (
        <>
          <MessagesContainer 
            messages={messages} 
            isLoading={isLoading} 
            error={error}
          />
          <MessageInput 
            onSendMessage={addMessage} 
            setIsLoading={setIsLoading} 
            setError={setError}
          />
        </>
      )}
    </div>
  );
};

export default ChatUI;
