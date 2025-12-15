interface AssistantMessageProps {
  content: string;
  timestamp: string;
}

export function AssistantMessage({ content, timestamp }: AssistantMessageProps) {
  return (
    <div className="flex justify-end mb-4 animate-in fade-in slide-in-from-right-2 duration-300">
      <div className="flex flex-col items-end max-w-[60%]">
        <div className="bg-secondary/80 dark:bg-secondary/60 border border-border text-foreground px-5 py-3 rounded-xl shadow-md">
          <p className="text-xs font-medium text-muted-foreground/90 mb-1">Assistente</p>
          <p className="text-sm leading-relaxed mb-1">{content}</p>
          <p className="text-xs text-muted-foreground/80 text-right">{timestamp}</p>
        </div>
      </div>
    </div>
  );
}
