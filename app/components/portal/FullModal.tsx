"use client";

import Portal from "./Portal";

interface Props {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export default function FullModal({ open, onClose, children }: Props) {
  if (!open) return null;

  return (
    <Portal>
      <div className="fixed inset-0 z-50 bg-white">
        {/* 헤더 */}
        <header className="flex items-center justify-between p-4 border-b">
          <button onClick={onClose} className="text-gray-900">
            X
          </button>
        </header>

        {/* 콘텐츠 */}
        <main className="p-4 overflow-y-auto h-[calc(100vh-56px)]">
          {children}
        </main>
      </div>
    </Portal>
  );
}
