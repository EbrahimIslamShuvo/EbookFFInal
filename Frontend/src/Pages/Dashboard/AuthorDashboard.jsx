const AuthorDashboard = () => {
  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      <h1 className="text-2xl font-bold mb-6">
        Author Dashboard
      </h1>

      <div className="grid md:grid-cols-2 gap-6">

        <div className="border p-6 rounded">
          <h2 className="font-semibold mb-2">📚 My Library</h2>
          <p>Books you purchased</p>
        </div>

        <div className="border p-6 rounded">
          <h2 className="font-semibold mb-2">📖 My Books</h2>
          <p>Books you published (Pending / Active)</p>
          <button className="mt-3 text-[#3059b8]">
            Manage Books
          </button>
        </div>

        <div className="border p-6 rounded">
          <h2 className="font-semibold mb-2">➕ Add New Book</h2>
          <p>Create a new book</p>
          <button className="mt-3 text-[#3059b8]">
            Add Book
          </button>
        </div>

        <div className="border p-6 rounded">
          <h2 className="font-semibold mb-2">📝 My Blogs</h2>
          <p>Blogs you created</p>
        </div>

      </div>
    </div>
  );
};

export default AuthorDashboard;
