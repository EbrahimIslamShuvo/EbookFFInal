import { useNavigate } from "react-router-dom";
import { API_BASE_URL, authHeader } from "../../config/api";

const UserDashboard = () => {
  const navigate = useNavigate();

  // 🔐 logged-in user info
  const user = JSON.parse(localStorage.getItem("user"));

  // 🔥 REAL APPLY AS AUTHOR
  const applyAuthor = async () => {
    try {
      const res = await fetch(
        `${API_BASE_URL}/author-requests/apply`,
        {
          method: "POST",
          headers: authHeader(),
        }
      );

      const data = await res.json();

      if (data.success) {
        alert(
          "Author application submitted! Waiting for admin approval."
        );
      } else {
        alert(data.message || "Already applied");
      }
    } catch (_) {
      alert("Failed to apply as author");
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">

      {/* 👤 USER INFO HEADER */}
      <div className="mb-8 border rounded-lg p-5 bg-gray-50">
        <h1 className="text-2xl font-bold text-gray-800">
          User Dashboard
        </h1>

        {user && (
          <div className="mt-2 text-sm text-gray-600">
            <p>
              <span className="font-medium">Name:</span>{" "}
              {user.name}
            </p>
            <p>
              <span className="font-medium">Email:</span>{" "}
              {user.email}
            </p>
            <p>
              <span className="font-medium">Role:</span>{" "}
              {user.role}
            </p>
          </div>
        )}
      </div>

      {/* 📦 DASHBOARD ACTIONS */}
      <div className="grid md:grid-cols-2 gap-6">
        
        {/* 📚 My Library */}
        <div className="border p-6 rounded hover:shadow transition">
          <h2 className="font-semibold mb-2">
            📚 My Library
          </h2>
          <p>Your purchased books</p>
          <button
            onClick={() => navigate("/library")}
            className="mt-3 text-[#3059b8]"
          >
            View Books
          </button>
        </div>

        {/* ✍️ Apply as Author */}
        <div className="border p-6 rounded hover:shadow transition">
          <h2 className="font-semibold mb-2">
            ✍️ Apply as Author ....
          </h2>
          <p>Become a content creator to make your world</p>
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
