import { useState } from "react";
import ChatHeader from "./ChatHeader";
import MessagesContainer from "./MessagesContainer";
import MessageInput from "./MessageInput";

export type Message = {
  id: string;
  content: string;
  sender: 'user' | 'bot';
  timestamp: number;
};

const ChatUI = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      content: "Hello! I'm your AI assistant. I can help you with information, answer questions, or discuss articles. Feel free to ask me anything or share a link to an article you'd like to talk about.",
      sender: "bot",
      timestamp: Date.now()
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const addMessage = (message: Message) => {
    setMessages((prev) => [...prev, message]);
  };

  return (
    <div className="flex flex-col h-screen max-h-screen overflow-hidden">
      <ChatHeader />
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
    </div>
  );
};

export default ChatUI;
