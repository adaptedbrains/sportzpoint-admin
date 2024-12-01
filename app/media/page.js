'use client'
import Image from "next/image";
import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";

const Page = () => {
  const [images, setImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const token = Cookies.get("token");
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/media/img`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        const data = await response.json();
        setImages(data.files || []);
      } catch (error) {
        console.error("Error fetching images:", error);
      }
    };

    fetchImages();
  }, []);

  const handleImageClick = (img) => {
    setSelectedImage(img);
  };

  const handleClosePopup = () => {
    setSelectedImage(null);
  };

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (file) {
      await uploadFile(file);
    }
  };

  const uploadFile = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    setIsLoading(true);
    try {
      const token = Cookies.get("token");
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/media/upload`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );
      const data = await response.json();
      if (data.fileName) {
        setImages((prev) => [data.fileName, ...prev]);
      }
    } catch (error) {
      console.error("Error uploading file:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = async (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      await uploadFile(file);
    }
  };

  return (
    <div className="p-6 pt-24">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">Media Library</h1>
        <p className="text-sm text-gray-500 mt-1">Manage and upload your media assets</p>
      </div>

      <div 
        className={`mb-8 border-2 border-dashed rounded-lg p-8 text-center transition-colors duration-200 ${
          isDragging 
            ? 'border-blue-500 bg-blue-50' 
            : 'border-gray-300 hover:border-gray-400'
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <div className="max-w-xl mx-auto">
          <svg
            className="mx-auto h-12 w-12 text-gray-400"
            stroke="currentColor"
            fill="none"
            viewBox="0 0 48 48"
            aria-hidden="true"
          >
            <path
              d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <div className="mt-4">
            <label className="relative cursor-pointer">
              <span className="text-gray-600">Drop images here or</span>
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFileUpload}
              />
              <span className="text-blue-500 hover:text-blue-600 ml-1">browse</span>
            </label>
            <p className="text-xs text-gray-500 mt-1">PNG, JPG, GIF up to 10MB</p>
          </div>
        </div>
      </div>

      {isLoading && (
        <div className="flex items-center justify-center mb-6">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
          <span className="ml-2 text-gray-600">Uploading...</span>
        </div>
      )}

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
        {images.map((img, index) => (
          <div
            key={index}
            className="group aspect-square relative rounded-lg overflow-hidden border border-gray-200 bg-gray-100 hover:border-blue-500 transition-all duration-200"
            onClick={() => handleImageClick(img)}
          >
            <Image
              src={`https://dmpsza32x691.cloudfront.net/${img}`}
              alt={`Image ${index + 1}`}
              layout="fill"
              objectFit="cover"
              className="group-hover:opacity-75 transition-opacity duration-200"
            />
          </div>
        ))}
      </div>

      {selectedImage && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
          <div className="relative w-full max-w-5xl bg-white rounded-lg shadow-xl overflow-hidden">
            <div className="absolute top-0 right-0 p-4">
              <button
                className="p-2 rounded-full bg-black/20 text-white hover:bg-black/30 transition-colors duration-200"
                onClick={handleClosePopup}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="aspect-[16/9] relative w-full">
              <Image
                src={`https://dmpsza32x691.cloudfront.net/${selectedImage}`}
                alt="Selected Image"
                layout="fill"
                objectFit="contain"
                className="bg-gray-900"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Page;