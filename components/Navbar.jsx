'use client';
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import ProfileModal from "./ProfileModal";
import { FaRegUser } from "react-icons/fa6";

const Navbar = () => {
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  // TODO: Implement actual user data fetching
  const userData = {
    name: "John Doe",
    email: "john@example.com",
    avatar: null // Will be implemented with actual user avatar
  };

  return (
    <nav className="fixed top-0 left-0 right-0 bg-[#f7f7f7] z-50">
      <div className="max-w-[2000px] mx-auto">
        <div className="flex items-center justify-between h-10 px-4">
          <Link href="/" className="flex items-center gap-2">
            <Image src="/logo/logo.png" alt="Sportz logo" width={22} height={22} className="object-contain" />
            <span className="text-[15px] font-medium text-gray-800">
              Sportzpoint <span className="text-gray-500">—</span> sports is life
            </span>
          </Link>

          {/* Profile Section */}
          <div className="flex items-center">
            <button 
              onClick={() => setIsProfileModalOpen(true)}
              className="flex items-center gap-2 hover:bg-gray-100 rounded-full p-1.5 transition-colors group"
            >
              <div className="w-7 h-7 rounded-full overflow-hidden bg-gray-100 ring-2 ring-gray-200">
                {userData.avatar ? (
                  <Image 
                    src={userData.avatar} 
                    alt="Profile" 
                    width={28} 
                    height={28} 
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <FaRegUser className="text-gray-400 text-sm" />
                  </div>
                )}
              </div>
              <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900">{userData.name}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Profile Modal */}
      <ProfileModal 
        isOpen={isProfileModalOpen} 
        onClose={() => setIsProfileModalOpen(false)}
        userData={userData}
      />
    </nav>
  );
};

export default Navbar;
