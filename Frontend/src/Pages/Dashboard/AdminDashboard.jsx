const AdminDashboard = () => {
  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      <h1 className="text-2xl font-bold mb-6">
        Admin Dashboard
      </h1>

      <div className="grid md:grid-cols-2 gap-6">

        <div className="border p-6 rounded">
          <h2 className="font-semibold mb-2">👤 User Management</h2>
          <p>View all users</p>
        </div>

        <div className="border p-6 rounded">
          <h2 className="font-semibold mb-2">✍️ Author Requests</h2>
          <p>Approve or reject author applications</p>
        </div>

        <div className="border p-6 rounded">
          <h2 className="font-semibold mb-2">📝 Blog Management</h2>
          <p>Approve or delete blogs</p>
        </div>

        <div className="border p-6 rounded">
          <h2 className="font-semibold mb-2">📚 Book Management</h2>
          <p>Approve or delete books</p>
        </div>

      </div>
    </div>
  );
};

export default AdminDashboard;
