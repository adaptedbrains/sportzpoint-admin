'use client';

import RichTextEditor from './RichTextEditor';
import RestOfPostEdit from './RestOfPostEdit';
import ArticlePostEditComponent from './ArticlePostEditComponent';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import useAllPostDataStore from '@/store/useAllPostDataStore';

function ManagePostProperties() {
  const {allArticlePost}=useAllPostDataStore()

  const pathname = usePathname();
  const [post, setPost] = useState(null); 
  
  // Function to fetch the post data for update
  // const fetchPostFrUpdate = async (type, id) => {
  //   try {
  //     const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/article/${id}`, {
  //       method: 'GET',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //     });

  //     if (!response.ok) {
  //       throw new Error(`Failed to fetch post: ${response.statusText}`);
  //     }

  //     const data = await response.json();
  //     setPost(data.article); // Update state with fetched data
  //     console.log('Fetched post data:', data.article);
  //   } catch (error) {
  //     console.error('Error fetching post data:', error);
  //   }
  // };

  useEffect(() => {
    if (pathname) {
      // Split the pathname to extract 'type' and 'id'
      const parts = pathname.split('/');
      const type = parts[2]; // Example: 'article'
      const id = parts[3]; // Example: '123'
      
      const requiredData=allArticlePost.find((a)=>a._id===id)
      setPost(requiredData)
     
    }
  }, [pathname]);
  console.log("htmlsssasasas",post &&  post.content);
  
  return (
    <div className="flex flex-col gap-2">
      <ArticlePostEditComponent /> {/* Pass post data as a prop */}
      <RichTextEditor content={post && post.content} /> {/* Pass content to editor */}
      <RestOfPostEdit post={post} /> 
    </div>
  );
}

export default ManagePostProperties;
