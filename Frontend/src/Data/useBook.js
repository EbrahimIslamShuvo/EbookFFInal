import { useEffect, useState } from "react";
import { API_BASE_URL } from "../config/api";

const useBook = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/books`);
        const data = await res.json();
        setBooks(data.data || []);
      } catch (error) {
        console.error("Failed to fetch books", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  const getBookById = async (id) => {
    const res = await fetch(`${API_BASE_URL}/books/${id}`);
    const data = await res.json();
    return data.data;
  };

  return { books, loading, getBookById };
};

export default useBook;
