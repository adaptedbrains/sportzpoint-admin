'use client';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { FaPlusCircle } from 'react-icons/fa';
import { usePathname } from 'next/navigation';
import useAllPostDataStore from '../store/useAllPostDataStore';

const ArticlePostEditComponent = ({handleArticleFromData, formDataPostEdit}) => {
  const {allPosts} = useAllPostDataStore()
  
  const pathname = usePathname();
  const parts = pathname.split('/');
  const id = parts[3];
  const [featuredImage, setFeaturedImage] = useState("");
  const [dragOver, setDragOver] = useState(false);

  useEffect(() => {
    const requiredData = allPosts.find((a) => a._id === id)
    console.log("requiredData", requiredData);
    if(requiredData) {
      handleArticleFromData('title', requiredData.title)
      handleArticleFromData('englishTitle', requiredData.slug)
      handleArticleFromData('summary', requiredData.summary)
      handleArticleFromData('seo_desc', requiredData.seo_desc)
      handleArticleFromData('banner_desc', requiredData.banner_desc)
      setFeaturedImage(`https://img-cdn.thepublive.com/fit-in/1280x960/filters:format(webp)/sportzpoint/media/${requiredData.banner_image}`)
    }
  }, [id, allPosts])

  const handleTitleChange = (e) => {
    handleArticleFromData('title', e.target.value)
  };

  const handleEnglishTitleChange = (e) => {
    handleArticleFromData('englishTitle', e.target.value)
  };

  const handleSummaryChange = (e) => {
    handleArticleFromData('summary', e.target.value)
  };

  const handleMetaDescriptionChange = (e) => {
    handleArticleFromData('metaDescription', e.target.value)
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
    <div className="rounded-lg border bg-white">
      <div className="p-4 border-b">
        <h2 className="text-lg font-medium">Manage Post Properties</h2>
      </div>

      <div className="p-4 space-y-4">
        {/* Title */}
        <div className="mb-4">
          <label htmlFor="title" className="block text-sm font-medium text-gray-500">
            Title
          </label>
          <input
            type="text"
            id="title"
            value={formDataPostEdit.title}
            onChange={handleTitleChange}
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>

        {/* English Title */}
        <div className="mb-4">
          <label htmlFor="englishTitle" className="block text-sm font-medium text-gray-500">
            English Title (Permalink)
          </label>
          <input
            type="text"
            disabled
            id="englishTitle"
            value={formDataPostEdit.englishTitle}
            onChange={handleEnglishTitleChange}
            className="mt-1 block w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md focus:outline-none sm:text-sm"
          />
        </div>

        {/* Summary */}
        <div className="mb-4">
          <label htmlFor="summary" className="block text-sm font-medium text-gray-500">
            Summary
          </label>
          <textarea
            id="summary"
            value={formDataPostEdit.summary}
            onChange={handleSummaryChange}
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
          <div className="text-sm text-gray-500 mt-1">
            {formDataPostEdit.summary.length} / 250
          </div>
        </div>

        {/* Meta Description */}
        <div className="mb-4">
          <label htmlFor="metaDescription" className="block text-sm font-medium text-gray-500">
            Meta Description
          </label>
          <textarea
            id="metaDescription"
            value={formDataPostEdit.seo_desc}
            onChange={handleMetaDescriptionChange}
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
          <div className="text-sm text-gray-500 mt-1">
            {formDataPostEdit.seo_desc && formDataPostEdit.seo_desc.split(" ").length} / 160
          </div>
        </div>

        {/* Featured Image */}
        <div className="mb-4">
          <label htmlFor="featuredImage" className="block text-sm font-medium text-gray-500">
            Featured Image
          </label>
          <div
            className={`flex items-center justify-center w-full h-40 mt-1 border rounded-md cursor-pointer ${
              dragOver ? 'border-blue-500 bg-blue-50' : 'border-dashed border-gray-300 bg-gray-50'
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
                  alt={featuredImage}
                  width={500}          
                  height={400}      
                  className="object-cover w-full h-full rounded-md"
                />
              ) : (
                <p className="mt-2 text-sm text-gray-500 text-center">
                  Add Featured Image
                  <br />
                  Recommended Size: 1280x720
                </p>
              )}

              <input 
                type="text" 
                value={formDataPostEdit.banner_image}  
                onChange={(e) => handleArticleFromData(e.target.value)}
                className="hidden"   
              />
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArticlePostEditComponent;