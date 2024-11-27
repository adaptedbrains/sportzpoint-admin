'use client';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { MoreHorizontal, Pin, Edit, Trash, X } from 'lucide-react';
import RichTextEditor from './RichTextEditor';

const LiveBlogUpdateModal = ({ isOpen, onClose, blogId }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [updates, setUpdates] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [showDropdown, setShowDropdown] = useState(null);

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
          `${process.env.NEXT_PUBLIC_API_URL}/posts/${blogId}/live-blog/update/${editingId}`,
          { title, content }
        );
      } else {
        await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/posts/${blogId}/live-blog/update`,
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

  const handlePin = async (updateId) => {
    try {
      await axios.put(
        `${process.env.NEXT_PUBLIC_API_URL}/liveblogs/${blogId}/updates/${updateId}/pin`
      );
      fetchPreviousUpdates();
    } catch (error) {
      console.error('Error pinning update:', error);
    }
  };

  const handleDelete = async (updateId) => {
    if (window.confirm('Are you sure you want to delete this update?')) {
      try {
        await axios.delete(
          `${process.env.NEXT_PUBLIC_API_URL}/liveblogs/${blogId}/updates/${updateId}`
        );
        fetchPreviousUpdates();
      } catch (error) {
        console.error('Error deleting update:', error);
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-[800px] max-h-[90vh] overflow-y-auto">
        <div className="p-4 border-b flex justify-between items-center sticky top-0 bg-white z-10">
          <div>
            <h2 className="text-lg font-medium">Update Live Blog</h2>
            <p className="text-sm text-gray-500">Make changes to your post here.</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <X className="h-5 w-5 text-gray-500" />
          </button>
        </div>

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
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Content
              </label>
              <div className="border rounded-md">
                <RichTextEditor
                  content={content}
                  htmlContentGrab={(newContent) => setContent(newContent)}
                />
              </div>
            </div>
          </div>

          <div className="mt-6 border-t pt-6">
            <h3 className="text-lg font-medium mb-4">Previous Updates</h3>
            <div className="max-h-[300px] overflow-y-auto border rounded-lg">
              {updates.map((update) => (
                <div key={update._id} className="p-4 border-b last:border-b-0 hover:bg-gray-50">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h4 className="font-medium flex items-center">
                        {update.title}
                        {update.isPinned && <Pin className="ml-2 h-4 w-4 text-blue-500" />}
                      </h4>
                      <p className="text-sm text-gray-500">
                        {new Date(update.created_at).toLocaleString()}
                      </p>
                      <div className="mt-2 prose prose-sm max-w-none" dangerouslySetInnerHTML={{ __html: update.content }} />
                    </div>
                    <div className="relative">
                      <button
                        type="button"
                        onClick={() => setShowDropdown(showDropdown === update._id ? null : update._id)}
                        className="p-2 hover:bg-gray-100 rounded-full"
                      >
                        <MoreHorizontal className="h-4 w-4" />
                      </button>
                      
                      {showDropdown === update._id && (
                        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg border z-10">
                          <div className="py-1">
                            <button
                              type="button"
                              onClick={() => {
                                setTitle(update.title);
                                setContent(update.content);
                                setEditingId(update._id);
                                setShowDropdown(null);
                              }}
                              className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            >
                              <Edit className="mr-2 h-4 w-4" />
                              <span>Edit</span>
                            </button>
                            <button
                              type="button"
                              onClick={() => {
                                handleDelete(update._id);
                                setShowDropdown(null);
                              }}
                              className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            >
                              <Trash className="mr-2 h-4 w-4" />
                              <span>Delete</span>
                            </button>
                            <button
                              type="button"
                              onClick={() => {
                                handlePin(update._id);
                                setShowDropdown(null);
                              }}
                              className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            >
                              <Pin className="mr-2 h-4 w-4" />
                              <span>{update.isPinned ? 'Unpin' : 'Pin'}</span>
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 flex justify-end gap-2 sticky bottom-0 bg-white py-4 border-t">
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