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
            className="flex h-[48px] min-h-0 min-w-0 flex-1 max-w-[80px] items-center justify-center rounded-full border-0 bg-[#E0E0E0] px-6 text-white active:opacity-90"
            aria-label="메시지 입력 열기"
            onClick={() => setExpanded(true)}
          >
            <span className="text-[22px] font-light leading-none">+</span>
          </button>
          <button
            type="button"
            className="flex h-[48px] w-[48px] shrink-0 items-center justify-center rounded-full border-0 bg-[#E0E0E0] text-white active:opacity-90"
            aria-label="대화 기록 지우기"
            onClick={() => setResetConfirmOpen(true)}
          >
            <span className="text-[18px] font-light leading-none">−</span>
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
