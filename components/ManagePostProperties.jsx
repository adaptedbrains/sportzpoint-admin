"use client";

import Cookies from "js-cookie";
import RichTextEditor from "./RichTextEditor";
import WebStoryEditor from "./WebStory";

import RestOfPostEdit from "./RestOfPostEdit";
import ArticlePostEditComponent from "./ArticlePostEditComponent";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import useAllPostDataStore from "../store/useAllPostDataStore";
import LiveBlogUpdate from "./LiveBlogUpdate";
function ManagePostProperties({ type, id }) {
  const router = useRouter();
  const { allPosts } = useAllPostDataStore();
  const pathname = usePathname();
  const [post, setPost] = useState(null);
  const [view, setView] = useState("main"); // Track active view ("main" or "updates")
  const [webStory, setWebStory] = useState([]); // Track active view ("main" or "updates")

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
  const htmlJsonGrab=(data)=>{
    setWebStory(data)
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

      if (id === "new-post") {
        setWebStory([])
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

        setPost(requiredData)
        setHtmlContent(requiredData?.content || "");
        setWebStory(requiredData.web_story && requiredData.web_story)
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

  const submitData = async (status) => {
    try {
      setIsSubmitting(true);

      const token = Cookies.get("token");
      if (!token) {
        throw new Error("No token found. Please login again.");
      }

      // Safely get author ID
      let authorId;
      try {
        const storedId = localStorage.getItem("id");
        authorId = storedId ? storedId.replace(/^"(.*)"$/, "$1") : null;

        if (!authorId) {
          throw new Error("No author ID found. Please login again.");
        }
      } catch (e) {
        console.error("Error getting author ID:", e);
        throw new Error("Authentication error. Please login again.");
      }

      // Transform data
      const transformedData = {
        primary_category: formData.primaryCategory
          ? [formData.primaryCategory.value]
          : [],
        title: formDataPostEdit.title.trim(),
        summary: formDataPostEdit.summary.trim(),
        legacy_url:
          pathname.split("/")[3] === "new-post"
            ? formDataPostEdit.title.trim().toLowerCase().split(" ").join("-")
            : formDataPostEdit.title.trim().toLowerCase().split(" ").join("-"),
        tags: formData.tags.map((tag) => tag.value),
        categories: formData.additionalCategories.map((cat) => cat.value),
        banner_desc: formDataPostEdit.banner_desc.trim(),
        banner_image: formDataPostEdit.banner_image.trim(),
        credits: formData.credits.map((credit) => credit.value),
        focusKeyphrase: formData.focusKeyphrase.trim(),
        content: htmlContent.trim(),

        status: status,
        author: authorId,
        slug: formDataPostEdit.slug.trim().toLowerCase().split(" ").join("-"),
        type:
          pathname.split("/")[2] === "Web%20Story"
            ? "Web Story"
            : pathname.split("/")[2],
        seo_desc: formDataPostEdit.seo_desc.trim(),
      };

      if (status === "published") {
        transformedData.published_at_datetime = new Date().toISOString();
      }
      if (pathname && pathname.split("/")[2] === "Web%20Story") {
        transformedData.web_story = webStory;
      }

      if (
        !transformedData.credits.length || 
        !transformedData.primary_category.length || 
        !transformedData.slug.trim() || 
        !transformedData.title.trim()
      ) {
        alert("Please fill Categories, Primary Category, Slug, and Title properly.");
        return;
      }

      const isCreate = pathname.split("/")[3] === "new-post";
      const apiUrl = isCreate
        ? `${process.env.NEXT_PUBLIC_API_URL}/article/create`
        : `${process.env.NEXT_PUBLIC_API_URL}/article/update/${
            pathname.split("/")[3]
          }`;

      const response = await fetch(apiUrl, {
        method: isCreate ? "POST" : "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(transformedData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.message ||
            `Failed to ${isCreate ? "create" : "update"} article`
        );
      }

      const data = await response.json();
      alert(`Article ${isCreate ? "created" : "updated"} successfully!`);

      // Redirect to the articles list page
      if (pathname.split("/")[2] === "Article") {
        router.push("/posts/article");
      } else if (pathname.split("/")[2] === "Video") {
        router.push("/posts/video");
      } else if (pathname.split("/")[2] === "Video") {
        router.push("/posts/video");
      } else if (pathname.split("/")[2] === "Web%20Story") {
        router.push("/posts/web-story");
      } else if (pathname.split("/")[2] === "Gallery") {
        router.push("/posts/photo-gallery");
      } else if (pathname.split("/")[2] === "LiveBlog") {
        router.push("/posts/photo-gallery");
      }

      return data;
    } catch (error) {
      console.error("Error:", error);
      alert(error.message || "An unexpected error occurred");
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderView = () => {
    if (view === "updates") {
      return (
        <div>
          <LiveBlogUpdate postId={post._id} />
        </div>
      );
    }
    return (
      <>
        <ArticlePostEditComponent
          handleArticleFromData={handleArticleFromData}
          formDataPostEdit={formDataPostEdit}
        />

        {pathname && pathname.split("/")[2] === "Web%20Story" ? (
          <WebStoryEditor content={webStory} htmlJsonGrab={htmlJsonGrab} />
        ) : (
          <RichTextEditor
            content={htmlContent}
            htmlContentGrab={htmlContentGrab}
          />
        )}
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
              view === "main"
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
            onClick={() => setView("main")}
          >
            Main
          </button>
          <button
            className={`px-4 py-2 rounded ${
              view === "updates"
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-700"
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
