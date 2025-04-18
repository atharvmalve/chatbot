interface UserMessageProps {
  content: string;
}

const UserMessage = ({ content }: UserMessageProps) => {
  return (
    <div className="flex items-start justify-end mb-6 message-animation">
      <div className="max-w-[85%] md:max-w-[75%] bg-[#F2F2F2] rounded-2xl rounded-tr-none py-3 px-4 shadow-sm">
        <p className="text-[#333333] text-sm md:text-base">
          {content}
        </p>
      </div>
      <div className="flex-shrink-0 h-8 w-8 rounded-full bg-gray-300 flex items-center justify-center text-gray-600 text-sm ml-2">
        You
      </div>
    </div>
  );
};

export default UserMessage;
