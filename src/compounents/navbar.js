"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Baloo_2 } from "next/font/google";

const baloo = Baloo_2({
  subsets: ["thai", "latin"],
  weight: ["600", "700"],
});

const links = [
  { href: "/", label: "หน้าแรก" },
  { href: "/about", label: "เกี่ยวกับ" },
  { href: "/service", label: "บริการของเรา" },
  { href: "/chikens", label: "ไก่ของเรา" }, // เตรียมไว้สำหรับหน้าที่ดึงข้อมูลด้วย GET
  { href: "/contact", label: "ติดต่อ" },
];

export default function Navbar() {
  const pathname = usePathname();

  if (pathname === "/register") {
    return null;
  }

  return (
    <nav className="bg-gradient-to-r from-[#FFB25B] to-[#F0955A] text-white shadow-md shadow-[#F0955A]/20">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link
            href="/"
            className={`${baloo.className} text-xl flex items-center gap-1.5`}
          >
            <span>🐔</span>
            <span>MyChiken</span>
          </Link>

          {/* Menu */}
          <div className="flex gap-1">
            {links.map((link) => {
              const active = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-3 py-1.5 rounded-full text-sm font-medium transition ${
                    active
                      ? "bg-white text-[#D9762E]"
                      : "text-[#FFF1DF] hover:bg-white/15 hover:text-white"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>

          {/* ปุ่มสมัครสมาชิกแยกเด่นออกมา */}
          <Link
            href="/chiken"
            className={`${baloo.className} hidden sm:inline-block px-4 py-1.5 rounded-full bg-white text-[#D9762E] text-sm shadow-sm hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 transition-all`}
          >
            สมัครสมาชิก 💛
          </Link>
        </div>
      </div>
    </nav>
  );
}