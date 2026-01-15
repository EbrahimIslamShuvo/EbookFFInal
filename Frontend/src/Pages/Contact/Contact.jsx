const Contact = () => {
  return (
    <div className="max-w-5xl mx-auto px-6 py-16">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">
        Contact Us
      </h1>

      <p className="text-gray-600 mb-8">
        Have questions or feedback? Feel free to contact us.
      </p>

      <form className="grid gap-6 max-w-xl">
        <input
          type="text"
          placeholder="Your Name"
          className="border p-3 rounded"
        />

        <input
          type="email"
          placeholder="Your Email"
          className="border p-3 rounded"
        />

        <textarea
          rows="5"
          placeholder="Your Message"
          className="border p-3 rounded"
        ></textarea>

        <button
          type="submit"
          className="bg-[#3059b8] text-white px-6 py-2 rounded"
        >
          Send Message
        </button>
      </form>
    </div>
  );
};

export default Contact;
