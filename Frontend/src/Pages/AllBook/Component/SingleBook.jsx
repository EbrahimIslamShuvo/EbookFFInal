import { useParams } from "react-router-dom";
import useBook from "../../../Data/useBook";
import { addToCartList } from "../../../Data/addToCartList";

const SingleBook = () => {
  const { id } = useParams();
  const { getBookById } = useBook();
  const book = getBookById(id);

  if (!book) return <p>Book not found</p>;

  return (
    <div className="max-w-5xl mx-auto px-6 py-10 grid md:grid-cols-2 gap-8">
      
      <img
        src={book.coverimage}
        alt={book.name}
        className="w-full h-96 object-cover rounded"
      />

      <div>
        <h2 className="text-3xl font-bold">{book.name}</h2>
        <p className="text-gray-500 mt-2">{book.language}</p>

        <p className="mt-4 text-gray-600">{book.abstract}</p>

        <p className="mt-4 text-xl font-semibold text-[#3059b8]">
          ৳ {book.price}
        </p>

        <button
          onClick={() => addToCartList(book)}
          className="mt-6 bg-[#3059b8] text-white px-6 py-2 rounded"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default SingleBook;
