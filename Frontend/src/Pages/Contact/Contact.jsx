import React from "react";

const Contact = () => {
  return (
    <section className="bg-white">
      {/* ===== Hero Section ===== */}
      <div className="bg-gradient-to-r from-[#000080] via-[#0047AB] to-[#82C8E5] text-white">
        <div className="max-w-7xl mx-auto px-6 py-24 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
            Contact Us
          </h1>
          <p className="max-w-2xl mx-auto text-blue-100 text-lg">
            Have questions, suggestions, or feedback? We’d love to hear from you.
          </p>
        </div>
      </div>

      {/* ===== Contact Section ===== */}
      <div className="max-w-7xl mx-auto px-6 py-20 grid grid-cols-1 lg:grid-cols-2 gap-12">
        
        {/* ===== Contact Info ===== */}
        <div className="space-y-8">
          <h2 className="text-3xl font-bold text-[#000080]">
            Get In Touch
          </h2>

          <p className="text-[#6D8196] text-lg leading-relaxed">
            Whether you have questions, feedback, or need assistance,
            our team is always ready to help. Reach out to us anytime.
          </p>

          <div className="space-y-4 text-[#0047AB]">
            <p className="flex items-center gap-3 hover:text-[#000080] transition">
              📧 support@ebookstore.com
            </p>
            <p className="flex items-center gap-3 hover:text-[#000080] transition">
              📞 +880 1234 567 890
            </p>
            <p className="flex items-center gap-3 hover:text-[#000080] transition">
              📍 Dhaka, Bangladesh
            </p>
          </div>

          {/* Social Icons */}
          <div>
            <p className="font-semibold text-[#000080] mb-3">
              Follow Us
            </p>
            <div className="flex gap-4">
              <SocialIcon>f</SocialIcon>
              <SocialIcon>in</SocialIcon>
              <SocialIcon>t</SocialIcon>
            </div>
          </div>
        </div>

        {/* ===== Contact Form ===== */}
        <div className="bg-[#82C8E5]/20 p-10 rounded-xl shadow-sm">
          <h3 className="text-2xl font-bold text-[#000080] mb-6">
            Send Us a Message
          </h3>

          <form className="space-y-6">
            <InputField
              label="Your Name"
              type="text"
              placeholder="Enter your name"
            />

            <InputField
              label="Your Email"
              type="email"
              placeholder="Enter your email"
            />

            <div>
              <label className="block text-sm font-semibold text-[#000080] mb-2">
                Your Message
              </label>
              <textarea
                rows="5"
                placeholder="Write your message here..."
                className="w-full px-4 py-3 rounded-lg 
                           bg-white border border-[#82C8E5]/40
                           focus:outline-none focus:ring-2
                           focus:ring-[#0047AB]"
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full bg-[#0047AB] text-white py-3 rounded-full 
                         font-semibold hover:bg-[#000080] transition
                         shadow-md hover:shadow-lg"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

/* ===== Reusable Components ===== */

const InputField = ({ label, type, placeholder }) => (
  <div>
    <label className="block text-sm font-semibold text-[#000080] mb-2">
      {label}
    </label>
    <input
      type={type}
      placeholder={placeholder}
      className="w-full px-4 py-3 rounded-lg 
                 bg-white border border-[#82C8E5]/40
                 focus:outline-none focus:ring-2
                 focus:ring-[#0047AB]"
    />
  </div>
);

const SocialIcon = ({ children }) => (
  <div
    className="w-10 h-10 flex items-center justify-center rounded-full 
               bg-[#0047AB] text-white cursor-pointer 
               hover:bg-[#000080] transition font-semibold"
  >
    {children}
  </div>
);

export default Contact;
