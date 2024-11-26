'use client';
import { useState, useRef, useEffect } from 'react';
import { FaPencilAlt, FaCaretDown } from 'react-icons/fa';
import { CiVideoOn } from "react-icons/ci";
import { RiArticleLine } from "react-icons/ri";
import { BsBook, BsImages, BsBroadcastPin } from 'react-icons/bs';
import Link from 'next/link';

const postTypes = [
  {
    name: 'Article',
    href: '/posts/article/new',
    icon: <RiArticleLine className="text-gray-400" />,
  },
  {
    name: 'Video',
    href: '/posts/video/new',
    icon: <CiVideoOn className="text-gray-400" />,
  },
  {
    name: 'Web Story',
    href: '/posts/web-story/new',
    icon: <BsBook className="text-gray-400" />,
  },
  {
    name: 'Photo Gallery',
    href: '/posts/photo-gallery/new',
    icon: <BsImages className="text-gray-400" />,
  },
  {
    name: 'Live Blog',
    href: '/posts/live-blog/new',
    icon: <BsBroadcastPin className="text-gray-400" />,
  },
];

const PostTypeDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm"
      >
        <FaPencilAlt size={12} />
        <span>New Post</span>
        <FaCaretDown size={12} className={`transform transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-50">
          {postTypes.map((type) => (
            <Link
              key={type.name}
              href={type.href}
              className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              {type.icon}
              <span>{type.name}</span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default PostTypeDropdown; 