'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import NotionPageSelector from './NotionPageSelector';

const RichTextEditor = ({ onContentChange }) => {
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showNotionSelector, setShowNotionSelector] = useState(false);

  const handlePageSelect = async (page) => {
    try {
      setLoading(true);
      const response = await axios.get(`/api/notion/pages/${page.id}`);
      setContent(response.data);
      if (onContentChange) {
        onContentChange(response.data);
      }
    } catch (err) {
      setError(err.message);
      console.error('Error fetching Notion content:', err);
    } finally {
      setLoading(false);
      setShowNotionSelector(false);
    }
  };

  const renderBlock = (block) => {
    const { type, id } = block;
    const value = block[type];

    switch (type) {
      case 'paragraph':
        return (
          <p key={id} className="mb-4">
            {value.rich_text.map((text, i) => renderText(text, i))}
          </p>
        );
      case 'heading_1':
        return (
          <h1 key={id} className="text-3xl font-bold mb-4">
            {value.rich_text.map((text, i) => renderText(text, i))}
          </h1>
        );
      case 'heading_2':
        return (
          <h2 key={id} className="text-2xl font-bold mb-3">
            {value.rich_text.map((text, i) => renderText(text, i))}
          </h2>
        );
      case 'heading_3':
        return (
          <h3 key={id} className="text-xl font-bold mb-2">
            {value.rich_text.map((text, i) => renderText(text, i))}
          </h3>
        );
      case 'bulleted_list_item':
        return (
          <li key={id} className="ml-6 mb-2 list-disc">
            {value.rich_text.map((text, i) => renderText(text, i))}
          </li>
        );
      case 'numbered_list_item':
        return (
          <li key={id} className="ml-6 mb-2 list-decimal">
            {value.rich_text.map((text, i) => renderText(text, i))}
          </li>
        );
      case 'to_do':
        return (
          <div key={id} className="flex items-center mb-2">
            <input
              type="checkbox"
              defaultChecked={value.checked}
              className="mr-2"
              disabled
            />
            {value.rich_text.map((text, i) => renderText(text, i))}
          </div>
        );
      case 'image':
        const imageUrl = value.type === 'external' ? value.external.url : value.file.url;
        const caption = value.caption?.length > 0 ? value.caption[0].plain_text : '';
        return (
          <figure key={id} className="mb-4">
            <img src={imageUrl} alt={caption} className="max-w-full h-auto rounded-lg" />
            {caption && (
              <figcaption className="text-center text-sm text-gray-600 mt-2">
                {caption}
              </figcaption>
            )}
          </figure>
        );
      case 'code':
        return (
          <pre key={id} className="bg-gray-100 p-4 rounded-lg mb-4 overflow-x-auto">
            <code>{value.rich_text[0].plain_text}</code>
          </pre>
        );
      case 'quote':
        return (
          <blockquote key={id} className="border-l-4 border-gray-300 pl-4 mb-4">
            {value.rich_text.map((text, i) => renderText(text, i))}
          </blockquote>
        );
      case 'divider':
        return <hr key={id} className="my-4 border-t border-gray-300" />;
      default:
        return null;
    }
  };

  const renderText = (text, i) => {
    const {
      annotations: { bold, code, color, italic, strikethrough, underline },
      text: { content, link },
    } = text;

    let className = '';
    if (bold) className += 'font-bold ';
    if (italic) className += 'italic ';
    if (strikethrough) className += 'line-through ';
    if (underline) className += 'underline ';

    const textContent = (
      <span
        key={i}
        className={className}
        style={color !== 'default' ? { color } : {}}
      >
        {content}
      </span>
    );

    if (code) {
      return (
        <code key={i} className="bg-gray-100 px-1 py-0.5 rounded">
          {textContent}
        </code>
      );
    }

    if (link) {
      return (
        <a key={i} href={link.url} className="text-blue-600 hover:underline">
          {textContent}
        </a>
      );
    }

    return textContent;
  };

  return (
    <div className="bg-white rounded-lg shadow-lg">
      <div className="border-b border-gray-200 p-4">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold text-gray-800">Content</h2>
          <button
            onClick={() => setShowNotionSelector(true)}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            Import from Notion
          </button>
        </div>
      </div>

      <div className="p-4">
        {loading ? (
          <div className="text-center py-4">Loading content...</div>
        ) : error ? (
          <div className="text-center text-red-500 py-4">Error: {error}</div>
        ) : !content ? (
          <div className="text-center text-gray-500 py-4">
            No content yet. Click "Import from Notion" to get started.
          </div>
        ) : (
          <div className="notion-content">
            {content.results.map((block) => renderBlock(block))}
          </div>
        )}
      </div>

      {showNotionSelector && (
        <NotionPageSelector
          onPageSelect={handlePageSelect}
          onClose={() => setShowNotionSelector(false)}
        />
      )}
    </div>
  );
};

export default RichTextEditor;
