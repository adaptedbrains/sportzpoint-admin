'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';

const NotionPageSelector = ({ onPageSelect, onClose }) => {
  const [pages, setPages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchPages = async () => {
      try {
        setLoading(true);
        const response = await axios.get('/api/notion/pages');
        setPages(response.data.pages);
      } catch (err) {
        setError(err.message);
        console.error('Error fetching Notion pages:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchPages();
  }, []);

  const filteredPages = pages.filter(page =>
    page.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl">
        <div className="p-4 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold text-gray-800">Import from Notion</h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <div className="mt-4">
            <input
              type="text"
              placeholder="Search pages..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="p-4 max-h-[60vh] overflow-y-auto">
          {loading ? (
            <div className="text-center py-4">Loading pages...</div>
          ) : error ? (
            <div className="text-center text-red-500 py-4">{error}</div>
          ) : filteredPages.length === 0 ? (
            <div className="text-center text-gray-500 py-4">
              No pages found
            </div>
          ) : (
            <div className="space-y-2">
              {filteredPages.map((page) => (
                <button
                  key={page.id}
                  onClick={() => onPageSelect(page)}
                  className="w-full text-left p-4 rounded-lg border border-gray-200 hover:border-blue-500 hover:bg-blue-50 transition-colors"
                >
                  <h3 className="font-medium text-gray-900">{page.title}</h3>
                  <p className="text-sm text-gray-500 mt-1">
                    Last edited: {new Date(page.lastEdited).toLocaleDateString()}
                  </p>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NotionPageSelector;
