'use client';
import { useState, useEffect } from 'react';
import Select from 'react-select';

function RestOfPostEdit() {
  const [formData, setFormData] = useState({
    primaryCategory: null,
    additionalCategories: [],
    tags: [],
    credits: [],
    focusKeyphrase: '',
  });

  // Options for dropdowns
  const categoryOptions = [
    { value: 'cricket', label: 'Cricket' },
    { value: 'football', label: 'Football' },
    { value: 'basketball', label: 'Basketball' },
    { value: 'tennis', label: 'Tennis' },
  ];

  const tagOptions = [
    { value: 'ipl', label: 'IPL' },
    { value: 'worldcup', label: 'World Cup' },
    { value: 'premier-league', label: 'Premier League' },
    { value: 'nba', label: 'NBA' },
  ];

  const creditOptions = [
    { value: 'author1', label: 'Author 1' },
    { value: 'author2', label: 'Author 2' },
    { value: 'author3', label: 'Author 3' },
  ];

  // Handle changes for all form fields
  const handleChange = (value, field) => {
    const updatedFormData = { ...formData, [field]: value };
    setFormData(updatedFormData);
    
    // Log the entire form data on every change
    console.log('Form Data Updated:', updatedFormData);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Manage Post Properties</h2>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Primary Category *
        </label>
        <Select
          value={formData.primaryCategory}
          onChange={(value) => handleChange(value, 'primaryCategory')}
          options={categoryOptions}
          className="basic-single"
          classNamePrefix="select"
          isClearable
          placeholder="Select Primary Category"
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Additional Categories
        </label>
        <Select
          isMulti
          value={formData.additionalCategories}
          onChange={(value) => handleChange(value, 'additionalCategories')}
          options={categoryOptions}
          className="basic-multi-select"
          classNamePrefix="select"
          placeholder="Select Additional Categories"
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Tags
        </label>
        <Select
          isMulti
          value={formData.tags}
          onChange={(value) => handleChange(value, 'tags')}
          options={tagOptions}
          className="basic-multi-select"
          classNamePrefix="select"
          placeholder="Select Tags"
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Credits *
        </label>
        <Select
          isMulti
          value={formData.credits}
          onChange={(value) => handleChange(value, 'credits')}
          options={creditOptions}
          className="basic-multi-select"
          classNamePrefix="select"
          placeholder="Select Credits"
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Focus Keyphrase
        </label>
        <input
          type="text"
          value={formData.focusKeyphrase}
          onChange={(e) => handleChange(e.target.value, 'focusKeyphrase')}
          className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-200 focus:border-indigo-500 sm:text-sm"
          placeholder="Enter focus keyphrase"
        />
      </div>
    </div>
  );
}

export default RestOfPostEdit;
