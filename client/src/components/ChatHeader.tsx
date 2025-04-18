import ThemeToggle from "./ThemeToggle";
import iagoLogo from "../assets/iago-logo.png";

const ChatHeader = () => {
  return (
    <header className="bg-white dark:bg-gray-900 shadow-sm py-4 px-6 flex items-center justify-between transition-colors">
      <div className="flex items-center space-x-3">
        <div className="h-10 w-10 flex items-center justify-center">
          <img 
            src={iagoLogo} 
            alt="Iago" 
            className="h-full w-full object-contain"
          />
        </div>
        <h1 className="text-lg font-semibold text-gray-900 dark:text-gray-50">Iago</h1>
      </div>
      
      <ThemeToggle />
    </header>
  );
};

export default ChatHeader;
