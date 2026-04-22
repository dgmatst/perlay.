import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type KeyboardEvent,
} from "react";
import ConfirmDialog from "./ConfirmDialog";

type Props = {
  onSend: (text: string) => void;
  onReset: () => void;
};

export default function Composer({ onSend, onReset }: Props) {
  const [expanded, setExpanded] = useState(false);
  const [draft, setDraft] = useState("");
  const [resetConfirmOpen, setResetConfirmOpen] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const syncTextareaHeight = useCallback((el: HTMLTextAreaElement) => {
    el.style.height = "43px";
    el.style.height = `${el.scrollHeight}px`;
  }, []);

  useEffect(() => {
    if (!expanded) return;
    let cancelled = false;
    const outer = requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        if (cancelled) return;
        const el = textareaRef.current;
        if (!el) return;
        syncTextareaHeight(el);
        el.focus();
      });
    });
    return () => {
      cancelled = true;
      cancelAnimationFrame(outer);
    };
  }, [expanded, syncTextareaHeight]);

  const resetHeight = () => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = "43px";
  };

  const handleSubmit = () => {
    const text = draft.trim();
    if (!text) return;

    onSend(text);
    setDraft("");
    resetHeight();

    requestAnimationFrame(() => {
      textareaRef.current?.focus();
    });
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    const isComposing = e.nativeEvent.isComposing;

    if (isComposing) return;

    if (e.key === "Escape" && !draft.trim()) {
      e.preventDefault();
      setExpanded(false);
      resetHeight();
      return;
    }

    const isEnter = e.key === "Enter" && !e.shiftKey;
    if (!isEnter) return;

    const isEmpty = !draft.trim();

    if (isEmpty) {
      e.preventDefault();
      return;
    }

    e.preventDefault();
    handleSubmit();
  };

  const handleTextareaBlur = () => {
    setExpanded(false);
    resetHeight();
  };

  const closeResetConfirm = useCallback(() => setResetConfirmOpen(false), []);

  const handleConfirmReset = useCallback(() => {
    onReset();
    setResetConfirmOpen(false);
  }, [onReset]);

  return (
    <>
      <div className="relative w-full min-h-[43px]">
        <div
          className={`flex w-full items-center justify-center gap-2 transition-opacity duration-300 ease-out ${
            expanded
              ? "pointer-events-none absolute inset-x-0 top-0 z-0 opacity-0"
              : "relative z-10 opacity-100"
          }`}
        >
          <button
            type="button"
            className="flex h-[48px] cursor-pointer min-h-0 min-w-0 flex-1 max-w-[80px] items-center justify-center rounded-full border-0 bg-[#E0E0E0] px-6 text-white active:opacity-90"
            aria-label="메시지 입력 열기"
            onClick={() => setExpanded(true)}
          >
            <span className="text-[22px] font-light leading-none">+</span>
          </button>
          <button
            type="button"
            className="flex h-[48px] w-[48px] cursor-pointer shrink-0 items-center justify-center rounded-full border-0 bg-[#E0E0E0] text-white active:opacity-90"
            aria-label="대화 기록 지우기"
            onClick={() => setResetConfirmOpen(true)}
          >
            <span className="text-[18px] font-light leading-none">
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5 10C3.60417 10 2.42187 9.51562 1.45312 8.54688C0.484375 7.57812 0 6.39583 0 5C0 3.60417 0.484375 2.42187 1.45312 1.45312C2.42187 0.484375 3.60417 0 5 0C5.71875 0 6.40625 0.148333 7.0625 0.445C7.71875 0.741667 8.28125 1.16625 8.75 1.71875V0H10V4.375H5.625V3.125H8.25C7.91667 2.54167 7.46104 2.08333 6.88312 1.75C6.30521 1.41667 5.6775 1.25 5 1.25C3.95833 1.25 3.07292 1.61458 2.34375 2.34375C1.61458 3.07292 1.25 3.95833 1.25 5C1.25 6.04167 1.61458 6.92708 2.34375 7.65625C3.07292 8.38542 3.95833 8.75 5 8.75C5.80208 8.75 6.52604 8.52083 7.17188 8.0625C7.81771 7.60417 8.27083 7 8.53125 6.25H9.84375C9.55208 7.35417 8.95833 8.25521 8.0625 8.95312C7.16667 9.65104 6.14583 10 5 10Z" fill="#909090"/>
              </svg>
            </span>
          </button>
        </div>

        <div
          className={`transition-opacity h-[48px] duration-300 ease-out ${
            expanded
              ? "relative z-10 w-full opacity-100"
              : "pointer-events-none absolute inset-x-0 top-0 z-0 opacity-0"
          }`}
        >
          <textarea
            ref={textareaRef}
            value={draft}
            rows={1}
            aria-label="메시지 입력"
            className="absolute bottom-0 m-0 box-border min-h-[48px] w-full max-h-[120px] resize-none overflow-hidden rounded-[20px]
              border-0 bg-[rgba(166,166,166,0.5)] px-5 py-[12px] overflow-y-scroll
              text-left text-[16px] leading-[1.4] text-zinc-800 outline-none"
            onChange={(e) => {
              const el = e.currentTarget;
              setDraft(el.value);
              syncTextareaHeight(el);
            }}
            onCompositionEnd={(e) => {
              const el = e.currentTarget;
              setDraft(el.value);
              requestAnimationFrame(() => syncTextareaHeight(el));
            }}
            onKeyDown={handleKeyDown}
            onBlur={handleTextareaBlur}
          />
        </div>
      </div>

      <ConfirmDialog
        open={resetConfirmOpen}
        message="START OVER?"
        confirmLabel="YES"
        cancelLabel="NO"
        onConfirm={handleConfirmReset}
        onCancel={closeResetConfirm}
      />
    </>
  );
}
