const LoadingIndicator = () => {
  return (
    <div className="flex items-center space-x-2 bg-[var(--bot-message-bg)] dark:bg-[var(--bot-message-dark-bg)] rounded-2xl rounded-tl-none py-3 px-4 shadow-sm transition-colors">
      <span className="text-gray-600 dark:text-gray-300 mr-2 transition-colors">Iago is thinking</span>
      <div className="flex space-x-1">
        <div className="w-2 h-2 rounded-full bg-primary loading-dot"></div>
        <div className="w-2 h-2 rounded-full bg-primary loading-dot"></div>
        <div className="w-2 h-2 rounded-full bg-primary loading-dot"></div>
      </div>
    </div>
  );
};

export default LoadingIndicator;
