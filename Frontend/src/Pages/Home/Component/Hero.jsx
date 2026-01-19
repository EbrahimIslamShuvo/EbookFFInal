import { NavLink } from "react-router-dom";
import React from "react";
import HeroImg from "../../../assets/74cf953c2ff0c756d927dea77d9ff773.jpg";

const Hero = () => {
  return (
    <section className="relative overflow-hidden">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#130749] via-[#1b2476] to-[#3460c7] opacity-95"></div>

      {/* Content */}
      <div className="relative max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 lg:grid-cols-2 items-center gap-10">

        {/* Left Content */}
        <div className="text-white space-y-5">
          <span className="inline-block bg-black/40 px-4 py-1 rounded-full text-sm">
            Explore Unlimited Knowledge
          </span>

          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">
            Discover, Read & <br />
            Enjoy{" "}
            <span className="text-[#e53232] relative">
              Digital Books
              <span className="absolute left-0 -bottom-2 w-full h-1.5 bg-[#e53232] rounded-full"></span>
            </span>
          </h1>

          <p className="text-gray-200 max-w-xl text-sm md:text-base">
            Explore thousands of eBooks from top authors across every genre.
            Read anytime, anywhere.
          </p>

          <div className="flex gap-4 pt-3">
            <NavLink to="/all-books">
              <button className="bg-white text-gray-900 px-6 py-2.5 rounded-full font-semibold hover:bg-gray-200 transition">
                Browse Books →
              </button>
            </NavLink>

            <NavLink to="/about">
              <button className="bg-[#5078d6] px-6 py-2.5 rounded-full font-semibold hover:bg-[#07051d] transition">
                About Us →
              </button>
            </NavLink>
          </div>
        </div>

        {/* Right Image */}
        <div className="relative flex justify-center">
          <img
            src={HeroImg}
            alt="Hero Book"
            className="max-w-sm lg:max-w-md rounded-xl drop-shadow-2xl"
          />
        </div>

      </div>
    </section>
  );
};

export default Hero;
