import { useEffect, useState, useCallback } from "react";
import { API_BASE_URL } from "../config/api";

const useBlog = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🌍 fetch all active blogs
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/blogs`);
        const data = await res.json();

        if (data?.success) {
          setBlogs(data.data);
        } else {
          setBlogs([]);
        }
      } catch (error) {
        console.error("Failed to fetch blogs", error);
        setBlogs([]);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  // 📘 get single blog by id (IMPORTANT FIX)
  const getBlogById = useCallback(async (id) => {
    if (!id) return null;

    try {
      const res = await fetch(`${API_BASE_URL}/blogs/${id}`);
      const data = await res.json();

      return data?.success ? data.data : null;
    } catch (error) {
      console.error("Failed to fetch blog", error);
      return null;
    }
  }, []);

  return {
    blogs,
    loading,
    getBlogById,
  };
};

export default useBlog;
