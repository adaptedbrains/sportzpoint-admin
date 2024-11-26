'use client'
import RichTextEditor from './RichTextEditor'
import RestOfPostEdit from './RestOfPostEdit'
import ArticlePostEditComponent from './ArticlePostEditComponent'
import SeoAnalysisSidebar from './SeoAnalysisSidebar'
import { useState, useEffect } from 'react'

function ManagePostProperties() {
  const [content, setContent] = useState('')
  const [title, setTitle] = useState('')
  const [metaDescription, setMetaDescription] = useState('')
  const [seoData, setSeoData] = useState(null)

  // Debounced SEO analysis
  useEffect(() => {
    const timer = setTimeout(() => {
      if (content || title || metaDescription) {
        analyzeSEO();
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, [content, title, metaDescription]);

  const analyzeSEO = async () => {
    try {
      const response = await fetch('/api/analyze-seo', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          content: content,
          title: title,
          metaDescription: metaDescription,
        }),
      });

      const data = await response.json();
      setSeoData(data);
    } catch (error) {
      console.error('Error analyzing SEO:', error);
    }
  };

  return (
    <div className='flex gap-4'>
      <div className='flex-1 flex flex-col gap-2'>
        <ArticlePostEditComponent
          onTitleChange={setTitle}
          onMetaDescriptionChange={setMetaDescription}
        />
        <div className='bg-white rounded'>
          <RichTextEditor onChange={setContent} />
        </div>
        <RestOfPostEdit />
      </div>
      
      <SeoAnalysisSidebar
        content={content}
        title={title}
        metaDescription={metaDescription}
        seoData={seoData}
      />
    </div>
  )
}

export default ManagePostProperties