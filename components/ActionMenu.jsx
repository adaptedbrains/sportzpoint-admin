import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Cookies from 'js-cookie';

import {
  FaEdit,
  FaLink,
  FaBell,
  FaShareAlt,
  FaEnvelope,
  FaBan,
  FaTrash,
} from "react-icons/fa";

function ActionMenu({ actionText, id, type }) {
  const token = Cookies.get('token');
 const router=useRouter()
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
            <button
              type="button"
              className="flex group items-center"
              // onClick={async () => {
              //   try {
                  
              //     if (!token) {
              //       throw new Error("No token found in cookies");
              //     }

              //     // Assuming post._id is the ID of the article you're deleting
                 

              //     // API URL for the delete request
              //     const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/article/delete/${id}`;

              //     // Make DELETE request
              //     const response = await fetch(apiUrl, {
              //       method: "DELETE",
              //       headers: {
              //         "Content-Type": "application/json",
              //         Authorization: `Bearer ${token}`,
              //       },
              //     });

              //     if (!response.ok) {
              //       throw new Error("Failed to delete article");
              //     }

              //     const data = await response.json();
              //     alert("Article deleted successfully");

                 
              //     router.push(`${process.env.NEXT_PUBLIC_API_URL}/posts/article`)

              //   } catch (error) {
              //     console.log(error);
                  
              //     alert("Error deleting article: " + error.message);
              //   }
              // }}
            >
              <FaTrash className="w-3 h-3 transition-all duration-100 mr-2" />
              Delete
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default ActionMenu;
