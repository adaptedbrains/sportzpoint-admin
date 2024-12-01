'use client';
import React, { useRef, useState } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import ImageGalleryPopup from './ImageGalleryPopup';

const RichTextEditor = ({ content, htmlContentGrab }) => {
  const editorRef = useRef(null);
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [imageCallback, setImageCallback] = useState(null);
  const [isEditorReady, setIsEditorReady] = useState(false);
  const [imageCaption, setImageCaption] = useState("");

  const grabImageCaption = (e) => {
    setImageCaption(e?.target?.value || e);
  };

  const openImageGallery = (callback) => {
    setImageCallback(() => callback);
    setIsGalleryOpen(true);
  };

  const onImageSelect = (url) => {
    if (imageCallback) {
      // Insert custom HTML with the image and caption
      const editor = editorRef.current;
      const captionHTML = `
        <figure style="text-align: center;">
          <img src="${url}" alt="${imageCaption}" style="max-width: 100%; height: auto;" />
           <figcaption style="font-style: italic; color: #666;">${imageCaption}</figcaption>
        </figure>
      `;
      editor.execCommand('mceInsertContent', false, captionHTML);
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
          content_style: `
            body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif; font-size: 14px; line-height: 1.6; color: #333; margin: 1rem; }
            figure { margin: 0; padding: 0; }
            figcaption { font-style: italic; color: #666; text-align: center; margin-top: 0.5rem; }
          `,
        }}
      />
      {isGalleryOpen && (
        <ImageGalleryPopup
          onImageSelect={onImageSelect}
          onClose={() => setIsGalleryOpen(false)}
          onCaption={grabImageCaption}
          caption={imageCaption}
        />
      )}
    </div>
  );
};

export default RichTextEditor;
