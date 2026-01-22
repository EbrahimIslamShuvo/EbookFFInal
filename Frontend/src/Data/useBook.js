import { useEffect, useState, useCallback } from "react";
import { API_BASE_URL } from "../config/api";

const useBook = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🌍 ALL ACTIVE BOOKS
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/books`);
        const data = await res.json();
        setBooks(data.success ? data.data : []);
      } catch {
        setBooks([]);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  // 📘 SINGLE BOOK
  const getBookById = useCallback(async (id) => {
    try {
      const res = await fetch(`${API_BASE_URL}/books/${id}`);
      const data = await res.json();
      return data.success ? data.data : null;
    } catch {
      return null;
    }
  }, []);

  // 🔁 RELATED BOOKS
  const getRelatedBooks = useCallback(
    async (category, authorId, excludeId) => {
      try {
        const params = new URLSearchParams({
          category,
          authorId,
          excludeId,
        });

        const res = await fetch(
          `${API_BASE_URL}/books/related/list?${params}`
        );
        const data = await res.json();
        return data.success ? data.data : [];
      } catch {
        return [];
      }
    },
    []
  );

  return {
    books,
    loading,
    getBookById,
    getRelatedBooks,
  };
};

export default useBook;
