import CommentSection from "@/components/CommentSection";

async function getChicken(id) {
  try {
    const res = await fetch(
      `https://6a7eb09d3183f5fd884a530f.mockapi.io/api/pd/${id}`,
      { cache: "no-store" }
    );
    if (!res.ok) {
      console.log(`โหลดข้อมูลไก่ id=${id} ไม่สำเร็จ (status: ${res.status})`);
      return null;
    }
    return await res.json();
  } catch (error) {
    console.log("โหลดข้อมูลไก่ไม่สำเร็จ:", error.message);
    return null;
  }
}

export default async function ChickenDetailPage({ params }) {
  // สำคัญ: Next.js 15 ขึ้นไป params เป็น Promise ต้อง await ก่อนใช้
  const resolvedParams = await params;
  const id = resolvedParams?.id;

  if (!id) {
    return (
      <div className="min-h-screen bg-[#FFF8EC] flex items-center justify-center px-6">
        <div className="text-center">
          <div className="text-5xl mb-3">🐣💨</div>
          <p className="text-[#7A5C3E] font-bold">ไม่พบรหัสไก่ใน URL</p>
        </div>
      </div>
    );
  }

  const chiken = await getChicken(id);

  if (!chiken) {
    return (
      <div className="min-h-screen bg-[#FFF8EC] flex items-center justify-center px-6">
        <div className="text-center">
          <div className="text-5xl mb-3">🐣💨</div>
          <p className="text-[#7A5C3E] font-bold">ไม่พบไก่ตัวนี้ในชุมชน</p>
          <p className="text-xs text-[#B99A72] mt-2">(รหัสที่ค้นหา: {id})</p>
        </div>
      </div>
    );
  }

  // คอมเมนต์อยู่ในฟิลด์ comments ของไก่ตัวนี้เอง (array ซ้อนอยู่ใน record)
  const comments = Array.isArray(chiken.comments)
    ? [...chiken.comments].sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      )
    : [];

  return (
    <div className="min-h-screen bg-[#FFF8EC] px-6 py-12">
      <div className="max-w-2xl mx-auto space-y-8">
        {/* การ์ดข้อมูลไก่: รูป ชื่อ อายุ สายพันธุ์ */}
        <div className="bg-white rounded-[28px] border border-[#FCE3C7] shadow-md overflow-hidden">
          <div className="h-64 bg-[#FFF1DF]">
            {chiken.picture ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={chiken.picture}
                alt={chiken.chikenname}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-6xl">
                🐔
              </div>
            )}
          </div>
          <div className="p-6">
            <h1 className="text-2xl font-extrabold text-[#5B3E22]">
              {chiken.chikenname}
            </h1>
            <p className="text-[#8A6B48] mt-1">
              🎂 อายุ {chiken.chikenage} เดือน · 🧬 สายพันธุ์ {chiken.chikentype}
            </p>
          </div>
        </div>

        {/* ช่องคอมเมนต์ */}
        <div id="comments">
          <CommentSection chiken={chiken} initialComments={comments} />
        </div>
      </div>
    </div>
  );
}