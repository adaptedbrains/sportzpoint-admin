import React from 'react';
import Pagination from './Pagination';

const TableHeader = ({ totalPages, currentPage, onPageChange, totalItems, type, loading }) => {
  return (
    <div className="bg-white border-b shadow-sm">
      {/* Main Header */}
      <div className="px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Left Section */}
          <div className="flex items-center gap-3">
            <h2 className="text-lg font-semibold text-gray-900">{type} Posts</h2>
            <div className="flex items-center">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-50 text-blue-700">
                {Number(totalItems) + Number(totalPages)}
              </span>
            </div>
          </div>

          {/* Right Section - Pagination */}
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-600">
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
  );
};

export default TableHeader;