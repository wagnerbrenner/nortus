import { api } from "@/services/api";
import { ChatData } from "@/types/chat";

export const chatService = {
  getChatData: async (): Promise<ChatData> => {
    const response = await api.get("/nortus-v1/chat");
    return response.data;
  },
};
