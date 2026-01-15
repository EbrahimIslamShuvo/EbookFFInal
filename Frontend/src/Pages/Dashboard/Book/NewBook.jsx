import { useState } from "react";

const NewBook = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  if (user.role !== "author") {
    return <p>Only authors can add books</p>;
  }

  const [title, setTitle] = useState("");
  const [abstract, setAbstract] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [cover, setCover] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const books =
      JSON.parse(localStorage.getItem("books_dashboard")) || [];

    const newBook = {
      id: Date.now(),
      title,
      abstract,
      category,
      price,
      cover,
      authorEmail: user.email,
      status: "pending",
      buyers: [],
    };

    localStorage.setItem(
      "books_dashboard",
      JSON.stringify([...books, newBook])
    );

    alert("Book submitted for admin approval!");

    setTitle("");
    setAbstract("");
    setCategory("");
    setPrice("");
    setCover("");
  };

  return (
    <div className="max-w-xl">
      <h2 className="text-xl font-bold mb-4">Add New Book</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          placeholder="Book Title"
          className="border p-2 w-full"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <textarea
          placeholder="Abstract"
          className="border p-2 w-full"
          rows="4"
          value={abstract}
          onChange={(e) => setAbstract(e.target.value)}
          required
        />

        <input
          placeholder="Category"
          className="border p-2 w-full"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
        />

        <input
          type="number"
          placeholder="Price"
          className="border p-2 w-full"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />

        <input
          placeholder="Cover Image URL"
          className="border p-2 w-full"
          value={cover}
          onChange={(e) => setCover(e.target.value)}
        />

        <button className="bg-[#3059b8] text-white px-4 py-2 rounded">
          Submit Book
        </button>
      </form>
    </div>
  );
};

export default NewBook;
