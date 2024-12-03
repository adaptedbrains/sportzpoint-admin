import Image from "next/image";
import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";

const ImageGalleryPopup = ({ onSelect, onClose, onImageSelect }) => {
  const [images, setImages] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [altText, setAltText] = useState("");
  const [imageAltTexts, setImageAltTexts] = useState({});
  const [error, setError] = useState("");

  const IMAGES_PER_PAGE = 8;

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
        if (data.altTexts) {
          setImageAltTexts(data.altTexts);
        }
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching images:", error);
        setIsLoading(false);
      }
    };
    
    fetchImages();
  }, []);

  useEffect(() => {
    // When an image is selected, populate alt text if it exists
    if (selectedImage && imageAltTexts[selectedImage]) {
      setAltText(imageAltTexts[selectedImage]);
    } else {
      setAltText(""); // Reset alt text when selecting a new image
    }
    setError(""); // Clear any previous errors
  }, [selectedImage, imageAltTexts]);

  const filteredImages = images.filter((img) =>
    img.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(filteredImages.length / IMAGES_PER_PAGE);
  const displayedImages = filteredImages.slice(
    (currentPage - 1) * IMAGES_PER_PAGE,
    currentPage * IMAGES_PER_PAGE
  );

  const handleImageClick = (img) => {
    setSelectedImage(img);
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const validateAndConfirm = () => {
    if (!selectedImage) {
      setError("Please select an image");
      return;
    }
    if (!altText.trim()) {
      setError("Alt text is required for accessibility. Please describe the image.");
      return;
    }

    // Store the alt text for this image
    setImageAltTexts(prev => ({
      ...prev,
      [selectedImage]: altText.trim()
    }));
    
    if (onImageSelect) {
      onImageSelect(`https://dmpsza32x691.cloudfront.net/${selectedImage}`, altText.trim());
    }
    if (onSelect) {
      onSelect(selectedImage);
    }
    onClose();
  };

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("altText", ""); // No default alt text
      
      try {
        setIsLoading(true);
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

        if (!response.ok) {
          throw new Error('Upload failed');
        }

        const data = await response.json();
        if (data.fileName) {
          setSelectedImage(data.fileName);
          // Update the images list and refresh from server
          const updatedResponse = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/media/img`,
            {
              method: "GET",
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
              },
            }
          );
          const updatedData = await updatedResponse.json();
          setImages(updatedData.files || []);
          setImageAltTexts(prev => ({
            ...prev,
            [data.fileName]: "" // No default alt text
          }));
          setCurrentPage(1);
          setError("");
        }
      } catch (error) {
        console.error("Error uploading file:", error);
        setError("Failed to upload image. Please try again.");
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="fixed inset-0 z-[9999] bg-black/50 backdrop-blur-sm flex justify-center items-center p-4">
      <div className="bg-white rounded-xl w-[90%] h-[85vh] max-w-5xl shadow-2xl relative flex flex-col">
        {/* Header */}
        <div className="px-6 py-4 border-b flex justify-between items-center">
          <h2 className="text-xl font-semibold text-gray-800">Image Gallery</h2>
          <button
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            onClick={onClose}
            aria-label="Close"
          >
            <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="flex-1 flex overflow-hidden">
          {/* Left Section: Image Gallery */}
          <div className="w-2/3 p-6 flex flex-col border-r">
            {isLoading ? (
              <div className="flex-1 flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-4 border-gray-200 border-t-blue-500"></div>
              </div>
            ) : (
              <>
                <div className="relative mb-6">
                  <input
                    type="text"
                    placeholder="Search images..."
                    className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  <svg className="w-5 h-5 text-gray-400 absolute left-3 top-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>

                <div className="flex-1 overflow-y-auto">
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {displayedImages.map((img, index) => (
                      <div
                        key={`image-${img}-${index}`}
                        className={`group aspect-square relative cursor-pointer rounded-lg overflow-hidden transition-transform hover:scale-[1.02] ${
                          selectedImage === img
                            ? "ring-2 ring-blue-500 ring-offset-2"
                            : "hover:shadow-lg"
                        }`}
                        onClick={() => handleImageClick(img)}
                      >
                        <Image
                          src={`https://dmpsza32x691.cloudfront.net/${img}`}
                          alt={imageAltTexts[img] || `Image ${index + 1}`}
                          layout="fill"
                          objectFit="cover"
                          className="transition-transform group-hover:scale-105"
                        />
                        {selectedImage === img && (
                          <div className="absolute inset-0 bg-blue-500/20 flex items-center justify-center">
                            <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          </div>
                        )}
                        {imageAltTexts[img] && (
                          <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white text-xs p-1 truncate">
                            {imageAltTexts[img]}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex justify-center mt-4 space-x-2">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <button
                      key={`page-${page}`}
                      onClick={() => handlePageChange(page)}
                      className={`px-3 py-1 rounded ${
                        currentPage === page
                          ? "bg-blue-500 text-white"
                          : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                      }`}
                    >
                      {page}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>

          {/* Right Section: Image Details & Actions */}
          <div className="w-1/3 p-6 flex flex-col">
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Alt Text <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={altText}
                onChange={(e) => {
                  setAltText(e.target.value);
                  setError("");
                }}
                placeholder="Alt text is required"
                className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 ${
                  error && !altText.trim() ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {error && (
                <p className="mt-2 text-sm text-red-600">
                  {error}
                </p>
              )}
            </div>

            <div className="space-y-4">
              <label className="block">
                <span className="sr-only">Upload Image</span>
                <div className="relative">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="hidden"
                    id="file-upload"
                  />
                  <label
                    htmlFor="file-upload"
                    className="cursor-pointer w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    Upload New Image
                  </label>
                </div>
              </label>

              <button
                onClick={validateAndConfirm}
                disabled={!selectedImage || !altText.trim()}
                className="w-full inline-flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {!selectedImage ? 'Select an Image' : !altText.trim() ? 'Add Alt Text' : 'Confirm Selection'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageGalleryPopup;
