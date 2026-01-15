const MyBlogs = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const blogs = JSON.parse(localStorage.getItem("blogs")) || [];

  const myBlogs = blogs.filter(
    (b) => b.authorEmail === user.email
  );

  const deleteBlog = (id) => {
    const updated = blogs.filter((b) => b.id !== id);
    localStorage.setItem("blogs", JSON.stringify(updated));
    window.location.reload();
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">My Blogs</h2>

      {myBlogs.length === 0 && <p>No blogs yet</p>}

      {myBlogs.map((blog) => (
        <div key={blog.id} className="border p-4 mb-3 rounded">
          <h3 className="font-semibold">{blog.title}</h3>
          <p className="text-sm text-gray-500">
            Status: {blog.status}
          </p>

          <button
            onClick={() => deleteBlog(blog.id)}
            className="text-red-500 mt-2"
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
};

export default MyBlogs;
