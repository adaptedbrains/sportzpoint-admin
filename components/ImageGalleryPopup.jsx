import Image from "next/image";
import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";

const ImageGalleryPopup = ({ onSelect, onClose, onImageSelect, onCaption, caption }) => {
  const [images, setImages] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [uploadCaption, setUploadCaption] = useState("");
  const [imageAltTexts, setImageAltTexts] = useState({});

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
        // Initialize alt texts from the API response if available
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

  const handleConfirm = () => {
    if (selectedImage && uploadCaption.trim()) {
      onImageSelect &&
        onImageSelect(`https://dmpsza32x691.cloudfront.net/${selectedImage}`);
      onSelect && onSelect(selectedImage);
      // Pass the alt text back when confirming image selection
      onCaption && onCaption(uploadCaption.trim());
      onClose();
    }
  };

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("altText", uploadCaption); // Send alt text with the upload
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
          setSelectedImage(data.fileName);
          setImages((prev) => [data.fileName, ...prev]);
          // Store the alt text
          setImageAltTexts(prev => ({
            ...prev,
            [data.fileName]: uploadCaption
          }));
          setUploadCaption(""); // Reset upload caption
        }
      } catch (error) {
        console.error("Error uploading file:", error);
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
                        key={index}
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

                {totalPages > 1 && (
                  <div className="flex justify-between items-center mt-6 pt-4 border-t">
                    <button
                      disabled={currentPage === 1}
                      className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                      onClick={() => handlePageChange(currentPage - 1)}
                    >
                      Previous
                    </button>
                    <span className="text-sm text-gray-600">
                      Page {currentPage} of {totalPages}
                    </span>
                    <button
                      disabled={currentPage === totalPages}
                      className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                      onClick={() => handlePageChange(currentPage + 1)}
                    >
                      Next
                    </button>
                  </div>
                )}
              </>
            )}
          </div>

          {/* Right Section: Selected Image and Upload */}
          <div className="w-1/3 p-6 flex flex-col">
            <div className="mb-6">
              <label className="block w-full text-center bg-blue-500 text-white py-3 px-4 rounded-lg cursor-pointer hover:bg-blue-600 transition-colors focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500">
                <svg className="w-5 h-5 inline-block mr-2 -mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                </svg>
                Upload New Image
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleFileUpload}
                />
              </label>
            </div>

            {selectedImage ? (
              <>
                <div className="flex-1 flex flex-col">
                  <div className="relative aspect-video w-full rounded-lg overflow-hidden bg-gray-100 mb-4">
                    <Image
                      src={`https://dmpsza32x691.cloudfront.net/${selectedImage}`}
                      alt={imageAltTexts[selectedImage] || "Selected Image"}
                      layout="fill"
                      objectFit="contain"
                    />
                  </div>
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="altText" className="block text-sm font-medium text-gray-700 mb-1">
                        Alt Text (required)
                      </label>
                      <input
                        id="altText"
                        type="text"
                        placeholder="Describe this image..."
                        className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        value={uploadCaption}
                        onChange={(e) => setUploadCaption(e.target.value)}
                      />
                    </div>
                    <button
                      className="w-full px-4 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                      disabled={!selectedImage || !uploadCaption.trim()}
                      onClick={handleConfirm}
                    >
                      {!uploadCaption.trim() ? 'Please add alt text' : 'Insert Image'}
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center text-gray-500">
                <div className="text-center">
                  <svg className="w-16 h-16 mx-auto mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <p>Select an image to preview</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageGalleryPopup;
