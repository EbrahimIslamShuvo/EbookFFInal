const AdminBlogApprove = () => {
  const blogs = JSON.parse(localStorage.getItem("blogs")) || [];

  const approve = (id) => {
    const updated = blogs.map((b) =>
      b.id === id ? { ...b, status: "active" } : b
    );
    localStorage.setItem("blogs", JSON.stringify(updated));
    window.location.reload();
  };

  const remove = (id) => {
    const updated = blogs.filter((b) => b.id !== id);
    localStorage.setItem("blogs", JSON.stringify(updated));
    window.location.reload();
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">
        Blog Management
      </h2>

      {blogs.map((blog) => (
        <div key={blog.id} className="border p-4 mb-3 rounded">
          <h3 className="font-semibold">{blog.title}</h3>
          <p>Status: {blog.status}</p>

          {blog.status === "pending" && (
            <button
              onClick={() => approve(blog.id)}
              className="text-green-600 mr-4"
            >
              Approve
            </button>
          )}

          <button
            onClick={() => remove(blog.id)}
            className="text-red-500"
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
};

export default AdminBlogApprove;
