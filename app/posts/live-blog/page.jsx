"use client";
import { useState, useEffect } from 'react';
import RichTextEditor from '../../../components/RichTextEditor';

const LiveBlogPage = () => {
  const [ongoingBlogs, setOngoingBlogs] = useState([]);
  const [allBlogs, setAllBlogs] = useState([]);
  const [activeStatus, setActiveStatus] = useState('all');
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [selectedBlog, setSelectedBlog] = useState(null);

  // Updated mock data with all required properties
  useEffect(() => {
    const mockOngoingBlogs = [
      { 
        id: 1, 
        title: 'Election Live Updates', 
        credits: ['John Doe', 'Sarah Smith'],
        lastUpdated: '2 mins ago', 
        viewers: 1234,
        seoScore: 85,
        categories: ['Politics', 'News']
      },
      { 
        id: 2, 
        title: 'Sports Match Coverage', 
        credits: ['Jane Smith'],
        lastUpdated: '5 mins ago', 
        viewers: 2341,
        seoScore: 92,
        categories: ['Sports', 'Live']
      },
    ];

    const mockAllBlogs = [
      { 
        id: 3, 
        title: 'Tech Conference Updates', 
        credits: ['Bob Johnson', 'Alice Chen'],
        status: 'draft', 
        lastUpdated: '2 days ago',
        seoScore: 78,
        categories: ['Technology', 'Events']
      },
      { 
        id: 4, 
        title: 'Weather Emergency Updates', 
        credits: ['Sarah Wilson'],
        status: 'pending', 
        lastUpdated: '1 day ago',
        seoScore: 88,
        categories: ['Weather', 'News']
      },
      { 
        id: 5, 
        title: 'Fashion Week Coverage', 
        credits: ['Mike Brown', 'Emma White'],
        status: 'scheduled', 
        lastUpdated: '3 days ago',
        seoScore: 95,
        categories: ['Fashion', 'Events']
      },
      { 
        id: 6, 
        title: 'Music Festival Highlights', 
        credits: ['Emma Davis'],
        status: 'published', 
        lastUpdated: '5 days ago',
        seoScore: 82,
        categories: ['Music', 'Entertainment']
      },
    ];

    setOngoingBlogs(mockOngoingBlogs);
    setAllBlogs(mockAllBlogs);
  }, []);

  // Function to handle live blog completion
  const handleCompleteLiveBlog = (blogId) => {
    if (window.confirm('Are you sure you want to end this live blog?')) {
      // Add your completion logic here
      console.log('Completing live blog:', blogId);
    }
  };

  const UpdateModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Push Live Update</h2>
          <button 
            onClick={() => setIsUpdateModalOpen(false)}
            className="text-gray-500 hover:text-gray-700"
          >
            ×
          </button>
        </div>

        <form className="space-y-4">
          {/* Update Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Update Title
            </label>
            <input
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter update title"
            />
          </div>

          {/* Rich Text Editor for Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <RichTextEditor />
          </div>

          {/* Submit Button */}
          <div className="flex justify-end gap-3 mt-6">
            <button
              type="button"
              onClick={() => setIsUpdateModalOpen(false)}
              className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md transition-colors duration-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700 transition-colors duration-200"
            >
              Push Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );

  // Also, let's add a safety check in the render method
  const renderCredits = (credits = []) => (
    <div className="flex flex-wrap gap-1">
      {credits.map((credit, index) => (
        <span 
          key={index}
          className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800"
        >
          {credit}
        </span>
      ))}
    </div>
  );

  const renderCategories = (categories = []) => (
    <div className="flex flex-wrap gap-1">
      {categories.map((category, index) => (
        <span 
          key={index}
          className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
        >
          {category}
        </span>
      ))}
    </div>
  );

  return (
    <div className="p-6">
      {/* Status Filters */}
      <div className="flex gap-2 mb-6">
        {['All', 'Published', 'Draft', 'Pending Approval', 'Scheduled'].map((status) => (
          <button
            key={status}
            onClick={() => setActiveStatus(status.toLowerCase())}
            className={`px-4 py-2 rounded-md text-sm ${
              activeStatus === status.toLowerCase()
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {status}
          </button>
        ))}
      </div>

      {/* Ongoing Live Blogs */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Ongoing Live Blogs</h2>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left px-6 py-4 text-sm font-medium text-gray-500">Title</th>
                  <th className="text-left px-6 py-4 text-sm font-medium text-gray-500">Credits</th>
                  <th className="text-left px-6 py-4 text-sm font-medium text-gray-500">Categories</th>
                  <th className="text-left px-6 py-4 text-sm font-medium text-gray-500">SEO Score</th>
                  <th className="text-left px-6 py-4 text-sm font-medium text-gray-500">Last Updated</th>
                  <th className="text-left px-6 py-4 text-sm font-medium text-gray-500">Live Viewers</th>
                  <th className="text-left px-6 py-4 text-sm font-medium text-gray-500">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {ongoingBlogs.map((blog) => (
                  <tr key={blog.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm text-gray-700">{blog.title}</td>
                    <td className="px-6 py-4 text-sm text-gray-700">
                      {renderCredits(blog.credits)}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700">
                      {renderCategories(blog.categories)}
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                        ${blog.seoScore >= 90 ? 'bg-green-100 text-green-800' :
                          blog.seoScore >= 70 ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'}`}>
                        {blog.seoScore || 'N/A'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700">{blog.lastUpdated}</td>
                    <td className="px-6 py-4 text-sm text-gray-700">{blog.viewers}</td>
                    <td className="px-6 py-4 text-sm">
                      <div className="flex gap-2">
                        <button
                          onClick={() => window.location.href = `/posts/live-blog/${blog.id}`}
                          className="px-2 py-1 text-blue-600 hover:bg-blue-50 rounded-md text-sm"
                          title="View"
                        >
                          View
                        </button>
                        <button
                          onClick={() => {
                            setSelectedBlog(blog);
                            setIsUpdateModalOpen(true);
                          }}
                          className="px-2 py-1 text-green-600 hover:bg-green-50 rounded-md text-sm"
                          title="Update"
                        >
                          Update
                        </button>
                        <button
                          onClick={() => handleCompleteLiveBlog(blog.id)}
                          className="px-2 py-1 text-red-600 hover:bg-red-50 rounded-md text-sm"
                          title="Complete"
                        >
                          Complete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* All Live Blog Posts */}
      <div>
        <h2 className="text-xl font-semibold text-gray-800 mb-4">All Live Blog Posts</h2>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left px-6 py-4 text-sm font-medium text-gray-500">Title</th>
                  <th className="text-left px-6 py-4 text-sm font-medium text-gray-500">Credits</th>
                  <th className="text-left px-6 py-4 text-sm font-medium text-gray-500">Categories</th>
                  <th className="text-left px-6 py-4 text-sm font-medium text-gray-500">SEO Score</th>
                  <th className="text-left px-6 py-4 text-sm font-medium text-gray-500">Status</th>
                  <th className="text-left px-6 py-4 text-sm font-medium text-gray-500">Last Updated</th>
                  <th className="text-left px-6 py-4 text-sm font-medium text-gray-500">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {allBlogs
                  .filter(blog => activeStatus === 'all' || blog.status === activeStatus)
                  .map((blog) => (
                    <tr key={blog.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm text-gray-700">{blog.title}</td>
                      <td className="px-6 py-4 text-sm text-gray-700">
                        {renderCredits(blog.credits)}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-700">
                        {renderCategories(blog.categories)}
                      </td>
                      <td className="px-6 py-4 text-sm">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                          ${blog.seoScore >= 90 ? 'bg-green-100 text-green-800' :
                            blog.seoScore >= 70 ? 'bg-yellow-100 text-yellow-800' :
                            'bg-red-100 text-red-800'}`}>
                          {blog.seoScore || 'N/A'}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium 
                          ${blog.status === 'published' ? 'bg-green-100 text-green-800' :
                            blog.status === 'draft' ? 'bg-gray-100 text-gray-800' :
                            blog.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-blue-100 text-blue-800'}`}>
                          {blog.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-700">{blog.lastUpdated}</td>
                      <td className="px-6 py-4 text-sm">
                        <button
                          onClick={() => {/* Add edit action */}}
                          className="px-3 py-1 text-gray-700 hover:bg-gray-100 rounded-md text-sm transition-colors duration-200"
                        >
                          Edit
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Update Modal */}
      {isUpdateModalOpen && <UpdateModal />}
    </div>
  );
};

export default LiveBlogPage; 