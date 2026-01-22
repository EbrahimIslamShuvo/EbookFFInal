import { NavLink } from "react-router-dom";
import { addToCartList } from "../../Data/addToCartList";

const BookCard = ({ book }) => {
  if (!book) return null;

  const bookId = book._id;

  const author =
    typeof book.authorId === "object"
      ? book.authorId
      : null;

  const imageUrl = book.cover
    ? `http://localhost:3000${book.cover}`
    : "https://via.placeholder.com/300x400?text=No+Image";

  return (
    <div className="border rounded-lg p-4 hover:shadow-md transition">
      <NavLink to={`/all-books/${bookId}`}>
        <img
          src={imageUrl}
          alt={book.title}
          className="h-52 w-full object-cover rounded mb-3"
        />
      </NavLink>

      <h3 className="font-semibold">{book.title}</h3>

      <p className="text-sm text-gray-500">
        by{" "}
        <NavLink
          to={`/authors/${author?._id}`}
          className="hover:underline"
        >
          {author?.name || "Unknown Author"}
        </NavLink>
      </p>

      <p className="font-bold text-[#3059b8] mt-2">
        ৳ {book.price}
      </p>

      <button
        onClick={() => addToCartList(book)}
        className="mt-3 w-full bg-gray-900 text-white py-1.5 rounded"
      >
        Add to Cart
      </button>
    </div>
  );
};

export default BookCard;
