"use client";
import React, { useEffect, useState } from "react";
import Cookies from "js-cookie"; // Import js-cookie library
import useDropDownDataStore from "../../store/dropDownDataStore";

const Page = () => {
  const {fetchDropDownData}=useDropDownDataStore()
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState(null);

  const submitData = async (status) => {
    try {
      const token = Cookies.get('token');
      if (!token) {
        throw new Error("No token found in cookies");
      }
  
      // Transform data
      const transformedData = {
        primary_category: formData.primaryCategory
          ? [formData.primaryCategory.value] // Ensure value is ObjectID
          : [],
        title: formDataPostEdit.title,
        summary: formDataPostEdit.summary,
        legacy_url:
          pathname.split("/")[3] === 'new-post'
            ? formDataPostEdit.title.split(" ").join("-")
            : post.slug,
        tags: formData.tags.map((tag) => tag.value), // Ensure values are ObjectIDs
        categories: formData.additionalCategories.map((cat) => cat.value), // Ensure values are ObjectIDs
        banner_desc: formDataPostEdit.banner_desc,
        credits: formData.credits.map((credit) => credit.value), // Ensure values are ObjectIDs
        focusKeyphrase: formData.focusKeyphrase,
        content: htmlContent,
        status: status,
        author: JSON.parse(localStorage.getItem('id')), // Ensure this is a valid ObjectID
        slug: formDataPostEdit.title.split(" ").join("-"),
        type: pathname.split("/")[2],
        updated_at_datetime: new Date(), // Add updated_at_datetime for updates
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
        : `${process.env.NEXT_PUBLIC_API_URL}/article/update?${post._id}`;
  
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
  
      alert("Success");
      const data = await response.json();
      console.log(`Article ${isCreate ? 'created' : 'updated'} successfully:`, data);
      return data;
    } catch (error) {
      console.error('Error:', error.message);
      throw error; // Re-throw error to handle it in the calling code if necessary
    }
  };
  
 

  return (
    <div className="bg-black text-white h-screen fixed top-0 start-0 z-40 w-full flex justify-center items-center">
      <div className="w-1/3 h-[500px] bg-gray-800 p-8 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold text-center mb-6">Login</h2>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-semibold mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full p-3 rounded-md border border-gray-600 bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-semibold mb-1"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full p-3 rounded-md border border-gray-600 bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex justify-between items-center">
            <div>
              <label className="flex items-center text-sm">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={() => setRememberMe(!rememberMe)}
                  className="mr-2"
                />
                Remember me
              </label>
            </div>
            <a
              href="/forgot-password"
              className="text-sm text-blue-400 hover:underline"
            >
              Forgot password?
            </a>
          </div>

          <div className="mt-6">
             <button
              type="submit"
              className="w-full py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-200"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Page;
