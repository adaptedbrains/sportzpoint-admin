"use client";
import { FaRegEdit, FaEye, FaRegClock } from 'react-icons/fa';

const HomePage = () => {
  // Mock user data (replace this with your auth system)
  const user = {
    firstName: "John",
    lastName: "Doe",
    role: "Editor"
  };

  const recentArticles = [
    {
      id: 1,
      title: "India vs England: Third Test Match Preview",
      excerpt: "Key players, pitch report, and weather conditions for the crucial third test...",
      author: "John Doe",
      publishDate: "2 hours ago",
      thumbnail: "https://picsum.photos/seed/cricket1/400/250",
      views: "2.4k",
      category: "Cricket"
    },
    {
      id: 2,
      title: "Champions League: Quarter-Final Draw Results",
      excerpt: "Complete breakdown of the UEFA Champions League quarter-final matchups...",
      author: "Jane Smith",
      publishDate: "5 hours ago",
      thumbnail: "https://picsum.photos/seed/football1/400/250",
      views: "3.1k",
      category: "Football"
    },
    {
      id: 3,
      title: "NBA All-Star Weekend Highlights",
      excerpt: "Best moments from this year's NBA All-Star festivities...",
      author: "Mike Johnson",
      publishDate: "8 hours ago",
      thumbnail: "https://picsum.photos/seed/basketball1/400/250",
      views: "1.8k",
      category: "Basketball"
    }
  ];

  const drafts = [
    {
      id: 1,
      title: "Formula 1: Australian GP Preview",
      excerpt: "What to expect from the upcoming race in Melbourne...",
      lastEdited: "15 minutes ago",
      author: "John Doe",
      category: "Formula 1"
    },
    {
      id: 2,
      title: "Top 10 Tennis Players of 2024",
      excerpt: "Ranking the best tennis players based on current form...",
      lastEdited: "2 hours ago",
      author: "Sarah Wilson",
      category: "Tennis"
    },
    {
      id: 3,
      title: "IPL 2024: Team Analysis",
      excerpt: "Comprehensive analysis of all teams before the season starts...",
      lastEdited: "3 hours ago",
      author: "Rahul Kumar",
      category: "Cricket"
    }
  ];

  return (
    <div className="flex justify-center min-h-screen bg-gray-50 pt-20 pb-6">
      <div className="w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-2xl font-semibold text-gray-900">
            Hello, {user.firstName} 👋
          </h1>
          <p className="text-sm text-gray-600 mt-1">
            Welcome back! Here's what's happening with your posts.
          </p>
        </div>

        {/* Drafts Section First */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-3">
            <h2 className="text-lg font-semibold text-gray-800">Recent Drafts</h2>
            <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
              View All →
            </button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {drafts.map((draft) => (
              <div key={draft.id} className="bg-white p-3 rounded-lg border border-gray-200 hover:border-blue-500 transition-all duration-200">
                <div className="flex items-center gap-1 mb-1.5">
                  <span className="text-xs font-medium text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded">
                    {draft.category}
                  </span>
                </div>
                <h3 className="text-sm font-medium text-gray-900 mb-1.5 line-clamp-2">
                  {draft.title}
                </h3>
                <p className="text-xs text-gray-600 mb-2 line-clamp-2">
                  {draft.excerpt}
                </p>
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <div className="flex items-center gap-1">
                    <FaRegEdit className="text-gray-400 w-3 h-3" />
                    {draft.lastEdited}
                  </div>
                  <button className="text-blue-600 hover:text-blue-700 font-medium">
                    Edit
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Articles Section Second */}
        <div>
          <div className="flex justify-between items-center mb-3">
            <h2 className="text-lg font-semibold text-gray-800">Recent Articles</h2>
            <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
              View All →
            </button>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {recentArticles.map((article) => (
              <div key={article.id} className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-md transition-shadow duration-200">
                <img 
                  src={article.thumbnail} 
                  alt={article.title}
                  className="w-full h-32 object-cover"
                />
                <div className="p-3">
                  <div className="flex items-center gap-1 mb-1.5">
                    <span className="text-xs font-medium text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded">
                      {article.category}
                    </span>
                  </div>
                  <h3 className="text-sm font-medium text-gray-900 mb-1.5 line-clamp-2">
                    {article.title}
                  </h3>
                  <p className="text-xs text-gray-600 mb-2 line-clamp-2">
                    {article.excerpt}
                  </p>
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <div className="flex items-center gap-1">
                      <FaRegClock className="text-gray-400 w-3 h-3" />
                      {article.publishDate}
                    </div>
                    <div className="flex items-center gap-1">
                      <FaEye className="text-gray-400 w-3 h-3" />
                      {article.views}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage; 