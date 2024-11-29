'use client';
// import useDropDownDataStore from '@/store/dropDownDataStore';
import useDropDownDataStore from '../store/dropDownDataStore';
import { useState, useEffect } from 'react';
import Select from 'react-select';

function RestOfPostEdit({ formData, setFormData }) {
  const { allTags, allCategory, allRoleBaseUser, fetchDropDownData } = useDropDownDataStore();

  useEffect(() => {
    // Fetch the dropdown data for categories, tags, and credits
    fetchDropDownData(`${process.env.NEXT_PUBLIC_API_URL}/category`, 'category');
    fetchDropDownData(`${process.env.NEXT_PUBLIC_API_URL}/tag`, 'tag');
    fetchDropDownData(`${process.env.NEXT_PUBLIC_API_URL}/user`, 'roleBaseUser');
  }, [fetchDropDownData]);

  // Options for dropdowns
  const categoryOptions = allCategory.map((cat) => ({
    value: cat._id,
    label: cat.name,
  }));

  const tagOptions = allTags.map((tag) => ({
    value: tag._id,
    label: tag.name,
  }));

  const creditOptions = allRoleBaseUser.map((role) => ({
    value: role._id,
    label: role.name,
  }));

  // Handle changes for all form fields
  const handleChange = (value, field) => {
    const updatedFormData = { ...formData, [field]: value };
    setFormData(updatedFormData); // Update parent state

    // Log the entire form data on every change
    console.log('Form Data Updated:', updatedFormData);
  };

  return (
    <div className="rounded-lg border bg-white">
      <div className="p-4 border-b">
        <h2 className="text-lg font-medium">Manage Post Properties</h2>
      </div>
      
      <div className="p-4 space-y-4">
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-500 mb-1">
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
    </div>
  );
}

export default RestOfPostEdit;