'use client'
import RichTextEditor from './RichTextEditor'
import RestOfPostEdit from './RestOfPostEdit'
import ArticlePostEditComponent from './ArticlePostEditComponent'
import SeoAnalysisSidebar from './SeoAnalysisSidebar'
import { useState } from 'react'

function ManagePostProperties() {
  const [content, setContent] = useState('')
  const [title, setTitle] = useState('')
  const [metaDescription, setMetaDescription] = useState('')
  const [seoData, setSeoData] = useState(null)

  return (
    <div className='flex gap-4 max-w-[1600px] mx-auto px-4'>
      {/* Main content area - made narrower */}
      <div className='flex-1 flex flex-col gap-2 max-w-[calc(100%-340px)]'>
        <ArticlePostEditComponent
          onTitleChange={setTitle}
          onMetaDescriptionChange={setMetaDescription}
        />
        <div className='bg-white rounded'>
          <RichTextEditor onChange={setContent} />
        </div>
        <RestOfPostEdit />
      </div>
      
      {/* SEO Sidebar */}
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