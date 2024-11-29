"use client";
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';
import Table from '@tiptap/extension-table';
import TextAlign from '@tiptap/extension-text-align';
import Underline from '@tiptap/extension-underline';
import { 
  FaBold, 
  FaItalic,
  FaLink,
  FaImage,
  FaTable,
  FaListUl,
  FaListOl,
  FaRedo,
  FaUndo,
  FaSearchPlus,
  FaExpand,
  FaAlignLeft,
  FaAlignCenter,
  FaAlignRight,
  FaAlignJustify
} from 'react-icons/fa';
import { RxFontFamily } from 'react-icons/rx';
import { LuHeading1 } from 'react-icons/lu';

const MenuBar = ({ editor }) => {
  if (!editor) {
    return null;
  }

  const addImage = () => {
    const url = window.prompt('Enter the URL of the image:');
    if (url) {
      editor.chain().focus().setImage({ src: url }).run();
    }
  };

  const setLink = () => {
    const url = window.prompt('Enter the URL:');
    if (url) {
      editor.chain().focus().setLink({ href: url }).run();
    }
  };

  return (
    <div className="border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
      <div className="flex items-center gap-1 p-1">
        {/* First Group: Text Style */}
        <select 
          onChange={(e) => editor.chain().focus().setParagraph().run()}
          className="h-8 px-2 border rounded text-sm"
          defaultValue="paragraph"
        >
          <option value="paragraph">Paragraph</option>
          <option value="h1">Heading 1</option>
          <option value="h2">Heading 2</option>
          <option value="h3">Heading 3</option>
        </select>

        <div className="w-px h-6 bg-gray-300 mx-1" />
        
        {/* Second Group: Font */}
        <select 
          className="h-8 w-24 px-2 border rounded text-sm flex-shrink-0"
          defaultValue="12pt"
        >
          <option value="12pt">12pt</option>
          <option value="14pt">14pt</option>
          <option value="16pt">16pt</option>
          <option value="18pt">18pt</option>
        </select>

        <div className="w-px h-6 bg-gray-300 mx-1" />

        {/* Third Group: Text Formatting */}
        <div className="flex gap-0.5">
          <button
            onClick={() => editor.chain().focus().toggleBold().run()}
            className={`p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700 ${
              editor.isActive('bold') ? 'bg-gray-200 dark:bg-gray-600' : ''
            }`}
          >
            <FaBold className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => editor.chain().focus().toggleItalic().run()}
            className={`p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700 ${
              editor.isActive('italic') ? 'bg-gray-200 dark:bg-gray-600' : ''
            }`}
          >
            <FaItalic className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={setLink}
            className={`p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700 ${
              editor.isActive('link') ? 'bg-gray-200 dark:bg-gray-600' : ''
            }`}
          >
            <FaLink className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="w-px h-6 bg-gray-300 mx-1" />

        {/* Fourth Group: Lists and Media */}
        <div className="flex gap-0.5">
          <button
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            className={`p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700 ${
              editor.isActive('bulletList') ? 'bg-gray-200 dark:bg-gray-600' : ''
            }`}
          >
            <FaListUl className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            className={`p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700 ${
              editor.isActive('orderedList') ? 'bg-gray-200 dark:bg-gray-600' : ''
            }`}
          >
            <FaListOl className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={addImage}
            className="p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <FaImage className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run()}
            className={`p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700 ${
              editor.isActive('table') ? 'bg-gray-200 dark:bg-gray-600' : ''
            }`}
          >
            <FaTable className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="w-px h-6 bg-gray-300 mx-1" />

        {/* Fifth Group: Alignment */}
        <div className="flex gap-0.5">
          <button
            onClick={() => editor.chain().focus().setTextAlign('left').run()}
            className={`p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700 ${
              editor.isActive({ textAlign: 'left' }) ? 'bg-gray-200 dark:bg-gray-600' : ''
            }`}
          >
            <FaAlignLeft className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => editor.chain().focus().setTextAlign('center').run()}
            className={`p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700 ${
              editor.isActive({ textAlign: 'center' }) ? 'bg-gray-200 dark:bg-gray-600' : ''
            }`}
          >
            <FaAlignCenter className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => editor.chain().focus().setTextAlign('right').run()}
            className={`p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700 ${
              editor.isActive({ textAlign: 'right' }) ? 'bg-gray-200 dark:bg-gray-600' : ''
            }`}
          >
            <FaAlignRight className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => editor.chain().focus().setTextAlign('justify').run()}
            className={`p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700 ${
              editor.isActive({ textAlign: 'justify' }) ? 'bg-gray-200 dark:bg-gray-600' : ''
            }`}
          >
            <FaAlignJustify className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="w-px h-6 bg-gray-300 mx-1" />

        {/* Sixth Group: Undo/Redo */}
        <div className="flex gap-0.5">
          <button
            onClick={() => editor.chain().focus().undo().run()}
            className="p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700"
            disabled={!editor.can().undo()}
          >
            <FaUndo className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => editor.chain().focus().redo().run()}
            className="p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700"
            disabled={!editor.can().redo()}
          >
            <FaRedo className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="w-px h-6 bg-gray-300 mx-1" />

        {/* Seventh Group: View Controls */}
        <div className="flex gap-0.5">
          <button className="p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700">
            <FaSearchPlus className="w-3.5 h-3.5" />
          </button>
          <button className="p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700">
            <FaExpand className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};

const TiptapEditor = ({ content, onChange }) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Image,
      Link,
      Table,
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
      Underline,
    ],
    content: content,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  return (
    <div className="w-full border rounded-lg dark:border-gray-700 overflow-hidden bg-white dark:bg-gray-800">
      <MenuBar editor={editor} />
      <EditorContent 
        editor={editor} 
        className="prose dark:prose-invert max-w-none p-4 min-h-[300px] focus:outline-none"
      />
    </div>
  );
};

export default TiptapEditor;
