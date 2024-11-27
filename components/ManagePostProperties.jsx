"use client";
import Cookies from 'js-cookie';

import RichTextEditor from "./RichTextEditor";
import RestOfPostEdit from "./RestOfPostEdit";
import ArticlePostEditComponent from "./ArticlePostEditComponent";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import useAllPostDataStore from "@/store/useAllPostDataStore";
function ManagePostProperties() {
  const { allPosts } = useAllPostDataStore();
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
    slug: "",
    summary: "",
    seo_desc: "",
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
      
      if (id === "new-post") {
        // Fresh initialization for a new post
        setPost(null);
        setHtmlContent("");
        setFormData({
          primaryCategory: null,
          additionalCategories: [],
          tags: [],
          credits: [],
          focusKeyphrase: "",
        });
        setFormDataPostEdit({
          title: "",
          slug: "",
          summary: "",
          seo_desc: "",
          featuredImage: "",
          banner_desc: "",
        });
      } else {
        // Fetch and initialize data for an existing post
        const requiredData = allPosts.find((a) => a._id === id);
        setPost(requiredData);
        setHtmlContent(requiredData?.content || "");
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
          setFormDataPostEdit({
            title: requiredData.title || "",
            englishTitle: requiredData.slug || "",
            summary: requiredData.summary || "",
            seo_desc: requiredData.seo_desc || "",
            featuredImage: requiredData.featuredImage || "",
            banner_desc: requiredData.banner_desc || "",
          });
        }
      }
    }
  }, [pathname, allPosts]);
  

  const submitData = async (status) => {
    try {
      const token = Cookies.get('token');
      if (!token) {
        throw new Error("No token found in cookies");
      }
  
      // Transform data
      const transformedData = {
        primary_category: formData.primaryCategory
          ? [formData.primaryCategory.value]
          : [],
        title: formDataPostEdit.title,
        summary: formDataPostEdit.summary,
        legacy_url:
          pathname.split("/")[3] === 'new-post'
            ? formDataPostEdit.title.split(" ").join("-")
            : post.slug,
        tags: formData.tags.map((tag) => tag.value),
        categories: formData.additionalCategories.map((cat) => cat.value),
        banner_desc: formDataPostEdit.banner_desc,
        credits: formData.credits.map((credit) => credit.value),
        focusKeyphrase: formData.focusKeyphrase,
        content: htmlContent,
        status: status,
        author: JSON.parse(localStorage.getItem('id')),
        slug: formDataPostEdit.title.split(" ").join("-"),
        type: pathname.split("/")[2],
      };
  
      // Add `published_at_datetime` for published status
      if (status === "published") {
        transformedData.published_at_datetime = new Date();
      }
  
      // Add `seo_desc` if it's not a new post
      if (pathname.split("/")[3] !== 'new-post') {
        transformedData.seo_desc = formDataPostEdit.seo_desc;
      }
  
      // Determine if it's a POST or PUT request
      const isCreate = pathname.split("/")[3] === 'new-post';
      const apiUrl = isCreate
        ? `${process.env.NEXT_PUBLIC_API_URL}/article/create`
        : `${process.env.NEXT_PUBLIC_API_URL}/article/update/${post._id}`;
  
      const method = isCreate ? 'POST' : 'PUT';
  
      // Make API call
      const response = await fetch(apiUrl, {
        method: method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(transformedData),
      });
  
      if (!response.ok) {
        throw new Error(
          `${isCreate ? 'Creating' : 'Updating'} article failed: ${
            response.statusText
          }`
        );
      }
      
      alert('Post Successfully')
      const data = await response.json();
       // Clear all form fields
    setFormData({
      primaryCategory: null,
      tags: [],
      additionalCategories: [],
      credits: [],
      focusKeyphrase: '',
    });
    formDataPostEdit.title = '';
    formDataPostEdit.summary = '';
    formDataPostEdit.banner_desc = '';
    formDataPostEdit.seo_desc = '';

    // Navigate to the post/article route

      window.location.href("/posts/article")

    return data;
    } catch (error) {
      console.error('Error:', error.message);
      throw error; // Re-throw error to handle it in the calling code if necessary
    }
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
