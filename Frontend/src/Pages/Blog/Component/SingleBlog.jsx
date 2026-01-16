import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useBlog from "../../../Data/useBlog";

const SingleBlog = () => {
  const { id } = useParams(); // ⚠️ must be "id"
  const { getBlogById } = useBlog();

  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadBlog = async () => {
      setLoading(true);
      const data = await getBlogById(id);
      setBlog(data);
      setLoading(false);
    };

    loadBlog();
  }, [id, getBlogById]);

  if (loading) {
    return (
      <p className="text-center py-10 text-gray-500">
        Loading blog...
      </p>
    );
  }

  if (!blog) {
    return (
      <p className="text-center py-10 text-red-500">
        Blog not found
      </p>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-10">
      {/* 🖼 Blog Image */}
      {blog.image && (
        <img
          src={
            blog.image.startsWith("http")
              ? blog.image
              : `http://localhost:3000${blog.image}`
          }
          alt={blog.title}
          className="w-full h-80 object-cover rounded mb-6"
        />
      )}

      {/* 📝 Title */}
      <h1 className="text-3xl font-bold mb-4 text-gray-800">
        {blog.title}
      </h1>

      {/* 📄 Description */}
      <p className="text-gray-600 leading-relaxed">
        {blog.description}
      </p>
    </div>
  );
};

export default SingleBlog;
