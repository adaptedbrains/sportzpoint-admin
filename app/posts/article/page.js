'use client'
import useAllPostDataStore from '@/store/useAllPostDataStore'
import Table from '../../../components/Table'
import React, { useEffect } from 'react'

const page = () => {

  const {fetchAllPostedData,allArticlePost}=useAllPostDataStore()


  useEffect(()=>{
    fetchAllPostedData(`${process.env.NEXT_PUBLIC_API_URL}/article/publish?limit=50&page=1`,"article")
  },[])



  return (
    <div className='p-1 pt-2'>
      <Table posts={allArticlePost} />
    </div>
  )
}

export default page
