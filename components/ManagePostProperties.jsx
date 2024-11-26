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

  // Pass formData and setFormData to the child component
  return (
    <div className="flex flex-col gap-2">
      <ArticlePostEditComponent
        handleArticleFromData={handleArticleFromData}
        formDataPostEdit={formDataPostEdit}
      />
      <RichTextEditor content={htmlContent && htmlContent} htmlContentGrab={htmlContentGrab} />
      <RestOfPostEdit
        formData={formData}
        setFormData={setFormData} // Pass setter function to child
      />
      <button className="bg-black p-9 text-white"  onClick={()=> console.log("almmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm",formData)}  >Save Data</button>
    </div>
  );
}

export default ManagePostProperties;
