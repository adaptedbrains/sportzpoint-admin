"use client";

import React, { useEffect, useRef, useState } from "react";
import Cookies from "js-cookie";
import { CiMenuKebab } from "react-icons/ci";
import { AiOutlineEdit, AiOutlineDelete, AiOutlinePushpin } from "react-icons/ai";
import RichTextEditor from "./RichTextEditor"; // Adjust the path as necessary

const LiveBlogUpdate = ({ postId }) => {
  const [updates, setUpdates] = useState([]);
  const [error, setError] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [editData, setEditData] = useState(null); // To handle edit/update
  const [currentPost, setCurrentPost] = useState(""); // To handle edit/update
  const [newUpdate, setNewUpdate] = useState({ title: "", content: "" }); // For creating new updates
  
  useEffect(() => {
    const fetchUpdates = async () => {
      try {
        const token = Cookies.get("token");
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/post/${postId}/live-blog/updates`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        const { updates } = data;
        setUpdates(updates);
      } catch (err) {
        setError("Failed to fetch updates. Please try again later.");
        console.error(err);
      }
    };

    fetchUpdates();
  }, [postId]);

  const handlePin = (id) => {
    setUpdates((prevUpdates) => {
      const pinned = prevUpdates.find((update) => update._id === id);
      const others = prevUpdates.filter((update) => update._id !== id);
      return [pinned, ...others];
    });
  };

  const handleEdit = (update) => {
    setEditData(update);
    setNewUpdate({ title: update.title, content: update.content });
    setIsPopupOpen(true);
  };

  const handleDelete = async (id) => {
    try {
      const token = Cookies.get("token");
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/post/${postId}/live-blog/updates/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to delete update with ID: ${id}`);
      }

      setUpdates((prevUpdates) => prevUpdates.filter((update) => update._id !== id));
    } catch (err) {
      console.error(err);
      setError("Failed to delete the update. Please try again later.");
    }
  };

  const handlePublish = async () => {
    try {
      const token = Cookies.get("token");
      const endpoint = editData
        ? `${process.env.NEXT_PUBLIC_API_URL}/post/${postId}/live-blog/updates/${editData._id}`
        : `${process.env.NEXT_PUBLIC_API_URL}/post/${postId}/live-blog/updates`;
      const method = editData ? "PUT" : "POST";

      const response = await fetch(endpoint, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ title: newUpdate.title, content: newUpdate.content }),
      });

      if (!response.ok) {
        throw new Error(`Failed to ${editData ? "update" : "create"} the update.`);
      }

      const savedUpdate = await response.json();

      if (editData) {
        // Update existing post in state
        setUpdates((prevUpdates) =>
          prevUpdates.map((update) =>
            update._id === editData._id ? { ...update, ...savedUpdate } : update
          )
        );
      } else {
        // Add new post to state
        setUpdates((prevUpdates) => [...prevUpdates, savedUpdate]);
      }

      setIsPopupOpen(false);
      setEditData(null);
      setNewUpdate({ title: "", content: "" });
    } catch (err) {
      console.error(err);
      setError("Failed to save the update. Please try again later.");
    }
  };
  const menuRef = useRef(null);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setCurrentPost(""); // Call actionText function with an empty string
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [currentPost]);
  return (
    <div className="py-6 min-h-screen bg-gray-50">
      <h1 className="text-2xl font-bold text-center mb-4">Live Blog Updates</h1>
      <div className="text-center mb-6">
        <button
          onClick={() => setIsPopupOpen(true)}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Create a New Update
        </button>
      </div>
      {error ? (
        <p className="text-red-500 text-center">{error}</p>
      ) : (
        <div className="space-y-4 px-28 bg-gray-50 py-10">
          {updates.map((update) => (
            <div key={update._id} className="bg-white p-4 shadow rounded flex justify-between ">
              <div className="w-full">
                <p className="text-sm text-gray-500 mb-2">
                  {new Date(update.created_at).toLocaleString("en-US", {
                    dateStyle: "medium",
                    timeStyle: "short",
                  })}
                </p>
                <div className="flex justify-between w-full">

                <div className="text-lg w-full   font-semibold mb-2">{update.title}</div>
                <div className="shadow-inner  shadow-gray-200 p-2 rounded relative group z-30">
                <button onClick={()=>setCurrentPost(update._id)}>

                <CiMenuKebab color="blue" size={20} className="cursor-pointer" />
                </button>
                {currentPost === update._id &&  <div ref={menuRef} className="absolute bg-gray-100 border border-blue-500  z-50 -start-24    top-full  bg-white-500   rounded">
                  <button
                    onClick={() => handlePin(update._id)}
                    className="flex items-center px-4 py-2 hover:bg-gray-100 w-full text-left"
                  >
                    <AiOutlinePushpin className="mr-2" /> Pin
                  </button>
                  <button
                    onClick={() => handleEdit(update)}
                    className="flex items-center px-4 py-2 hover:bg-gray-100 w-full text-left"
                  >
                    <AiOutlineEdit className="mr-2" /> Edit
                  </button>
                  <button
                    onClick={() => handleDelete(update._id)}
                    className="flex items-center px-4 py-2 hover:bg-gray-100 w-full text-left text-red-500"
                  >
                    <AiOutlineDelete className="mr-2" /> Delete
                  </button>
                </div>}
              </div>
                </div>
                {update.content && (
                  <div
                    className="prose"
                    dangerouslySetInnerHTML={{ __html: update.content }}
                  ></div>
                )}
              </div>
             
            </div>
          ))}
        </div>
      )}

      {/* Popup Modal */}
      {isPopupOpen && (
        <div className="fixed w-full h-[100vh] z-50 inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-[70%] relative">
            <div className="bg-gray-100 p-4">
              <h2 className="text-xl font-bold mb-4">
                {editData ? "Edit Update" : "Create New Update"}
              </h2>
              <input
                type="text"
                placeholder="Title"
                value={newUpdate.title}
                onChange={(e) => setNewUpdate((prev) => ({ ...prev, title: e.target.value }))}
                className="w-full p-2 mb-4 border rounded"
              />
              <RichTextEditor
                content={newUpdate.content}
                htmlContentGrab={(content) => setNewUpdate((prev) => ({ ...prev, content }))}
              />
              <div className="flex justify-end space-x-4 mt-4">
                <button
                  onClick={() => setIsPopupOpen(false)}
                  className="px-4 py-2 text-gray-500 border rounded hover:bg-gray-200"
                >
                  Cancel
                </button>
                <button
                  onClick={handlePublish}
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  {editData ? "Update" : "Publish"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LiveBlogUpdate;
