import { useParams } from "react-router-dom";
import useBook from "../../../Data/useBook";
import { addToCartList } from "../../../Data/addToCartList";

const SingleBook = () => {
  const { id } = useParams();
  const { getBookById } = useBook();

  const book = getBookById(id);

  if (!book) {
    return (
      <p className="text-center py-20 text-gray-500">
        Book not found
      </p>
    );
  }

  return (
    <section className="bg-[#f2f7fb] py-16">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-14 items-start">

        {/* 📘 Book Cover (Sticky) */}
        <div className="sticky top-24 flex justify-center">
          <img
            src={`http://localhost:3000${book.cover}`}
            alt={book.title}
            className="w-[340px] h-[480px] object-cover rounded-2xl shadow-2xl"
            onError={(e) => {
              e.target.src =
                "https://via.placeholder.com/400x600?text=No+Cover";
            }}
          />
        </div>

        {/* 📕 Book Details */}
        <div className="space-y-6">

          {/* Title */}
          <h1 className="text-4xl font-extrabold text-[#000080] leading-tight">
            {book.title}
          </h1>

          {/* Meta */}
          <div className="flex items-center gap-4 text-sm">
            <span className="bg-[#82C8E5]/30 text-[#0047AB] px-4 py-1 rounded-full font-semibold">
              {book.category}
            </span>
          </div>

          {/* Description */}
          <p className="text-[#6D8196] leading-relaxed max-w-xl">
            {book.abstract}
          </p>

          {/* Price */}
          <p className="text-3xl font-bold text-[#0047AB]">
            ৳ {book.price}
          </p>

          {/* 🛒 Add to Cart */}
          <button
            onClick={() => {
              addToCartList(book);
              window.dispatchEvent(new Event("cartUpdated"));
            }}
            className="inline-flex items-center justify-center
                       bg-[#0047AB] text-white
                       px-10 py-3 rounded-full
                       font-semibold text-lg
                       hover:bg-[#000080]
                       transition shadow-lg hover:shadow-xl"
          >
            Add to Cart
          </button>

        </div>
      </div>
    </section>
  );
};

export default SingleBook;
