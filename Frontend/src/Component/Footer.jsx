import { FaFacebookF, FaTwitter, FaLinkedinIn } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import FooterImg from "../assets/AdobeStock_295454197_bw_cropped_blue_v_narrow.png";

const Footer = () => {
  return (
    <footer className="relative text-white font-semibold mt-5">
      {/* ===== Background Image ===== */}
      <div className="absolute inset-0">
        <img
          src={FooterImg}
          alt="footer background"
          className="w-full h-full object-cover"
        />
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-[#000080]/80"></div>
      </div>

      {/* ===== Footer Content ===== */}
      <div className="relative max-w-7xl mx-auto px-6 py-20 grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* Brand & Contact */}
        <div className="space-y-5">
          <div className="flex items-center gap-3 text-2xl font-bold">
            <span className="bg-[#0047AB] text-white px-3 py-1 rounded-full">
              📘
            </span>
            E-Book
          </div>

          <p className="text-[#82C8E5]">Got Questions? Call us</p>
          <p className="text-lg font-semibold">+880 1825 778685</p>

          <p className="text-[#82C8E5]">📧 mohabbullamurad@gmail.com</p>
          <p className="text-[#82C8E5]">
            📍 Road 07, Sector 10, Uttara <br />
            Dhaka, Bangladesh
          </p>
        </div>

        {/* Customer Support */}
        <div>
          <h3 className="text-lg font-semibold mb-5">Customer Support</h3>
          <ul className="space-y-3 text-[#82C8E5]">
            <li className="hover:text-white transition cursor-pointer">
              Store List
            </li>
            <li className="hover:text-white transition cursor-pointer">
              Opening Hours
            </li>
            <li className="hover:text-white transition cursor-pointer">
              Contact Us
            </li>
            <li className="hover:text-white transition cursor-pointer">
              Return Policy
            </li>
          </ul>
        </div>

        {/* Categories */}
        <div>
          <h3 className="text-lg font-semibold mb-5">Pages</h3>

          <ul className="space-y-3 text-[#82C8E5]">
            <li>
              <NavLink to="/" className="hover:text-white transition">
                Home
              </NavLink>
            </li>

            <li>
              <NavLink to="/all-books" className="hover:text-white transition">
                All Books
              </NavLink>
            </li>

            <li>
              <NavLink to="/blogs" className="hover:text-white transition">
                Blogs
              </NavLink>
            </li>

            <li>
              <NavLink to="/contact" className="hover:text-white transition">
                Contact Us
              </NavLink>
            </li>

            <li>
              <NavLink to="/about" className="hover:text-white transition">
                About Us
              </NavLink>
            </li>
          </ul>
        </div>

        {/* Social Section (Replaced Subscribe) */}
        <div className="space-y-5">
          <h3 className="text-lg font-semibold">Follow Us On</h3>

          <div className="flex gap-4">
            <SocialIcon icon={<FaFacebookF />} />
            <SocialIcon icon={<FaTwitter />} />
            <SocialIcon icon={<FaLinkedinIn />} />
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="relative border-t border-white/20">
        <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row items-center justify-between text-[#82C8E5] text-sm">
          <p>
            © All Rights Reserved 2025 By{" "}
            <span className="text-white font-semibold">Md. Mohab Ullah</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

const SocialIcon = ({ icon }) => (
  <div
    className="w-10 h-10 flex items-center justify-center rounded-md
               bg-white/20 text-white
               hover:bg-[#0047AB] transition cursor-pointer"
  >
    {icon}
  </div>
);

export default Footer;
