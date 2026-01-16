import { useParams } from "react-router-dom";
import useBook from "../../../Data/useBook";
import { addToCartList } from "../../../Data/addToCartList";

const SingleBook = () => {
  const { id } = useParams();
  const { getBookById } = useBook();

  const book = getBookById(id);

  if (!book) {
    return (
      <p className="text-center py-10 text-gray-500">
        Book not found
      </p>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-6 py-10 grid md:grid-cols-2 gap-8">
      
      {/* 📘 Book Cover */}
      <img
        src={`http://localhost:3000${book.cover}`}
        alt={book.title}
        className="w-full h-96 object-cover rounded shadow"
        onError={(e) => {
          e.target.src =
            "https://via.placeholder.com/400x600?text=No+Cover";
        }}
      />

      {/* 📕 Book Info */}
      <div>
        <h2 className="text-3xl font-bold text-gray-800">
          {book.title}
        </h2>

        <p className="text-gray-500 mt-1">
          Category: {book.category}
        </p>

        <p className="mt-4 text-gray-600 leading-relaxed">
          {book.abstract}
        </p>

        <p className="mt-6 text-2xl font-semibold text-[#3059b8]">
          ৳ {book.price}
        </p>

        {/* 🛒 Add to cart */}
        <button
          onClick={() => {
            addToCartList(book);
            window.dispatchEvent(new Event("cartUpdated"));
          }}
          className="mt-6 bg-[#3059b8] hover:bg-[#234aa5] text-white px-6 py-2 rounded"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default SingleBook;
