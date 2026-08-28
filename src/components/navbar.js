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
  { href: "/services", label: "บริการของเรา" },
  { href: "/community", label: "ชุมชนไก่แจ้" },
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
              // ใช้ startsWith เพื่อให้เมนู "ชุมชนไก่แจ้" ยัง active
              // อยู่ตอนเข้าไปดูหน้ารายละเอียดไก่ (/community/[id]) ด้วย
              const active =
                link.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(link.href);
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

          {/* ปุ่มเพิ่มไก่แยกเด่นออกมา */}
          <Link
            href="/register"
            className={`${baloo.className} hidden sm:inline-block px-4 py-1.5 rounded-full bg-white text-[#D9762E] text-sm shadow-sm hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 transition-all`}
          >
            เพิ่มไก่ 💛
          </Link>
        </div>
      </div>
    </nav>
  );
}