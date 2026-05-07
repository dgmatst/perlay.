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
      <div className="text-center text-sm text-zinc-400 absolute bottom-[158px] left-1/2 -translate-x-1/2 w-full max-w-[300px]">
        새로 고침으로 새로운 세션을 열고<br/> 더하기로 생각을 추가합니다.
      </div>
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
