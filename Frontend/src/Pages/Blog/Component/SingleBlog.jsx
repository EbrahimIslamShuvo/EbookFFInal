import { useParams } from "react-router-dom";
import useBlog from "../../../Data/useBlog";

const SingleBlog = () => {
  const { blogId } = useParams();
  const { getBlogById } = useBlog();
  const blog = getBlogById(blogId);

  if (!blog) return <p>Blog not found</p>;

  return (
    <div className="max-w-4xl mx-auto px-6 py-10">
      <img
        src={blog.image}
        alt={blog.title}
        className="w-full h-80 object-cover rounded mb-6"
      />

      <h1 className="text-3xl font-bold mb-4">
        {blog.title}
      </h1>

      <p className="text-gray-600">
        {blog.longdescription}
      </p>
    </div>
  );
};

export default SingleBlog;
