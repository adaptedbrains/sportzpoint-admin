// const { default: LiveBlogUpdates } = require("@/components/LiveBlogUpdates");
const { default: LiveBlogUpdates } = require("../../../../components/LiveBlogUpdates");

export default async function Page({ params }) {
  const { blogId } = await params;
  return (
    <div>
      <LiveBlogUpdates postId={blogId} />
    </div>
  );
}
