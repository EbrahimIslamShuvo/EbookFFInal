import { useEffect, useState } from "react";
import { API_BASE_URL } from "../config/api";

const useBlog = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/blogs`);
        const data = await res.json();
        setBlogs(data.data || []);
      } catch (error) {
        console.error("Failed to fetch blogs", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  const getBlogById = async (id) => {
    const res = await fetch(`${API_BASE_URL}/blogs/${id}`);
    const data = await res.json();
    return data.data;
  };

  return { blogs, loading, getBlogById };
};

export default useBlog;
