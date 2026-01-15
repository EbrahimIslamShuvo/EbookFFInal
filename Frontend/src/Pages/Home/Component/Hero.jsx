import { NavLink } from "react-router-dom";

const Hero = () => {
  return (
    <section className="bg-[#f5f7ff] py-20">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-10 items-center">

        <div>
          <h1 className="text-4xl font-bold text-gray-800">
            Discover, Read & Enjoy Digital Books
          </h1>
          <p className="mt-4 text-gray-600">
            Explore thousands of eBooks from top authors across all genres.
          </p>
          <NavLink to="/all-books">
            <button className="mt-6 bg-[#3059b8] text-white px-6 py-2 rounded">
              Browse Books
            </button>
          </NavLink>
        </div>

        <img
          src="/covers/react.jpg"
          alt="Hero Book"
          className="rounded shadow"
        />

      </div>
    </section>
  );
};

export default Hero;
