import BlogHeader from "../components/Blog Components/BlogHeader";
import BlogGrid from "../components/Blog Components/BlogGrid";
import { blogsData } from "../data/blogsData";

const BlogPage = () => {
  return (
    <div className="w-full">
      <BlogHeader postCount={blogsData.length} />
      <BlogGrid posts={blogsData} />
    </div>
  );
};

export default BlogPage;
