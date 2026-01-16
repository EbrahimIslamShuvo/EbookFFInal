import BlogCard from "../../../Component/Shared/BlogCard";
import useBlog from "../../../Data/useBlog";

const AllBlog = () => {
  const { blogs, loading } = useBlog();

  if (loading) {
    return (
      <p className="text-center py-10 text-gray-500">
        Loading blogs...
      </p>
    );
  }

  if (!blogs || blogs.length === 0) {
    return (
      <p className="text-center py-10 text-gray-500">
        No blogs found
      </p>
    );
  }

  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {blogs.map((blog) => (
        <BlogCard key={blog._id} blog={blog} />
      ))}
    </div>
  );
};

export default AllBlog;
