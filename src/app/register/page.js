"use client";

import React from 'react'
import { useState } from "react";
import Swal from 'sweetalert2';

export default function FormRegister() {

  const [form, setForm] = useState({
        txt_firstname: "",
        txt_lastname: "",
        txt_username:"",
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
    //console.log(form);

    try{
      const response = await fetch("https://api.itdev.cmtc.ac.th/users", {
        method: "POST",
        headers:{
          "Content-Type": "application/json",
        },
        body:JSON.stringify({
          firstname : form.txt_firstname,
          lastname : form.txt_lastname,
          username : form.txt_username,
          password : form.txt_password
        }),
      });
      const result = await response.json();
      if (response.ok) {
 // response.ok = true เมื่อ status อยู่ในช่วง 200-299 (เช่น 201 Created)
 // กรณีบันทึกข้อมูลสำเร็จ -> แสดง popup แจ้งเตือนสำเร็จ
      await Swal.fire({
      icon: "success",
      title: `บันทึกสำเร็จ (status: ${response.status})`,
      text: "เพิ่มข้อมูลผู้ใช้เรียบร้อยแล้ว",
      confirmButtonText: "ตกลง",
      confirmButtonColor: "#2E75B6",
    });
      } else if (response.status === 400) {
 // status 400 = Bad Request มักเกิดจากข้อมูลที่ส่งไปไม่ผ่าน validation
 // แสดง popup เตือน พร้อมข้อความ error จาก server (ถ้ามี) หรือข้อความ default
      await Swal.fire({
       icon: "warning",
       title: `ข้อมูลไม่ถูกต้อง (status: ${response.status})`,
       text: result.message || "เกิดข้อผิดพลาด",
       confirmButtonText: "ตกลง",
       confirmButtonColor: "#fecc00",
     });
     } else if (response.status >= 500) {
 // status 500 ขึ้นไป = Server Error เกิดปัญหาฝั่งเซิร์ฟเวอร์ ไม่ใช่ความผิดของผู้ใช้
 // แสดง popup แจ้งเตือนข้อผิดพลาดจากเซิร์ฟเวอร์
      await Swal.fire({
    icon: "error",
    title: `เกิดข้อผิดพลาดที่เซิร์ฟเวอร์ (status: ${response.status})`,
    text: result.message || "เกิดข้อผิดพลาด",
    confirmButtonText: "ตกลง",
    confirmButtonColor: "#fe0505",
     });
     }
 // หมายเหตุ: ถ้า status ไม่ตรงกับเงื่อนไขใดเลย (เช่น 401, 403, 404)
 // โค้ดจะไม่แสดง popup ใดๆ เลย อาจพิจารณาเพิ่ม else เพื่อดักกรณีอื่นๆ ด้วย
    }catch (error) {
 // เข้ามาที่นี่เฉพาะตอน "เรียก fetch ไม่สำเร็จเลย" เช่น ไม่มีอินเทอร์เน็ต
 // (ต่างจาก response.status >= 500 ตรงที่ตรงนี้คือ "ยิง request ไม่ถึง server เลย"
 // ไม่ใช่ server ตอบกลับมาแต่ error)
    await Swal.fire({
    icon: "warning",
    title: "ไม่สามารถเชื่อมต่อกับเซิร์ฟเวอร์ได้",
    text: "กรุณาตรวจสอบการเชื่อมต่ออินเทอร์เน็ต แล้วลองใหม่อีกครั้ง",
    confirmButtonText: "ตกลง",
      confirmButtonColor: "#fc006dcc",
    });
    }
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
            <input type="text" name="txt_firstname" defaultValue={form.txt_firstname} onChange={handleChange} className='w-full border border-gray-300 text-gray-800 rounded-lg px-4 py-2.5 outline-none transition focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100' placeholder='ชื่อจริง'  />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">กรุณาระบุนามสกุล</label>
            <input type="text" name="txt_lastname" defaultValue={form.txt_lastname} onChange={handleChange} className='w-full border border-gray-300 text-gray-800 rounded-lg px-4 py-2.5 outline-none transition focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100' placeholder='นามสกุล' />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">กรุณาระบุ uesrname</label>
            <input type="text" name="txt_username" defaultValue={form.txt_username} onChange={handleChange} className='w-full border border-gray-300 text-gray-800 rounded-lg px-4 py-2.5 outline-none transition focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100' placeholder='username' />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">กรุณาระบุ password</label>
            <input type="number" name="txt_password" defaultValue={form.txt_password} onChange={handleChange} className='w-full border border-gray-300 text-gray-800 rounded-lg px-4 py-2.5 outline-none transition focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100' placeholder='password' />
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