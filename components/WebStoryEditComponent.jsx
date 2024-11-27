'use client';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { FaPlusCircle, FaTrash, FaArrowUp, FaArrowDown } from 'react-icons/fa';
import { usePathname } from 'next/navigation';
import useAllPostDataStore from '../store/useAllPostDataStore';

const WebStoryEditComponent = ({ handleWebStoryFormData, formDataPostEdit }) => {
  const { allPosts } = useAllPostDataStore();
  const pathname = usePathname();
  const parts = pathname.split('/');
  const id = parts[3];

  const [thumbnail, setThumbnail] = useState("");
  const [dragOver, setDragOver] = useState(false);
  const [slides, setSlides] = useState([]);

  useEffect(() => {
    const requiredData = allPosts.find((a) => a._id === id);
    if (requiredData) {
      handleWebStoryFormData('title', requiredData.title);
      handleWebStoryFormData('seo_desc', requiredData.seo_desc);
      setThumbnail(requiredData.thumbnail ? `https://img-cdn.thepublive.com/fit-in/1280x960/filters:format(webp)/sportzpoint/media/${requiredData.thumbnail}` : "");
      setSlides(requiredData.slides || []);
    }
  }, [id, allPosts]);

  const handleTitleChange = (e) => {
    handleWebStoryFormData('title', e.target.value);
  };

  const handleMetaDescriptionChange = (e) => {
    handleWebStoryFormData('seo_desc', e.target.value);
  };

  const handleThumbnailChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) {
      setThumbnail(URL.createObjectURL(file));
      handleWebStoryFormData('thumbnail', file);
    }
  };

  const handleAddSlide = () => {
    setSlides([...slides, {
      image: '',
      title: '',
      description: '',
      cta_link: '',
      cta_text: ''
    }]);
  };

  const handleSlideChange = (index, field, value) => {
    const updatedSlides = [...slides];
    updatedSlides[index][field] = value;
    setSlides(updatedSlides);
    handleWebStoryFormData('slides', updatedSlides);
  };

  const handleSlideImageChange = (index, file) => {
    if (file && file.type.startsWith('image/')) {
      const updatedSlides = [...slides];
      updatedSlides[index].image = URL.createObjectURL(file);
      setSlides(updatedSlides);
      handleWebStoryFormData('slides', updatedSlides);
    }
  };

  const handleRemoveSlide = (index) => {
    const updatedSlides = slides.filter((_, i) => i !== index);
    setSlides(updatedSlides);
    handleWebStoryFormData('slides', updatedSlides);
  };

  const moveSlide = (index, direction) => {
    const newSlides = [...slides];
    const newIndex = index + direction;
    if (newIndex >= 0 && newIndex < slides.length) {
      [newSlides[index], newSlides[newIndex]] = [newSlides[newIndex], newSlides[index]];
      setSlides(newSlides);
      handleWebStoryFormData('slides', newSlides);
    }
  };

  return (
    <div className="rounded-lg border bg-white">
      <div className="p-4 border-b flex justify-between items-center">
        <div>
          <h2 className="text-lg font-medium">Web Story Properties</h2>
          <p className="text-sm text-gray-500">Total Slides: {slides.length}</p>
        </div>
        <button
          onClick={handleAddSlide}
          className="flex items-center gap-2 px-4 py-2 text-sm text-white bg-blue-600 rounded-md hover:bg-blue-700"
        >
          <FaPlusCircle /> Add Slide
        </button>
      </div>

      <div className="p-4 space-y-4">
        {/* Title */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-500">Title</label>
          <input
            type="text"
            value={formDataPostEdit.title || ''}
            onChange={handleTitleChange}
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>

        {/* Meta Description */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-500">
            Meta Description
          </label>
          <textarea
            value={formDataPostEdit.seo_desc || ''}
            onChange={handleMetaDescriptionChange}
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
          <div className="text-sm text-gray-500 mt-1">
            {formDataPostEdit.seo_desc ? formDataPostEdit.seo_desc.split(" ").length : 0} / 160
          </div>
        </div>

        {/* Thumbnail (Optional) */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-500">
            Thumbnail (Optional)
          </label>
          <div className="mt-1 flex items-center justify-center w-full h-40 border border-dashed border-gray-300 rounded-md">
            <input
              type="file"
              id="thumbnail"
              onChange={handleThumbnailChange}
              className="hidden"
              accept="image/*"
            />
            <label
              htmlFor="thumbnail"
              className="w-full h-full flex items-center justify-center cursor-pointer"
            >
              {thumbnail ? (
                <Image
                  src={thumbnail}
                  alt="Thumbnail"
                  width={500}
                  height={400}
                  className="object-cover w-full h-full rounded-md"
                />
              ) : (
                <div className="text-center">
                  <FaPlusCircle className="mx-auto h-12 w-12 text-gray-400" />
                  <p className="mt-2 text-sm text-gray-500">Add Thumbnail</p>
                </div>
              )}
            </label>
          </div>
        </div>

        {/* Slides */}
        <div className="space-y-6">
          {slides.map((slide, index) => (
            <div key={index} className="border rounded-lg p-4">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium">Slide {index + 1}</h3>
                <div className="flex gap-2">
                  <button
                    onClick={() => moveSlide(index, -1)}
                    disabled={index === 0}
                    className="p-2 text-gray-500 hover:bg-gray-100 rounded-md disabled:opacity-50"
                  >
                    <FaArrowUp />
                  </button>
                  <button
                    onClick={() => moveSlide(index, 1)}
                    disabled={index === slides.length - 1}
                    className="p-2 text-gray-500 hover:bg-gray-100 rounded-md disabled:opacity-50"
                  >
                    <FaArrowDown />
                  </button>
                  <button
                    onClick={() => handleRemoveSlide(index)}
                    className="p-2 text-red-500 hover:bg-red-50 rounded-md"
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>

              {/* Slide Image */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-500">
                  Slide Image
                </label>
                <div className="mt-1 flex items-center justify-center w-full h-64 border border-dashed border-gray-300 rounded-md">
                  <input
                    type="file"
                    id={`slide-image-${index}`}
                    onChange={(e) => handleSlideImageChange(index, e.target.files[0])}
                    className="hidden"
                    accept="image/*"
                  />
                  <label
                    htmlFor={`slide-image-${index}`}
                    className="w-full h-full flex items-center justify-center cursor-pointer"
                  >
                    {slide.image ? (
                      <Image
                        src={slide.image}
                        alt={`Slide ${index + 1}`}
                        width={500}
                        height={400}
                        className="object-cover w-full h-full rounded-md"
                      />
                    ) : (
                      <div className="text-center">
                        <FaPlusCircle className="mx-auto h-12 w-12 text-gray-400" />
                        <p className="mt-2 text-sm text-gray-500">Add Slide Image</p>
                      </div>
                    )}
                  </label>
                </div>
              </div>

              {/* Slide Properties */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-500">
                    Title
                  </label>
                  <input
                    type="text"
                    value={slide.title}
                    onChange={(e) => handleSlideChange(index, 'title', e.target.value)}
                    className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-500">
                    Description
                  </label>
                  <textarea
                    value={slide.description}
                    onChange={(e) => handleSlideChange(index, 'description', e.target.value)}
                    className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-500">
                    CTA Link (Optional)
                  </label>
                  <input
                    type="url"
                    value={slide.cta_link}
                    onChange={(e) => handleSlideChange(index, 'cta_link', e.target.value)}
                    className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-500">
                    CTA Text (Optional)
                  </label>
                  <input
                    type="text"
                    value={slide.cta_text}
                    onChange={(e) => handleSlideChange(index, 'cta_text', e.target.value)}
                    className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WebStoryEditComponent;