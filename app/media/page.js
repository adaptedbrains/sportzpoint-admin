"use client";
import { useState } from 'react';
import { FaUpload, FaSearch, FaEllipsisH } from 'react-icons/fa';
import { BsGrid, BsList } from 'react-icons/bs';
import Image from 'next/image';

const MediaLibrary = () => {
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState('all');
  const [viewType, setViewType] = useState('grid'); // 'grid' or 'list'

  // Using placeholder images from picsum.photos with sports-related images
  const mediaItems = [
    {
      id: 1,
      type: 'image',
      url: 'https://picsum.photos/seed/sports1/400/400',
      title: 'Match Highlight 1',
      date: '2024-02-20',
      size: '2.4 MB'
    },
    {
      id: 2,
      url: 'https://picsum.photos/seed/sports2/400/400',
      title: 'Player Portrait',
      date: '2024-02-19',
      size: '1.8 MB'
    },
    {
      id: 3,
      url: 'https://picsum.photos/seed/sports3/400/400',
      title: 'Stadium Aerial',
      date: '2024-02-18',
      size: '3.2 MB'
    },
    {
      id: 4,
      url: 'https://picsum.photos/seed/sports4/400/400',
      title: 'Team Celebration',
      date: '2024-02-17',
      size: '2.1 MB'
    },
    {
      id: 5,
      url: 'https://picsum.photos/seed/sports5/400/400',
      title: 'Press Conference',
      date: '2024-02-16',
      size: '1.9 MB'
    },
    {
      id: 6,
      url: 'https://picsum.photos/seed/sports6/400/400',
      title: 'Training Session',
      date: '2024-02-15',
      size: '2.7 MB'
    },
  ];

  return (
    <div className="flex justify-center min-h-screen bg-gray-50 pt-20 pb-6">
      <div className="w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <div>
            <h1 className="text-xl font-semibold text-gray-800">Media Library</h1>
            <p className="text-sm text-gray-600 mt-1">Manage your media files</p>
          </div>
          
          <div className="flex gap-3">
            <div className="relative">
              <input
                type="text"
                placeholder="Search media..."
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full sm:w-64"
              />
              <FaSearch className="absolute left-3 top-3 text-gray-400" />
            </div>
            
            <button 
              onClick={() => setIsUploadModalOpen(true)}
              className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700 transition-colors duration-200 shadow-sm flex items-center gap-2"
            >
              <FaUpload size={14} />
              Upload
            </button>
          </div>
        </div>

        {/* Toolbar */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex gap-4">
            <button 
              onClick={() => setActiveFilter('all')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 
                ${activeFilter === 'all' ? 'bg-blue-100 text-blue-700' : 'text-gray-600 hover:bg-gray-100'}`}
            >
              All Media
            </button>
            <button 
              onClick={() => setActiveFilter('images')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 
                ${activeFilter === 'images' ? 'bg-blue-100 text-blue-700' : 'text-gray-600 hover:bg-gray-100'}`}
            >
              Images
            </button>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => setViewType('grid')}
              className={`p-2 rounded ${viewType === 'grid' ? 'bg-gray-200' : 'hover:bg-gray-100'}`}
            >
              <BsGrid size={20} />
            </button>
            <button
              onClick={() => setViewType('list')}
              className={`p-2 rounded ${viewType === 'list' ? 'bg-gray-200' : 'hover:bg-gray-100'}`}
            >
              <BsList size={20} />
            </button>
          </div>
        </div>

        {/* Gallery Grid */}
        <div className={`${viewType === 'grid' 
          ? 'grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4' 
          : 'space-y-2'}`}>
          {mediaItems.map((item) => (
            viewType === 'grid' ? (
              // Grid View
              <div 
                key={item.id} 
                className="group relative bg-white rounded-lg overflow-hidden border border-gray-200 hover:border-blue-500 transition-all duration-200"
              >
                <div className="aspect-square relative">
                  <Image
                    src={item.url}
                    alt={item.title}
                    width={300}
                    height={200}
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-30 transition-opacity duration-200" />
                  <button className="absolute top-2 right-2 p-1.5 bg-white rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <FaEllipsisH className="text-gray-600" size={14} />
                  </button>
                </div>
                <div className="p-3">
                  <h3 className="text-sm font-medium text-gray-800 truncate">{item.title}</h3>
                  <p className="text-xs text-gray-500 mt-1">{item.size}</p>
                </div>
              </div>
            ) : (
              // List View
              <div 
                key={item.id}
                className="flex items-center space-x-4 p-3 bg-white rounded-lg border border-gray-200 hover:border-blue-500 transition-all duration-200"
              >
                <div className="aspect-square w-16 h-16">
                  <img
                    src={item.url}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex flex-col">
                  <h3 className="text-sm font-medium text-gray-800 truncate">{item.title}</h3>
                  <p className="text-xs text-gray-500 mt-1">{item.size}</p>
                </div>
              </div>
            )
          ))}
        </div>

        {/* Upload Modal */}
        {isUploadModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Upload Media</h2>
                <button 
                  onClick={() => setIsUploadModalOpen(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ×
                </button>
              </div>

              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                <div className="flex flex-col items-center">
                  <FaUpload className="text-gray-400 mb-3" size={24} />
                  <p className="text-gray-600 mb-2">Drag and drop files here</p>
                  <p className="text-gray-500 text-sm mb-4">or</p>
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700 transition-colors duration-200">
                    Browse Files
                  </button>
                </div>
              </div>

              <div className="flex justify-end gap-3 mt-6">
                <button
                  onClick={() => setIsUploadModalOpen(false)}
                  className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md transition-colors duration-200"
                >
                  Cancel
                </button>
                <button
                  className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700 transition-colors duration-200"
                >
                  Upload
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MediaLibrary; 