"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Baloo_2 } from "next/font/google";
import Swal from "sweetalert2";

const baloo = Baloo_2({
  subsets: ["thai", "latin"],
  weight: ["600", "700", "800"],
});

// Endpoint ที่ใช้จริง
const API_URL = "https://6a7eb09d3183f5fd884a530f.mockapi.io/api/pd";

// --- URL สำหรับทดสอบถ่ายภาพหน้าจอ (ลบ // หน้าบรรทัดที่ต้องการ แล้วคอมเมนต์บรรทัดบน) ---
// const API_URL = "https://httpbin.org/status/400"; // ทดสอบ Validation Error (400)
// const API_URL = "https://httpbin.org/status/500"; // ทดสอบ Server Error (500)
// Network Error: เปิด DevTools > Network > เลือก Offline แล้วกดสมัครสมาชิก

const EMPTY_FORM = {
  txt_firstname: "",
  txt_lastname: "",
  txt_username: "",
  txt_password: "",
};

// ช่องกรอกข้อมูล 1 ช่อง: Label + Input + Helper text (หรือ Error แทนที่ Helper)
// ประกาศไว้นอก component หลัก เพื่อไม่ให้ input เสียโฟกัสตอนพิมพ์
function Field({ id, label, error, helper, children }) {
  return (
    <div>
      <label
        htmlFor={id}
        className="block text-sm font-medium text-[#2F5D4E] mb-1.5"
      >
        {label}
      </label>
      {children}
      {error ? (
        <p className="text-xs text-[#F26B5E] mt-1.5">{error}</p>
      ) : (
        <p className="text-xs text-[#5F7F71] mt-1.5">{helper}</p>
      )}
    </div>
  );
}

export default function RegisterPage() {
  const router = useRouter();

  const [form, setForm] = useState(EMPTY_FORM);

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: "" });
    }
  };

  // ปุ่มล้างข้อมูล: เคลียร์ทุกช่องและข้อความผิดพลาด
  const handleReset = () => {
    setForm(EMPTY_FORM);
    setErrors({});
    setShowPassword(false);
  };

  const validate = () => {
    const newErrors = {};
    if (!form.txt_firstname.trim()) newErrors.txt_firstname = "กรุณากรอกชื่อจริง";
    if (!form.txt_lastname.trim()) newErrors.txt_lastname = "กรุณากรอกนามสกุล";
    if (!form.txt_username.trim()) newErrors.txt_username = "กรุณากรอกชื่อผู้ใช้";
    else if (!/^[A-Za-z0-9_]{4,20}$/.test(form.txt_username.trim()))
      newErrors.txt_username = "ใช้ได้เฉพาะ a-z, 0-9 และ _ ความยาว 4-20 ตัวอักษร";
    if (!form.txt_password) newErrors.txt_password = "กรุณากรอกรหัสผ่าน";
    else if (form.txt_password.length < 6)
      newErrors.txt_password = "รหัสผ่านต้องมีอย่างน้อย 6 ตัวอักษร";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) {
      await Swal.fire({
        icon: "warning",
        title: "กรอกข้อมูลไม่ครบ",
        text: "กรุณากรอกข้อมูลให้ถูกต้องครบถ้วนก่อนสมัครสมาชิก",
        confirmButtonText: "โอเค",
        confirmButtonColor: "#059669",
      });
      return;
    }

    try {
      // ยิง request แบบ POST ไปยัง API เพื่อเพิ่มสมาชิกใหม่
      const response = await fetch(
        API_URL,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            firstname: form.txt_firstname,
            lastname: form.txt_lastname,
            username: form.txt_username,
            password: form.txt_password,
          }),
        }
      );

      // กันพลาด: ถ้า body ไม่ใช่ JSON ต้องไม่ตกไปที่ catch (ไม่งั้น 400/500 จะไม่ขึ้น)
      const result = await response.json().catch(() => ({}));

      if (response.ok) {
        await Swal.fire({
          icon: "success",
          title: `สมัครสมาชิกสำเร็จ (status: ${response.status})`,
          text: "บันทึกข้อมูลสมาชิกใหม่เรียบร้อยแล้ว",
          confirmButtonText: "ตกลง",
          confirmButtonColor: "#059669",
        });
        setForm(EMPTY_FORM);
        // พาไปหน้าถัดไปทันทีหลังบันทึกสำเร็จ (แก้ path ได้ตามต้องการ)
        router.push("/community");
      } else if (response.status === 400) {
        await Swal.fire({
          icon: "warning",
          title: `ข้อมูลไม่ถูกต้อง (status: ${response.status})`,
          text: result.message || "เกิดข้อผิดพลาด",
          confirmButtonText: "ตกลง",
          confirmButtonColor: "#fecc00",
        });
      } else if (response.status >= 500) {
        await Swal.fire({
          icon: "error",
          title: `เกิดข้อผิดพลาดที่เซิร์ฟเวอร์ (status: ${response.status})`,
          text: result.message || "เกิดข้อผิดพลาด",
          confirmButtonText: "ตกลง",
          confirmButtonColor: "#fe0505",
        });
      }
    } catch (error) {
      await Swal.fire({
        icon: "warning",
        title: "ไม่สามารถเชื่อมต่อกับเซิร์ฟเวอร์ได้",
        text: "กรุณาตรวจสอบการเชื่อมต่ออินเทอร์เน็ต แล้วลองใหม่อีกครั้ง",
        confirmButtonText: "ตกลง",
        confirmButtonColor: "#fc006dcc",
      });
    }
  };

  const inputClass = (name) =>
    `w-full border ${
      errors[name] ? "border-[#F26B5E]" : "border-[#CFE5DA]"
    } text-gray-800 rounded-lg px-4 py-2.5 text-base outline-none bg-[#F7FCFA]
    transition focus:border-[#059669] focus:ring-4 focus:ring-[#A7F3D0]`;

  return (
    <div className="min-h-screen w-full bg-[#F3FAF7] flex items-center justify-center px-4 py-8 sm:p-6">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-lg shadow-[#059669]/10 border border-[#D1EDE0] overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-br from-[#059669] to-[#0D9488] px-6 py-6 text-left">
            <h1 className={`${baloo.className} text-xl sm:text-2xl text-white`}>
              ฟอร์มสมัครสมาชิก
            </h1>
            <p className="text-[#D1FAE5] text-sm mt-1">
              กรอกข้อมูลให้ครบถ้วนเพื่อสมัครสมาชิก
            </p>
          </div>

          {/* ฟิลด์เรียงลงมาแถวเดียว */}
          <form
            onSubmit={handleSubmit}
            noValidate
            className="px-5 sm:px-6 pt-6 pb-6 space-y-5"
          >
            <Field
              id="txt_firstname"
              label="🙂 ชื่อจริง"
              error={errors.txt_firstname}
              helper="เช่น สมชาย"
            >
              <input
                id="txt_firstname"
                type="text"
                name="txt_firstname"
                value={form.txt_firstname}
                onChange={handleChange}
                autoComplete="given-name"
                className={inputClass("txt_firstname")}
                placeholder="ชื่อจริงของคุณ"
              />
            </Field>

            <Field
              id="txt_lastname"
              label="👤 นามสกุล"
              error={errors.txt_lastname}
              helper="เช่น ใจดี"
            >
              <input
                id="txt_lastname"
                type="text"
                name="txt_lastname"
                value={form.txt_lastname}
                onChange={handleChange}
                autoComplete="family-name"
                className={inputClass("txt_lastname")}
                placeholder="นามสกุลของคุณ"
              />
            </Field>

            <Field
              id="txt_username"
              label="🏷️ ชื่อผู้ใช้ (Username)"
              error={errors.txt_username}
              helper="ใช้ a-z, 0-9 และ _ ความยาว 4-20 ตัวอักษร"
            >
              <input
                id="txt_username"
                type="text"
                name="txt_username"
                value={form.txt_username}
                onChange={handleChange}
                autoComplete="username"
                autoCapitalize="none"
                className={inputClass("txt_username")}
                placeholder="เช่น somchai_01"
              />
            </Field>

            <Field
              id="txt_password"
              label="🔒 รหัสผ่าน"
              error={errors.txt_password}
              helper="อย่างน้อย 6 ตัวอักษร"
            >
              <div className="relative">
                <input
                  id="txt_password"
                  type={showPassword ? "text" : "password"}
                  name="txt_password"
                  value={form.txt_password}
                  onChange={handleChange}
                  autoComplete="new-password"
                  className={`${inputClass("txt_password")} pr-16`}
                  placeholder="ตั้งรหัสผ่านของคุณ"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-medium text-[#047857] hover:underline"
                >
                  {showPassword ? "ซ่อน" : "แสดง"}
                </button>
              </div>
            </Field>

            {/* ปุ่มบันทึกเต็มความกว้าง + ปุ่มล้างข้อมูลอยู่ด้านล่าง */}
            <div className="space-y-3 pt-1">
              <button
                type="submit"
                className={`${baloo.className} w-full px-5 py-3 bg-gradient-to-r from-[#059669] to-[#0D9488] text-white rounded-lg
                shadow-md shadow-[#059669]/30 hover:shadow-lg hover:shadow-[#059669]/40 hover:-translate-y-0.5 active:translate-y-0 transition-all`}
              >
                บันทึกข้อมูล
              </button>
              <button
                type="button"
                onClick={handleReset}
                className="w-full px-5 py-2.5 rounded-lg border border-[#CFE5DA] bg-white text-sm text-[#2F5D4E] hover:bg-[#ECFDF5] transition"
              >
                ล้างข้อมูล
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}