"use client";

import Head from "next/head";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import type { GetStaticProps } from "next";
import { useEffect, useRef, useState } from "react";
import { useChat } from "@/hooks/use-chat";
import { UserMessage } from "@/components/chat/user-message";
import { AssistantMessage } from "@/components/chat/assistant-message";
import { IASuggestion } from "@/components/chat/ia-suggestion";
import { ChatInput } from "@/components/chat/chat-input";
import { MessageCircle } from "lucide-react";

export default function ChatPage() {
  const { t } = useTranslation("common");
  const { data, loading, sendMessage } = useChat();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [currentDateTime, setCurrentDateTime] = useState("");

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [data.messages]);

  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();
      const time = now.toLocaleTimeString("pt-BR", {
        hour: "2-digit",
        minute: "2-digit",
      });
      setCurrentDateTime(`HOJE, ${time}`);
    };

    updateDateTime();
    const interval = setInterval(updateDateTime, 60000);

    return () => clearInterval(interval);
  }, []);

  if (loading || !data) {
    return (
      <>
        <Head>
          <title>{t("chat.title")} | Nortus</title>
        </Head>
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#1876D2] mx-auto mb-4"></div>
            <p className="text-muted-foreground">{t("chat.loading")}</p>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Head>
        <title>{t("chat.title")} | Nortus</title>
      </Head>

      <div className="w-full h-[calc(100vh-10rem)] flex flex-col items-center">
        <div className="w-3/4 bg-secondary/40 dark:bg-secondary/30 border border-border rounded-2xl p-10 flex-1 flex flex-col shadow-xl overflow-hidden">
          <div className="flex items-center justify-center mb-6 pb-4 border-b border-border/40 dark:border-border/30">
            <p className="text-xs text-muted-foreground/80 uppercase tracking-wider font-medium">
              {currentDateTime}
            </p>
          </div>

          <div className="flex-1 overflow-y-auto pr-3 mb-6 space-y-2 scrollbar-thin scrollbar-thumb-border/60 scrollbar-track-transparent">
            {data.messages.length === 0 ? (
              <div className="flex items-center justify-center h-full">
                <div className="text-center text-muted-foreground">
                  <MessageCircle className="w-12 h-12 mx-auto mb-4" />
                  <p>{t("chat.empty")}</p>
                </div>
              </div>
            ) : (
              <>
                {data.messages.map((msg) => {
                  if (msg.type === "user_message") {
                    return (
                      <UserMessage
                        key={msg.id}
                        author={msg.author || ""}
                        content={msg.content}
                        timestamp={msg.timestamp}
                      />
                    );
                  }

                  if (msg.type === "assistant_message") {
                    return (
                      <AssistantMessage
                        key={msg.id}
                        content={msg.content}
                        timestamp={msg.timestamp}
                      />
                    );
                  }

                  if (msg.type === "ai_suggestion") {
                    return (
                      <IASuggestion
                        key={msg.id}
                        content={msg.content}
                        timestamp={msg.timestamp}
                        suggestions={msg.suggestions}
                      />
                    );
                  }

                  return null;
                })}
                <div ref={messagesEndRef} />
              </>
            )}
          </div>
        </div>
        <ChatInput onSendMessage={sendMessage} disabled={loading} />
      </div>
    </>
  );
}

ChatPage.pageTitleKey = "chat.title";

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? "pt", ["common"])),
    },
  };
};
