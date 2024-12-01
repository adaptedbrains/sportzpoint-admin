'use client';
import Image from "next/image";
import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 bg-[#f7f7f7] z-50">
      <div className="max-w-[2000px] mx-auto">
        <div className="flex items-center h-10 px-4">
          <Link href="/" className="flex items-center gap-2">
            <Image src="/logo/logo.png" alt="Sportz logo" width={22} height={22} className="object-contain" />
            <span className="text-[15px] font-medium text-gray-800">
              Sportzpoint <span className="text-gray-500">—</span> sports is life
            </span>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
