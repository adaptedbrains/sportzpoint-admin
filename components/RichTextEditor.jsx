'use client';
import React, { useRef, useState } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import ImageGalleryPopup from './ImageGalleryPopup';

const RichTextEditor = ({ content, htmlContentGrab }) => {
  const editorRef = useRef(null);
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [imageCallback, setImageCallback] = useState(null);
  const [isEditorReady, setIsEditorReady] = useState(false);

  // Function to handle opening the image gallery
  const openImageGallery = (callback) => {
    setImageCallback(() => callback);
    setIsGalleryOpen(true);
  };

  // Function to handle image selection
  const onImageSelect = (url) => {
    if (imageCallback) {
      imageCallback(url);
    }
    setIsGalleryOpen(false);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg">
      <div className="border-b border-gray-200 p-4">
        <h2 className="text-xl font-semibold text-gray-800">Content</h2>
      </div>

      {!isEditorReady && (
        <div className="p-4 text-center text-gray-600">
          Loading editor...
        </div>
      )}

      <Editor
        apiKey={process.env.NEXT_PUBLIC_TINYMCE_API_KEY}
        onInit={(evt, editor) => {
          editorRef.current = editor;
          setIsEditorReady(true);
        }}
        value={content}
        onEditorChange={(newContent) => {
          htmlContentGrab(newContent);
        }}
        init={{
          height: 500,
          menubar: true,
          branding: false,
          promotion: false,
          plugins: [
            'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
            'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
            'insertdatetime', 'media', 'table', 'help', 'wordcount', 'emoticons'
          ],
          toolbar: 'styles fontsize | bold italic | image media table link | alignleft aligncenter alignright | bullist numlist',
          file_picker_callback: (callback, value, meta) => {
            if (meta.filetype === 'image') {
              openImageGallery(callback);
            }
          },
          content_style: `body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif; font-size: 14px; line-height: 1.6; color: #333; margin: 1rem; }`,
          setup: (editor) => {
            editor.on('init', () => {
              setIsEditorReady(true);
            });
          },
          images_upload_handler: (blobInfo, progress) => new Promise((resolve, reject) => {
            // Implement your image upload logic here
            // For now, we'll just use the image gallery
            openImageGallery((url) => {
              resolve(url);
            });
          }),
        }}
      />

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