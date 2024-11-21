'use client'
import PostSideBar from "@/components/PostSideBar";
import useSidebarStore from "@/store/useSidebarStore";

export default function PostsLayout({ children }) {
    const { collapsed } = useSidebarStore();

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
