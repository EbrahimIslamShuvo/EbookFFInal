import { NavLink } from "react-router-dom";
import useBlog from "../../../Data/useBlog";
import BlogCard from "../../../Component/Shared/BlogCard";

const HomeBlog = () => {
  const { blogs, loading } = useBlog();

  if (loading) return null;

  // show only first 3 blogs
  const featuredBlogs = blogs.slice(0, 3);

  return (
    <section className="py-14 bg-[#f2f7fb]">
      <div className="max-w-7xl mx-auto px-6">

        {/* ===== Header ===== */}
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-semibold text-[#000080]">
            Latest Blogs ✍️
          </h2>

          <NavLink
            to="/blogs"
            className="text-sm font-semibold text-[#3059b8] 
                       hover:text-[#1e3a8a] transition"
          >
            View All Blogs →
          </NavLink>
        </div>

        {/* ===== Blog Grid ===== */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredBlogs.map((blog) => (
            <BlogCard key={blog._id} blog={blog} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default HomeBlog;
