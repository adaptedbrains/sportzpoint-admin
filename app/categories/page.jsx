"use client";
import { useState } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';

const CategoriesPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [categories, setCategories] = useState([
    { 
      id: 1, 
      name: 'International Cricket', 
      slug: 'international-cricket',
      description: 'International cricket matches and tournaments',
      postCount: 45
    },
    { 
      id: 2, 
      name: 'Premier League', 
      slug: 'premier-league',
      description: 'English Premier League football coverage',
      postCount: 32
    },
    { 
      id: 3, 
      name: 'Grand Slam', 
      slug: 'grand-slam',
      description: 'Tennis Grand Slam tournaments',
      postCount: 28
    },
    { 
      id: 4, 
      name: 'NBA', 
      slug: 'nba',
      description: 'National Basketball Association news',
      postCount: 23
    },
    { 
      id: 5, 
      name: 'Formula 1', 
      slug: 'formula-1',
      description: 'Formula 1 racing championships',
      postCount: 19
    },
  ]);

  return (
    <div className="flex justify-center min-h-screen bg-gray-50 pt-20 pb-6">
      <div className="w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h1 className="text-xl font-semibold text-gray-800">Categories</h1>
            <p className="text-sm text-gray-600 mt-1">Manage your content categories</p>
          </div>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700 transition-colors duration-200 shadow-sm"
          >
            Add Category
          </button>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 mt-2">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left px-6 py-4 text-sm font-medium text-gray-500">Name</th>
                  <th className="text-left px-6 py-4 text-sm font-medium text-gray-500">Description</th>
                  <th className="text-center px-6 py-4 text-sm font-medium text-gray-500">Posts</th>
                  <th className="text-right px-6 py-4 text-sm font-medium text-gray-500">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {categories.map((category) => (
                  <tr 
                    key={category.id} 
                    className="hover:bg-gray-50 transition-colors duration-200"
                  >
                    <td className="px-6 py-4 text-sm text-gray-700">
                      <div className="font-medium">{category.name}</div>
                      <div className="text-gray-500 text-xs">{category.slug}</div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700">
                      {category.description}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700 text-center">
                      <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                        {category.postCount}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm whitespace-nowrap text-right">
                      <button className="text-blue-600 hover:text-blue-700 mr-3">
                        <FaEdit size={16} />
                      </button>
                      <button className="text-red-600 hover:text-red-700">
                        <FaTrash size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Add Category Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Add New Category</h2>
                <button 
                  onClick={() => setIsModalOpen(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ×
                </button>
              </div>

              <form className="space-y-4">
                {/* Name Input */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Name
                  </label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter category name"
                  />
                </div>

                {/* Slug Input */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Slug
                  </label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="enter-slug"
                  />
                </div>

                {/* Description Input */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description
                  </label>
                  <textarea
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    rows="3"
                    placeholder="Enter category description"
                  ></textarea>
                </div>

                {/* Submit Buttons */}
                <div className="flex justify-end gap-3 mt-6">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md transition-colors duration-200"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700 transition-colors duration-200"
                  >
                    Add Category
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoriesPage; 