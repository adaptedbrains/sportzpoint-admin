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
    banner_desc:""
  });

  const [htmlContent, setHtmlContent] = useState("");

  const htmlContentGrab = (data) => {
    setHtmlContent(data);
  };

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
      setHtmlContent(requiredData.content);
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

  const submitData = (status) => {
    const transformedData = {
      
      primary_category:formData.primaryCategory ? [formData.primaryCategory.value] : [],
      title:formDataPostEdit.title,
      summary:formDataPostEdit.summary,
      legacy_url:post.slug,
      tags: formData.tags.map((tag) => tag.value),
      categories:formData.additionalCategories.map((cat) => cat.value),
      banner_desc:formDataPostEdit.banner_desc,
      credits: formData.credits.map((credit) => credit.value),
      focusKeyphrase: formData.focusKeyphrase,
      content: htmlContent, 
      status:status,
      type:pathname.split("/")[2],
      seo_desc:formDataPostEdit.metaDescription
    };
  
    // Convert the object to a JSON string
    const jsonData = JSON.stringify(transformedData, null, 2);
  
    // Create a blob with the JSON data and a URL for download
    const blob = new Blob([jsonData], { type: "application/json" });
    const url = URL.createObjectURL(blob);
  
    // Create a temporary link element to trigger the download
    const link = document.createElement("a");
    link.href = url;
    link.download = "postData.json"; // File name
    document.body.appendChild(link);
    link.click();
  
    // Clean up by revoking the URL and removing the link
    URL.revokeObjectURL(url);
    document.body.removeChild(link);
   
    console.log("Data saved as JSON file:", transformedData);
  };
  
  

  return (
    <div className="flex flex-col gap-2">
      <ArticlePostEditComponent
        handleArticleFromData={handleArticleFromData}
        formDataPostEdit={formDataPostEdit}
      />
      <RichTextEditor
        content={htmlContent && htmlContent}
        htmlContentGrab={htmlContentGrab}
      />
      <RestOfPostEdit formData={formData} setFormData={setFormData} />
      {/* New Action Buttons Section */}
      <div className="flex justify-end gap-4 mt-6 bg-white p-4 rounded-lg shadow">
        <button
          className="px-6 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors duration-200 flex items-center gap-2"
          onClick={() => {
            submitData('draft');
          }}
        >
          Save as Draft
        </button>

        <button
          className="px-6 py-2 bg-blue-100 text-blue-700 rounded-md hover:bg-blue-200 transition-colors duration-200 flex items-center gap-2"
          onClick={() => {
            submitData('pending_approval');
          }}
        >
          Send for Approval
        </button>

        <button
          className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors duration-200 flex items-center gap-2"
          onClick={() => {
            
            submitData('published');
          }}
        >
          Publish
        </button>
      </div>
    </div>
  );
}

export default ManagePostProperties;
