"use client";

import React from 'react'
import { useState } from "react";

export default function FormRegister() {

  const [form, setForm] = useState({
        txt_firstname: "",
        txt_lastname: "",
        txt_email:"",
        txt_password:"",

   });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(form);
  }

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-emerald-50 via-white to-teal-50 flex items-center justify-center p-6">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-2xl shadow-xl shadow-emerald-900/5 border border-emerald-100 overflow-hidden">

          {/* Header */}
          <div className="bg-gradient-to-r from-emerald-600 to-teal-600 px-8 py-7">
            <h1 className="text-2xl font-bold text-white">
              ฟอร์มสมัครสมาชิก
            </h1>
            <p className="text-emerald-50 text-sm mt-1">
              กรอกข้อมูลให้ครบถ้วนเพื่อสมัครสมาชิก
            </p>
          </div>

        <form onSubmit={handleSubmit} className='p-8 space-y-5'>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">กรุณาระบุชื่อ</label>
            <input type="text" name="txt_firstname" defaultValue={form.txt_firstname} onChange={handleChange} className='w-full border border-gray-300 text-gray-800 rounded-lg px-4 py-2.5 outline-none transition focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100' placeholder='ชื่อจริง' required />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">กรุณาระบุนามสกุล</label>
            <input type="text" name="txt_lastname" defaultValue={form.txt_lastname} onChange={handleChange} className='w-full border border-gray-300 text-gray-800 rounded-lg px-4 py-2.5 outline-none transition focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100' placeholder='นามสกุล' required/>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">กรุณาระบุ email</label>
            <input type="email" name="txt_email" defaultValue={form.txt_email} onChange={handleChange} className='w-full border border-gray-300 text-gray-800 rounded-lg px-4 py-2.5 outline-none transition focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100' placeholder='email@example.com' required/>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">กรุณาระบุ password</label>
            <input type="number" name="txt_password" defaultValue={form.txt_password} onChange={handleChange} className='w-full border border-gray-300 text-gray-800 rounded-lg px-4 py-2.5 outline-none transition focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100' placeholder='password' required/>
          </div>

          <button type="submit" className="w-full px-5 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-medium rounded-lg shadow-md shadow-emerald-600/20 hover:shadow-lg hover:shadow-emerald-600/30 hover:-translate-y-0.5 active:translate-y-0 transition-all">
            บันทึกข้อมูล
          </button>
        </form>
        </div>
      </div>
    </div>
  )
}