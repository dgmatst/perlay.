import type { AppState, Conversation, Message } from "./types";

const STORAGE_KEY = "solo-thought-chat-state-v1";

const emptyState = (): AppState => ({
  conversations: [],
  activeConversationId: null,
});

export function loadState(): AppState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return emptyState();
    const parsed = JSON.parse(raw) as AppState;
    if (!parsed || !Array.isArray(parsed.conversations)) return emptyState();
    return parsed;
  } catch {
    return emptyState();
  }
}

export function saveState(state: AppState): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

export function newConversation(): Conversation {
  const id = crypto.randomUUID();
  const now = Date.now();
  return {
    id,
    title: "새 대화",
    messages: [],
    updatedAt: now,
  };
}

export function newMessage(text: string): Message {
  return {
    id: crypto.randomUUID(),
    text,
    createdAt: Date.now(),
  };
}
