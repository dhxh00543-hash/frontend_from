import Link from 'next/link';

export default function AboutPage() {
  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      {/* Banner ส่วนหัว */}
      <div className="bg-[#d2f8e6] rounded-3xl p-8 md:p-12 text-center border border-[#b2edd0] mb-12">
        <span className="bg-white text-[#00a884] font-bold text-xs px-4 py-1.5 rounded-full uppercase tracking-wider shadow-sm inline-block mb-4">
          About Us
        </span>
        <h1 className="text-3xl md:text-5xl font-extrabold text-slate-900 mb-4">
          เรื่องราวและความตั้งใจของเรา
        </h1>
        <p className="text-slate-600 max-w-2xl mx-auto text-base md:text-lg leading-relaxed">
          เราสร้าง MyChiken ขึ้นมาด้วยความรักในไก่แจ้ไทย เพื่อยกระดับการเลี้ยงและการเก็บข้อมูลสัตว์เลี้ยงให้เป็นระบบ สมบูรณ์ และใช้งานง่ายที่สุดสำหรับทุกคน
        </p>
      </div>

      {/* รายละเอียดความเป็นมา */}
      <div className="grid md:grid-cols-2 gap-10 items-center mb-12">
        <div className="space-y-4">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-800">
            จุดเริ่มต้นของ <span className="text-[#f5a35c]">MyChiken</span>
          </h2>
          <p className="text-slate-600 leading-relaxed text-sm md:text-base">
            ไก่แจ้เป็นสัตว์เลี้ยงที่มีเอกลักษณ์และทรงคุณค่า แต่เดิมผู้เลี้ยงมักประสบปัญหาการสูญหายของประวัติสายพันธุ์ หรือลืมตารางฉีดวัคซีน
          </p>
          <p className="text-slate-600 leading-relaxed text-sm md:text-base">
            เราจึงพัฒนาระบบนี้ขึ้นเพื่อรวบรวมข้อมูลทุกอย่างไว้ในที่เดียว ให้ผู้เลี้ยงสามารถเข้าถึงประวัติไก่ตัวโปรดได้ทุกที่ ทุกเวลา
          </p>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-start gap-4 p-3 bg-amber-50 rounded-2xl">
            <div className="text-3xl">🧡</div>
            <div>
              <h4 className="font-bold text-slate-800">ด้วยความรัก (Love & Passion)</h4>
              <p className="text-xs text-slate-500">สร้างขึ้นด้วยความเข้าใจในบริบทของผู้เลี้ยงไก่แจ้ตัวจริง</p>
            </div>
          </div>

          <div className="flex items-start gap-4 p-3 bg-emerald-50 rounded-2xl">
            <div className="text-3xl">💡</div>
            <div>
              <h4 className="font-bold text-slate-800">นวัตกรรมเพื่อสัตว์เลี้ยง (Smart Care)</h4>
              <p className="text-xs text-slate-500">ใช้เทคโนโลยีช่วยจัดการและติดตามสุขภาพไก่แจ้ให้ง่ายขึ้น</p>
            </div>
          </div>
        </div>
      </div>

      <div className="text-center">
        <Link 
          href="/services" 
          className="inline-block bg-[#00a884] hover:bg-[#008f70] text-white font-bold px-8 py-3.5 rounded-xl transition shadow-md"
        >
          ดูบริการของเรา →
        </Link>
      </div>
    </div>
  );
}