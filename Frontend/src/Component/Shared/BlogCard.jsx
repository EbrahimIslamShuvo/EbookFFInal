import { NavLink } from "react-router-dom";

const BlogCard = ({ blog }) => {
  if (!blog) return null;

  const blogId = blog._id || blog.id;

  const imageUrl = blog.image
    ? blog.image.startsWith("http")
      ? blog.image
      : `http://localhost:3000${blog.image}`
    : "https://via.placeholder.com/400x250?text=No+Image";

  return (
    <div className="border rounded p-4 hover:shadow transition">
      
      <NavLink to={`/blogs/${blogId}`}>
        <img
          src={imageUrl}
          alt={blog.title}
          className="h-44 w-full object-cover mb-3 rounded"
          onError={(e) => {
            e.target.src =
              "https://via.placeholder.com/400x250?text=No+Image";
          }}
        />

        <h3 className="font-semibold text-gray-800 hover:text-[#3059b8]">
          {blog.title}
        </h3>
      </NavLink>

      
    </div>
  );
};

export default BlogCard;
