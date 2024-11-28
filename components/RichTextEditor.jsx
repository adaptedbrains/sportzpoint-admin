"use client";
import React, { useRef, useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import ImageGalleryPopup from "./ImageGalleryPopup";

const RichTextEditor = ({ content, htmlContentGrab }) => {
  const editorRef = useRef(null);
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [imageCallback, setImageCallback] = useState(null);

  // Function to handle opening the image gallery
  const openImageGallery = (callback) => {
    setImageCallback(() => callback); // Save the callback function
    setIsGalleryOpen(true); // Open the image gallery popup
  };

  // Function to handle image selection
  const onImageSelect = (url) => {
    if (imageCallback) {
      imageCallback(url); // Pass the selected image URL to TinyMCE
    }
    setIsGalleryOpen(false); // Close the image gallery
  };

  return (
    <div className="bg-white rounded-lg shadow-lg">
      <div className="border-b border-gray-200 p-4">
        <h2 className="text-xl font-semibold text-gray-800">Content</h2>
      </div>

      <Editor
        apiKey="qagffr3pkuv17a8on1afax661irst1hbr4e6tbv888sz91jc"
        onInit={(evt, editor) => (editorRef.current = editor)}
        value={content}
        onEditorChange={(newContent) => {
          htmlContentGrab(newContent);
        }}
        init={{
          height: 500,
          menubar: true,
          plugins: [
            "advlist",
            "autolink",
            "lists",
            "link",
            "image",
            "charmap",
            "preview",
            "anchor",
            "searchreplace",
            "visualblocks",
            "code",
            "fullscreen",
            "insertdatetime",
            "media",
            "table",
            "help",
            "wordcount",
            "emoticons",
          ],
          toolbar:
            "styles fontsize | bold italic | image media table link | alignleft aligncenter alignright | bullist numlist",
          file_picker_callback: (callback, value, meta) => {
            if (meta.filetype === "image") {
              openImageGallery(callback);
            }
          },
          content_style: `body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif; font-size: 14px; line-height: 1.6; color: #333; margin: 1rem; }`,
        }}
      />

      {isGalleryOpen && (
       

        <ImageGalleryPopup
          onImageSelect={onImageSelect}
          onClose={() => setIsGalleryOpen(false)}
          // This ensures the gallery stays on top
          />
        
      )}
    </div>
  );
};

export default RichTextEditor;
