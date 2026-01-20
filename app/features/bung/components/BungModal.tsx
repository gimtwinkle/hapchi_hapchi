"use client";

import { useEffect, useState } from "react";
import { addDoc, collection } from "firebase/firestore";
import { db } from "@/lib/firebase/config";
import { BungCalendarEvent } from "../calendar/types";

type ModalMode = "create" | "read";

interface Props {
  mode: ModalMode;
  date?: Date | null;
  event?: BungCalendarEvent | null;
  onClose: () => void;
  onEventAdded?: (event: BungCalendarEvent) => void;
}

export default function BungModal({
  mode,
  date,
  event,
  onClose,
  onEventAdded,
}: Props) {
  const [title, setTitle] = useState("");

  useEffect(() => {
    if (mode === "read" && event) {
      setTitle(event.bungTitle);
    }
  }, [mode, event]);

  if (mode === "create" && !date) return null;
  if (mode === "read" && !event) return null;

  const handleCreate = async () => {
    if (!date || !title) return;

    const newEvent: Omit<BungCalendarEvent, "id"> = {
      bungTitle: title,
      date: date.toISOString(),
      buntTime: "",
      createdAt: new Date().toISOString(),
      level: "",
      location: "",
    };

    const docRef = await addDoc(collection(db, "bung"), newEvent);

    onEventAdded?.({
      id: docRef.id,
      ...newEvent,
    });

    onClose();
  };

  return (
    <div style={overlayStyle}>
      <div style={modalStyle}>
        <h3>
          {mode === "create"
            ? `${date?.toDateString()} 일정 추가`
            : "일정 상세"}
        </h3>

        <input
          value={title}
          readOnly={mode === "read"}
          placeholder="제목"
          onChange={(e) => setTitle(e.target.value)}
        />

        {mode === "read" && event && (
          <>
            <p>📅 {new Date(event.date).toDateString()}</p>
            {event.level && <p>🏊 레벨: {event.level}</p>}
            {event.location && <p>📍 장소: {event.location}</p>}
          </>
        )}

        <div style={{ marginTop: 16 }}>
          {mode === "create" && <button onClick={handleCreate}>저장</button>}
          <button onClick={onClose} style={{ marginLeft: 8 }}>
            닫기
          </button>
        </div>
      </div>
    </div>
  );
}

const overlayStyle: React.CSSProperties = {
  position: "fixed",
  inset: 0,
  background: "rgba(0,0,0,0.4)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  zIndex: 1000,
};

const modalStyle: React.CSSProperties = {
  background: "#fff",
  padding: 20,
  borderRadius: 8,
  minWidth: 300,
};
