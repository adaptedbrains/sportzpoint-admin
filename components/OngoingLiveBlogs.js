import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { MoreHorizontal } from "lucide-react";
import LiveBlogUpdateModal from './LiveBlogUpdateModal';

const OngoingLiveBlogs = ({ onStopLive }) => {
  const [ongoingPosts, setOngoingPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showDropdown, setShowDropdown] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBlogId, setSelectedBlogId] = useState(null);

  // Fetch ongoing live blogs
  const fetchOngoingLiveBlogs = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/liveblogs`,
      );
      setOngoingPosts(response.data.liveBlogs);
    } catch (error) {
      console.error("Error fetching ongoing live blogs:", error);
      setError("Failed to load ongoing live blogs");
      setOngoingPosts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOngoingLiveBlogs();
    const interval = setInterval(fetchOngoingLiveBlogs, 30000);
    return () => clearInterval(interval);
  }, []);

  const handleStopLive = async (postId) => {
    if (!window.confirm("Are you sure you want to stop this live blog?")) return;
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/admin/post/stop-live/${postId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
        },
      );
      if (!response.ok) {
        throw new Error("Failed to stop live blog");
      }
      fetchOngoingLiveBlogs();
    } catch (error) {
      console.error("Error stopping live blog:", error);
      alert("Failed to stop live blog. Please try again.");
    }
  };

  return (
    <div className="w-full">
      <div className="bg-white p-4 rounded-lg mb-4">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-medium">Ongoing Live Blogs</h2>
        </div>
      </div>

      {loading && <p className="p-4">Loading...</p>}
      {error && <p className="p-4 text-red-500">{error}</p>}

      {!loading && !error && (
        <div className="rounded-lg border bg-white overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left p-4 font-medium text-gray-500">Title</th>
                <th className="text-left p-4 font-medium text-gray-500">Category</th>
                <th className="text-center p-4 font-medium text-gray-500">Updates</th>
                <th className="text-left p-4 font-medium text-gray-500">Last Updated</th>
                <th className="text-center p-4 font-medium text-gray-500">Actions</th>
              </tr>
            </thead>
            <tbody>
              {ongoingPosts.map((blog) => (
                <tr key={blog._id} className="border-b hover:bg-gray-50">
                  <td className="p-4 text-sm">{blog.title}</td>
                  <td className="p-4 text-sm">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                      {blog.primary_category?.[0]?.name || "Uncategorized"}
                    </span>
                  </td>
                  <td className="p-4 text-sm text-center">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      {blog.live_blog_updates?.length || 0}
                    </span>
                  </td>
                  <td className="p-4 text-sm">
                    {new Date(blog.updated_at_datetime).toLocaleString()}
                  </td>
                  <td className="p-4 text-sm">
                    <div className="flex gap-2 justify-center">
                      <button
                        onClick={() => {
                          setSelectedBlogId(blog._id);
                          setIsModalOpen(true);
                        }}
                        className="px-3 py-1 text-sm text-blue-600 hover:bg-blue-50 rounded-md"
                      >
                        Add Update
                      </button>
                      <button
                        onClick={() => onStopLive(blog._id)}
                        className="px-3 py-1 text-sm text-red-600 hover:bg-red-50 rounded-md"
                      >
                        Stop Live
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {!loading && !error && ongoingPosts.length === 0 && (
        <div className="text-center p-4 text-gray-500 bg-white rounded-lg border">
          No ongoing live blogs found
        </div>
      )}

      <LiveBlogUpdateModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedBlogId(null);
        }}
        blogId={selectedBlogId}
      />
    </div>
  );
};

export default OngoingLiveBlogs;

