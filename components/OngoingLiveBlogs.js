import React from 'react';

const OngoingLiveBlogs = ({ posts = [], onStopLive, onAddUpdate }) => {
  const handleStopLive = async (postId) => {
    if (!window.confirm('Are you sure you want to stop this live blog?')) return;
    
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/post/stop-live/${postId}`, {
        method: 'PUT',
      });
      
      if (response.ok) {
        onStopLive(postId);
      }
    } catch (error) {
      console.error('Error stopping live blog:', error);
    }
  };

  const handleMakeLive = async (postId) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/post/live/${postId}`, {
        method: 'PUT',
      });
      
      if (response.ok) {
        // Refresh the list of ongoing posts
        window.location.reload();
      }
    } catch (error) {
      console.error('Error making post live:', error);
    }
  };

  const validPosts = Array.isArray(posts) ? posts : [];

  return (
    <div className="mb-6 overflow-x-auto">
      <h2 className="text-xl font-bold mb-4">Ongoing Live Blogs</h2>
      <table className="min-w-full bg-white border rounded-lg">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Title</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Started At</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {validPosts.length === 0 ? (
            <tr>
              <td colSpan="4" className="px-6 py-4 text-center text-gray-500">
                No ongoing live blogs found
              </td>
            </tr>
          ) : (
            validPosts.map((post) => (
              <tr key={post._id}>
                <td className="px-6 py-4">{post.title}</td>
                <td className="px-6 py-4">{new Date(post.createdAt).toLocaleString()}</td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded ${post.isLive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                    {post.isLive ? 'Live' : 'Ended'}
                  </span>
                </td>
                <td className="px-6 py-4 space-x-2">
                  <button
                    onClick={() => onAddUpdate(post._id)}
                    className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
                  >
                    Add Update
                  </button>
                  {post.isLive ? (
                    <button
                      onClick={() => handleStopLive(post._id)}
                      className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                    >
                      Stop Live
                    </button>
                  ) : (
                    <button
                      onClick={() => handleMakeLive(post._id)}
                      className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700"
                    >
                      Make Live
                    </button>
                  )}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default OngoingLiveBlogs; 