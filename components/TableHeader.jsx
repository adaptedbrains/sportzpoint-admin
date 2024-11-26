import React from 'react'
import Pagination from './Pagination'

const TableHeader = ({ totalPages, currentPage, onPageChange, totalItems, type,loading }) => {
  return (
    <div className="bg-white p-4 rounded-t-lg border-b">
      <div className="flex justify-between items-center">
        <div className="text-gray-600">
          <h2 className="text-lg font-semibold">{type} Posts</h2>
          <p className="text-sm">
            Total: {Number(totalItems) + Number(totalPages)} {type} posts
          </p>
        </div>
        
        <div className="flex items-center gap-4">
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
  )
}

export default TableHeader 