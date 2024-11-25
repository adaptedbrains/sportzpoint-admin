"use client";
import { Suspense } from 'react';
import ManagePostProperties from '../../../../components/ManagePostProperties';

const LoadingState = () => (
  <div className="p-1 pt-2">
    <div className="animate-pulse">
      <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
      <div className="space-y-3">
        <div className="h-4 bg-gray-200 rounded w-3/4"></div>
        <div className="h-4 bg-gray-200 rounded w-1/2"></div>
      </div>
    </div>
  </div>
);

const CreateEditLiveBlog = () => {
  return (
    <Suspense fallback={<LoadingState />}>
      <div className='p-1 pt-2'>
        <ManagePostProperties />
      </div>
    </Suspense>
  );
};

export default CreateEditLiveBlog; 