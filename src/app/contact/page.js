'use client';

import { useState } from 'react';

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-12">
        <span className="bg-[#00a884]/10 text-[#00a884] font-bold text-xs px-4 py-1.5 rounded-full uppercase tracking-wider inline-block mb-3">
          Contact Us
        </span>
        <h1 className="text-3xl md:text-5xl font-extrabold text-slate-900 mb-3">
          ติดต่อเรา
        </h1>
        <p className="text-slate-600">
          มีข้อสงสัย ข้อเสนอแนะ หรือต้องการความช่วยเหลือ? ส่งข้อความหาเราได้ทันที
        </p>
      </div>

      <div className="grid md:grid-cols-5 gap-8">
        {/* Contact Info */}
        <div className="md:col-span-2 bg-[#f5a35c] text-white p-8 rounded-3xl shadow-lg space-y-6">
          <h3 className="text-2xl font-bold">ข้อมูลการติดต่อ</h3>
          <div className="space-y-4 text-sm font-light">
            <p className="flex items-start gap-3">
              <span>📍</span>
              <span>123 ถนนสุขุมวิท กรุงเทพมหานคร 10110</span>
            </p>
            <p className="flex items-center gap-3">
              <span>📞</span>
              <span>02-123-4567</span>
            </p>
            <p className="flex items-center gap-3">
              <span>✉️</span>
              <span>support@mychiken.com</span>
            </p>
          </div>
        </div>

        {/* Contact Form */}
        <div className="md:col-span-3 bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
          {submitted ? (
            <div className="bg-[#d2f8e6] text-[#00a884] p-6 rounded-2xl text-center font-bold space-y-2">
              <div className="text-4xl">🎉</div>
              <p className="text-lg">ขอบคุณสำหรับข้อความ!</p>
              <p className="text-xs text-slate-600 font-normal">
                ทีมงานจะรีบติดต่อกลับโดยเร็วที่สุดครับ
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  ชื่อ-นามสกุล
                </label>
                <input 
                  type="text" 
                  required 
                  placeholder="กรอกชื่อของคุณ" 
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm bg-slate-50 focus:bg-white focus:outline-none focus:border-[#00a884] transition"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  อีเมล
                </label>
                <input 
                  type="email" 
                  required 
                  placeholder="yourname@example.com" 
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm bg-slate-50 focus:bg-white focus:outline-none focus:border-[#00a884] transition"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  ข้อความรายละเอียด
                </label>
                <textarea 
                  rows="4" 
                  required 
                  placeholder="พิมพ์ข้อความของคุณที่นี่..." 
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm bg-slate-50 focus:bg-white focus:outline-none focus:border-[#00a884] transition"
                ></textarea>
              </div>

              <button 
                type="submit" 
                className="w-full bg-[#00a884] hover:bg-[#008f70] text-white font-bold py-3.5 rounded-xl transition shadow-md text-sm"
              >
                ส่งข้อความ
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}