interface UserMessageProps {
  content: string;
}

const UserMessage = ({ content }: UserMessageProps) => {
  return (
    <div className="flex items-start justify-end mb-6 message-animation">
      <div className="max-w-[85%] md:max-w-[75%] bg-[var(--user-message-bg)] dark:bg-[rgba(169,17,19,0.15)] rounded-2xl rounded-tr-none py-3 px-4 shadow-sm transition-colors">
        <p className="text-gray-800 dark:text-gray-100 text-sm md:text-base transition-colors">
          {content}
        </p>
      </div>
      <div className="flex-shrink-0 h-8 w-8 rounded-full bg-gray-300 dark:bg-gray-700 flex items-center justify-center text-gray-700 dark:text-gray-300 text-sm ml-3 transition-colors">
        You
      </div>
    </div>
  );
};

export default UserMessage;
