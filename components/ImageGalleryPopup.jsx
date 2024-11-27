import Image from 'next/image';
import React, { useState, useEffect } from 'react';

const ImageGalleryPopup = ({ onSelect, onClose }) => {
  const [images, setImages] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  const IMAGES_PER_PAGE = 8; // Number of images per page

  // Fetch images from the server when the component loads
  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/media/img`);
        const data = await response.json();

        setImages(data.files || []);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching images:', error);
        setIsLoading(false);
      }
    };

    fetchImages();
  }, []);

  // Filtered images based on the search query
  const filteredImages = images.filter(
    (img) => img.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Pagination logic
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
    if (selectedImage) {
      onSelect(selectedImage);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg w-3/4 max-w-4xl p-4 relative">
        {/* Close button */}
        <button
          className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
          onClick={onClose}
        >
          ✕
        </button>

        {isLoading ? (
          <div className="text-center py-10">Loading...</div>
        ) : (
          <>
            {/* Search bar */}
            <input
              type="text"
              placeholder="Search by name or alt text"
              className="w-full p-2 border rounded mb-4"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />

            {/* Image grid */}
            <div className="grid grid-cols-4 gap-4">
              {displayedImages.map((img, index) => (
                <div
                  key={index}
                  className={`p-1 border rounded cursor-pointer ${
                    selectedImage === img ? 'border-blue-500' : 'border-gray-300'
                  }`}
                  onClick={() => handleImageClick(img)}
                >
                  <Image
                    src={`https://sportzpoint-media.s3.ap-south-1.amazonaws.com/${img}`}
                    alt={`Image ${index + 1}`}
                    width={250}
                    height={300}
                  />
                </div>
              ))}
            </div>

            {/* Pagination controls */}
            {totalPages > 1 && (
              <div className="flex justify-between items-center mt-4">
                <button
                  disabled={currentPage === 1}
                  className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
                  onClick={() => handlePageChange(currentPage - 1)}
                >
                  Previous
                </button>
                <span>
                  Page {currentPage} of {totalPages}
                </span>
                <button
                  disabled={currentPage === totalPages}
                  className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
                  onClick={() => handlePageChange(currentPage + 1)}
                >
                  Next
                </button>
              </div>
            )}

            {/* Confirm button */}
            <div className="mt-4 flex justify-end">
              <button
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
                disabled={!selectedImage}
                onClick={handleConfirm}
              >
                OK
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ImageGalleryPopup;