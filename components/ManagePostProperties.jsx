"use client";

import RichTextEditor from "./RichTextEditor";
import RestOfPostEdit from "./RestOfPostEdit";
import ArticlePostEditComponent from "./ArticlePostEditComponent";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import useAllPostDataStore from "@/store/useAllPostDataStore";

function ManagePostProperties() {
  const { allArticlePost } = useAllPostDataStore();
  const pathname = usePathname();
  const [post, setPost] = useState(null);
  const [formData, setFormData] = useState({
    primaryCategory: null,
    additionalCategories: [],
    tags: [],
    credits: [],
    focusKeyphrase: "",
  });
  const [formDataPostEdit, setFormDataPostEdit] = useState({
    title: "",
    englishTitle: "",
    summary: "",
    metaDescription: "",
    featuredImage: "",
  });

  const [htmlContent, setHtmlContent] = useState('');
  

  const htmlContentGrab=(data)=>{
    setHtmlContent(data)
  }
 
  

  const handleArticleFromData = (name, value) => {
    setFormDataPostEdit((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  useEffect(() => {
    if (pathname) {
      const parts = pathname.split("/");
      const type = parts[2];
      const id = parts[3];
      const requiredData = allArticlePost.find((a) => a._id === id);
      setPost(requiredData);
      setHtmlContent(requiredData.content)
      // Initialize formData with the fetched post data
      if (requiredData) {
        setFormData({
          primaryCategory: requiredData.primary_category
            ? {
                value: requiredData.primary_category[0]._id,
                label: requiredData.primary_category[0].name,
              }
            : null,
          additionalCategories: requiredData.categories
            ? requiredData.categories.map((cat) => ({
                value: cat._id,
                label: cat.name,
              }))
            : [],
          tags: requiredData.tags
            ? requiredData.tags.map((t) => ({ value: t._id, label: t.name }))
            : [],
          credits: requiredData.credits
            ? requiredData.credits.map((credit) => ({
                value: credit._id,
                label: credit.name,
              }))
            : [],
          focusKeyphrase: "",
        });
      }
    }
  }, [pathname, allArticlePost]);

  // ... rest of the imports and code remains same ...

return (
  <div className="flex flex-col gap-2">
    <ArticlePostEditComponent
      handleArticleFromData={handleArticleFromData}
      formDataPostEdit={formDataPostEdit}
    />
    <RichTextEditor content={htmlContent && htmlContent} htmlContentGrab={htmlContentGrab} />
    <RestOfPostEdit
      formData={formData}
      setFormData={setFormData}
    />
    {/* New Action Buttons Section */}
    <div className="flex justify-end gap-4 mt-6 bg-white p-4 rounded-lg shadow">
      <button 
        className="px-6 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors duration-200 flex items-center gap-2"
        onClick={() => console.log("Saving as draft...", formData)}
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
        </svg>
        Save as Draft
      </button>

      <button 
        className="px-6 py-2 bg-blue-100 text-blue-700 rounded-md hover:bg-blue-200 transition-colors duration-200 flex items-center gap-2"
        onClick={() => console.log("Sending for approval...", formData)}
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        Send for Approval
      </button>

      <button 
        className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors duration-200 flex items-center gap-2"
        onClick={() => console.log("Publishing...", formData)}
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
        </svg>
        Publish
      </button>
    </div>
  </div>
);
}

export default ManagePostProperties;