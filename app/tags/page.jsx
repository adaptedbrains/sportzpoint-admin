"use client";
import { useState, useEffect, useMemo } from 'react';
import { FaEdit, FaTrash, FaPlus } from 'react-icons/fa';
import Cookies from 'js-cookie';
import useDropDownDataStore from '../../store/dropDownDataStore';
import SearchInput from '../../components/SearchInput';
import { toast } from 'react-hot-toast';

const TagsPage = () => {
  const { allTags, fetchDropDownData } = useDropDownDataStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [newTag, setNewTag] = useState({ name: '', description: '', slug: '', metaDescription: '' });
  const [editTag, setEditTag] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchDropDownData(`${process.env.NEXT_PUBLIC_API_URL}/tags`, 'tags');
  }, [fetchDropDownData]);

  const filteredTags = useMemo(() => {
    if (!searchQuery.trim()) return allTags;
    return allTags?.filter(tag => 
      tag.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tag.slug.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (tag.description && tag.description.toLowerCase().includes(searchQuery.toLowerCase()))
    );
  }, [allTags, searchQuery]);

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="bg-red-50 text-red-700 px-4 py-3 rounded-lg">
          {error}
        </div>
      </div>
    );
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/tags`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${Cookies.get('token')}`
        },
        body: JSON.stringify(newTag)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to create tag');
      }

      toast.success('Tag created successfully');
      setIsModalOpen(false);
      setNewTag({ name: '', description: '', slug: '', metaDescription: '' });
      fetchDropDownData(`${process.env.NEXT_PUBLIC_API_URL}/tags`, 'tags');
    } catch (err) {
      setError(err.message);
      toast.error(err.message || 'Failed to create tag');
    } finally {
      setLoading(false);
    }
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/tags/${editTag._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${Cookies.get('token')}`
        },
        body: JSON.stringify({
          name: editTag.name,
          description: editTag.description,
          slug: editTag.slug
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to update tag');
      }

      toast.success('Tag updated successfully');
      setEditTag(null);
      fetchDropDownData(`${process.env.NEXT_PUBLIC_API_URL}/tags`, 'tags');
    } catch (err) {
      setError(err.message);
      toast.error(err.message || 'Failed to update tag');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 pt-24">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-semibold text-gray-800">Tags</h1>
          <p className="text-sm text-gray-500 mt-1">Manage content tags and categories</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
        >
          <FaPlus className="w-4 h-4 mr-2" />
          Add Tag
        </button>
      </div>
      
      <div className="mb-4">
        <SearchInput
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onClear={() => setSearchQuery("")}
          placeholder="Search tags..."
        />
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full table-auto">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="text-left px-6 py-4 text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="text-left px-6 py-4 text-xs font-medium text-gray-500 uppercase tracking-wider">Slug</th>
                <th className="text-right px-6 py-4 text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredTags?.map((tag) => (
                <tr 
                  key={tag._id} 
                  className="hover:bg-gray-50 transition-colors duration-200"
                >
                  <td className="px-6 py-4 text-sm font-medium text-gray-900 whitespace-nowrap">
                    {tag.name}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">
                    {tag.slug}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    <button 
                      className="text-blue-600 hover:text-blue-700 p-1 rounded-full hover:bg-blue-50 transition-colors duration-200 mr-2"
                      title="Edit tag"
                    >
                      <FaEdit size={16} />
                    </button>
                    <button 
                      className="text-red-600 hover:text-red-700 p-1 rounded-full hover:bg-red-50 transition-colors duration-200"
                      title="Delete tag"
                    >
                      <FaTrash size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Tag Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-md relative">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Add New Tag</h2>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="text-gray-400 hover:text-gray-500 p-1 rounded-full hover:bg-gray-100 transition-colors duration-200"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Name
                </label>
                <input
                  type="text"
                  value={newTag.name}
                  onChange={(e) => setNewTag({ ...newTag, name: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-shadow duration-200"
                  placeholder="Enter tag name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Slug
                </label>
                <input
                  type="text"
                  value={newTag.slug}
                  onChange={(e) => setNewTag({ ...newTag, slug: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-shadow duration-200"
                  placeholder="Enter tag slug"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Meta Description
                </label>
                <textarea
                  value={newTag.metaDescription}
                  onChange={(e) => setNewTag({ ...newTag, metaDescription: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                  rows="3"
                  placeholder="Enter meta description for SEO purposes..."
                />
                <p className="mt-1 text-sm text-gray-500">
                  Brief description for SEO purposes. Recommended length: 150-160 characters.
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  value={newTag.description}
                  onChange={(e) => setNewTag({ ...newTag, description: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                  rows="3"
                  placeholder="Enter tag description..."
                />
              </div>
              {error && (
                <div className="text-red-500 text-sm mt-2">
                  {error}
                </div>
              )}
              <div className="flex justify-end gap-3 mt-6">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors duration-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className={`px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
                    loading ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                >
                  {loading ? 'Creating...' : 'Create Tag'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      
      {/* Edit Tag Modal */}
      {editTag && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Edit Tag</h3>
              <button
                onClick={() => setEditTag(null)}
                className="text-gray-400 hover:text-gray-500"
              >
                ×
              </button>
            </div>

            <form onSubmit={handleEditSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Name
                </label>
                <input
                  type="text"
                  value={editTag.name}
                  onChange={(e) => setEditTag({ ...editTag, name: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Slug
                </label>
                <input
                  type="text"
                  value={editTag.slug}
                  onChange={(e) => setEditTag({ ...editTag, slug: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  value={editTag.description || ''}
                  onChange={(e) => setEditTag({ ...editTag, description: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                  rows="3"
                  placeholder="Enter tag description..."
                />
              </div>
              {error && (
                <div className="text-red-500 text-sm mt-2">
                  {error}
                </div>
              )}
              <div className="flex justify-end gap-3 mt-6">
                <button
                  type="button"
                  onClick={() => setEditTag(null)}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className={`px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
                    loading ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                >
                  {loading ? 'Updating...' : 'Update Tag'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default TagsPage;