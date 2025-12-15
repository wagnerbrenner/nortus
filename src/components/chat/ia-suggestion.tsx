import { Bot } from "lucide-react";
import { useTranslation } from "next-i18next";

interface IASuggestionProps {
  content: string;
  timestamp: string;
  suggestions?: string[];
}

export function IASuggestion({ content, timestamp, suggestions }: IASuggestionProps) {
  const { t } = useTranslation("common");

  return (
    <div className="flex flex-col items-end mb-6 w-full animate-in fade-in slide-in-from-right-2 duration-300">
      <div className="bg-secondary/60 dark:bg-secondary/40 border border-border/60 dark:border-border/50 px-5 py-4 rounded-2xl rounded-tr-sm w-full max-w-[75%] shadow-md">
        <div className="flex items-center gap-2 mb-2">
          <Bot className="w-5 h-5 text-[#1876D2] dark:text-[#1876D2]" />
          <p className="text-xs font-semibold text-foreground">{t("chat.suggestion.title")}</p>
        </div>
        <p className="text-sm text-foreground leading-relaxed mb-2">{content}</p>
        <span className="text-xs text-muted-foreground/80 block mb-3">{timestamp}</span>

        {suggestions && suggestions.length > 0 && (
          <div className="flex flex-wrap gap-3 mt-4 pt-4 border-t border-border/40">
            {suggestions.map((suggestion, index) => (
              <button
                key={index}
                className="bg-[#1876D2] hover:bg-[#1876D2]/90 transition-all px-6 py-2 rounded-full text-sm font-semibold text-white shadow-md hover:shadow-lg"
              >
                {suggestion}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
