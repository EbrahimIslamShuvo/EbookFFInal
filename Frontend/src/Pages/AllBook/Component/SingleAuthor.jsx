import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { API_BASE_URL } from "../../../config/api";
import BookCard from "../../../Component/Shared/BookCard";

const SingleAuthor = () => {
  const { authorId } = useParams();
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBooks = async () => {
      setLoading(true);
      const res = await fetch(
        `${API_BASE_URL}/books/author/${authorId}`
      );
      const data = await res.json();
      setBooks(data.data || []);
      setLoading(false);
    };

    fetchBooks();
  }, [authorId]);

  if (loading) {
    return <p className="text-center py-20">Loading books...</p>;
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-16">
      <h1 className="text-2xl font-bold mb-6">
        Books by{" "}
        {books[0]?.authorId?.name || "Unknown Author"}
      </h1>

      {books.length === 0 ? (
        <p>No books published yet</p>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {books.map((book) => (
            <BookCard key={book._id} book={book} />
          ))}
        </div>
      )}
    </div>
  );
};

export default SingleAuthor;
