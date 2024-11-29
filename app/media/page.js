'use client'
import Image from "next/image";
import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";

const Page = () => {
  const [images, setImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

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
    }
  };

  return (
    <div className="p-6 mt-12">
      <div className="mb-4">
        <label className="block text-center bg-blue-500 text-white py-2 px-4 rounded cursor-pointer hover:bg-blue-600">
          Upload Image
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileUpload}
          />
        </label>
      </div>

      {isLoading && <div className="text-center">Uploading...</div>}

      <div className="grid grid-cols-4 gap-4">
        {images.map((img, index) => (
          <div
            key={index}
            className="aspect-w-1 aspect-h-1 relative h-32 cursor-pointer rounded overflow-hidden border border-gray-300"
            onClick={() => handleImageClick(img)}
          >
            <Image
              src={`https://dmpsza32x691.cloudfront.net/${img}`}
              alt={`Image ${index + 1}`}
              layout="fill"
              objectFit="cover"
            />
          </div>
        ))}
      </div>

      {selectedImage && (
        <div className="fixed inset-0  bg-black bg-opacity-75 flex justify-center items-center z-50">
          <div className="relative w-3/4 max-w-4xl z-50 bg-gray-600">
            <button
              className="absolute top-2 right-2 z-50 text-white text-2xl"
              onClick={handleClosePopup}
            >
              ✕
            </button>
            <div className="aspect-w-1 aspect-h-1 relative w-full h-[70vh]">
              <Image
                src={`https://dmpsza32x691.cloudfront.net/${selectedImage}`}
                alt="Selected Image"
                layout="fill"
                objectFit="contain"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Page;