"use client";

import Portal from "./Portal";

interface Props {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export default function Modal({ open, onClose, children }: Props) {
  if (!open) return null;

  return (
    <Portal>
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        {/* backdrop */}
        <div className="absolute inset-0 bg-black/50" onClick={onClose} />
        {/* content */}
        <div className="relative z-10 bg-white rounded-xl p-4">{children}</div>
      </div>
    </Portal>
  );
}
