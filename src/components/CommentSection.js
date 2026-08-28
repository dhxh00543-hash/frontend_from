"use client";

import { useState } from "react";

export default function CommentSection({ chiken, initialComments }) {
  const [comments, setComments] = useState(initialComments || []);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name.trim() || !message.trim()) {
      setError("กรอกชื่อและข้อความให้ครบก่อนนะ");
      return;
    }
    setError("");
    setSubmitting(true);

    const newComment = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
      name: name.trim(),
      message: message.trim(),
      createdAt: new Date().toISOString(),
    };

    // แสดงคอมเมนต์ทันทีแบบ optimistic ก่อนรอ server ตอบกลับ
    const previousComments = comments;
    const optimisticComments = [newComment, ...comments];
    setComments(optimisticComments);
    setMessage("");

    try {
      // เก็บคอมเมนต์เป็น array ซ้อนอยู่ใน record ของไก่ตัวนี้เอง (resource "pd")
      // ต้องส่งข้อมูลไก่ "ทั้งก้อน" กลับไปด้วย เพราะ MockAPI ใช้ PUT แทนที่ทั้ง record
      const res = await fetch(
        `https://6a7eb09d3183f5fd884a530f.mockapi.io/api/pd/${chiken.id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...chiken,
            comments: optimisticComments,
          }),
        }
      );

      if (!res.ok) {
        const bodyText = await res.text();
        console.log("ส่งคอมเมนต์ไม่สำเร็จ, response:", res.status, bodyText);
        throw new Error(`ส่งคอมเมนต์ไม่สำเร็จ (status: ${res.status})`);
      }

      const saved = await res.json();
      // sync กับข้อมูลจริงจาก server อีกครั้ง เผื่อ server จัดการข้อมูลต่างจากที่ส่งไป
      setComments(Array.isArray(saved.comments) ? saved.comments : optimisticComments);
    } catch (err) {
      console.log("ส่งคอมเมนต์ไม่สำเร็จ:", err.message);
      setError(err.message || "ส่งคอมเมนต์ไม่สำเร็จ ลองใหม่อีกครั้งนะ");
      // ส่งไม่สำเร็จจริง ๆ คืนค่าคอมเมนต์กลับไปเป็นก่อนหน้า
      setComments(previousComments);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-white rounded-[28px] border border-[#FCE3C7] shadow-sm p-6">
      <h2 className="text-lg font-extrabold text-[#5B3E22] mb-4">
        💬 คอมเมนต์ ({comments.length})
      </h2>

      <form onSubmit={handleSubmit} className="space-y-3 mb-6">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="ชื่อของคุณ"
          className="w-full border border-[#F3E3CC] text-gray-800 rounded-2xl px-4 py-2.5 outline-none bg-[#FFFBF3] transition focus:border-[#F0955A] focus:ring-4 focus:ring-[#FFE1B8]"
        />
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows="3"
          placeholder="เขียนคอมเมนต์ถึงไก่น้อยตัวนี้..."
          className="w-full border border-[#F3E3CC] text-gray-800 rounded-2xl px-4 py-2.5 outline-none bg-[#FFFBF3] transition focus:border-[#F0955A] focus:ring-4 focus:ring-[#FFE1B8]"
        ></textarea>
        {error && <p className="text-xs text-[#F26B5E]">{error}</p>}
        <button
          type="submit"
          disabled={submitting}
          className="w-full sm:w-auto px-6 py-2.5 bg-gradient-to-r from-[#FFB25B] to-[#F0955A] text-white font-bold rounded-2xl shadow-md shadow-[#F0955A]/30 hover:-translate-y-0.5 transition-all disabled:opacity-60"
        >
          {submitting ? "กำลังส่ง..." : "แสดงความคิดเห็น"}
        </button>
      </form>

      {comments.length === 0 ? (
        <p className="text-sm text-[#B99A72] text-center py-6">
          ยังไม่มีใครคอมเมนต์เลย เป็นคนแรกกันเถอะ 🐣
        </p>
      ) : (
        <ul className="space-y-4">
          {comments.map((c, index) => (
            <li
              key={c.id || index}
              className="bg-[#FFFBF3] border border-[#F3E3CC] rounded-2xl px-4 py-3"
            >
              <div className="flex items-center justify-between mb-1">
                <span className="font-bold text-sm text-[#7A5C3E]">
                  {c.name}
                </span>
                <span className="text-[10px] text-[#B99A72]">
                  {new Date(c.createdAt).toLocaleString("th-TH")}
                </span>
              </div>
              <p className="text-sm text-gray-700">{c.message}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}