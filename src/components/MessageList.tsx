import { useEffect, useRef } from 'react'
import type { Conversation } from "../types";

export default function MessageList({ conversation }: { conversation: Conversation }) {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [conversation.messages.length]);

  return (
    <div className="flex flex-col">
      {conversation.messages.length === 0 ? (
        <p className="text-center text-sm text-zinc-400">
          Tap (+) to Start a Conversation
        </p>
      ) : null}

      {conversation.messages.map((m, i) => {
        const isRight = i % 2 === 1;

        return (
          <div key={m.id} className="grid grid-cols-2 w-full">
            <div className="w-full">
              {!isRight ? (
                <p className="pl-[30px] pr-[5px] text-right text-[13px] leading-[1.75] text-zinc-800 whitespace-pre-wrap break-words">
                  {m.text}
                </p>
              ) : null}
            </div>

            <div className="w-full">
              {isRight ? (
                <p className="pr-[30px] pl-[5px] text-left text-[13px] leading-[1.75] text-zinc-800 whitespace-pre-wrap break-words">
                  {m.text}
                </p>
              ) : null}
            </div>
          </div>
        );
      })}

      <div ref={bottomRef} />
    </div>
  );
}
