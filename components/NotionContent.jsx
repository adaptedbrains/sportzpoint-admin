'use client';

import { useState, useEffect } from 'react';
import { initNotionClient, getPageContent } from '../util/notionService';

const NotionContent = ({ notionToken, pageId }) => {
  const [content, setContent] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        initNotionClient(notionToken);
        const pageContent = await getPageContent(pageId);
        setContent(pageContent);
        setError(null);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (notionToken && pageId) {
      fetchContent();
    }
  }, [notionToken, pageId]);

  if (loading) {
    return <div className="p-4">Loading content...</div>;
  }

  if (error) {
    return <div className="p-4 text-red-500">Error: {error}</div>;
  }

  return (
    <div className="notion-content p-4">
      {content.map((block, index) => {
        switch (block.type) {
          case 'paragraph':
            return <p key={index} className="mb-4">{block.content}</p>;
          case 'heading_1':
            return <h1 key={index} className="text-3xl font-bold mb-4">{block.content}</h1>;
          case 'heading_2':
            return <h2 key={index} className="text-2xl font-bold mb-3">{block.content}</h2>;
          case 'heading_3':
            return <h3 key={index} className="text-xl font-bold mb-2">{block.content}</h3>;
          case 'bullet':
            return <li key={index} className="ml-6 mb-2">{block.content}</li>;
          case 'number':
            return <li key={index} className="ml-6 mb-2">{block.content}</li>;
          case 'image':
            return (
              <figure key={index} className="mb-4">
                <img src={block.url} alt={block.caption} className="max-w-full h-auto" />
                {block.caption && (
                  <figcaption className="text-sm text-gray-600 mt-2">{block.caption}</figcaption>
                )}
              </figure>
            );
          default:
            return null;
        }
      })}
    </div>
  );
};

export default NotionContent;
