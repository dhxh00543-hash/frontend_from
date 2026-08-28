import Link from "next/link";

// ดึงรายชื่อไก่ทั้งหมดจาก MockAPI (เอนด์พอยต์เดียวกับตอนเพิ่มไก่)
async function getChickens() {
  try {
    const res = await fetch(
      "https://6a7eb09d3183f5fd884a530f.mockapi.io/api/pd",
      { cache: "no-store" }
    );

    if (!res.ok) {
      throw new Error(`โหลดข้อมูลไม่สำเร็จ (status: ${res.status})`);
    }

    return await res.json();
  } catch (error) {
    console.log("โหลดรายชื่อไก่ไม่สำเร็จ:", error.message);
    return [];
  }
}

export default async function CommunityPage() {
  const chickens = await getChickens();

  return (
    <div className="min-h-screen w-full bg-[#FFF8EC] px-6 py-12">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10">
          <div>
            <span className="inline-block bg-[#F0955A]/10 text-[#D9762E] font-bold text-xs px-4 py-1.5 rounded-full uppercase tracking-wider mb-3">
              🐔 ชุมชนของเรา
            </span>
            <h1 className="text-3xl md:text-4xl font-extrabold text-[#5B3E22]">
              ชุมชนไก่แจ้
            </h1>
            <p className="text-[#8A6B48] mt-1">
              รวมไก่น้อยสุดที่รักจากเพื่อน ๆ ในชมรม ทั้งหมด {chickens.length} ตัว
            </p>
          </div>
          <Link
            href="/register"
            className="shrink-0 text-center bg-gradient-to-r from-[#FFB25B] to-[#F0955A] text-white font-bold px-6 py-3 rounded-2xl shadow-md shadow-[#F0955A]/30 hover:-translate-y-0.5 transition-all"
          >
            + เพิ่มไก่ของคุณ
          </Link>
        </div>

        {/* Grid หรือ Empty state */}
        {chickens.length === 0 ? (
          <div className="text-center bg-white border border-[#FCE3C7] rounded-3xl py-16 px-6">
            <div className="text-5xl mb-3">🪹</div>
            <p className="text-[#7A5C3E] font-bold">ยังไม่มีไก่ในชุมชนเลย</p>
            <p className="text-sm text-[#B99A72] mt-1">
              เป็นคนแรกที่เพิ่มไก่น้อยเข้าชมรมกันเถอะ
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {chickens.map((chiken) => (
              <div
                key={chiken.id}
                className="group bg-white rounded-3xl border border-[#FCE3C7] shadow-sm hover:shadow-lg transition-all overflow-hidden flex flex-col"
              >
                <Link href={`/community/${chiken.id}`} className="block">
                  <div className="h-44 bg-[#FFF1DF] overflow-hidden">
                    {chiken.picture ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={chiken.picture}
                        alt={chiken.chikenname}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-4xl">
                        🐔
                      </div>
                    )}
                  </div>
                </Link>
                <div className="p-5 flex flex-col flex-1">
                  <Link href={`/community/${chiken.id}`}>
                    <h3 className="font-extrabold text-[#5B3E22] text-lg">
                      {chiken.chikenname}
                    </h3>
                  </Link>
                  <p className="text-sm text-[#8A6B48] mt-1">
                    🎂 {chiken.chikenage} เดือน · 🧬 {chiken.chikentype}
                  </p>

                  {/* ปุ่มลิงก์ตรงไปช่องคอมเมนต์เลย */}
                  <div className="mt-4 flex gap-2">
                    <Link
                      href={`/community/${chiken.id}`}
                      className="flex-1 text-center text-xs font-bold text-[#D9762E] border border-[#F0955A]/30 rounded-full py-2 hover:bg-[#F0955A]/5 transition"
                    >
                      ดูรายละเอียด
                    </Link>
                    <Link
                      href={`/community/${chiken.id}#comments`}
                      className="flex-1 text-center text-xs font-bold text-white bg-gradient-to-r from-[#FFB25B] to-[#F0955A] rounded-full py-2 hover:-translate-y-0.5 transition-all"
                    >
                      💬 คอมเมนต์
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}