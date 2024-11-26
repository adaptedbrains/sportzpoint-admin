'use client';
import React, { useRef } from 'react';
import { Editor } from '@tinymce/tinymce-react';

const RichTextEditor = ({ onChange }) => {
  const editorRef = useRef(null);

  const handleEditorChange = (content, editor) => {
    onChange?.(content);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg">
      <div className="border-b border-gray-200 p-3">
        <h2 className="text-lg font-semibold text-gray-800">Content</h2>
      </div>
      
      <Editor
        apiKey="qagffr3pkuv17a8on1afax661irst1hbr4e6tbv888sz91jc"
        onInit={(evt, editor) => editorRef.current = editor}
        onEditorChange={handleEditorChange}
        init={{
          height: 400,
          menubar: true,
          plugins: [
            'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
            'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
            'insertdatetime', 'media', 'table', 'help', 'wordcount', 'emoticons'
          ],
          toolbar1: 'styles fontsize | bold italic | image media table link | alignleft aligncenter alignright | bullist numlist | more',
          toolbar2: '',
          toolbar_mode: 'sliding',
          toolbar_sticky: true,
          toolbar_location: 'top',
          statusbar: false,
          font_size_formats: '8pt 10pt 12pt 14pt 16pt 18pt 24pt 36pt 48pt',
          style_formats: [
            { title: 'Paragraph', format: 'p' },
            { title: 'Heading 1', format: 'h1' },
            { title: 'Heading 2', format: 'h2' },
            { title: 'Heading 3', format: 'h3' },
            { title: 'Heading 4', format: 'h4' }
          ],
          setup: (editor) => {
            editor.ui.registry.addMenuButton('more', {
              text: '...',
              fetch: (callback) => {
                const items = [
                  {
                    type: 'menuitem',
                    text: 'Strikethrough',
                    icon: 'strikethrough',
                    onAction: () => editor.execCommand('Strikethrough')
                  },
                  {
                    type: 'menuitem',
                    text: 'Superscript',
                    icon: 'superscript',
                    onAction: () => editor.execCommand('Superscript')
                  },
                  {
                    type: 'menuitem',
                    text: 'Subscript',
                    icon: 'subscript',
                    onAction: () => editor.execCommand('Subscript')
                  },
                  {
                    type: 'menuitem',
                    text: 'Clear formatting',
                    icon: 'remove-formatting',
                    onAction: () => editor.execCommand('RemoveFormat')
                  }
                ];
                callback(items);
              }
            });
          },
          content_style: `
            body {
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
              font-size: 14px;
              line-height: 1.6;
              color: #333;
              margin: 1rem;
            }
          `,
          formats: {
            alignleft: { selector: 'p,h1,h2,h3,h4,h5,h6,td,th,div,ul,ol,li,table,img', classes: 'text-left' },
            aligncenter: { selector: 'p,h1,h2,h3,h4,h5,h6,td,th,div,ul,ol,li,table,img', classes: 'text-center' },
            alignright: { selector: 'p,h1,h2,h3,h4,h5,h6,td,th,div,ul,ol,li,table,img', classes: 'text-right' },
            alignjustify: { selector: 'p,h1,h2,h3,h4,h5,h6,td,th,div,ul,ol,li,table,img', classes: 'text-justify' }
          }
        }}
      />
    </div>
  );
};

export default RichTextEditor;
