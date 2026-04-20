import { useEffect } from "react";

type Props = {
  open: boolean;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm: () => void;
  onCancel: () => void;
};

export default function ConfirmDialog({
  open,
  message,
  confirmLabel = "YES",
  cancelLabel = "NO",
  onConfirm,
  onCancel,
}: Props) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onCancel();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onCancel]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-white/55 backdrop-blur-[5px] px-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="confirm-dialog-message"
    >
      <button
        type="button"
        className="absolute inset-0 cursor-default"
        aria-label="닫기"
        onClick={onCancel}
      />

      <div className="flex justify-center items-center z-10 w-full text-[14px] text-[#5a5a5a]">
        {message}
      </div>
      <div className="absolute bottom-[100px] flex justify-center gap-[10px] bg-white/10 p-[20px]">
        <button
          type="button"
          className="w-[55px] h-[40px] rounded-tr-[20px] rounded-br-[20px] text-[12px] text-[#909090]"
          onClick={onConfirm}
        >
          {confirmLabel}
        </button>
        <button
          type="button"
          className="w-[55px] h-[40px] rounded-tl-[20px] rounded-bl-[20px] text-[12px] text-[#909090]"
          onClick={onCancel}
        >
          {cancelLabel}
        </button>
      </div>
    </div>
  );
}
