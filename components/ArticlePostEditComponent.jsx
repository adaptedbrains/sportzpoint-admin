'use client';
import Image from 'next/image';
import React, { useState, useEffect } from 'react';
import { FaPlusCircle } from 'react-icons/fa';

const ArticlePostEditComponent = ({ onTitleChange, onMetaDescriptionChange, onSummaryChange }) => {
  const [title, setTitle] = useState('');
  const [englishTitle, setEnglishTitle] = useState('');
  const [summary, setSummary] = useState('');
  const [metaDescription, setMetaDescription] = useState('');
  const [featuredImage, setFeaturedImage] = useState(null);
  const [dragOver, setDragOver] = useState(false);

  // Auto-generate English title from title
  useEffect(() => {
    const generateEnglishTitle = (text) => {
      return text
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '') // Remove special characters
        .trim()
        .replace(/\s+/g, '-'); // Replace spaces with hyphens
    };

    if (title) {
      setEnglishTitle(generateEnglishTitle(title));
    }
  }, [title]);

  const handleTitleChange = (e) => {
    const newTitle = e.target.value;
    setTitle(newTitle);
    onTitleChange?.(newTitle);
  };

  const handleEnglishTitleChange = (e) => {
    const newEnglishTitle = e.target.value
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .trim()
      .replace(/\s+/g, '-');
    setEnglishTitle(newEnglishTitle);
  };

  const handleSummaryChange = (e) => {
    const newSummary = e.target.value.slice(0, 250);
    setSummary(newSummary);
    onSummaryChange?.(newSummary);
  };

  const handleMetaDescriptionChange = (e) => {
    const newMetaDesc = e.target.value.slice(0, 160);
    setMetaDescription(newMetaDesc);
    onMetaDescriptionChange?.(newMetaDesc);
  };

  const handleFeaturedImageChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) {
      setFeaturedImage(URL.createObjectURL(file));
    } else {
      alert('Please upload a valid image file!');
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = () => {
    setDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      setFeaturedImage(URL.createObjectURL(file));
    } else {
      alert('Please upload a valid image file!');
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Manage Post Properties</h2>

      {/* Title */}
      <div className="mb-4">
        <label htmlFor="title" className="block text-sm font-medium text-gray-700">
          Title
        </label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={handleTitleChange}
          placeholder="Enter post title"
          className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-200 focus:border-indigo-500 sm:text-sm"
        />
      </div>

      {/* English Title */}
      <div className="mb-4">
        <label htmlFor="englishTitle" className="block text-sm font-medium text-gray-700">
          English Title (Permalink)
        </label>
        <div className="mt-1 flex rounded-md shadow-sm">
          <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 sm:text-sm">
            /article/
          </span>
          <input
            type="text"
            id="englishTitle"
            value={englishTitle}
            onChange={handleEnglishTitleChange}
            className="flex-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-none rounded-r-md focus:outline-none focus:ring-indigo-200 focus:border-indigo-500 sm:text-sm"
            placeholder="auto-generated-url-slug"
          />
        </div>
      </div>

      {/* Summary */}
      <div className="mb-4">
        <label htmlFor="summary" className="block text-sm font-medium text-gray-700">
          Summary
        </label>
        <textarea
          id="summary"
          value={summary}
          onChange={handleSummaryChange}
          rows={3}
          placeholder="Brief summary of the article"
          className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-200 focus:border-indigo-500 sm:text-sm"
        />
        <div className="text-sm text-gray-500 mt-1 flex justify-between">
          <span>{summary.length} / 250 characters</span>
          {summary.length > 200 && (
            <span className="text-yellow-600">Approaching limit</span>
          )}
        </div>
      </div>

      {/* Meta Description */}
      <div className="mb-4">
        <label htmlFor="metaDescription" className="block text-sm font-medium text-gray-700">
          Meta Description
        </label>
        <textarea
          id="metaDescription"
          value={metaDescription}
          onChange={handleMetaDescriptionChange}
          rows={2}
          placeholder="SEO meta description"
          className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-200 focus:border-indigo-500 sm:text-sm"
        />
        <div className="text-sm text-gray-500 mt-1 flex justify-between">
          <span>{metaDescription.length} / 160 characters</span>
          {metaDescription.length > 140 && (
            <span className="text-yellow-600">Approaching limit</span>
          )}
        </div>
      </div>

      {/* Featured Image */}
      <div className="mb-4">
        <label htmlFor="featuredImage" className="block text-sm font-medium text-gray-700">
          Featured Image
        </label>
        <div
          className={`flex items-center justify-center w-full h-40 mt-1 border rounded-md cursor-pointer transition-all duration-200 ${
            dragOver ? 'border-blue-500 bg-blue-50' : 'border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100'
          }`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <input
            type="file"
            id="featuredImage"
            onChange={handleFeaturedImageChange}
            accept="image/*"
            className="hidden"
          />
          <label
            htmlFor="featuredImage"
            className="flex items-center justify-center w-full h-full"
          >
            {featuredImage ? (
              <Image
                src={featuredImage}
                alt="Featured"
                width={500}
                height={100}
                className="object-cover w-full h-full rounded-md"
              />
            ) : (
              <div className="text-center">
                <FaPlusCircle className="mx-auto h-8 w-8 text-gray-400" />
                <p className="mt-2 text-sm text-gray-500">
                  Add Featured Image
                  <br />
                  <span className="text-xs">Recommended Size: 1280x720</span>
                </p>
              </div>
            )}
          </label>
        </div>
      </div>
    </div>
  );
};

export default ArticlePostEditComponent;