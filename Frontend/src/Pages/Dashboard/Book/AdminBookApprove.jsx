const AdminBookApprove = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  if (user.role !== "admin") {
    return <p>Access denied</p>;
  }

  const books =
    JSON.parse(localStorage.getItem("books_dashboard")) || [];

  const approve = (id) => {
    const updated = books.map((b) =>
      b.id === id ? { ...b, status: "active" } : b
    );
    localStorage.setItem("books_dashboard", JSON.stringify(updated));
    window.location.reload();
  };

  const remove = (id) => {
    const updated = books.filter((b) => b.id !== id);
    localStorage.setItem("books_dashboard", JSON.stringify(updated));
    window.location.reload();
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">
        Book Management
      </h2>

      {books.map((book) => (
        <div key={book.id} className="border p-4 mb-3 rounded">
          <h3 className="font-semibold">{book.title}</h3>
          <p>Status: {book.status}</p>

          {book.status === "pending" && (
            <button
              onClick={() => approve(book.id)}
              className="text-green-600 mr-4"
            >
              Approve
            </button>
          )}

          <button
            onClick={() => remove(book.id)}
            className="text-red-500"
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
};

export default AdminBookApprove;
