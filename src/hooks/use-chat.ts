"use client";

import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { chatService } from "@/services/chat.service";
import type { ChatMessage } from "@/types/chat";

export function useChat() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["chat-data"],
    queryFn: chatService.getChatData,
  });

  const [messages, setMessages] = useState<ChatMessage[]>([]);

  const sendMessage = (content: string) => {
    const newMessage: ChatMessage = {
      id: Date.now().toString(),
      type: "user_message",
      author: "Você",
      content,
      timestamp: new Date().toLocaleTimeString("pt-BR", {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    setMessages((prev) => [...prev, newMessage]);

    setTimeout(() => {
      const responseMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        type: "assistant_message",
        content:
          data?.iaSuggestion || "Entendi! Deixe-me verificar as melhores opções para você...",
        timestamp: new Date().toLocaleTimeString("pt-BR", {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };
      setMessages((prev) => [...prev, responseMessage]);
    }, 1000);
  };

  return {
    data: data
      ? {
          messages: [...data.messages, ...messages],
          iaSuggestion: data.iaSuggestion,
          conversationAnalysis: data.conversationAnalysis,
        }
      : undefined,
    loading: isLoading,
    error,
    sendMessage,
  };
}
