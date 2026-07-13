"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

  if (pathname === "/register") {
    return null;
  }

  return (
    <nav className="bg-blue-600 text-white shadow">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">

          {/* Logo */}
          <Link href="/" className="text-xl font-bold">
            MyWebsite
          </Link>

          {/* Menu */}
          <div className="flex gap-6">
            <Link
              href="/"
              className="hover:text-yellow-300 transition"
            >
              หน้าแรก
            </Link>

            <Link
              href="/about"
              className="hover:text-yellow-300 transition"
            >
              เกี่ยวกับ
            </Link>

            <Link
              href="/service"
              className="hover:text-yellow-300 transition"
            >
              บริการของเรา
            </Link>

            <Link
              href="/contact"
              className="hover:text-yellow-300 transition"
            >
              ติดต่อ
            </Link>

                        <Link
              href="/register"
              className="hover:text-yellow-300 transition"
            >
              สมัครสมาชิก
            </Link>

          </div>

        </div>
      </div>
    </nav>
  );
}