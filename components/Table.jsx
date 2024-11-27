"use client";

import { useState } from "react";
import { FaEdit, FaEye, FaEllipsisV } from "react-icons/fa";
import { GoLink } from "react-icons/go";
import { useRouter } from "next/navigation";
import CalendarModal from "./CalendarModal";
import { formatDate } from "../util/timeFormat";

export default function Table({
  posts,
  type,
  onStatusChange,
  currentPage,
  onNextPage,
  onPreviousPage,
  totalPage,
  loading,
}) {
  const router = useRouter();
  const [filter, setFilter] = useState("Published");
  const [showDropdown, setShowDropdown] = useState(null);

  const handleDateRangeChange = (dateRange) => {
    console.log('Date range changed:', dateRange);
  };

  return (
    <div className="w-full">
      {/* Header Section */}
      <div className="bg-white p-4 rounded-lg mb-4 space-y-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-semibold">{type}</h2>
            <button 
              onClick={() => router.push(`/posts/${type}/new-post`)}
              className="px-3 py-1 text-sm border border-gray-300 rounded-md hover:bg-gray-50"
            >
              + New
            </button>
          </div>
          <CalendarModal onApply={handleDateRangeChange} />
        </div>

        {/* Status Filters */}
        <div className="flex gap-2 border-b">
          {["Published", "Draft", "PendingApproval", "Scheduled"].map((status) => (
            <button
              key={status}
              className={`px-4 py-2 text-sm transition-colors
                ${filter === status 
                  ? "border-b-2 border-blue-600 text-blue-600" 
                  : "text-gray-600 hover:text-gray-900"}`}
              onClick={() => {
                setFilter(status);
                onStatusChange(status.toLowerCase());
              }}
            >
              {status.replace(/([A-Z])/g, ' $1').trim()}
            </button>
          ))}
        </div>
      </div>

      {/* Table Section */}
      <div className="rounded-lg border bg-white overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50 border-b">
              <th className="text-left p-4 font-medium text-gray-500">Title</th>
              <th className="text-left p-4 font-medium text-gray-500">Categories</th>
              <th className="text-left p-4 font-medium text-gray-500">Credits</th>
              <th className="text-center p-4 font-medium text-gray-500">Word Count</th>
              <th className="text-center p-4 font-medium text-gray-500">SEO Score</th>
              <th className="text-left p-4 font-medium text-gray-500">Timeline</th>
              <th className="text-center p-4 font-medium text-gray-500">Actions</th>
            </tr>
          </thead>
          <tbody>
            {posts.map((article, index) => (
              <tr key={index} className="border-b hover:bg-gray-50">
                <td className="p-4 text-sm">{article.title}</td>
                <td className="p-4 text-sm">
                  {article.categories.map((e, i) => (
                    <span key={i} className="inline-block mr-1 px-2 py-1 bg-gray-100 rounded-full text-xs">
                      {e.name}
                    </span>
                  ))}
                </td>
                <td className="p-4 text-sm">{article.author?.name}</td>
                <td className="p-4 text-sm text-center">
                  {article.content?.split(" ").length}
                </td>
                <td className="p-4 text-sm text-center">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium
                    ${article.seoScore === 100 ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"}`}>
                    {10}
                  </span>
                </td>
                <td className="p-4 text-sm">{formatDate(article.updated_at_datetime)}</td>
                <td className="p-4 text-sm">
                  <div className="relative">
                    <button
                      onClick={() => setShowDropdown(showDropdown === index ? null : index)}
                      className="p-2 hover:bg-gray-100 rounded-full"
                    >
                      <FaEllipsisV className="h-4 w-4 text-gray-500" />
                    </button>
                    
                    {showDropdown === index && (
                      <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg border z-10">
                        <div className="py-1">
                          <button
                            onClick={() => {
                              router.push(`/posts/${article.type || "defaultType"}/${article._id}`);
                              setShowDropdown(null);
                            }}
                            className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => setShowDropdown(null)}
                            className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          >
                            View
                          </button>
                          <button
                            onClick={() => setShowDropdown(null)}
                            className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          >
                            Copy Link
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-end space-x-2 py-4">
        <button
          onClick={onPreviousPage}
          disabled={currentPage === 1}
          className={`px-4 py-2 text-sm border rounded-md
            ${currentPage === 1 
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
              : 'bg-white text-gray-700 hover:bg-gray-50'}`}
        >
          Previous
        </button>
        <button
          onClick={onNextPage}
          disabled={currentPage === totalPage}
          className={`px-4 py-2 text-sm border rounded-md
            ${currentPage === totalPage 
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
              : 'bg-white text-gray-700 hover:bg-gray-50'}`}
        >
          Next
        </button>
      </div>
    </div>
  );
}
