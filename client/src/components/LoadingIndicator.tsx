const LoadingIndicator = () => {
  return (
    <div className="flex items-center space-x-2 bg-[rgba(184,15,33,0.08)] rounded-2xl rounded-tl-none py-3 px-4 shadow-sm">
      <span className="text-gray-500 mr-2">AI is thinking</span>
      <div className="flex space-x-1">
        <div className="w-2 h-2 rounded-full bg-primary loading-dot"></div>
        <div className="w-2 h-2 rounded-full bg-primary loading-dot"></div>
        <div className="w-2 h-2 rounded-full bg-primary loading-dot"></div>
      </div>
    </div>
  );
};

export default LoadingIndicator;
