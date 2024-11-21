'use client';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  BsFillFileTextFill, 
  BsFillCameraVideoFill, 
  BsBook, 
  BsImages, 
  BsBroadcastPin, 
  BsFileEarmarkText, 
  BsEnvelope 
} from 'react-icons/bs';
import { AiOutlinePlus } from 'react-icons/ai';
import { BiBookBookmark } from 'react-icons/bi';

const contentTypes = [
  {
    name: 'Article',
    href: '/article',
    icon: <BsFillFileTextFill />,
  },
  {
    name: 'Video',
    href: '/video',
    icon: <BsFillCameraVideoFill />,
  },
  {
    name: 'Web Story',
    href: '/web-story',
    icon: <BsBook />,
  },
  {
    name: 'Photo Gallery',
    href: '/photo-gallery',
    icon: <BsImages />,
  },
  {
    name: 'Live Blog',
    href: '/live-blog',
    icon: <BsBroadcastPin />,
  },
  {
    name: 'Custom Page',
    href: '/custom-page',
    icon: <BsFileEarmarkText />,
  },
  {
    name: 'Newsletter',
    href: '/newsletter',
    icon: <BsEnvelope />,
  },
];

const statuses = [
  { name: 'Published', href: '/published' },
  { name: 'Draft', href: '/draft' },
  { name: 'Pending Approval', href: '/pending-approval' },
  { name: 'Scheduled', href: '/scheduled' },
];

const PostSideBar = () => {
  return (
    <motion.div
      className="w-full bg-gray-100 p-4 h-screen"
      initial={{ x: '-100%' }} // Start position from left
      animate={{ x: 0 }} // Animate to the normal position
      transition={{ duration: 0.5, ease: 'easeOut' }} // Set the duration and easing
    >
      <h2 className="text-xl font-bold mb-6">All Posts</h2>

      {/* Private View Section */}
      <div className="mb-6">
        <h3 className="text-lg font-bold mb-2">Private View</h3>
        <Link
          href="/created-by-me"
          className="flex items-center gap-2 p-2 hover:bg-gray-200 rounded-lg"
        >
          <BiBookBookmark className="text-lg" />
          Created By Me
        </Link>
      </div>

      {/* Content Type Section */}
      <div className="mb-6">
        <h3 className="text-lg font-bold mb-2">Content Type</h3>
        {contentTypes.map((contentType) => (
          <Link
            key={contentType.name}
            href={contentType.href}
            className="flex justify-between items-center p-2 hover:bg-gray-200 rounded-lg"
          >
            <div className="flex items-center gap-2">
              {contentType.icon}
              <span>{contentType.name}</span>
            </div>
            <AiOutlinePlus className="text-gray-400" />
          </Link>
        ))}
      </div>

      {/* Status Section */}
      <div>
        <h3 className="text-lg font-bold mb-2">Status</h3>
        {statuses.map((status) => (
          <Link
            key={status.name}
            href={status.href}
            className="flex items-center gap-2 p-2 hover:bg-gray-200 rounded-lg"
          >
            <BsFillFileTextFill className="text-gray-600" />
            <span>{status.name}</span>
          </Link>
        ))}
      </div>
    </motion.div>
  );
};

export default PostSideBar;
