"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { FaPlusCircle } from "react-icons/fa";
import { usePathname } from "next/navigation";
import useAllPostDataStore from "../store/useAllPostDataStore";
import ImageGalleryPopup from "./ImageGalleryPopup";


const ArticlePostEditComponent = ({
  handleArticleFromData,
  formDataPostEdit,
}) => {
  const { allPosts } = useAllPostDataStore();

  const pathname = usePathname();
  const parts = pathname.split("/");
  const id = parts[3];

  const [featuredImage, setFeaturedImage] = useState("");

  const [gallery, setGallery] = useState(false);
  const toggleGalleyButton = () => {
    
    setGallery((pre) => !pre);
  };

  const [dragOver, setDragOver] = useState(false);

  useEffect(() => {
    const requiredData = allPosts.find((a) => a._id === id);
   
    if (requiredData) {
      handleArticleFromData("title", requiredData.title);
      handleArticleFromData("englishTitle", requiredData.slug);
      handleArticleFromData("summary", requiredData.summary);
      handleArticleFromData("seo_desc", requiredData.seo_desc);
      handleArticleFromData("banner_desc", requiredData.banner_desc);

      setFeaturedImage(
        `https://dmpsza32x691.cloudfront.net/${requiredData.banner_image}`
      );
    }
  }, [id, allPosts]);

  const handleTitleChange = (e) => {
    handleArticleFromData("title", e.target.value);
  };

  const handleEnglishTitleChange = (e) => {
    // setEnglishTitle(e.target.value);
    handleArticleFromData("slug", e.target.value);
  };

  const handleSummaryChange = (e) => {
    // setSummary(e.target.value.slice(0, 250)); // Enforce 250-character limit
    handleArticleFromData("summary", e.target.value);
  };

  const handleMetaDescriptionChange = (e) => {
    // setMetaDescription(e.target.value.slice(0, 160));
    handleArticleFromData("seo_desc", e.target.value);
  };
  const handleBanner_descDescriptionChange = (e) => {
    const value = e.target.value; 
    handleArticleFromData("banner_desc", value);
  };

  

  // const handleDragOver = (e) => {
  //   e.preventDefault();
  //   setDragOver(true);
  // };

  // const handleDragLeave = () => {
  //   setDragOver(false);
  // };

  // const handleDrop = (e) => {
  //   e.preventDefault();
  //   setDragOver(false);
  //   const file = e.dataTransfer.files[0];
  //   if (file && file.type.startsWith("image/")) {
  //     setFeaturedImage(URL.createObjectURL(file));
  //   } else {
  //     alert("Please upload a valid image file!");
  //   }
  // };
  const deleteImageCaption=()=>{
    handleArticleFromData("banner_desc", "");
  }

  const selecttedImageForBanner=(filename)=>{
    setFeaturedImage(`https://dmpsza32x691.cloudfront.net/${filename}`)
   
    handleArticleFromData("banner_image", filename);
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      {gallery && <ImageGalleryPopup onClose={toggleGalleyButton}  onSelect={selecttedImageForBanner} onCaption={deleteImageCaption} caption={"deleteData"}  />}
      <h2 className="text-xl font-bold mb-4">Manage Post Properties</h2>

      {/* Title */}
      <div className="mb-4">
        <label
          htmlFor="title"
          className="block text-sm font-medium text-gray-700"
        >
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
        <label
          htmlFor="englishTitle"
          className="block text-sm font-medium text-gray-700"
        >
          English Title (Permalink)
        </label>
        <input
          type="text"
          
          id="englishTitle"
          value={formDataPostEdit.slug}
          onChange={handleEnglishTitleChange}
          className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-200 focus:border-indigo-500 sm:text-sm"
        />
      </div>

      {/* Summary */}
      <div className="mb-4">
        <label
          htmlFor="summary"
          className="block text-sm font-medium text-gray-700"
        >
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
        <label
          htmlFor="metaDescription"
          className="block text-sm font-medium text-gray-700"
        >
          Meta Description
        </label>
        <textarea
          id="metaDescription"
          
          value={formDataPostEdit.seo_desc}
          onChange={handleMetaDescriptionChange}
          className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-200 focus:border-indigo-500 sm:text-sm"
        />
        <div className="text-sm text-gray-500 mt-1">
          {formDataPostEdit.seo_desc &&
            formDataPostEdit.seo_desc.split(" ").length}{" "}
          / 160
        </div>
      </div>

      {/* Featured Image */}
      <div className="mb-4">
        <label
          htmlFor="featuredImage"
          className="block text-sm font-medium text-gray-700"
        >
          Featured Image
        </label>
        <div
          className={`flex items-center justify-center w-full h-40 mt-1 border rounded-md cursor-pointer ${
            dragOver
              ? "border-blue-500 bg-blue-100"
              : "border-dashed border-gray-300 bg-gray-200"
          }`}
          // onDragOver={handleDragOver}
          // onDragLeave={handleDragLeave}
          // onDrop={handleDrop}
          onClick={toggleGalleyButton}
        >
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
              <>
                <p className="mt-2 text-sm text-gray-500 text-center">
                  Add Featured Image
                  <br />
                  Recommended Size: 1280x720
                </p>
              </>
            )}

            {/* <input type="text" value={formDataPostEdit.banner_image}  onChange={(e)=>handleArticleFromData(e.target.value)}   /> */}
          </label>
        </div>
          <input type="text" onChange={handleBanner_descDescriptionChange} value={formDataPostEdit.banner_desc} placeholder="Alt Text" className="mt-4 border border-dashed rounded outline-none focus:outline-none px-5 py-1 w-1/2 border-gray-100 bg-gray-100 mx-auto" />
      </div>
    </div>
  );
};

export default ArticlePostEditComponent;
