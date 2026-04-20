export type Message = {
  id: string;
  text: string;
  createdAt: number;
};

export type Conversation = {
  id: string;
  title: string;
  messages: Message[];
  updatedAt: number;
};

export type AppState = {
  conversations: Conversation[];
  activeConversationId: string | null;
};
