'use client'
import React, { useEffect, useRef } from 'react';
import Quill from 'quill';
import 'quill/dist/quill.snow.css';
import 'quill-better-table/dist/quill-better-table.css';
import QuillBetterTable from 'quill-better-table';

const RichTextEditor = () => {
  const editorRef = useRef(null);

  useEffect(() => {
    // Register the table module
    Quill.register(
      {
        'modules/better-table': QuillBetterTable,
      },
      true
    );

    const quill = new Quill(editorRef.current, {
      theme: 'snow',
      modules: {
        toolbar: [
          ['bold', 'italic', 'underline'],
          [{ header: [1, 2, 3, false] }],
          ['blockquote', 'code-block'],
          [{ list: 'ordered' }, { list: 'bullet' }],
          [{ script: 'sub' }, { script: 'super' }],
          [{ indent: '-1' }, { indent: '+1' }],
          [{ direction: 'rtl' }],
          ['link', 'image'],
          ['clean'], // Remove formatting
          ['fullscreen'], // Fullscreen support
          ['better-table'], // Table support
        ],
        'better-table': {
          operationMenu: {
            items: {
              insertColumnRight: true,
              insertColumnLeft: true,
              insertRowUp: true,
              insertRowDown: true,
              mergeCells: true,
              unmergeCells: true,
              deleteColumn: true,
              deleteRow: true,
              deleteTable: true,
            },
          },
        },
        clipboard: {
          matchVisual: false,
        },
      },
    });

    // Enable full-screen mode manually (optional feature)
    const toolbar = quill.getModule('toolbar');
    toolbar.addHandler('fullscreen', () => {
      document.body.requestFullscreen();
    });
  }, []);

  return (
    <div>
      <div ref={editorRef} style={{ height: '500px' }} />
      <button
        onClick={() => {
          const editorContent = editorRef.current.querySelector('.ql-editor').innerHTML;
          console.log(editorContent); // Save the editor's content
        }}
      >
        Save Content
      </button>
    </div>
  );
};

export default RichTextEditor;
