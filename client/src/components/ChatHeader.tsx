import ThemeToggle from "./ThemeToggle";
import iagoLogo from "../assets/iago-logo.png";

interface ChatHeaderProps {
  onNewChat?: () => void;
}

const ChatHeader = ({ onNewChat }: ChatHeaderProps) => {
  return (
    <header className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 py-3 px-6 flex items-center justify-between transition-colors">
      <div className="flex items-center space-x-2">
        <div className="h-8 w-8 flex items-center justify-center">
          <img 
            src={iagoLogo} 
            alt="Iago" 
            className="h-full w-full object-contain"
          />
        </div>
        <h1 className="text-lg font-semibold text-gray-900 dark:text-gray-50">Iago</h1>
      </div>
      
      <ThemeToggle onNewChat={onNewChat} />
    </header>
  );
};

export default ChatHeader;
