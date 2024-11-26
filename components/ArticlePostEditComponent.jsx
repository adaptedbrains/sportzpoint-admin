'use client';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { FaPlusCircle } from 'react-icons/fa';
import { usePathname } from 'next/navigation';
import useAllPostDataStore from '@/store/useAllPostDataStore';

const ArticlePostEditComponent = ({handleArticleFromData,formDataPostEdit}) => {
  const {allArticlePost}=useAllPostDataStore()
  
  const pathname = usePathname();
  const parts = pathname.split('/');
  const id = parts[3];
  // const [title, setTitle] = useState();
  // const [englishTitle, setEnglishTitle] = useState("");
  // const [summary, setSummary] = useState("");
  // const [metaDescription, setMetaDescription] = useState("");
  const [featuredImage, setFeaturedImage] = useState("");
  const [dragOver, setDragOver] = useState(false);

  useEffect(()=>{
      const requiredData=allArticlePost.find((a)=>a._id===id)
        console.log("requiredData",requiredData);
        if(requiredData){
          handleArticleFromData('title',requiredData.title)
          handleArticleFromData('englishTitle',requiredData.legacy_url)
          handleArticleFromData('summary',requiredData.summary)
          handleArticleFromData('metaDescription',requiredData.seo_desc)
          
          // setTitle(requiredData.title)
          // setEnglishTitle(requiredData.legacy_url)
          // setSummary(requiredData.summary)
          // setMetaDescription(requiredData.seo_desc)
          setFeaturedImage(`https://sportzpoint-media.s3.ap-south-1.amazonaws.com/${requiredData.banner_image}`)
        }
        
    
  },[id])

  const handleTitleChange = (e) => {
   
    handleArticleFromData('title',e.target.value)
  };

  const handleEnglishTitleChange = (e) => {
    // setEnglishTitle(e.target.value);
    handleArticleFromData('englishTitle',e.target.value)
  };

  const handleSummaryChange = (e) => {
    // setSummary(e.target.value.slice(0, 250)); // Enforce 250-character limit
    handleArticleFromData('summary',e.target.value)
  };

  const handleMetaDescriptionChange = (e) => {
    // setMetaDescription(e.target.value.slice(0, 160));
    handleArticleFromData('metaDescription',e.target.value)
  };

  const handleFeaturedImageChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) {
      setFeaturedImage(URL.createObjectURL(file));
    } else {
      alert('Please upload a valid image file!');
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = () => {
    setDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      setFeaturedImage(URL.createObjectURL(file));
    } else {
      alert('Please upload a valid image file!');
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Manage Post Properties</h2>

      {/* Title */}
      <div className="mb-4">
        <label htmlFor="title" className="block text-sm font-medium text-gray-700">
          Title
        </label>
        <input
          type="text"
          id="title"
          value={formDataPostEdit.title}
          onChange={handleTitleChange}
          className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-200 focus:border-indigo-500 sm:text-sm"
        />
      </div>

      {/* English Title */}
      <div className="mb-4">
        <label htmlFor="englishTitle" className="block text-sm font-medium text-gray-700">
          English Title (Permalink)
        </label>
        <input
          type="text"
          id="englishTitle"
          value={formDataPostEdit.englishTitle}
          onChange={handleEnglishTitleChange}
          className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-200 focus:border-indigo-500 sm:text-sm"
        />
      </div>

      {/* Summary */}
      <div className="mb-4">
        <label htmlFor="summary" className="block text-sm font-medium text-gray-700">
          Summary
        </label>
        <textarea
          id="summary"
          value={formDataPostEdit.summary}
          onChange={handleSummaryChange}
          className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-200 focus:border-indigo-500 sm:text-sm"
        />
        <div className="text-sm text-gray-500 mt-1">
          {formDataPostEdit.summary.length} / 250
        </div>
      </div>

      {/* Meta Description */}
      <div className="mb-4">
        <label htmlFor="metaDescription" className="block text-sm font-medium text-gray-700">
          Meta Description
        </label>
        <textarea
          id="metaDescription"
          value={formDataPostEdit.metaDescription}
          onChange={handleMetaDescriptionChange}
          className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-200 focus:border-indigo-500 sm:text-sm"
        />
        <div className="text-sm text-gray-500 mt-1">
          {formDataPostEdit.metaDescription.length} / 160
        </div>
      </div>

      {/* Featured Image */}
      <div className="mb-4">
        <label htmlFor="featuredImage" className="block text-sm font-medium text-gray-700">
          Featured Image
        </label>
        <div
          className={`flex items-center justify-center w-full h-40 mt-1 border rounded-md cursor-pointer ${
            dragOver ? 'border-blue-500 bg-blue-100' : 'border-dashed border-gray-300 bg-gray-200'
          }`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <input
            type="file"
            id="featuredImage"
            onChange={handleFeaturedImageChange}
            className="hidden"
          />
          <label
            htmlFor="featuredImage"
            className="flex items-center justify-center w-full h-full"
          >
            {featuredImage ? (
             <Image
             src={featuredImage}
            //  https://sportzpoint-media.s3.ap-south-1.amazonaws.com
             alt="Featured"
             
             width={500}          
             height={400}      
             className="object-cover w-full h-full rounded-md"
           />
            ) : (
              <>
                
                <p className="mt-2 text-sm text-gray-500 text-center">
                  Add Featured Image
                  <br />
                  Recommended Size: 1280x720
                </p>
              </>
            )}
          </label>
        </div>
      </div>
    </div>
  );
};

export default ArticlePostEditComponent;
