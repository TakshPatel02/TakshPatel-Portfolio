import { useState } from "react";
import BlogHeader from "../components/Blog Components/BlogHeader";
import BlogGrid from "../components/Blog Components/BlogGrid";
import { blogsData } from "../data/blogsData";

const BlogPage = () => {
  const [searchQuery, setSearchQuery] = useState("");

  // Filter blogs based on search query
  const filteredPosts = blogsData.filter((post) =>
    post.title.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <div className="w-full">
      <BlogHeader
        postCount={blogsData.length}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />
      <BlogGrid posts={filteredPosts} />
    </div>
  );
};

export default BlogPage;
