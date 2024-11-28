'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import LoadingSpinner from '../../../../components/LoadingSpinner';
import { toast } from 'react-hot-toast';

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

export default function CreateWebStory() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [slides, setSlides] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    type: 'Web Story',
    status: 'draft'
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

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
    setSlides(prev => [...prev, ...newSlides]);
  };

  const handleSlideChange = (updatedSlide) => {
    setSlides(prev => prev.map(slide => 
      slide.id === updatedSlide.id ? updatedSlide : slide
    ));
  };

  const handleSlideRemove = (slideId) => {
    setSlides(prev => prev.filter(slide => slide.id !== slideId));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formDataToSend = new FormData();
      
      // Append text data
      Object.entries(formData).forEach(([key, value]) => {
        formDataToSend.append(key, value);
      });

      // Append slides data
      slides.forEach((slide, index) => {
        formDataToSend.append(`slides[${index}][image]`, slide.image);
        formDataToSend.append(`slides[${index}][title]`, slide.title);
        formDataToSend.append(`slides[${index}][description]`, slide.description);
        formDataToSend.append(`slides[${index}][ctaText]`, slide.ctaText);
        formDataToSend.append(`slides[${index}][ctaLink]`, slide.ctaLink);
      });

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts`, {
        method: 'POST',
        body: formDataToSend,
      });

      if (!response.ok) {
        throw new Error('Failed to create web story');
      }

      toast.success('Web story created successfully!');
      router.push('/posts/web-story');
      router.refresh();
    } catch (error) {
      console.error('Error creating web story:', error);
      toast.error('Failed to create web story');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold mb-6">Create New Web Story</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Story Title
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Story Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              required
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Add Slides
            </label>
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

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Status
            </label>
            <select
              name="status"
              value={formData.status}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="draft">Draft</option>
              <option value="published">Published</option>
            </select>
          </div>

          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={() => router.back()}
              className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:bg-blue-300"
            >
              {loading ? <LoadingSpinner /> : 'Create Web Story'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
