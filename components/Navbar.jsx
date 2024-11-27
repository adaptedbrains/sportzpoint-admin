'use client';
import Image from "next/image";
import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="flex justify-between items-center px-10 bg-white py-2 z-50 shadow fixed top-0 start-0 w-full">
      <Link href="/" className="logo font-bold text-xl flex items-center gap-1">
        <Image src={"/logo/logo.png"} alt="Sportz logo" width={25} height={20} />
        <h1>Sportz</h1>
      </Link>
    </nav>
  );
};

export default Navbar;
