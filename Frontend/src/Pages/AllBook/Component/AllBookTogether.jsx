import { useState, useMemo } from "react";
import useBook from "../../../Data/useBook";
import BookCard from "../../../Component/Shared/BookCard";

const CATEGORIES = [
  "All",
  "Fiction",
  "Non-Fiction",
  "Biography & Memoir",
  "Horror",
  "Fantasy",
  "Science Fiction",
  "Romance",
  "Mystery & Thriller",
  "Sport",
];

const AllBookTogether = () => {
  const { books, loading } = useBook();

  const [sortType, setSortType] = useState("default");
  const [category, setCategory] = useState("All");

  const filteredAndSortedBooks = useMemo(() => {
    let result = [...books];

    // 🎯 CATEGORY FILTER
    if (category !== "All") {
      result = result.filter(
        (book) => book.category === category
      );
    }

    // 🔽 SORTING
    if (sortType === "az") {
      result.sort((a, b) => a.title.localeCompare(b.title));
    }

    if (sortType === "za") {
      result.sort((a, b) => b.title.localeCompare(a.title));
    }

    if (sortType === "priceLow") {
      result.sort((a, b) => a.price - b.price);
    }

    if (sortType === "priceHigh") {
      result.sort((a, b) => b.price - a.price);
    }

    return result;
  }, [books, sortType, category]);

  if (loading) return <p>Loading books...</p>;

  return (
    <div className="space-y-6">

      {/* 🔧 FILTER BAR */}
      <div className="flex flex-col sm:flex-row justify-between gap-4">

        {/* 📂 CATEGORY FILTER */}
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="border px-3 py-2 rounded w-full sm:w-60"
        >
          {CATEGORIES.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>

        {/* 🔽 SORT FILTER */}
        <select
          value={sortType}
          onChange={(e) => setSortType(e.target.value)}
          className="border px-3 py-2 rounded w-full sm:w-60"
        >
          <option value="default">Sort By</option>
          <option value="az">Title: A - Z</option>
          <option value="za">Title: Z - A</option>
          <option value="priceLow">Price: Low → High</option>
          <option value="priceHigh">Price: High → Low</option>
        </select>
      </div>

      {/* 📚 BOOK LIST */}
      {filteredAndSortedBooks.length === 0 ? (
        <p className="text-gray-500 text-center py-10">
          No books found
        </p>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {filteredAndSortedBooks.map((book) => (
            <BookCard
              key={book._id || book.id}
              book={book}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default AllBookTogether;
