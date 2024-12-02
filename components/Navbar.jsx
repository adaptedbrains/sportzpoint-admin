'use client';
import { useState, useEffect } from 'react';
import Image from "next/image";
import Link from "next/link";
import { FaUserCircle } from 'react-icons/fa';
import ProfileModal from './ProfileModal';
import Cookies from 'js-cookie';

const Navbar = () => {
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = Cookies.get('token');
        const userId = localStorage.getItem('id');
        
        if (!token || !userId) {
          console.error('No token or userId found');
          return;
        }

        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/${userId}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (!response.ok) {
          throw new Error('Failed to fetch user data');
        }

        const data = await response.json();
        setUserData(data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

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
              className="flex items-center gap-2 px-2 py-1 rounded-lg hover:bg-gray-200 transition-colors"
            >
              {userData?.avatar ? (
                <Image
                  src={userData.avatar}
                  alt="Profile"
                  width={24}
                  height={24}
                  className="rounded-full"
                />
              ) : (
                <FaUserCircle className="w-6 h-6 text-gray-600" />
              )}
              <span className="text-sm font-medium text-gray-700">
                {userData?.name || 'Loading...'}
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Profile Modal */}
      <ProfileModal
        isOpen={isProfileModalOpen}
        onClose={() => {
          setIsProfileModalOpen(false);
          // Refresh user data when modal closes
          const userId = localStorage.getItem('id');
          if (userId) {
            const token = Cookies.get('token');
            fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/${userId}`, {
              headers: {
                'Authorization': `Bearer ${token}`
              }
            })
              .then(res => res.json())
              .then(data => setUserData(data))
              .catch(console.error);
          }
        }}
        userData={userData}
      />
    </nav>
  );
};

export default Navbar;
