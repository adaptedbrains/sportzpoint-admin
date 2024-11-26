"use client";
import DraftPosts from '@/components/DraftPosts';
import PostTypeDropdown from '@/components/PostTypeDropdown';

const DashboardPage = () => {
  return (
    <div className="min-h-screen bg-white">
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-semibold text-gray-800">Dashboard</h1>
            <p className="text-gray-500 text-sm mt-1">Manage your content and drafts</p>
          </div>
          <PostTypeDropdown />
        </div>
        
        <DraftPosts />
      </div>
    </div>
  );
};

export default DashboardPage; 