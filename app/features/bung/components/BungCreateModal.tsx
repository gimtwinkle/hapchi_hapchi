"use client";

import { useState } from "react";
import { addDoc, collection } from "firebase/firestore";
import { db } from "@/lib/firebase/config";
import { BungCalendarEvent } from "../types";

interface Props {
  date: Date | null;
  onClose: () => void;
  onEventAdded?: (event: BungCalendarEvent) => void; // 이벤트 추가 콜백
}

export default function BungCreateModal({
  date,
  onClose,
  onEventAdded,
}: Props) {
  const [title, setTitle] = useState("");

  if (!date) return null; // date가 없으면 모달 숨기기

  const handleSubmit = async () => {
    if (!title) return;

    const newEvent = {
      title,
      start: date.toISOString(),
    };

    // Firebase에 저장
    const docRef = await addDoc(collection(db, "bung"), newEvent);
    const savedEvent: BungCalendarEvent = { id: docRef.id, ...newEvent };

    // 부모 컴포넌트에 이벤트 추가 알림
    onEventAdded?.(savedEvent);

    // 모달 닫기
    setTitle("");
    onClose();
  };

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0,0,0,0.5)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div style={{ backgroundColor: "white", padding: 20, borderRadius: 8 }}>
        <h3>{date.toDateString()} 일정 추가</h3>
        <input
          type="text"
          placeholder="제목 입력"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <div style={{ marginTop: 10 }}>
          <button onClick={handleSubmit}>저장</button>
          <button onClick={onClose} style={{ marginLeft: 10 }}>
            취소
          </button>
        </div>
      </div>
    </div>
  );
}
