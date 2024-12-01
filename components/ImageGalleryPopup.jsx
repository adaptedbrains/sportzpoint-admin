import Image from "next/image";
import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";

const ImageGalleryPopup = ({ onSelect, onClose, onImageSelect,onCaption,caption }) => {
  const [images, setImages] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

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
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching images:", error);
        setIsLoading(false);
      }
    };
    
    if(caption==='deleteData'){
      onCaption("")
    }
    onCaption("")
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
    if (selectedImage) {
      onImageSelect &&
        onImageSelect(`https://dmpsza32x691.cloudfront.net/${selectedImage}`);
      onSelect && onSelect(selectedImage);
      onClose();
    }
  };

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append("file", file);
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
        }
      } catch (error) {
        console.error("Error uploading file:", error);
      }
    }
  };

  return (
    <div className="fixed inset-0 z-[9999] bg-zinc-900/30 backdrop-blur-sm flex justify-center items-center ">
      <div className="bg-white rounded-lg w-3/4 h-[70vh] max-w-4xl p-7 relative flex">
        {/* Left Section: Image Gallery */}
        <div className="w-2/3 pr-4 border-r">
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
              <input
                type="text"
                placeholder="Search by name or alt text"
                className="w-full p-2 border rounded mb-4"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />

              <div className="grid grid-cols-4 gap-2">
                {displayedImages.map((img, index) => (
                  <div
                    key={index}
                    className={`aspect-w-1 aspect-h-1 relative h-32 cursor-pointer rounded overflow-hidden border ${
                      selectedImage === img
                        ? "border-blue-500"
                        : "border-gray-300"
                    }`}
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

              <div className="mt-4 flex justify-end ">
                <button
                  className="px-4 py-2 bg-blue-500 w-full text-white rounded hover:bg-blue-600 disabled:opacity-50"
                  disabled={!selectedImage ||caption==="" }
                  onClick={handleConfirm}
                >
                  OK
                </button>
              </div>
            </>
          )}
        </div>

        {/* Right Section: Selected Image and Upload */}
        <div className="w-1/3 pl-4 flex flex-col items-center">
          <div className="w-full mb-4">
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

          {selectedImage && (
            <>
              <div className="w-full aspect-w-1 h-80 aspect-h-1 relative border rounded overflow-hidden">
                <Image
                  src={`https://dmpsza32x691.cloudfront.net/${selectedImage}`}
                  alt="Selected Image"
                  layout="fill"
                  objectFit="cover"
                />
              </div>
              {caption !== 'deleteData' && <div className="mt-2 bg-red-50 w-full">
                <textarea type="text" placeholder="Alt Text " className="border p-1 focus:outline-none text-sm w-full" value={caption} onChange={(e)=>onCaption(e.target.value)} />
              </div>}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ImageGalleryPopup;
