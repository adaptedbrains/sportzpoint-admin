"use client";

import Cookies from "js-cookie";
import RichTextEditor from "./RichTextEditor";
import RestOfPostEdit from "./RestOfPostEdit";
import ArticlePostEditComponent from "./ArticlePostEditComponent";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import useAllPostDataStore from "../store/useAllPostDataStore";
import LiveBlogUpdate from './LiveBlogUpdate'
function ManagePostProperties() {
  const router = useRouter();
  const { allPosts } = useAllPostDataStore();
  const pathname = usePathname();
  const [post, setPost] = useState(null);
  const [view, setView] = useState("main"); // Track active view ("main" or "updates")

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
    banner_image: "",
    banner_desc: "",
  });

  const [htmlContent, setHtmlContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

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
          banner_image: "",
          banner_desc: "",
        });
      } else {
        // Fetch and initialize data for an existing post
        const requiredData = allPosts.find((a) => a._id === id);
        setPost(requiredData);
        setHtmlContent(requiredData?.content || "");
        if (requiredData) {
          setFormData({
            primaryCategory: requiredData.primary_category?.[0]
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
            focusKeyphrase: requiredData.focusKeyphrase || "",
          });
          setFormDataPostEdit({
            title: requiredData.title || "",
            slug: requiredData.slug || "",
            summary: requiredData.summary || "",
            seo_desc: requiredData.seo_desc || "",
            banner_image: requiredData.banner_image || "",
            banner_desc: requiredData.banner_desc || "",
          });
        }
      }
    }
  }, [pathname, allPosts]);

  const renderView = () => {
    if (view === "updates") {
      return <div>   
        <LiveBlogUpdate postId={post._id} />
         
            </div>;
    }
    return (
      <>
        <ArticlePostEditComponent
          handleArticleFromData={handleArticleFromData}
          formDataPostEdit={formDataPostEdit}
        />
        
        <RichTextEditor content={htmlContent} htmlContentGrab={htmlContentGrab} />
        <RestOfPostEdit formData={formData} setFormData={setFormData} />

        <div className="flex justify-end gap-4 mt-6 bg-white p-4 rounded-lg shadow">
        <button
          className="px-6 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors duration-200"
          onClick={() => {
            submitData("draft");
          }}
        >
          {isSubmitting ? "Saving..." : "Save as Draft"}
        </button>

        <button
          className="px-6 py-2 bg-blue-100 text-blue-700 rounded-md hover:bg-blue-200 transition-colors duration-200"
          onClick={() => {
            submitData("send-for-approval");
          }}
        >
          {isSubmitting ? "Sending..." : "Send for Approval"}
        </button>

        <button
          className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors duration-200"
          onClick={() => {
            submitData("published");
          }}
        >
          {isSubmitting ? "Publishing..." : "Publish"}
        </button>
      </div>
      </>
    );
  };

  return (
    <div className="flex flex-col gap-2">
      {post?.type === "LiveBlog" && (
        <div className="flex gap-4 mb-4">
          <button
            className={`px-4 py-2 rounded ${
              view === "main" ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700"
            }`}
            onClick={() => setView("main")}
          >
            Main
          </button>
          <button
            className={`px-4 py-2 rounded ${
              view === "updates" ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700"
            }`}
            onClick={() => setView("updates")}
          >
            Updates
          </button>
        </div>
      )}

      {renderView()}

     
    </div>
  );
}

export default ManagePostProperties;
