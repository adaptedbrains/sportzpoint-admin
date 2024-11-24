'use client';
import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Image from 'next/image';

const LiveBlogEditComponent = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get('id');
  
  const [title, setTitle] = useState('');
  const [englishTitle, setEnglishTitle] = useState('');
  const [summary, setSummary] = useState('');
  const [metaDescription, setMetaDescription] = useState('');
  const [featuredImage, setFeaturedImage] = useState(null);
  const [credits, setCredits] = useState('');
  const [categories, setCategories] = useState('');
  const [status, setStatus] = useState('draft');
  const [dragOver, setDragOver] = useState(false);

  useEffect(() => {
    if (id) {
      // Fetch blog data if editing
      // This is where you'd make an API call to get the blog data
      // For now, we'll just console.log
      console.log('Fetching blog data for id:', id);
    }
  }, [id]);

  // ... same image handling functions as ArticlePostEditComponent ...

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">
        {id ? 'Edit Live Blog' : 'Create New Live Blog'}
      </h2>

      {/* Title */}
      <div className="mb-4">
        <label htmlFor="title" className="block text-sm font-medium text-gray-700">
          Title
        </label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-200 focus:border-indigo-500 sm:text-sm"
        />
      </div>

      {/* English Title */}
      <div className="mb-4">
        <label htmlFor="englishTitle" className="block text-sm font-medium text-gray-700">
          English Title (Permalink)
        </label>
        <input
          type="text"
          id="englishTitle"
          value={englishTitle}
          onChange={(e) => setEnglishTitle(e.target.value)}
          className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-200 focus:border-indigo-500 sm:text-sm"
        />
      </div>

      {/* Credits */}
      <div className="mb-4">
        <label htmlFor="credits" className="block text-sm font-medium text-gray-700">
          Credits (comma separated)
        </label>
        <input
          type="text"
          id="credits"
          value={credits}
          onChange={(e) => setCredits(e.target.value)}
          className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-200 focus:border-indigo-500 sm:text-sm"
        />
      </div>

      {/* Categories */}
      <div className="mb-4">
        <label htmlFor="categories" className="block text-sm font-medium text-gray-700">
          Categories (comma separated)
        </label>
        <input
          type="text"
          id="categories"
          value={categories}
          onChange={(e) => setCategories(e.target.value)}
          className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-200 focus:border-indigo-500 sm:text-sm"
        />
      </div>

      {/* Status */}
      <div className="mb-4">
        <label htmlFor="status" className="block text-sm font-medium text-gray-700">
          Status
        </label>
        <select
          id="status"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-200 focus:border-indigo-500 sm:text-sm"
        >
          <option value="draft">Draft</option>
          <option value="pending">Pending Approval</option>
          <option value="scheduled">Scheduled</option>
          <option value="published">Published</option>
        </select>
      </div>

      {/* Featured Image - same as ArticlePostEditComponent */}
      <div className="mb-4">
        {/* ... Featured image component ... */}
      </div>
    </div>
  );
};

export default LiveBlogEditComponent;