import { useEffect, useState } from "react";
import { API_BASE_URL, authHeader } from "../config/api";

const useLibrary = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_BASE_URL}/purchases/my`, {
      headers: authHeader(),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setBooks(data.data);
        } else {
          setBooks([]);
        }
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, []);

  return { books, loading };
};

export default useLibrary;
