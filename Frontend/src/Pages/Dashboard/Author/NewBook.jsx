import { useState } from "react";
import { API_BASE_URL, authHeader } from "../../../config/api";

const NewBook = () => {
  const [form, setForm] = useState({
    title: "",
    abstract: "",
    category: "",
    price: "",
  });

  const [cover, setCover] = useState(null);
  const [pdf, setPdf] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!cover || !pdf) {
      alert("Cover & PDF required");
      return;
    }

    const formData = new FormData();
    formData.append("title", form.title);
    formData.append("abstract", form.abstract);
    formData.append("category", form.category);
    formData.append("price", form.price);
    formData.append("cover", cover);
    formData.append("pdf", pdf);

    try {
      const res = await fetch(`${API_BASE_URL}/books`, {
        method: "POST",
        headers: {
          Authorization: authHeader().Authorization,
        },
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Failed");
        return;
      }

      alert("Book submitted for admin approval!");
    } catch (err) {
      alert("Server error");
    }
  };

  return (
    <div className="p-6 max-w-xl">
      <h2 className="text-xl font-bold mb-4">
        Add New Book
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        
        <input
          name="title"
          placeholder="Book Title"
          className="border p-2 w-full"
          onChange={handleChange}
          required
        />

        <textarea
          name="abstract"
          placeholder="Abstract"
          className="border p-2 w-full"
          onChange={handleChange}
          required
        />

        {/* ✅ CATEGORY DROPDOWN */}
        <select
          name="category"
          className="border p-2 w-full"
          value={form.category}
          onChange={handleChange}
          required
        >
          <option value="">Select Category</option>
          <option value="Fiction">Fiction</option>
          <option value="Non-Fiction">Non-Fiction</option>
          <option value="Biography & Memoir">Biography & Memoir</option>
          <option value="Horror">Horror</option>
          <option value="Fantasy">Fantasy</option>
          <option value="Science Fiction">Science Fiction</option>
          <option value="Romance">Romance</option>
          <option value="Mystery & Thriller">Mystery & Thriller</option>
          <option value="Sport">Sport</option>
        </select>

        <input
          name="price"
          type="number"
          placeholder="Price"
          className="border p-2 w-full"
          onChange={handleChange}
          required
        />

        <input
          type="file"
          accept="image/*"
          onChange={(e) => setCover(e.target.files[0])}
          required
        />

        <input
          type="file"
          accept="application/pdf"
          onChange={(e) => setPdf(e.target.files[0])}
          required
        />

        <button className="bg-[#3059b8] text-white px-4 py-2 rounded">
          Submit
        </button>
      </form>
    </div>
  );
};

export default NewBook;
