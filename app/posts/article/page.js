'use client';
import useAllPostDataStore from '@/store/useAllPostDataStore';
import Table from '../../../components/Table';
import React, { useEffect } from 'react';

const Page = () => {
  const { fetchAllPostedData, allPosts, totalPage, currentPage,loading } = useAllPostDataStore();

  // Fetch data when the page loads or when currentPage changes
  useEffect(() => {
    fetchAllPostedData(
      `${process.env.NEXT_PUBLIC_API_URL}/articles/type/Article?limit=15&page=${currentPage}`,
      'Article'
    );
  }, [currentPage]);

  // Function to go to the next page
  const handleNextPage = () => {
    if (currentPage < totalPage) {
      useAllPostDataStore.setState((state) => ({
        currentPage: state.currentPage + 1,
      }));
    }
  };

  // Function to go to the previous page
  const handlePreviousPage = () => {
    if (currentPage > 1) {
      useAllPostDataStore.setState((state) => ({
        currentPage: state.currentPage - 1,
      }));
    }
  };

  return (
    <div className='p-1 pt-2'>
      {/* Pass posts, type, and pagination handlers to Table */}
      <Table
        posts={allPosts}
        type="Article"
        totalPage={totalPage}
        currentPage={currentPage}
        onNextPage={handleNextPage}
        onPreviousPage={handlePreviousPage}
        loading={loading}
      />
    </div>
  );
};

export default Page;
