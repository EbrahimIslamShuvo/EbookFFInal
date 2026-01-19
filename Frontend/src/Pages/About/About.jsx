import React from "react";
import { NavLink } from "react-router-dom";

const About = () => {
  return (
    <section className="bg-white">
      {/* ===== Hero Section ===== */}
      <div className="bg-gradient-to-r from-indigo-800 via-blue-700 to-sky-400 text-white">
        <div className="max-w-7xl mx-auto px-6 py-24 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
            About Our eBook Store
          </h1>
          <p className="max-w-2xl mx-auto text-blue-100 text-lg">
            A modern digital platform where readers can discover, purchase,
            and enjoy books anytime, anywhere.
          </p>
        </div>
      </div>

      {/* ===== About Content ===== */}
      <div className="max-w-7xl mx-auto px-6 py-20 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          <h2 className="text-3xl font-bold text-indigo-800">
            Who We Are
          </h2>
          <p className="text-gray-600 leading-relaxed">
            Our eBook Store is a reader-focused digital marketplace built
            to make reading simple, affordable, and accessible for everyone.
            We offer a wide range of books from different categories and authors.
          </p>
          <p className="text-gray-600 leading-relaxed">
            Whether you are a student, professional, or casual reader,
            our platform helps you access knowledge without physical limitations.
          </p>
        </div>

        {/* Feature Card */}
        <div className="bg-sky-100/50 p-10 rounded-xl">
          <ul className="space-y-5">
            <Feature text="Instant Digital Book Access" />
            <Feature text="Secure Online Payments" />
            <Feature text="Wide Range of Categories" />
            <Feature text="Modern & User-Friendly Platform" />
          </ul>
        </div>
      </div>

      {/* ===== Mission Section ===== */}
      <div className="bg-gray-100">
        <div className="max-w-7xl mx-auto px-6 py-20 text-center">
          <h2 className="text-3xl font-bold text-indigo-800 mb-6">
            Our Mission
          </h2>
          <p className="max-w-3xl mx-auto text-gray-600 text-lg">
            To make reading accessible anytime, anywhere by providing
            an affordable and portable digital reading experience for all.
          </p>
        </div>
      </div>

      {/* ===== Stats Section ===== */}
      <div className="max-w-7xl mx-auto px-6 py-20 grid grid-cols-1 sm:grid-cols-3 gap-10 text-center">
        <Stat number="2K+" label="Books Available" />
        <Stat number="15+" label="Categories" />
        <Stat number="20K+" label="Happy Readers" />
      </div>

      {/* ===== Call to Action ===== */}
      <div className="bg-blue-700">
        <div className="max-w-7xl mx-auto px-6 py-20 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">
            Start Reading Today
          </h2>
          <p className="mb-8 text-lg text-blue-100">
            Explore thousands of books and enjoy reading without limits.
          </p>
          <NavLink to="/all-books" className="bg-white text-blue-700 px-8 py-3 rounded-full font-semibold hover:bg-blue-100 transition">
            Browse Books
          </NavLink>
        </div>
      </div>
    </section>
  );
};

/* ===== Reusable Components ===== */

const Feature = ({ text }) => (
  <li className="flex items-center gap-4 text-indigo-800 font-medium">
    <span className="w-3 h-3 bg-blue-700 rounded-full"></span>
    {text}
  </li>
);

const Stat = ({ number, label }) => (
  <div>
    <h3 className="text-4xl font-extrabold text-blue-700">
      {number}
    </h3>
    <p className="text-gray-600 mt-2">
      {label}
    </p>
  </div>
);

export default About;
