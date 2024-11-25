'use client';
import { useState, useEffect, useMemo } from 'react';

function RestOfPostEdit() {
  const [primaryCategory, setPrimaryCategory] = useState('');
  const [additionalCategory, setAdditionalCategory] = useState('');
  const [tags, setTags] = useState([]);
  const [credits, setCredits] = useState('');
  const [focusKeyphrase, setFocusKeyphrase] = useState('');
  const [categoriesList, setCategoriesList] = useState([]);
  const [categoryInput, setCategoryInput] = useState('');
  const [filteredCategories, setFilteredCategories] = useState([]);
  const [categoryOption, setCategoryOption] = useState('');

  // Use useMemo to memoize the categories array
  const categories = useMemo(() => [
    'Autos & Vehicles',
    'Comedy',
    'Education',
    'Entertainment',
    'Film and Animation',
    'Gaming',
    'Howto & Style',
    'Music',
    'News & Politics',
    'Nonprofits & Activism',
    'People & Blogs',
    'Pets & Animals',
    'Science & Technology',
    'Sports',
    'Travel & Events',
  ], []); // Empty dependency array ensures the categories are not recalculated on every render

  const handlePrimaryCategoryChange = (e) => {
    setPrimaryCategory(e.target.value);
  };

  const handleTagsChange = (e) => {
    const selectedOptions = Array.from(e.target.selectedOptions).map((option) => option.value);
    setTags(selectedOptions); // Update state with selected values
  };

  const handleCreditsChange = (e) => {
    setCredits(e.target.value);
  };

  const handleFocusKeyphraseChange = (e) => {
    setFocusKeyphrase(e.target.value);
  };

  // Update filtered categories based on input
  useEffect(() => {
    if (categoryOption === 'categories') {
      setFilteredCategories(
        categoryInput
          ? categories.filter((category) =>
              category.toLowerCase().includes(categoryInput.toLowerCase())
            )
          : categories
      );
    }
  }, [categoryInput, categoryOption, categories]);

  const handleCategoryClick = (item) => {
    setCategoriesList((prev) =>
      prev.includes(item) ? prev.filter((category) => category !== item) : [...prev, item]
    );
    setCategoryInput(''); // Clear the input after selection
    setCategoryOption(''); // Close the dropdown
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Manage Post Properties</h2>

      <div className="mb-4">
        <label htmlFor="primaryCategory" className="block text-sm font-medium text-gray-700">
          Primary Category *
        </label>
        <select
          id="primaryCategory"
          value={primaryCategory}
          onChange={handlePrimaryCategoryChange}
          className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-200 focus:border-indigo-500 sm:text-sm"
        >
          <option value="">Select Primary Category</option>
          <option value="cricket">Cricket</option>
          <option value="football">Football</option>
        </select>
      </div>

      <div className="mb-4">
        {categoriesList.length !== 0 && (
          <ul className="flex flex-wrap gap-1 mb-1 pr-1 min-w-auto w-3/4 justify-end">
            {categoriesList.map((item, i) => (
              <li
                className="hover:bg-red-400 bg-red-100 hover:border-red-400 hover:text-white rounded inline-block text-sm text-zinc-800 px-2 border"
                key={i}
              >
                <button
                  type="button"
                  className="py-1 inline"
                  onClick={() =>
                    setCategoriesList((prev) =>
                      prev.filter((category) => category !== item)
                    )
                  }
                >
                  {item}
                </button>
              </li>
            ))}
          </ul>
        )}
        <div className="flex w-full items-center relative flex-col">
          <label className="w-full text-start text-zinc-700">Additional Category </label>
          <input
            type="text"
            className="border focus:outline-none px-4 py-1 rounded w-2/3 text-zinc-800"
            placeholder={
              categoriesList.length !== 0
                ? categoriesList[categoriesList.length - 1]
                : 'Search'
            }
            value={categoryInput}
            onChange={(e) => setCategoryInput(e.target.value)}
            onFocus={() => setCategoryOption('categories')}
          />
          {categoryOption === 'categories' && filteredCategories.length > 0 && (
            <ul className="absolute top-12 left-28 bg-white border rounded shadow-lg z-10 w-2/3 max-h-40 overflow-y-auto">
              {filteredCategories.map((category, index) => (
                <li
                  key={index}
                  className="px-4 py-2 hover:bg-indigo-100 cursor-pointer"
                  onClick={() => handleCategoryClick(category)}
                >
                  {category}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <div className="mb-4">
        <label htmlFor="tags" className="block text-sm font-medium text-gray-700">
          Tags
        </label>
        <select
          id="tags"
          multiple
          value={tags}
          onChange={handleTagsChange}
          className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-200 focus:border-indigo-500 sm:text-sm"
        >
          <option value="cricket">Cricket</option>
          <option value="football">Football</option>
          <option value="basketball">Basketball</option>
        </select>
      </div>

      <div className="mb-4">
        <label htmlFor="credits" className="block text-sm font-medium text-gray-700">
          Credits *
        </label>
        <select
          id="credits"
          value={credits}
          onChange={handleCreditsChange}
          className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-200 focus:border-indigo-500 sm:text-sm"
        >
          <option value="">Please select Author</option>
          <option value="author1">Author 1</option>
          <option value="author2">Author 2</option>
        </select>
      </div>

      <div className="mb-4">
        <label htmlFor="focusKeyphrase" className="block text-sm font-medium text-gray-700">
          Focus Keyphrase
        </label>
        <input
          type="text"
          id="focusKeyphrase"
          value={focusKeyphrase}
          onChange={handleFocusKeyphraseChange}
          className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-200 focus:border-indigo-500 sm:text-sm"
        />
      </div>
    </div>
  );
}

export default RestOfPostEdit;
