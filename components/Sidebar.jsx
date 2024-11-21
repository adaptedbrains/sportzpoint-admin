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
import { FaHome, FaRegEdit, FaUsers, FaCog } from "react-icons/fa";
import { motion } from "framer-motion";

const Sidebar = ({toggleSidebar,collapsed}) => {
  const [option, setOption] = useState("");

  

  const menuItems = [
    { name: "Home", icon: FaHome, link: "/#" },
    { name: "Posts", icon: FaRegEdit, link: "/posts" },
    { name: "Media Library", icon: MdOutlinePermMedia, link: "/#" },
    { name: "Categories", icon: TbCategoryPlus, link: "/#" },
    { name: "Tags", icon: IoPricetagsOutline, link: "/#" },
    { name: "Configuration", icon: FaCog, link: "/#" },
  ];

  return (
    <div
      className={`flex flex-col z-50 justify-between h-[95vh] top-11 fixed bg-white border-r transition-all duration-300 ${
        collapsed ? "w-16" : "w-64"
      }`}
    >
      {/* Menu Items */}
      <ul className={`mt-4 space-y-2 px-2`}>
        {menuItems.map((item, index) => (
          <li
            key={index}
            className="relative"
            onMouseEnter={() => setOption(item.name)}
            onMouseLeave={() => setOption("")}
          >
            <Link href={item.link}>
              <div
                className={`flex items-center gap-4 px-4 py-2 text-gray-700 rounded hover:bg-blue-100 hover:text-blue-600 ${
                  collapsed ? "justify-center" : "justify-start"
                }`}
              >
                <div className="text-xl hover:text-blue-600">
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
              {/* Tooltip with animation */}
              {collapsed && option === item.name && (
                <motion.div
                  initial={{ x: "-100%" }}
                  animate={{ x: "0%" }}
                  exit={{ x: "-100%" }}
                  className="absolute bottom-0 start-16 px-2 tracking-wider bg-black text-white font-thin text-xs p-1 rounded shadow-md"
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
        onClick={toggleSidebar}
        className="p-4 text-gray-500 hover:text-gray-700"
        aria-label="Toggle Sidebar"
      >
        {collapsed ? (
          <MdKeyboardArrowRight size={26} color="black" />
        ) : (
          <div className="flex justify-center gap-1">
            <MdKeyboardArrowLeft size={25} color="black" /> Collapse
          </div>
        )}
      </button>
    </div>
  );
};

export default Sidebar;
