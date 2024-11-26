import { FaPlus, FaUserCircle } from "react-icons/fa";
import React, { useState } from "react";
import Image from "next/image";
import ProfileModal from "./ProfileModal";

const Navbar = () => {
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);

  return (
    <>
      <nav className="flex justify-between items-center px-10 bg-white py-2 z-50 shadow fixed top-0 start-0 w-full">
        <div className="logo font-bold text-xl flex items-center gap-1">
          <Image src={"/logo/logo.png"} alt="Sportz logo" width={25} height={20} />
          <h1>Sportz</h1>
        </div>
        <div className="leftSide flex items-center gap-5">
          <div className="plus bg-green-800 p-1 rounded cursor-pointer hover:bg-green-700 transition duration-200">
            <FaPlus size={15} color="white" />
          </div>
          <div 
            className="user cursor-pointer hover:text-green-600 transition duration-200"
            onClick={() => setIsProfileModalOpen(true)}
          >
            <FaUserCircle size={22} color="green" />
          </div>
        </div>
      </nav>

      <ProfileModal 
        isOpen={isProfileModalOpen} 
        onClose={() => setIsProfileModalOpen(false)} 
      />
    </>
  );
};

export default Navbar;
