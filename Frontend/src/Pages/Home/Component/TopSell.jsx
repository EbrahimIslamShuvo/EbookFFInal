import useBook from "../../../Data/useBook";
import BookCard from "../../../Component/Shared/BookCard";

const TopSell = () => {
  const { books, loading } = useBook();

  if (loading) return null;

  const topBooks = [...books]
    .sort((a, b) => b.sellingQuantity - a.sellingQuantity)
    .slice(0, 4);

  return (
    <section className="py-14 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-2xl font-semibold mb-6">
          Top Selling Books
        </h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {topBooks.map(book => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TopSell;
