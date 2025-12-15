import { CheckCheckIcon } from "lucide-react";

interface UserMessageProps {
  author: string;
  content: string;
  timestamp: string;
}

export function UserMessage({ author, content, timestamp }: UserMessageProps) {
  return (
    <div className="flex flex-col items-start mb-4 animate-in fade-in slide-in-from-left-2 duration-300">
      <div className="bg-[#1876D2] text-white px-5 py-3 rounded-xl max-w-[60%] shadow-lg">
        <div className="flex items-center justify-between gap-4 mb-1">
          <p className="font-semibold text-xs opacity-95">{author}</p>
        </div>
        <p className="text-sm leading-relaxed">{content}</p>
        <div className="flex items-end justify-end gap-1">
          <span className="text-xs opacity-90">{timestamp}</span>
          <CheckCheckIcon className="w-4 h-4 opacity-90" />
        </div>
      </div>
    </div>
  );
}
