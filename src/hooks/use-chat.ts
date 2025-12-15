"use client";

import { useState } from "react";

export type MessageType = "user_message" | "assistant_message" | "ai_suggestion";

export interface ChatMessage {
  id: string;
  type: MessageType;
  author?: string;
  content: string;
  timestamp: string;
  suggestions?: string[];
}

export interface ChatData {
  messages: ChatMessage[];
}

const initialMessages: ChatMessage[] = [
  {
    id: "1",
    type: "user_message",
    author: "Ricardo Leite - Seguro Automóvel",
    content: "Oi! Tudo certo? Gostaria de saber sobre o seguro automóvel",
    timestamp: "14:23",
  },
  {
    id: "2",
    type: "assistant_message",
    content:
      "Olá, Ricardo! Tudo ótimo e com você? Claro que sim, posso te ajudar com o que precisar. Vá em frente e me conte mais sobre o que precisa :)",
    timestamp: "14:23",
  },
  {
    id: "3",
    type: "user_message",
    author: "Ricardo Leite - Seguro Automóvel",
    content:
      "Tipo! Meu sogro tá ficando pensando... tem alguma coisa além disso? Tipo, prós novos equipamentos?",
    timestamp: "14:25",
  },
  {
    id: "4",
    type: "ai_suggestion",
    content:
      "Baseado no perfil do cliente, recomendo a oferta Premium com desconto de 15%. Cliente tem histórico positivo.",
    timestamp: "14:24",
    suggestions: ["Enviar proposta", "Fazer ligação", "Ver histórico"],
  },
];

export function useChat() {
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages);

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
        content: "Entendi! Deixe-me verificar as melhores opções para você...",
        timestamp: new Date().toLocaleTimeString("pt-BR", {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };
      setMessages((prev) => [...prev, responseMessage]);
    }, 1000);
  };

  return {
    data: { messages },
    loading,
    sendMessage,
  };
}
