export type MessageType = "user_message" | "assistant_message" | "ai_suggestion";

export interface ChatMessage {
  id: string;
  type: MessageType;
  author?: string;
  content: string;
  timestamp: string;
  suggestions?: string[];
}

export interface Insight {
  id: string;
  type: string;
  category: string;
}

export interface Action {
  id: string;
  action: string;
  priority: "high" | "medium" | "low";
}

export interface ConversationAnalysis {
  insights: {
    title: string;
    insights: Insight[];
  };
  futureSteps: {
    title: string;
    actions: Action[];
  };
}

export interface ChatData {
  messages: ChatMessage[];
  iaSuggestion?: string;
  conversationAnalysis?: ConversationAnalysis;
}
