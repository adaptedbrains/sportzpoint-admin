'use client'
import useAllPostDataStore from '@/store/useAllPostDataStore'
import Table from '../../../components/Table'
import React, { useEffect } from 'react'

const page = () => {

  const {fetchAllPostedData,allPosts , totalPage, currentPage,loading}=useAllPostDataStore()

  
    useEffect(()=>{
      fetchAllPostedData(`${process.env.NEXT_PUBLIC_API_URL}/articles/type/Gallery?limit=15&page=1`,"Gallery")
    },[currentPage])


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
      <Table posts={allPosts} type={"Gallery"}  totalPage={totalPage}
        currentPage={currentPage}
        onNextPage={handleNextPage}
        onPreviousPage={handlePreviousPage}
        loading={loading}
      />
    </div>
  )
}

export default page
