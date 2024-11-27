'use client';
import { useState, useEffect } from 'react';
import axios from 'axios';

const LiveBlogUpdateModal = ({ isOpen, onClose, blogId }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [updates, setUpdates] = useState([]);
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    if (isOpen && blogId) {
      fetchPreviousUpdates();
    }
  }, [isOpen, blogId]);

  const fetchPreviousUpdates = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/liveblogs/${blogId}/updates`
      );
      setUpdates(response.data.updates || []);
    } catch (error) {
      console.error('Error fetching updates:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await axios.put(
          `${process.env.NEXT_PUBLIC_API_URL}/liveblogs/${blogId}/updates/${editingId}`,
          { title, content }
        );
      } else {
        await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/liveblogs/${blogId}/updates`,
          { title, content }
        );
      }
      setTitle('');
      setContent('');
      setEditingId(null);
      fetchPreviousUpdates();
    } catch (error) {
      console.error('Error saving update:', error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-[625px] max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="p-4 border-b">
          <h2 className="text-lg font-medium">Update Live Blog</h2>
          <p className="text-sm text-gray-500">Make changes to your post here.</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-4">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Title
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Content
              </label>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 h-32"
                required
              />
            </div>
          </div>

          {/* Previous Updates */}
          <div className="mt-6">
            <h3 className="text-sm font-medium text-gray-700 mb-2">Previous Updates</h3>
            <div className="border rounded-md h-[200px] overflow-y-auto">
              {updates.map((update) => (
                <div
                  key={update._id}
                  className="p-3 border-b last:border-b-0 hover:bg-gray-50"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-medium">{update.title}</h4>
                      <p className="text-sm text-gray-500">
                        {new Date(update.created_at).toLocaleString()}
                      </p>
                      <p className="mt-1 text-sm">{update.content}</p>
                    </div>
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => {
                          setTitle(update.title);
                          setContent(update.content);
                          setEditingId(update._id);
                        }}
                        className="text-blue-600 hover:bg-blue-50 p-1 rounded"
                      >
                        Edit
                      </button>
                      <button
                        type="button"
                        onClick={async () => {
                          if (window.confirm('Are you sure you want to delete this update?')) {
                            try {
                              await axios.delete(
                                `${process.env.NEXT_PUBLIC_API_URL}/liveblogs/${blogId}/updates/${update._id}`
                              );
                              fetchPreviousUpdates();
                            } catch (error) {
                              console.error('Error deleting update:', error);
                            }
                          }
                        }}
                        className="text-red-600 hover:bg-red-50 p-1 rounded"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Footer */}
          <div className="mt-6 flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm text-white bg-blue-600 hover:bg-blue-700 rounded-md"
            >
              {editingId ? 'Update' : 'Save'} changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LiveBlogUpdateModal; 