'use client';
import React, { useEffect, useState } from 'react';
import { format } from 'date-fns';
import { FaEdit, FaSpinner, FaPencilAlt } from 'react-icons/fa';
import Link from 'next/link';
import { toast } from 'react-hot-toast';

const DraftPosts = () => {
  const [drafts, setDrafts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchDrafts();
  }, []);

  const fetchDrafts = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No authentication token found');
      }

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/my-posts?status=draft`,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      if (!response.ok) {
        throw new Error('Failed to fetch drafts');
      }

      const data = await response.json();
      setDrafts(data.posts || []);
    } catch (err) {
      console.error('Error fetching drafts:', err);
      setError(err.message);
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex justify-center items-center h-32">
          <FaSpinner className="animate-spin text-green-600 text-xl" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="text-center text-gray-500">
          Failed to load drafts. Please try again later.
        </div>
      </div>
    );
  }

  if (drafts.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-sm p-8">
        <div className="text-center">
          <h3 className="text-lg font-medium text-gray-900 mb-2">No drafts yet</h3>
          <p className="text-gray-500 mb-4">Start creating your first post</p>
          <Link 
            href="/posts/article/new"
            className="inline-flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm"
          >
            <FaPencilAlt size={12} />
            <span>Create New Post</span>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm">
      <div className="p-6">
        <h2 className="text-lg font-medium text-gray-900 mb-6">Recent Drafts</h2>
        
        <div className="space-y-4">
          {drafts.map((draft) => (
            <div 
              key={draft._id}
              className="flex items-center justify-between p-4 rounded-lg border border-gray-100 hover:border-gray-200 transition-colors"
            >
              <div className="flex items-center gap-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-900 mb-1">
                    {draft.title || 'Untitled'}
                  </h3>
                  <div className="flex items-center gap-3 text-sm text-gray-500">
                    <span className="px-2 py-1 bg-green-50 text-green-700 rounded-md text-xs">
                      {draft.type}
                    </span>
                    <span>•</span>
                    <span>
                      Last edited {format(new Date(draft.updatedAt), 'MMM dd, yyyy')}
                    </span>
                  </div>
                </div>
              </div>
              
              <Link
                href={`/posts/${draft.type.toLowerCase()}/edit/${draft._id}`}
                className="p-2 text-gray-400 hover:text-green-600 rounded-lg hover:bg-green-50 transition-colors"
              >
                <FaEdit size={16} />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DraftPosts; 