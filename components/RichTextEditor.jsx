'use client';
import React, { useRef } from 'react';
import { Editor } from '@tinymce/tinymce-react';

const RichTextEditor = ({ content }) => {
  const editorRef = useRef(null);

  // Function to log the content
  const logContent = (newContent) => {
    console.log("Updated Content:", newContent);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg">
      <div className="border-b border-gray-200 p-4">
        <h2 className="text-xl font-semibold text-gray-800">Content</h2>
      </div>

      <Editor
        apiKey="qagffr3pkuv17a8on1afax661irst1hbr4e6tbv888sz91jc"
        onInit={(evt, editor) => editorRef.current = editor}
        value={content}  // The initial content to display
        onEditorChange={(newContent) => {
          logContent(newContent);  // Log the content every time it's changed
        }}
        init={{
          height: 500,
          menubar: true,
          menu: {
            file: { title: 'File', items: 'newdocument restoredraft | preview | export print | deleteallconversations' },
            edit: { title: 'Edit', items: 'undo redo | cut copy paste pastetext | selectall | searchreplace' },
            view: { title: 'View', items: 'code | visualaid visualchars visualblocks | spellchecker | preview fullscreen | showcomments' },
            insert: { title: 'Insert', items: 'image link media addcomment pageembed template codesample inserttable | charmap emoticons hr | pagebreak nonbreaking anchor tableofcontents | insertdatetime' },
            format: { title: 'Format', items: 'bold italic underline strikethrough superscript subscript codeformat | styles blocks fontfamily fontsize align lineheight | forecolor backcolor | language | removeformat' },
            tools: { title: 'Tools', items: 'spellchecker spellcheckerlanguage | code wordcount' },
            table: { title: 'Table', items: 'inserttable | cell row column | advtablesort | tableprops deletetable' },
            help: { title: 'Help', items: 'help' }
          },
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
            // Add custom "More" button that opens all other options
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
          content_style: `body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif; font-size: 14px; line-height: 1.6; color: #333; margin: 1rem; }`,
          formats: {
            alignleft: { selector: 'p,h1,h2,h3,h4,h5,h6,td,th,div,ul,ol,li,table,img', classes: 'text-left' },
            aligncenter: { selector: 'p,h1,h2,h3,h4,h5,h6,td,th,div,ul,ol,li,table,img', classes: 'text-center' },
            alignright: { selector: 'p,h1,h2,h3,h4,h5,h6,td,th,div,ul,ol,li,table,img', classes: 'text-right' },
            alignjustify: { selector: 'p,h1,h2,h3,h4,h5,h6,td,th,div,ul,ol,li,table,img', classes: 'text-justify' }
          },
        }}
      />

      <div className="flex justify-end p-4 border-t border-gray-200">
        <button
          onClick={() => {
            if (editorRef.current) {
              console.log("Final Content:", editorRef.current.getContent());
            }
          }}
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
        >
          Save Content
        </button>
      </div>
    </div>
  );
};

export default RichTextEditor;
