import BlogCard from "../../../Component/Shared/BlogCard";
import useBlog from "../../../Data/useBlog";

const AllBlog = () => {
  const { blogs, loading } = useBlog();

  if (loading) return <p>Loading blogs...</p>;

  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {blogs.map(blog => (
        <BlogCard key={blog.blogId} blog={blog} />
      ))}
    </div>
  );
};

export default AllBlog;
