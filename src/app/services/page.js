import Link from 'next/link';

export default function ServicesPage() {
  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-14">
        <span className="bg-[#f5a35c]/10 text-[#f5a35c] font-bold text-xs px-4 py-1.5 rounded-full uppercase tracking-wider inline-block mb-3">
          Our Services
        </span>
        <h1 className="text-3xl md:text-5xl font-extrabold text-slate-900 mb-4">
          บริการของเรา
        </h1>
        <p className="text-slate-600 text-base md:text-lg">
          เครื่องมือและบริการที่จะช่วยให้คุณดูแลและจัดการข้อมูลไก่แจ้ได้อย่างมีประสิทธิภาพ
        </p>
      </div>

      {/* Service Cards */}
      <div className="grid md:grid-cols-2 gap-8 mb-12">
        <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm hover:shadow-md transition">
          <div className="w-16 h-16 bg-[#d2f8e6] text-[#00a884] rounded-2xl flex items-center justify-center text-3xl font-bold mb-6">
            📱
          </div>
          <h3 className="text-2xl font-bold text-slate-800 mb-3">ระบบดิจิทัลโปรไฟล์ไก่แจ้</h3>
          <p className="text-slate-600 leading-relaxed text-sm mb-4">
            สร้างโปรไฟล์ส่วนตัวให้ไก่แจ้แต่ละตัว ใส่รูปถ่าย บันทึกวันเกิด สายพันธุ์ พ่อพันธุ์-แม่พันธุ์ และประวัติการประกวดไว้ในระบบออนไลน์
          </p>
          <ul className="space-y-2 text-xs font-semibold text-[#00a884]">
            <li>✓ จัดเก็บรูปถ่ายไม่จำกัด</li>
            <li>✓ บันทึกข้อมูลผังสายเลือด (Pedigree)</li>
          </ul>
        </div>

        <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm hover:shadow-md transition">
          <div className="w-16 h-16 bg-amber-100 text-[#f5a35c] rounded-2xl flex items-center justify-center text-3xl font-bold mb-6">
            🩺
          </div>
          <h3 className="text-2xl font-bold text-slate-800 mb-3">ตารางเตือนวัคซีน & สุขภาพ</h3>
          <p className="text-slate-600 leading-relaxed text-sm mb-4">
            ไม่พลาดวันสำคัญทางสุขภาพของไก่แจ้ ด้วยระบบช่วยเตือนกำหนดการฉีดวัคซีน การถ่ายพยาธิ และตารางบันทึกการเจริญเติบโต
          </p>
          <ul className="space-y-2 text-xs font-semibold text-[#f5a35c]">
            <li>✓ สมุดบันทึกประวัติสุขภาพออนไลน์</li>
            <li>✓ ระบบแจ้งเตือนตามกำหนดเวลา</li>
          </ul>
        </div>
      </div>

      <div className="text-center">
        <Link 
          href="/contact" 
          className="inline-block bg-[#f5a35c] hover:bg-[#ed8b3a] text-white font-bold px-8 py-3.5 rounded-xl transition shadow-md"
        >
          สอบถามข้อมูลบริการเพิ่มเติม →
        </Link>
      </div>
    </div>
  );
}