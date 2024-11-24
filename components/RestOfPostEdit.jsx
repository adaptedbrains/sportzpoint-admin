'use client';
import { useEffect } from 'react';
import Select from 'react-select';
import usePostStore from '../store/usePostStore';

function RestOfPostEdit() {
  const {
    categories,
    tags,
    loading,
    error,
    selectedProperties,
    fetchCategories,
    fetchTags,
    updateSelectedProperties,
  } = usePostStore();

  useEffect(() => {
    fetchCategories();
    fetchTags();
  }, []);

  const handleChange = (field, value) => {
    updateSelectedProperties({ [field]: value });
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="bg-white p-6 rounded-lg shadow-md space-y-6">
      <h2 className="text-xl font-bold text-gray-800 mb-6">Additional Properties</h2>

      {/* Primary Category */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          Primary Category <span className="text-red-500">*</span>
        </label>
        <Select
          value={selectedProperties.primaryCategory}
          onChange={(value) => handleChange('primaryCategory', value)}
          options={categories}
          className="basic-select"
          classNamePrefix="select"
          isClearable
        />
      </div>

      {/* Additional Categories */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          Additional Categories
        </label>
        <Select
          isMulti
          value={selectedProperties.additionalCategories}
          onChange={(value) => handleChange('additionalCategories', value)}
          options={categories.filter(cat => 
            !selectedProperties.primaryCategory || 
            cat.value !== selectedProperties.primaryCategory.value
          )}
          className="basic-multi-select"
          classNamePrefix="select"
        />
      </div>

      {/* Tags */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          Tags
        </label>
        <Select
          isMulti
          value={selectedProperties.tags}
          onChange={(value) => handleChange('tags', value)}
          options={tags}
          className="basic-multi-select"
          classNamePrefix="select"
        />
      </div>

      {/* Credits */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          Credits <span className="text-red-500">*</span>
        </label>
        <Select
          isMulti
          value={selectedProperties.credits}
          onChange={(value) => handleChange('credits', value)}
          options={[
            { value: 'john_doe', label: 'John Doe' },
            { value: 'jane_smith', label: 'Jane Smith' },
            { value: 'mike_johnson', label: 'Mike Johnson' },
          ]}
          className="basic-multi-select"
          classNamePrefix="select"
        />
      </div>

      {/* Focus Keyphrase */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          Focus Keyphrase
        </label>
        <input
          type="text"
          value={selectedProperties.focusKeyphrase}
          onChange={(e) => handleChange('focusKeyphrase', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          placeholder="Enter focus keyphrase..."
        />
        <p className="text-sm text-gray-500">
          Enter a phrase that you want this post to rank for
        </p>
      </div>
    </div>
  );
}

export default RestOfPostEdit;
