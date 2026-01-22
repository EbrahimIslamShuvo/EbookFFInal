import { NavLink } from "react-router-dom";

const BlogCard = ({ blog }) => {
  if (!blog) return null;

  const blogId = blog._id;

  const imageUrl = blog.image
    ? blog.image.startsWith("http")
      ? blog.image
      : `http://localhost:3000${blog.image}`
    : "https://via.placeholder.com/400x250?text=No+Image";

  const authorName =
    blog.authorId?.name || "Unknown Author";

  return (
    <div className="border rounded p-4 hover:shadow transition">
      <NavLink to={`/blogs/${blogId}`}>
        <img
          src={imageUrl}
          alt={blog.title}
          className="h-44 w-full object-cover mb-3 rounded"
        />

        <h3 className="font-semibold text-gray-800 hover:text-[#3059b8]">
          {blog.title}
        </h3>
      </NavLink>

      {/* 👤 Author */}
      <p className="text-sm text-gray-500 mt-1">
        by <span className="font-medium">{authorName}</span>
      </p>
    </div>
  );
};

export default BlogCard;
