"use client";
import { useState, useEffect } from 'react';

const CreatedByMePage = () => {
  const [myPosts, setMyPosts] = useState([]);
  const [activeStatus, setActiveStatus] = useState('all');

  // Mock data - replace with actual API calls
  useEffect(() => {
    const mockMyPosts = [
      { 
        id: 1, 
        title: 'Getting Started with Next.js',
        type: 'Article',
        status: 'published',
        lastModified: '2 hours ago',
        seoScore: 92,
        categories: ['Technology', 'Programming']
      },
      { 
        id: 2, 
        title: 'Live Coverage: Tech Conference 2024',
        type: 'Live Blog',
        status: 'ongoing',
        lastModified: '5 mins ago',
        seoScore: 88,
        categories: ['Technology', 'Events']
      },
      { 
        id: 3, 
        title: 'Summer Fashion Trends',
        type: 'Photo Gallery',
        status: 'draft',
        lastModified: '1 day ago',
        seoScore: 85,
        categories: ['Fashion', 'Lifestyle']
      },
      { 
        id: 4, 
        title: 'Cooking with Chef John',
        type: 'Video',
        status: 'pending',
        lastModified: '3 days ago',
        seoScore: 78,
        categories: ['Food', 'Lifestyle']
      }
    ];

    setMyPosts(mockMyPosts);
  }, []);

  const statusFilters = [
    { label: 'All', value: 'all' },
    { label: 'Published', value: 'published' },
    { label: 'Draft', value: 'draft' },
    { label: 'Pending Approval', value: 'pending' },
    { label: 'Scheduled', value: 'scheduled' }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'published':
        return 'bg-green-100 text-green-800';
      case 'draft':
        return 'bg-gray-100 text-gray-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'scheduled':
        return 'bg-blue-100 text-blue-800';
      case 'ongoing':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'Article':
        return '📄';
      case 'Live Blog':
        return '🔴';
      case 'Photo Gallery':
        return '📸';
      case 'Video':
        return '🎥';
      case 'Web Story':
        return '📱';
      default:
        return '📄';
    }
  };

  return (
    <div className="p-6 pt-20">
      {/* Status Filters */}
      <div className="flex gap-2 mb-6">
        {statusFilters.map((filter) => (
          <button
            key={filter.value}
            onClick={() => setActiveStatus(filter.value)}
            className={`px-4 py-2 rounded-md text-sm ${
              activeStatus === filter.value
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {filter.label}
          </button>
        ))}
      </div>

      {/* Posts Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left px-6 py-4 text-sm font-medium text-gray-500">Title</th>
                <th className="text-left px-6 py-4 text-sm font-medium text-gray-500">Type</th>
                <th className="text-left px-6 py-4 text-sm font-medium text-gray-500">Categories</th>
                <th className="text-left px-6 py-4 text-sm font-medium text-gray-500">SEO Score</th>
                <th className="text-left px-6 py-4 text-sm font-medium text-gray-500">Status</th>
                <th className="text-left px-6 py-4 text-sm font-medium text-gray-500">Last Modified</th>
                <th className="text-left px-6 py-4 text-sm font-medium text-gray-500">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {myPosts
                .filter(post => activeStatus === 'all' || post.status === activeStatus)
                .map((post) => (
                  <tr key={post.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm text-gray-700">{post.title}</td>
                    <td className="px-6 py-4 text-sm text-gray-700">
                      <span className="flex items-center gap-2">
                        {getTypeIcon(post.type)} {post.type}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700">
                      <div className="flex flex-wrap gap-1">
                        {post.categories.map((category, index) => (
                          <span 
                            key={index}
                            className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                          >
                            {category}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                        ${post.seoScore >= 90 ? 'bg-green-100 text-green-800' :
                          post.seoScore >= 70 ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'}`}>
                        {post.seoScore}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(post.status)}`}>
                        {post.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700">{post.lastModified}</td>
                    <td className="px-6 py-4 text-sm">
                      <div className="flex gap-2">
                        <button
                          onClick={() => window.location.href = `/posts/edit/${post.id}`}
                          className="px-2 py-1 text-blue-600 hover:bg-blue-50 rounded-md text-sm"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => window.location.href = `/posts/view/${post.id}`}
                          className="px-2 py-1 text-green-600 hover:bg-green-50 rounded-md text-sm"
                        >
                          View
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
  );
};

export default CreatedByMePage; 