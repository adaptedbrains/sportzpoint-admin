import React from 'react';
import Pagination from './Pagination';
import { HiOutlineChevronDown } from 'react-icons/hi';

const TableHeader = ({ totalPages, currentPage, onPageChange, totalItems, type, loading }) => {
  return (
    <div className="bg-white border-b">
      {/* Main Header */}
      <div className="px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Left Section */}
          <div className="flex items-center gap-3">
            <h2 className="text-lg font-medium text-gray-900">{type} Posts</h2>
            <div className="flex items-center">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                {Number(totalItems) + Number(totalPages)}
              </span>
            </div>
          </div>

          {/* Right Section - Filter and Pagination */}
          <div className="flex items-center gap-4">
            {/* Filter Button */}
            <button className="inline-flex items-center gap-1 px-3 py-1.5 text-sm text-gray-700 bg-white border rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
              <span>Filter</span>
              <HiOutlineChevronDown className="w-4 h-4" />
            </button>

            {/* Pagination Section */}
            <div className="flex items-center gap-3">
              <span className="text-sm text-gray-500">
                Page {currentPage} of {totalPages}
              </span>
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={onPageChange}
                loading={loading}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Optional: Secondary Header for additional filters/actions */}
      <div className="px-6 py-3 bg-gray-50/40 border-t">
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <span>Sort by:</span>
          <button className="hover:text-gray-900">Date</button>
          <span>•</span>
          <button className="hover:text-gray-900">Title</button>
          <span>•</span>
          <button className="hover:text-gray-900">Status</button>
        </div>
      </div>
    </div>
  );
};

export default TableHeader;