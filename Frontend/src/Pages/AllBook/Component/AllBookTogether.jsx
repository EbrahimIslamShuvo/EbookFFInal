import { useState } from "react";
import useBook from "../../../Data/useBook";
import useCategory from "../../../Data/useCategory";
import BookCard from "../../../Component/Shared/BookCard";

const AllBookTogether = () => {
  const { books, loading } = useBook();
  const { categories } = useCategory();
  const [selectedCategory, setSelectedCategory] = useState(null);

  const filteredBooks = selectedCategory
    ? books.filter(b => b.category_id === selectedCategory)
    : books;

  if (loading) return <p>Loading books...</p>;

  return (
    <div className="grid md:grid-cols-4 gap-8">
      
      {/* Left: Categories */}
      <div className="border p-4 rounded">
        <h3 className="font-semibold mb-4">Categories</h3>
        <ul className="space-y-2">
          <li
            className="cursor-pointer hover:text-[#3059b8]"
            onClick={() => setSelectedCategory(null)}
          >
            All
          </li>
          {categories.map(cat => (
            <li
              key={cat.categoryId}
              className="cursor-pointer hover:text-[#3059b8]"
              onClick={() => setSelectedCategory(cat.categoryId)}
            >
              {cat.name}
            </li>
          ))}
        </ul>
      </div>

      {/* Right: Books */}
      <div className="md:col-span-3 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredBooks.map(book => (
          <BookCard key={book.id} book={book} />
        ))}
      </div>
    </div>
  );
};

export default AllBookTogether;
