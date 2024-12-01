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
    handleArticleFromData("slug", e.target.value);
  };

  const handleSummaryChange = (e) => {
    handleArticleFromData("summary", e.target.value);
  };

  const handleMetaDescriptionChange = (e) => {
    handleArticleFromData("seo_desc", e.target.value);
  };

  const handleBanner_descDescriptionChange = (e) => {
    const value = e.target.value;
    handleArticleFromData("banner_desc", value);
  };

  const deleteImageCaption = () => {
    handleArticleFromData("banner_desc", "");
  };

  const selecttedImageForBanner = (filename) => {
    setFeaturedImage(`https://dmpsza32x691.cloudfront.net/${filename}`);
    handleArticleFromData("banner_image", filename);
  };

  return (
    <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
      {gallery && (
        <ImageGalleryPopup
          onClose={toggleGalleyButton}
          onSelect={selecttedImageForBanner}
          onCaption={deleteImageCaption}
          caption={"deleteData"}
        />
      )}
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">
        Manage Post Properties
      </h2>

      <div className="space-y-6">
        <div className="space-y-2">
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
            className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-150"
            placeholder="Enter post title"
          />
        </div>

        <div className="space-y-2">
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
            className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-150"
            placeholder="Enter permalink"
          />
        </div>

        <div className="space-y-2">
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
            className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-150 min-h-[100px] resize-y"
            placeholder="Enter post summary"
          />
          <div className="flex justify-end text-sm text-gray-500">
            {formDataPostEdit.summary.length} / 250
          </div>
        </div>

        <div className="space-y-2">
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
            className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-150 min-h-[80px] resize-y"
            placeholder="Enter meta description"
          />
          <div className="flex justify-end text-sm text-gray-500">
            {formDataPostEdit.seo_desc ? formDataPostEdit.seo_desc.length : 0} / 160
          </div>
        </div>

        <div className="space-y-2">
          <label
            htmlFor="featuredImage"
            className="block text-sm font-medium text-gray-700"
          >
            Featured Image
          </label>
          <div
            className={`relative overflow-hidden rounded-lg border-2 transition-all duration-200 ${
              dragOver
                ? "border-blue-500 bg-blue-50"
                : featuredImage
                  ? "border-gray-200"
                  : "border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100"
            }`}
            onClick={toggleGalleyButton}
          >
            <div className="h-[200px] w-full">
              {featuredImage ? (
                <Image
                  src={featuredImage}
                  alt={formDataPostEdit.banner_desc || "Featured image"}
                  width={1280}
                  height={720}
                  className="object-cover w-full h-full"
                />
              ) : (
                <div className="flex flex-col items-center justify-center h-full p-4 text-center">
                  <FaPlusCircle className="w-6 h-6 text-gray-400 mb-1.5" />
                  <p className="text-sm text-gray-500">
                    Add Featured Image
                    <span className="block text-xs mt-0.5">Recommended Size: 1280x720</span>
                  </p>
                </div>
              )}
            </div>
          </div>
          <input
            type="text"
            onChange={handleBanner_descDescriptionChange}
            value={formDataPostEdit.banner_desc}
            placeholder="Image Alt Text"
            className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-150"
          />
        </div>
      </div>
    </div>
  );
};

export default ArticlePostEditComponent;
