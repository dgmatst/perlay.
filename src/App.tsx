import { useCallback, useEffect, useMemo, useState } from "react";
import { loadState, newConversation, newMessage, saveState } from "./storage";
import type { AppState } from "./types";
import IntroOverlay from "./components/IntroOverlay";
import MessageList from "./components/MessageList";
import Composer from "./components/Composer";

function ensureBootstrap(state: AppState): AppState {
  if (state.conversations.length === 0) {
    const c = newConversation();
    return { conversations: [c], activeConversationId: c.id };
  }

  if (
    !state.activeConversationId ||
    !state.conversations.some((x) => x.id === state.activeConversationId)
  ) {
    const sorted = [...state.conversations].sort(
      (a, b) => b.updatedAt - a.updatedAt,
    );
    return { ...state, activeConversationId: sorted[0]!.id };
  }

  return state;
}


export default function App() {
  const [state, setState] = useState<AppState>(() =>
    ensureBootstrap(loadState()),
  );
  
  const [introActive, setIntroActive] = useState(true);

  const handleIntroClick = () => {
    setIntroActive(false);
  };

  useEffect(() => {
    const t = setTimeout(() => saveState(state), 200);
    return () => clearTimeout(t);
  }, [state]);

  const active = useMemo(() => {
    return state.conversations.find((c) => c.id === state.activeConversationId);
  }, [state.conversations, state.activeConversationId]);

  const sendText = useCallback(
    (raw: string) => {
      const text = raw.trim();
      if (!text || !state.activeConversationId) return;

      const msg = newMessage(text);
      const now = Date.now();

      setState((s) => ({
        ...s,
        conversations: s.conversations.map((c) => {
          if (c.id !== s.activeConversationId) return c;

          const messages = [...c.messages, msg];

          const title =
            c.messages.length === 0
              ? text.length > 28
                ? `${text.slice(0, 28)}…`
                : text
              : c.title;

          return {
            ...c,
            messages,
            title,
            updatedAt: now,
          };
        }),
      }));
    },
    [state.activeConversationId],
  );

  const resetConversation = useCallback(() => {
    setState((s) => {
      if (!s.activeConversationId) return s;
      const now = Date.now();
      return {
        ...s,
        conversations: s.conversations.map((c) =>
          c.id === s.activeConversationId
            ? { ...c, messages: [], title: "새 대화", updatedAt: now }
            : c,
        ),
      };
    });
  }, []);

  return (
    <>

      <IntroOverlay introActive={introActive} handleIntroClick={handleIntroClick}/>

      <div className="mx-auto flex h-full min-h-0 w-full max-w-lg flex-col bg-white relative">
        <header className="shrink-0">
          <div className="flex">
            <span className="flex w-full pl-[50px] h-[100px] text-[12px] items-center justify-center">
              PARTICIPANT
            </span>
            <span className="flex w-full pr-[50px] h-[100px] text-[12px] items-center justify-center">
              PARTICIPANT
            </span>
          </div>
        </header>

        <main className="flex-1 min-h-0 overflow-y-auto px-5 pb-[100px]">
          {active ? <MessageList conversation={active} /> : null}
        </main>

        <div className="absolute bottom-[30px] w-full p-[20px]">
          {active ? (
            <Composer onSend={sendText} onReset={resetConversation} key={active.id} />
          ) : null}
        </div>

        <p className="h-[30px] flex items-center justify-center text-[8px] text-zinc-400 z-53 relative">
          powered by dgmatst.
        </p>
      </div>
    </>
  );
}