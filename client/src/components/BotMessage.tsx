import { formatMessage } from "../lib/messageFormatters";

interface BotMessageProps {
  content: string;
}

const BotMessage = ({ content }: BotMessageProps) => {
  return (
    <div className="flex items-start mb-6 message-animation">
      <div className="flex-shrink-0 h-8 w-8 rounded-full bg-primary flex items-center justify-center text-white text-sm mr-2">
        AI
      </div>
      <div className="max-w-[85%] md:max-w-[75%] bg-[rgba(184,15,33,0.08)] rounded-2xl rounded-tl-none py-3 px-4 shadow-sm">
        <p 
          className="text-[#333333] text-sm md:text-base"
          dangerouslySetInnerHTML={{ __html: formatMessage(content) }}
        />
      </div>
    </div>
  );
};

export default BotMessage;
