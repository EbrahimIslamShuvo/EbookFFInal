import { useEffect, useState } from "react";

const useAuthor = () => {
  const [authors, setAuthors] = useState([]);

  useEffect(() => {
    const fetchAuthors = async () => {
      try {
        const res = await fetch("/author.json");
        const data = await res.json();
        setAuthors(data);
      } catch (error) {
        console.error("Failed to fetch authors", error);
      }
    };

    fetchAuthors();
  }, []);

  const getAuthorById = (id) => {
    return authors.find((author) => author.authorId == id);
  };

  return { authors, getAuthorById };
};

export default useAuthor;
