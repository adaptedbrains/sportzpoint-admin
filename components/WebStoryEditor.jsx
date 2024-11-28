'use client';

import { useState } from 'react';

const WebStorySlide = ({ slide, onSlideChange, onRemove }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    onSlideChange({ ...slide, [name]: value });
  };

  return (
    <div className="border p-4 rounded-lg mb-4 bg-white shadow-sm">
      <div className="relative">
        <img 
          src={slide.imagePreview} 
          alt="Slide preview" 
          className="w-full h-48 object-cover rounded-md mb-4"
        />
        <button
          onClick={() => onRemove(slide.id)}
          className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600"
        >
          ×
        </button>
      </div>
      <div className="space-y-3">
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={slide.title}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <textarea
          name="description"
          placeholder="Description"
          value={slide.description}
          onChange={handleChange}
          rows={3}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="text"
          name="ctaText"
          placeholder="CTA Text"
          value={slide.ctaText}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="text"
          name="ctaLink"
          placeholder="CTA Link"
          value={slide.ctaLink}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
    </div>
  );
};

const WebStoryEditor = ({ content, onContentChange }) => {
  const [slides, setSlides] = useState(content?.slides || []);

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const newSlides = files.map(file => ({
      id: Date.now() + Math.random(),
      image: file,
      imagePreview: URL.createObjectURL(file),
      title: '',
      description: '',
      ctaText: '',
      ctaLink: ''
    }));
    const updatedSlides = [...slides, ...newSlides];
    setSlides(updatedSlides);
    onContentChange(updatedSlides);
  };

  const handleSlideChange = (updatedSlide) => {
    const updatedSlides = slides.map(slide => 
      slide.id === updatedSlide.id ? updatedSlide : slide
    );
    setSlides(updatedSlides);
    onContentChange(updatedSlides);
  };

  const handleSlideRemove = (slideId) => {
    const updatedSlides = slides.filter(slide => slide.id !== slideId);
    setSlides(updatedSlides);
    onContentChange(updatedSlides);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg">
      <div className="border-b border-gray-200 p-4">
        <h2 className="text-xl font-semibold text-gray-800">Web Story Slides</h2>
      </div>
      <div className="p-4">
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={handleImageUpload}
          className="w-full mb-4"
        />
        <div className="space-y-4">
          {slides.map(slide => (
            <WebStorySlide
              key={slide.id}
              slide={slide}
              onSlideChange={handleSlideChange}
              onRemove={handleSlideRemove}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default WebStoryEditor;
