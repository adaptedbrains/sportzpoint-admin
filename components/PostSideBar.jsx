'use client';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { CiVideoOn } from "react-icons/ci";
import { RiArticleLine } from "react-icons/ri";
import { 
  BsBook, 
  BsImages, 
  BsBroadcastPin, 
} from 'react-icons/bs';
import { AiOutlinePlus } from 'react-icons/ai';

const contentTypes = [
  {
    name: 'Article',
    href: '/posts/article',
    icon: <RiArticleLine />,
  },
  {
    name: 'Video',
    href: '/posts/video',
    icon: <CiVideoOn />,
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

const PostSideBar = () => {
  return (
    <motion.div
      className="w-full bg-white h-screen px-3 pt-3 z-45"
      initial={{ x: '-100%' }}
      animate={{ x: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      {/* Content Type Section */}
      <div>
        <h3 className="text-gray-500 mb-2">Content Type</h3>
        {contentTypes.map((contentType) => (
          <Link
            key={contentType.name}
            href={contentType.href}
            className="flex items-center gap-2 p-2 group transition-all duration-100 rounded-lg text-zinc-700 text-sm hover:bg-blue-100 hover:text-blue-600 justify-between"
          >
            <div className="flex items-center gap-2">
              {contentType.icon}
              <span>{contentType.name}</span>
            </div>
            <AiOutlinePlus className="text-gray-400 group-hover:text-blue-600" />
          </Link>
        ))}
      </div>
    </motion.div>
  );
};

export default PostSideBar;
