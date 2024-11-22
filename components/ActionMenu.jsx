import { useState, useEffect, useRef } from "react";
import {
  FaEdit,
  FaLink,
  FaBell,
  FaShareAlt,
  FaEnvelope,
  FaBan,
  FaTrash,
} from "react-icons/fa";

function ActionMenu({ actionText }) {
  const menuRef = useRef(null);

  // Close the menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        actionText(""); // Call actionText function with an empty string
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [actionText]);

  return (
    <div className="relative inline-block" ref={menuRef}>
      {/* Toggle Button */}

      {/* Dropdown Menu */}

      <div className="absolute right-0 mt-2 w-48 bg-white shadow-md rounded-md z-10 text-xs">
        <ul>
          <li className="py-2 px-4 hover:bg-gray-100 hover:text-blue-700">
            <a href="#" className="flex group items-center">
              <FaEdit className="w-3 h-3 transition-all duration-100 mr-2" />
              Create AI Web Story
            </a>
          </li>
          <li className="py-2 px-4 hover:bg-gray-100 hover:text-blue-700">
            <a href="#" className="flex group items-center">
              <FaLink className="w-3 h-3 transition-all duration-100 mr-2" />
              Edit Permalink
            </a>
          </li>
          <li className="py-2 px-4 hover:bg-gray-100 hover:text-blue-700">
            <a href="#" className="flex group items-center">
              <FaBell className="w-3 h-3 transition-all duration-100 mr-2" />
              Push Notification
            </a>
          </li>
          <li className="py-2 px-4 hover:bg-gray-100 hover:text-blue-700">
            <a href="#" className="flex group items-center">
              <FaShareAlt className="w-3 h-3 transition-all duration-100 mr-2" />
              Distribute Post
            </a>
          </li>
          <li className="py-2 px-4 hover:bg-gray-100 hover:text-blue-700">
            <a href="#" className="flex group items-center">
              <FaEnvelope className="w-3 h-3 transition-all duration-100 mr-2" />
              Send Newsletter
            </a>
          </li>
          <li className="py-2 px-4 hover:bg-gray-100 hover:text-blue-700">
            <a href="#" className="flex group items-center">
              <FaBan className="w-3 h-3 transition-all duration-100 mr-2" />
              Unpublish
            </a>
          </li>
          <li className="py-2 px-4 hover:bg-gray-100 hover:text-blue-700">
            <a href="#" className="flex group items-center">
              <FaTrash className="w-3 h-3 transition-all duration-100 mr-2" />
              Delete
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default ActionMenu;
