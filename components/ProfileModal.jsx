'use client';
import React, { useState } from 'react';
import { FaUserCircle, FaTimes, FaCamera } from 'react-icons/fa';
import Image from 'next/image';
import { toast } from 'react-hot-toast';

const ProfileModal = ({ isOpen, onClose }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [avatar, setAvatar] = useState(null);
  const [formData, setFormData] = useState({
    name: 'John Doe',
    email: 'john@example.com',
  });

  const userId = localStorage.getItem('userId') || '';

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error('Image size should be less than 5MB');
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatar(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!userId) {
      toast.error('User ID not found');
      return;
    }

    try {
      setIsLoading(true);
      
      const formDataToSend = new FormData();
      formDataToSend.append('name', formData.name);
      formDataToSend.append('email', formData.email);
      
      if (avatar) {
        const response = await fetch(avatar);
        const blob = await response.blob();
        formDataToSend.append('avatar', blob, 'profile-image.jpg');
      }

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/team-members/update/${userId}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: formDataToSend,
      });

      if (!response.ok) {
        throw new Error('Failed to update profile');
      }

      const data = await response.json();
      toast.success('Profile updated successfully');
      onClose();
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error(error.message || 'Failed to update profile');
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-[100] flex items-center justify-center">
      <div className="bg-white rounded-lg w-full max-w-md p-6 relative">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-400 hover:text-gray-600"
        >
          <FaTimes size={20} />
        </button>

        <h2 className="text-xl font-semibold mb-6">Profile Settings</h2>

        <form onSubmit={handleSubmit}>
          {/* Avatar */}
          <div className="flex justify-center mb-6">
            <div className="relative">
              {avatar ? (
                <Image
                  src={avatar}
                  alt="Profile"
                  width={100}
                  height={100}
                  className="rounded-full object-cover"
                />
              ) : (
                <FaUserCircle size={100} className="text-gray-400" />
              )}
              <label className="absolute bottom-0 right-0 bg-white rounded-full p-2 shadow-md cursor-pointer hover:bg-gray-50">
                <FaCamera className="text-gray-600" size={16} />
                <input
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={handleAvatarChange}
                />
              </label>
            </div>
          </div>

          {/* Form Fields */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded-md focus:ring-1 focus:ring-green-500 focus:border-green-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded-md focus:ring-1 focus:ring-green-500 focus:border-green-500"
                required
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-3 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-md"
              disabled={isLoading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:bg-green-400"
              disabled={isLoading}
            >
              {isLoading ? 'Updating...' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfileModal; 