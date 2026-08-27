"use client";

import { useRef, useState } from "react";
import { Baloo_2 } from "next/font/google";
import Swal from "sweetalert2";

const baloo = Baloo_2({
  subsets: ["thai", "latin"],
  weight: ["600", "700", "800"],
});

export default function FormRegister() {
  const fileInputRef = useRef(null);

  const [form, setForm] = useState({
    txt_chikenname: "",
    txt_chikenage: "",
    txt_chikentype: "",
    txt_picture: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: "" });
    }
  };

  // อ่านไฟล์รูปที่เลือกแล้วแปลงเป็น base64 เพื่อเก็บ/พรีวิวได้จริง
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setErrors({ ...errors, txt_picture: "กรุณาเลือกไฟล์รูปภาพเท่านั้น" });
      return;
    }
    if (file.size > 2 * 1024 * 1024) {
      setErrors({ ...errors, txt_picture: "ไฟล์รูปต้องไม่เกิน 2MB" });
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setForm((prev) => ({ ...prev, txt_picture: reader.result }));
      setErrors((prev) => ({ ...prev, txt_picture: "" }));
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveImage = () => {
    setForm((prev) => ({ ...prev, txt_picture: "" }));
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const validate = () => {
    const newErrors = {};
    if (!form.txt_chikenname.trim()) newErrors.txt_chikenname = "ใส่ชื่อไก่น้อยของท่านก่อนนะ";
    if (!form.txt_chikenage) newErrors.txt_chikenage = "ใส่อายุไก่น้อยด้วยนะ";
    else if (Number(form.txt_chikenage) < 0) newErrors.txt_chikenage = "อายุต้องไม่ติดลบนะ";
    if (!form.txt_chikentype.trim()) newErrors.txt_chikentype = "ใส่สายพันธุ์ของไก่น้อยด้วย";
    if (!form.txt_picture) newErrors.txt_picture = "อัปโหลดรูปไก่น้อยสักใบสิ";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(form);

    if (!validate()) {
      await Swal.fire({
        icon: "warning",
        title: "กรอกข้อมูลไม่ครบ",
        text: "กรุณากรอกข้อมูลและแนบรูปให้ครบก่อนบันทึกนะ",
        confirmButtonText: "โอเค",
        confirmButtonColor: "#F0955A",
      });
      return;
    }

    try {
      // ยิง request แบบ POST ไปยัง API เพื่อสร้างข้อมูล user ใหม่
      const response = await fetch(
        "https://6a7eb09d3183f5fd884a530f.mockapi.io/api/pd",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json", // บอก server ว่าข้อมูลที่ส่งไปเป็น JSON
          },
          body: JSON.stringify({
            chikenname: form.txt_chikenname,
            chikenage: form.txt_chikenage,
            chikentype: form.txt_chikentype,
            picture: form.txt_picture,
          }),
        }
      );

      const result = await response.json();
      // เช็ค status code ของ response เพื่อแยกกรณีการแสดงผล
      if (response.ok) {
        // response.ok = true เมื่อ status อยู่ในช่วง 200-299 (เช่น 201 Created)
        // กรณีบันทึกข้อมูลสำเร็จ -> แสดง popup แจ้งเตือนสำเร็จ
        await Swal.fire({
          icon: "success",
          title: `บันทึกสำเร็จ (status: ${response.status})`,
          text: "เพิ่มไก่น้อยสุดที่รักเข้าชมรมเรียบร้อยแล้ว 🐣",
          confirmButtonText: "ตกลง",
          confirmButtonColor: "#F0955A",
        });
        setForm({
          txt_chikenname: "",
          txt_chikenage: "",
          txt_chikentype: "",
          txt_picture: "",
        });
        if (fileInputRef.current) fileInputRef.current.value = "";
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
    } catch (error) {
      // เข้ามาที่นี่เฉพาะตอน "เรียก fetch ไม่สำเร็จเลย" เช่น ไม่มีอินเทอร์เน็ต
      await Swal.fire({
        icon: "warning",
        title: "ไม่สามารถเชื่อมต่อกับเซิร์ฟเวอร์ได้",
        text: "กรุณาตรวจสอบการเชื่อมต่ออินเทอร์เน็ต แล้วลองใหม่อีกครั้ง",
        confirmButtonText: "ตกลง",
        confirmButtonColor: "#fc006dcc",
      });
    }
  };

  return (
    <div className="min-h-screen w-full relative overflow-hidden bg-[#FFF8EC] flex items-center justify-center p-6">
      {/* บลอบตกแต่งพื้นหลัง */}
      <div className="pointer-events-none absolute -top-24 -left-24 w-72 h-72 rounded-full bg-[#FFE1B8] blur-2xl opacity-70" />
      <div className="pointer-events-none absolute -bottom-28 -right-16 w-80 h-80 rounded-full bg-[#FFD0C4] blur-2xl opacity-70" />
      <div className="pointer-events-none absolute top-1/3 right-10 text-6xl opacity-20 rotate-12 select-none">
        🪶
      </div>
      <div className="pointer-events-none absolute bottom-16 left-10 text-5xl opacity-20 -rotate-12 select-none">
        🪶
      </div>

      <div className="max-w-md w-full relative z-10">
        <div className="bg-white rounded-[28px] shadow-xl shadow-[#F0955A]/10 border border-[#FCE3C7] overflow-hidden">
          {/* Header */}
          <div className="relative bg-gradient-to-br from-[#FFB25B] to-[#F0955A] px-8 pt-8 pb-14 text-center">
            <div className="text-4xl mb-2">🐔💛</div>
            <h1 className={`${baloo.className} text-2xl text-white`}>
              รักไก่ ก็ต้องลงทะเบียน
            </h1>
            <p className="text-[#FFF1DF] text-sm mt-1">
              บอกเราหน่อยว่าไก่แจ้สุดที่รักของคุณชื่ออะไร
            </p>
          </div>

          <form onSubmit={handleSubmit} className="px-8 pb-8 -mt-8 space-y-5">
            {/* อัปโหลดรูปจริง พรีวิวในกรอบหัวใจ */}
            <div className="flex flex-col items-center -mt-2">
              <label
                htmlFor="chiken-photo"
                className={`relative w-24 h-24 flex items-center justify-center cursor-pointer bg-white border-4 ${
                  errors.txt_picture ? "border-[#F26B5E]" : "border-[#FFDCA8]"
                } shadow-md overflow-hidden`}
                style={{
                  clipPath:
                    "path('M50 88C50 88 8 62 8 32C8 15 21 4 36 4C44 4 50 9 50 9C50 9 56 4 64 4C79 4 92 15 92 32C92 62 50 88 50 88Z')",
                }}
              >
                {form.txt_picture ? (
                  <img
                    src={form.txt_picture}
                    alt="รูปไก่ที่เลือก"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-3xl">📷</span>
                )}
              </label>
              <input
                id="chiken-photo"
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />
              <div className="flex items-center gap-3 mt-2">
                <label
                  htmlFor="chiken-photo"
                  className="text-xs font-medium text-[#D9762E] cursor-pointer hover:underline"
                >
                  {form.txt_picture ? "เปลี่ยนรูป" : "อัปโหลดรูปไก่"}
                </label>
                {form.txt_picture && (
                  <button
                    type="button"
                    onClick={handleRemoveImage}
                    className="text-xs font-medium text-gray-400 hover:text-[#F26B5E]"
                  >
                    ลบรูป
                  </button>
                )}
              </div>
              {errors.txt_picture && (
                <p className="text-xs text-[#F26B5E] mt-1">{errors.txt_picture}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-[#7A5C3E] mb-1.5">
                🐣 ชื่อไก่น้อย
              </label>
              <input
                type="text"
                name="txt_chikenname"
                value={form.txt_chikenname}
                onChange={handleChange}
                className={`w-full border ${
                  errors.txt_chikenname ? "border-[#F26B5E]" : "border-[#F3E3CC]"
                } text-gray-800 rounded-2xl px-4 py-2.5 outline-none bg-[#FFFBF3]
                transition focus:border-[#F0955A] focus:ring-4 focus:ring-[#FFE1B8]`}
                placeholder="ชื่อไก่น้อยของท่าน"
              />
              {errors.txt_chikenname && (
                <p className="text-xs text-[#F26B5E] mt-1">{errors.txt_chikenname}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-[#7A5C3E] mb-1.5">
                🎂 อายุ (เดือน)
              </label>
              <input
                type="number"
                name="txt_chikenage"
                value={form.txt_chikenage}
                onChange={handleChange}
                min="0"
                className={`w-full border ${
                  errors.txt_chikenage ? "border-[#F26B5E]" : "border-[#F3E3CC]"
                } text-gray-800 rounded-2xl px-4 py-2.5 outline-none bg-[#FFFBF3]
                transition focus:border-[#F0955A] focus:ring-4 focus:ring-[#FFE1B8]`}
                placeholder="ไก่ของท่านอายุกี่เดือนแล้ว"
              />
              {errors.txt_chikenage && (
                <p className="text-xs text-[#F26B5E] mt-1">{errors.txt_chikenage}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-[#7A5C3E] mb-1.5">
                🧬 สายพันธุ์
              </label>
              <input
                type="text"
                name="txt_chikentype"
                value={form.txt_chikentype}
                onChange={handleChange}
                className={`w-full border ${
                  errors.txt_chikentype ? "border-[#F26B5E]" : "border-[#F3E3CC]"
                } text-gray-800 rounded-2xl px-4 py-2.5 outline-none bg-[#FFFBF3]
                transition focus:border-[#F0955A] focus:ring-4 focus:ring-[#FFE1B8]`}
                placeholder="ไก่น้อยของเชื้อสายใด"
              />
              {errors.txt_chikentype && (
                <p className="text-xs text-[#F26B5E] mt-1">{errors.txt_chikentype}</p>
              )}
            </div>

            <button
              type="submit"
              className={`${baloo.className} w-full px-5 py-3 bg-gradient-to-r from-[#FFB25B] to-[#F0955A] text-white rounded-2xl
              shadow-md shadow-[#F0955A]/30 hover:shadow-lg hover:shadow-[#F0955A]/40 hover:-translate-y-0.5 active:translate-y-0 transition-all`}
            >
              บันทึกไก่น้อยของฉัน 💛
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}