"use client";
import {
  MdKeyboardArrowLeft,
  MdKeyboardArrowRight,
  MdOutlinePermMedia,
} from "react-icons/md";
import { IoPricetagsOutline } from "react-icons/io5";
import { TbCategoryPlus } from "react-icons/tb";
import React, { useState } from "react";
import Link from "next/link";
import { FaHome, FaRegEdit, FaUsers, FaCog, FaRegUser } from "react-icons/fa";
import { motion } from "framer-motion";
import useSidebarStore from "@/store/useSidebarStore";
import ProfileModal from "./ProfileModal";

const Sidebar = () => {
  const { collapsed, toggleSidebar } = useSidebarStore();
  const [option, setOption] = useState("");
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);

  const menuItems = [
    { name: "Home", icon: FaHome, link: "/#" },
    { name: "Posts", icon: FaRegEdit, link: "/posts" },
    { name: "Media Library", icon: MdOutlinePermMedia, link: "/media" },
    { name: "Categories", icon: TbCategoryPlus, link: "/categories" },
    { name: "Tags", icon: IoPricetagsOutline, link: "/tags" },
    { name: "Configuration", icon: FaCog, link: "/configuration" },
    { name: "Team", icon: FaUsers, link: "/team" },
  ];

  return (
    <>
      <div
        className={`flex flex-col z-50 justify-between h-screen fixed bg-white border-r transition-all duration-300 ${
          collapsed ? "w-16" : "w-64"
        }`}
      >
        {/* Profile Section */}
        <div>
          <div
            className={`flex items-center gap-4 p-4 text-gray-700 hover:bg-blue-50 hover:text-blue-600 cursor-pointer border-b ${
              collapsed ? "justify-center" : "justify-start"
            }`}
            onClick={() => setIsProfileModalOpen(true)}
            onMouseEnter={() => setOption("Profile")}
            onMouseLeave={() => setOption("")}
          >
            <div className="text-xl">
              <FaRegUser size={16} />
            </div>
            <span
              className={`transition-opacity duration-300 ${
                collapsed ? "hidden w-0 overflow-hidden" : "opacity-100"
              }`}
            >
              Profile
            </span>
            {/* Tooltip for collapsed state */}
            {collapsed && option === "Profile" && (
              <motion.div
                initial={{ x: "-100%" }}
                animate={{ x: "0%" }}
                exit={{ x: "-100%" }}
                className="absolute left-16 px-2 tracking-wider bg-black text-white font-thin text-xs p-1 rounded shadow-md"
              >
                Profile
              </motion.div>
            )}
          </div>
        </div>

        {/* Menu Items */}
        <ul className="flex-1">
          {menuItems.map((item, index) => (
            <li
              key={index}
              className="relative"
              onMouseEnter={() => setOption(item.name)}
              onMouseLeave={() => setOption("")}
              onClick={() => toggleSidebar(true)}
            >
              <Link href={item.link}>
                <div
                  className={`flex items-center gap-4 px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 ${
                    collapsed ? "justify-center" : "justify-start"
                  }`}
                >
                  <div className="text-xl">
                    <item.icon size={16} />
                  </div>
                  <span
                    className={`transition-opacity duration-300 ${
                      collapsed ? "hidden w-0 overflow-hidden" : "opacity-100"
                    }`}
                  >
                    {item.name}
                  </span>
                </div>
                {/* Tooltip */}
                {collapsed && option === item.name && (
                  <motion.div
                    initial={{ x: "-100%" }}
                    animate={{ x: "0%" }}
                    exit={{ x: "-100%" }}
                    className="absolute left-16 px-2 tracking-wider bg-black text-white font-thin text-xs p-1 rounded shadow-md"
                  >
                    {option}
                  </motion.div>
                )}
              </Link>
            </li>
          ))}
        </ul>

        {/* Sidebar Toggle Button */}
        <button
          onClick={() => toggleSidebar(!collapsed)}
          className="p-4 text-gray-500 hover:text-gray-700"
          aria-label="Toggle Sidebar"
        >
          {collapsed ? (
            <MdKeyboardArrowRight size={26} />
          ) : (
            <div className="flex justify-center gap-1">
              <MdKeyboardArrowLeft size={25} /> Collapse
            </div>
          )}
        </button>
      </div>

      <ProfileModal 
        isOpen={isProfileModalOpen} 
        onClose={() => setIsProfileModalOpen(false)} 
      />
    </>
  );
};

export default Sidebar;
