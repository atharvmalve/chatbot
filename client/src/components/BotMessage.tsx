import { formatMessage } from "../lib/messageFormatters";
import iagoLogo from "../assets/iago-logo.png";

interface BotMessageProps {
  content: string;
}

const BotMessage = ({ content }: BotMessageProps) => {
  return (
    <div className="flex items-start mb-6 message-animation">
      <div className="flex-shrink-0 h-10 w-10 rounded-full flex items-center justify-center mr-3">
        <img src={iagoLogo} alt="Iago" className="h-full w-full object-contain" />
      </div>
      <div className="max-w-[85%] md:max-w-[75%] bg-[var(--bot-message-bg)] dark:bg-[var(--bot-message-dark-bg)] rounded-2xl rounded-tl-none py-3 px-4 shadow-sm transition-colors">
        <p 
          className="text-gray-800 dark:text-gray-100 text-sm md:text-base transition-colors"
          dangerouslySetInnerHTML={{ __html: formatMessage(content) }}
        />
      </div>
    </div>
  );
};

export default BotMessage;
