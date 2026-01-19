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
    <div className="max-w-3xl mx-auto px-6 py-12">

      {/* ===== HEADER ===== */}
      <div className="mb-10">
        <h2 className="text-3xl font-extrabold text-gray-800">
          ➕ Add New Book
        </h2>
        <p className="text-gray-500 mt-2">
          Upload your book details for admin review and publication.
        </p>
      </div>

      {/* ===== FORM CARD ===== */}
      <div className="bg-white rounded-2xl shadow-lg p-8">
        <form onSubmit={handleSubmit} className="space-y-6">

          {/* Title */}
          <Input
            label="Book Title"
            name="title"
            placeholder="Enter book title"
            onChange={handleChange}
            required
          />

          {/* Abstract */}
          <Textarea
            label="Abstract"
            name="abstract"
            placeholder="Write a short summary of the book"
            onChange={handleChange}
            required
          />

          {/* Category */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Category
            </label>
            <select
              name="category"
              value={form.category}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-lg border border-gray-300
                         focus:outline-none focus:ring-2 focus:ring-[#3059b8]"
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
          </div>

          {/* Price */}
          <Input
            label="Price"
            name="price"
            type="number"
            placeholder="Enter price"
            onChange={handleChange}
            required
          />

          {/* Cover Upload */}
          <FileInput
            label="Book Cover (Image)"
            accept="image/*"
            onChange={(e) => setCover(e.target.files[0])}
            required
          />

          {/* PDF Upload */}
          <FileInput
            label="Book PDF File"
            accept="application/pdf"
            onChange={(e) => setPdf(e.target.files[0])}
            required
          />

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-[#3059b8] text-white py-3 rounded-full
                       font-semibold hover:bg-[#1e3a8a]
                       transition shadow-md hover:shadow-lg"
          >
            Submit Book
          </button>
        </form>
      </div>
    </div>
  );
};

/* ===== REUSABLE UI COMPONENTS ===== */

const Input = ({ label, ...props }) => (
  <div>
    <label className="block text-sm font-semibold text-gray-700 mb-2">
      {label}
    </label>
    <input
      {...props}
      className="w-full px-4 py-3 rounded-lg border border-gray-300
                 focus:outline-none focus:ring-2 focus:ring-[#3059b8]"
    />
  </div>
);

const Textarea = ({ label, ...props }) => (
  <div>
    <label className="block text-sm font-semibold text-gray-700 mb-2">
      {label}
    </label>
    <textarea
      {...props}
      rows="5"
      className="w-full px-4 py-3 rounded-lg border border-gray-300
                 focus:outline-none focus:ring-2 focus:ring-[#3059b8]"
    ></textarea>
  </div>
);

const FileInput = ({ label, ...props }) => (
  <div>
    <label className="block text-sm font-semibold text-gray-700 mb-2">
      {label}
    </label>
    <input
      type="file"
      {...props}
      className="w-full px-3 py-2 border border-gray-300 rounded-lg
                 cursor-pointer file:mr-4 file:px-4 file:py-2
                 file:rounded-full file:border-0
                 file:bg-[#3059b8] file:text-white
                 hover:file:bg-[#1e3a8a]"
    />
  </div>
);

export default NewBook;

