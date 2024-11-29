"use client";
import React, { useRef, useEffect, useState } from "react";
import Quill from "quill";
import "quill/dist/quill.snow.css"; // Import Quill styles
import ImageGalleryPopup from "./ImageGalleryPopup";

const RichTextEditor = ({ content, htmlContentGrab }) => {
  const quillRef = useRef(null); // Ref for Quill container
  const quillEditor = useRef(null); // Ref for Quill instance
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [imageCallback, setImageCallback] = useState(null);

  useEffect(() => {
    if (!quillRef.current) return;

    // Initialize Quill editor if it's not already initialized
    if (!quillEditor.current) {
      quillEditor.current = new Quill(quillRef.current, {
        theme: "snow",
        modules: {
          toolbar: [
            [{ header: "1" }, { header: "2" }],
            [{ list: "ordered" }, { list: "bullet" }],
            [{ align: [] }],
            ["bold", "italic", "underline", "strike"],
            ["link", "image", "video"],
            [{ indent: "-1" }, { indent: "+1" }],
            ["blockquote", "code-block"],
            ["clean"],
          ],
        },
      });

      // Set initial content using Quill's clipboard API
      if (content) {
        quillEditor.current.clipboard.dangerouslyPasteHTML(content);
      }

      // Listen for text changes and pass updated content to parent
      quillEditor.current.on("text-change", () => {
        const currentHtml = quillEditor.current.root.innerHTML;
        htmlContentGrab(currentHtml); // Send updated HTML to parent
      });

      // Custom image handler for the toolbar
      const imageHandler = () => {
        openImageGallery((url) => {
          const range = quillEditor.current.getSelection();
          if (range) {
            quillEditor.current.insertEmbed(range.index, "image", url); // Insert image at the current selection
          }
        });
      };

      const toolbar = quillEditor.current.getModule("toolbar");
      toolbar.addHandler("image", imageHandler);
    } else {
      // If Quill editor is already initialized, update content if the prop changes
      if (content) {
        // Save the current cursor position before updating
        const currentPosition = quillEditor.current.getSelection()?.index || 0;

        // Update the content
        quillEditor.current.clipboard.dangerouslyPasteHTML(content);

        // Restore the cursor position after content update
        quillEditor.current.setSelection(currentPosition);
      }
    }

    // Cleanup the Quill instance on unmount
    return () => {
      if (quillEditor.current) {
        quillEditor.current.on("text-change", () => {
          const currentHtml = quillEditor.current.root.innerHTML;
          htmlContentGrab(currentHtml); // Send updated HTML to parent
        });
      }
    };
  }, [content, htmlContentGrab]); // Re-run only when `content` or `htmlContentGrab` changes

  const openImageGallery = (callback) => {
    setImageCallback(() => callback); // Save the callback function
    setIsGalleryOpen(true); // Open the image gallery popup
  };

  const onImageSelect = (url) => {
    if (imageCallback) {
      imageCallback(url); // Pass the selected image URL to Quill
    }
    setIsGalleryOpen(false); // Close the image gallery
  };

  return (
    <div className="bg-white rounded-lg shadow-lg">
      <div className="border-b border-gray-200 p-4">
        <h2 className="text-xl font-semibold text-gray-800">Content</h2>
      </div>

      {/* Quill editor container */}
      <div ref={quillRef}></div>

      {/* Image gallery popup */}
      {isGalleryOpen && (
        <ImageGalleryPopup
          onImageSelect={onImageSelect}
          onClose={() => setIsGalleryOpen(false)}
        />
      )}
    </div>
  );
};

export default RichTextEditor;
