import { useEffect, useState } from "react";
import { API_BASE_URL } from "../config/api";

const useBook = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🔹 fetch all active books
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/books`);
        const data = await res.json();

        if (data.success) {
          setBooks(data.data);
        }
      } catch (error) {
        console.error("Failed to fetch books", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  // 🔹 get single book from already loaded list
  const getBookById = (id) => {
    return books.find(
      (book) => book._id === id || book.id === id
    );
  };

  return {
    books,
    loading,
    getBookById,
  };
};

export default useBook;
