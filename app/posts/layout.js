'use client'
import PostSideBar from "../../components/PostSideBar";

export default function PostsLayout({ children }) {

  return (
    <div className="relative mt-10 ">
      <div className={` w-64 fixed  top-10  transition-all `}>
        <PostSideBar />
      </div>

      <div className="flex-1 ml-64">
        {children}
      </div>
    </div>
  );
}
