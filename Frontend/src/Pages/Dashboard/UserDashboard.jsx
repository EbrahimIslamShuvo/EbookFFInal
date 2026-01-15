import { useNavigate } from "react-router-dom";

const UserDashboard = () => {
  const navigate = useNavigate();

  const applyAuthor = () => {
    alert("Author application submitted (Pending)");
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      <h1 className="text-2xl font-bold mb-6">
        User Dashboard
      </h1>

      <div className="grid md:grid-cols-2 gap-6">

        <div className="border p-6 rounded">
          <h2 className="font-semibold mb-2">📚 My Library</h2>
          <p>Your purchased books</p>
          <button
            onClick={() => navigate("/library")}
            className="mt-3 text-[#3059b8]"
          >
            View Books
          </button>
        </div>

        <div className="border p-6 rounded">
          <h2 className="font-semibold mb-2">📝 My Blogs</h2>
          <p>Create and manage your blogs</p>
          <button className="mt-3 text-[#3059b8]">
            Go to Blogs
          </button>
        </div>

        <div className="border p-6 rounded">
          <h2 className="font-semibold mb-2">✍️ Apply as Author</h2>
          <p>Become a content creator</p>
          <button
            onClick={applyAuthor}
            className="mt-3 text-[#3059b8]"
          >
            Apply
          </button>
        </div>

      </div>
    </div>
  );
};

export default UserDashboard;
