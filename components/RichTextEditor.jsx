'use client';
import React, { useEffect, useRef } from 'react';
import Quill from 'quill';
import 'quill/dist/quill.snow.css';
import 'quill-better-table/dist/quill-better-table.css';
import QuillBetterTable from 'quill-better-table';

const RichTextEditor = () => {
  const editorRef = useRef(null);

  useEffect(() => {
    // Register the Better Table module
    Quill.register(
      {
        'modules/better-table': QuillBetterTable,
      },
      true
    );

    // Initialize Quill Editor
    const quill = new Quill(editorRef.current, {
      theme: 'snow',
      modules: {
        toolbar: {
          container: [
            ['bold', 'italic', 'underline'],
            [{ header: [1, 2, 3, false] }],
            ['blockquote', 'code-block'],
            [{ list: 'ordered' }, { list: 'bullet' }],
            ['link', 'image'],
            [
              {
                table: ['insertTable', 'insertColumnRight', 'insertColumnLeft', 'insertRowUp', 'insertRowDown', 'deleteTable'], // Dropdown for table options
              },
            ],
            ['clean'], // Remove formatting
          ],
          handlers: {
            table: function (value) {
              const betterTable = quill.getModule('better-table');

              // Handle each dropdown value for table operations
              switch (value) {
                case 'insertTable':
                  betterTable.insertTable(3, 3); // Insert a 3x3 table
                  break;
                case 'insertColumnRight':
                  betterTable.insertColumnRight();
                  break;
                case 'insertColumnLeft':
                  betterTable.insertColumnLeft();
                  break;
                case 'insertRowUp':
                  betterTable.insertRowUp();
                  break;
                case 'insertRowDown':
                  betterTable.insertRowDown();
                  break;
                case 'deleteTable':
                  betterTable.deleteTable();
                  break;
                default:
                  console.log('No table action selected');
              }
            },
          },
        },
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
  }, []);

  return (
    <div className='rounded-2xl'>
      <div ref={editorRef} style={{ minHeight: '300px' }} />
      <button
      className='mx-5'
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
