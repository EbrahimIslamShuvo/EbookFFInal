import { useState } from "react";

const NewBlog = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const blogs = JSON.parse(localStorage.getItem("blogs")) || [];

    const newBlog = {
      id: Date.now(),
      title,
      description,
      image,
      authorEmail: user.email,
      status: "pending",
    };

    localStorage.setItem("blogs", JSON.stringify([...blogs, newBlog]));
    alert("Blog submitted for admin approval!");

    setTitle("");
    setDescription("");
    setImage("");
  };

  return (
    <div className="max-w-xl">
      <h2 className="text-xl font-bold mb-4">New Blog</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          placeholder="Blog Title"
          className="border p-2 w-full"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <textarea
          placeholder="Description"
          className="border p-2 w-full"
          rows="4"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />

        <input
          placeholder="Image URL"
          className="border p-2 w-full"
          value={image}
          onChange={(e) => setImage(e.target.value)}
        />

        <button className="bg-[#3059b8] text-white px-4 py-2 rounded">
          Submit Blog
        </button>
      </form>
    </div>
  );
};

export default NewBlog;
