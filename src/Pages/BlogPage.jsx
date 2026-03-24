import { useEffect, useState } from "react";
import BlogHeader from "../components/Blog Components/BlogHeader";
import BlogGrid from "../components/Blog Components/BlogGrid";
// import { blogsData } from "../data/blogsData";
import { getDatabase, ref, get, set, push } from "firebase/database";
import app from "../FireBaseConfig.js";

const BlogPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [blogsData, setBlogsData] = useState([]);

  // Filter blogs based on search query
  const filteredPosts = blogsData.filter((post) =>
    post.title.toLowerCase().includes(searchQuery.toLowerCase()),
  );


  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const db = getDatabase(app);
        const blogsRef = ref(db, "blogs");
        const snapshot = await get(blogsRef);

        if (snapshot.exists()) {
          const rawData = snapshot.val();

          // STEP 1: get the inner object (push id)
          const blogGroup = Object.values(rawData)[0];

          // STEP 2: convert numeric keys to array
          const blogsArray = Object.values(blogGroup);

          setBlogsData(blogsArray);
          console.log("Fetched blogs data:", blogsArray);
        } else {
          console.log("No blog data available");
        }
      } catch (err) {
        console.error("Fetch error:", err);
      }
    };

    fetchBlogs();
  }, []);

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
