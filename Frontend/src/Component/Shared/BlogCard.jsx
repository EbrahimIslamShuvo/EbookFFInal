import { NavLink } from "react-router-dom";

const BlogCard = ({ blog }) => {
  return (
    <div className="border rounded p-4 hover:shadow">
      <NavLink to={`/blogs/${blog.blogId}`}>
        <img
          src={blog.image}
          alt={blog.title}
          className="h-44 w-full object-cover mb-3"
        />
        <h3 className="font-semibold text-gray-800">
          {blog.title}
        </h3>
      </NavLink>

      <p className="text-sm text-gray-500 mt-2">
        {blog.shortdescription}
      </p>
    </div>
  );
};

export default BlogCard;
