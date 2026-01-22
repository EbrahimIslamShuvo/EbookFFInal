import useLibrary from "../../../Data/useLibrary";

const UserMyLibrary = () => {
  const { books, loading } = useLibrary();

  if (loading) {
    return (
      <p className="text-center py-10 text-gray-500">
        Loading your library...
      </p>
    );
  }

  if (books.length === 0) {
    return (
      <div className="text-center py-16">
        <h2 className="text-xl font-semibold mb-2">
          No books purchased yet 📚
        </h2>
        <p className="text-gray-500">
          Buy a book to see it here
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      <h2 className="text-2xl font-bold mb-6">
        My Purchased Books
      </h2>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {books.map((item) => {
          const book = item.bookId;

          const handleReadBook = () => {
            if (!book?.pdfUrl) {
              alert("PDF not available");
              return;
            }

            const pdfUrl = book.pdfUrl.startsWith("http")
              ? book.pdfUrl
              : `http://localhost:3000${book.pdfUrl}`;

            window.open(pdfUrl, "_blank");
          };

          return (
            <div
              key={item._id}
              className="border rounded-lg p-4 hover:shadow transition"
            >
              <img
                src={`http://localhost:3000${book.cover}`}
                alt={book.title}
                className="h-48 w-full object-cover rounded mb-3"
                onError={(e) => {
                  e.target.src =
                    "https://via.placeholder.com/300x400?text=No+Cover";
                }}
              />

              <h3 className="font-semibold">
                {book.title}
              </h3>

              <p className="text-sm text-gray-500">
                Author: {book.authorId?.name || "Unknown"}
              </p>

              <p className="text-sm mt-1">
                Category: {book.category}
              </p>

              <p className="font-bold text-[#3059b8] mt-2">
                ৳ {item.amount}
              </p>

              {/* 📖 READ BOOK */}
              <button
                onClick={handleReadBook}
                className="mt-3 w-full bg-[#3059b8] text-white py-1.5 rounded hover:bg-blue-700 transition"
              >
                Read Book
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default UserMyLibrary;