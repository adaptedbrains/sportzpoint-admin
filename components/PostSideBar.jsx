'use client';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { CiVideoOn } from "react-icons/ci";
import { RiArticleLine } from "react-icons/ri";
import { VscListFlat } from "react-icons/vsc";

import { 
  BsFillFileTextFill, 
  BsBook, 
  BsImages, 
  BsBroadcastPin, 
} from 'react-icons/bs';
import { AiOutlinePlus } from 'react-icons/ai';
import { BiBookBookmark } from 'react-icons/bi';

const contentTypes = [
  {
    name: 'Article',
    href: '/posts/article',
    icon: <RiArticleLine />,
  },
  {
    name: 'Video',
    href: '/posts/video',
    icon: <CiVideoOn />    ,
  },
  {
    name: 'Web Story',
    href: '/posts/web-story',
    icon: <BsBook />,
  },
  {
    name: 'Photo Gallery',
    href: '/posts/photo-gallery',
    icon: <BsImages />,
  },
  {
    name: 'Live Blog',
    href: '/posts/live-blog',
    icon: <BsBroadcastPin />,
  }
];

const statuses = [
  { name: 'Published', href: 'posts/published' },
  { name: 'Draft', href: 'posts/draft' },
  { name: 'Pending Approval', href: 'posts/pending-approval' },
  { name: 'Scheduled', href: 'posts/scheduled' },
];

const PostSideBar = () => {
  return (
    <motion.div
      className="w-full bg-zinc-100 h-screen px-3 pt-3 z-45"
      initial={{ x: '-100%' }} // Start position from left
      animate={{ x: 0 }} // Animate to the normal position
      transition={{ duration: 0.5, ease: 'easeOut' }} // Set the duration and easing
    >
      <button className='border-b py-2 px-4 flex items-center gap-2 hover:text-blue-600 hover:bg-blue-100 group w-full'>
      <VscListFlat  />
      <li className=" text-gray-700 py-1 list-none   group-hover:text-blue-600 transition-all duration-100 "> 
      All Posts</li>
      </button>

      {/* Private View Section */}
      <div className="mb-6">
        <h3 className="text-gray-500 mb-2">Private View</h3>
        <Link
          href="/created-by-me"
          className="flex items-center gap-2 p-2  transition-all duration-100 rounded-lg text-zinc-700 text-sm hover:bg-blue-100 hover:text-blue-600  "
        >
          <BiBookBookmark  />
          Created By Me
        </Link>
      </div>

      {/* Content Type Section */}
      <div className="mb-6">
        <h3 className="text-gray-500 mb-2">Content Type</h3>
        {contentTypes.map((contentType) => (
          <Link
            key={contentType.name}
            href={contentType.href}
            className="flex items-center gap-2 p-2 group  transition-all duration-100 rounded-lg text-zinc-700 text-sm hover:bg-blue-100 hover:text-blue-600 justify-between"
          >
            <div className="flex items-center gap-2">
              {contentType.icon}
              <span>{contentType.name}</span>
            </div>
            <AiOutlinePlus className="text-gray-400 group-hover:text-blue-600" />
          </Link>
        ))}
      </div>

      {/* Status Section */}
      <div>
        <h3 className="text-gray-500 mb-2">Status</h3>
        {statuses.map((status) => (
          <Link
            key={status.name}
            href={status.href}
           className="flex items-center gap-2 p-2 group  transition-all duration-100 rounded-lg text-zinc-700 text-sm hover:bg-blue-100 hover:text-blue-600 "
          >
            <BsFillFileTextFill className='text-gray-600 group-hover:text-blue-600'  />
            <span>{status.name}</span>
          </Link>
        ))}
      </div>
    </motion.div>
  );
};

export default PostSideBar;
