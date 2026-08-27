import Link from "next/link";

export default function Home() {
  return (
    <section className="bg-gradient-to-br from-emerald-50 via-white to-teal-50">
      <div className="max-w-6xl mx-auto px-6 py-24 grid md:grid-cols-2 gap-12 items-center">
        <div>
          <span className="inline-block px-3 py-1 rounded-full bg-emerald-100 text-emerald-700 text-xs font-semibold tracking-wide mb-5">
            ชุมชนคนรักไก่แจ้
          </span>
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 leading-tight">
            ดูแลและบันทึกข้อมูล
            <br />
            <span className="text-emerald-600">ไก่แจ้</span>ตัวโปรดของคุณ
          </h1>
          <p className="mt-6 text-gray-600 text-lg leading-relaxed">
            My Chicken คือพื้นที่สำหรับผู้เลี้ยงไก่แจ้ ลงทะเบียนไก่ของคุณ
            เก็บประวัติ อายุ สายพันธุ์ และรูปภาพ พร้อมเชื่อมต่อกับชุมชนคนรักไก่แจ้ทั่วประเทศ
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/chiken"
              className="px-6 py-3 rounded-lg bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-medium shadow-md shadow-emerald-600/20 hover:shadow-lg hover:shadow-emerald-600/30 hover:-translate-y-0.5 active:translate-y-0 transition-all"
            >
              สมัครสมาชิกไก่แจ้
            </Link>
            <Link
              href="/user"
              className="px-6 py-3 rounded-lg border border-gray-300 text-gray-700 font-medium hover:border-emerald-400 hover:text-emerald-600 transition"
            >
              ดูสมาชิกทั้งหมด
            </Link>
          </div>
        </div>
        <div className="relative">
          <div className="aspect-square rounded-2xl bg-gradient-to-br from-emerald-100 to-teal-100 border border-emerald-200 flex items-center justify-center shadow-xl shadow-emerald-900/5">
            <span className="text-[140px] leading-none">🐔</span>
          </div>
        </div>
      </div>
    </section>
  );
}