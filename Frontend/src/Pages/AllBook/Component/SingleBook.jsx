import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import useBook from "../../../Data/useBook";
import BookCard from "../../../Component/Shared/BookCard";
import { addToCartList } from "../../../Data/addToCartList";

const SingleBook = () => {
  const { id } = useParams();
  const { getBookById, getRelatedBooks } = useBook();

  const [book, setBook] = useState(null);
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadBook = async () => {
      setLoading(true);

      const data = await getBookById(id);
      setBook(data);

      if (data) {
        const relatedBooks = await getRelatedBooks(
          data.category,
          data.authorId?._id,
          data._id
        );
        setRelated(relatedBooks);
      }

      setLoading(false);
    };

    loadBook();
  }, [id, getBookById, getRelatedBooks]);

  if (loading) {
    return (
      <p className="text-center py-20 text-gray-500">
        Loading book...
      </p>
    );
  }

  if (!book) {
    return (
      <p className="text-center py-20 text-red-500">
        Book not found
      </p>
    );
  }

  return (
    <section className="bg-[#f2f7fb] py-16">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-14">

        {/* 📘 COVER */}
        <img
          src={`http://localhost:3000${book.cover}`}
          alt={book.title}
          className="w-full max-w-sm mx-auto rounded-xl shadow-xl"
        />

        {/* 📕 INFO */}
        <div className="space-y-5">
          <h1 className="text-4xl font-bold text-[#000080]">
            {book.title}
          </h1>

          <p className="text-sm text-gray-600">
            Category: <span className="font-semibold">{book.category}</span>
          </p>

          {/* ✅ AUTHOR NAME FIX */}
          <p className="text-sm text-gray-600">
            Author:{" "}
            <span className="font-semibold">
              {book.authorId?.name || "Unknown"}
            </span>
          </p>

          <p className="text-gray-700 leading-relaxed">
            {book.abstract}
          </p>

          <p className="text-3xl font-bold text-[#0047AB]">
            ৳ {book.price}
          </p>

          <button
            onClick={() => {
              addToCartList(book);
              window.dispatchEvent(new Event("cartUpdated"));
            }}
            className="bg-[#0047AB] text-white px-8 py-3 rounded-full hover:bg-[#000080]"
          >
            Add to Cart
          </button>
        </div>
      </div>

      {/* 🔁 RELATED BOOKS */}
      {related.length > 0 && (
        <div className="max-w-6xl mx-auto px-6 mt-20">
          <h2 className="text-2xl font-bold mb-6">
            Related Books
          </h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {related.map((b) => (
              <BookCard key={b._id} book={b} />
            ))}
          </div>
        </div>
      )}
    </section>
  );
};

export default SingleBook;
