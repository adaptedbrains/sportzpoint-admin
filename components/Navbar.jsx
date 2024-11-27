'use client';
import { FaPlus, FaUserCircle } from "react-icons/fa";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from 'next/navigation';
import ProfileModal from "./ProfileModal";

const Navbar = () => {
  const router = useRouter();
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [userData, setUserData] = useState(null);
  
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('token');
        const userId = localStorage.getItem('userId');
        
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/${userId}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        
        if (!response.ok) throw new Error('Failed to fetch user data');
        const data = await response.json();
        setUserData(data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  const handleLogout = async () => {
    try {
      const token = localStorage.getItem('token');
      
      // Optional: Call logout endpoint if you have one
      // const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/logout`, {
      //   method: 'POST',
      //   headers: {
      //     'Authorization': `Bearer ${token}`
      //   }
      // });

      // Clear all auth-related data from localStorage
      localStorage.removeItem('token');
      localStorage.removeItem('userId');
      
      // Clear any other auth-related data you might have
      sessionStorage.clear();
      
      // Redirect to login page
      router.push('/login');
      
      // Optional: Force reload to clear any cached data
      // router.refresh();
      
    } catch (error) {
      console.error('Logout error:', error);
      // Fallback: force redirect to login
      router.push('/login');
    }
  };

  return (
    <>
      <nav className="flex justify-between items-center px-10 bg-white py-2 z-50 shadow fixed top-0 start-0 w-full">
        <div className="logo font-bold text-xl flex items-center gap-1">
          <Image src={"/logo/logo.png"} alt="Sportz logo" width={25} height={20} />
          <h1>Sportz</h1>
        </div>
        <div className="leftSide flex items-center gap-5">
          <Link 
            href="/posts/article"
            className="plus p-2 rounded-lg cursor-pointer hover:bg-blue-100 hover:text-blue-600 text-gray-700 transition duration-200"
          >
            <FaPlus size={15} />
          </Link>
          <div className="relative">
            <button 
              onClick={() => setShowProfileMenu(!showProfileMenu)}
              className="p-2 rounded-lg cursor-pointer hover:bg-blue-100 hover:text-blue-600 text-gray-700 transition duration-200"
            >
              {userData?.avatar ? (
                <Image
                  src={userData.avatar}
                  alt="Profile"
                  width={18}
                  height={18}
                  className="rounded-full"
                />
              ) : (
                <FaUserCircle size={18} />
              )}
            </button>
            
            {showProfileMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 border border-gray-200">
                <button
                  onClick={() => {
                    setShowProfileModal(true);
                    setShowProfileMenu(false);
                  }}
                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-blue-100 hover:text-blue-600"
                >
                  Edit Profile
                </button>
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-blue-100 hover:text-blue-600"
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>
        </div>
      </nav>

      <ProfileModal
        isOpen={showProfileModal}
        onClose={() => setShowProfileModal(false)}
        userData={userData}
      />
    </>
  );
};

export default Navbar;
