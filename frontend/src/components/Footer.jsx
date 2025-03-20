import React from "react";
import { Facebook, Twitter, Instagram } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 lg:gap-16 text-center md:text-left">
          {/* 📍 Contact Section */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-blue-400">Contact Us</h3>
            <p className="text-gray-300">
              123 Gram Panchayat Road, District Name
            </p>
            <p className="text-gray-300">Phone: +91 1234567890</p>
            <p className="text-gray-300">
              Email: contact@sahyoggrampanchayat.gov.in
            </p>
          </div>

          {/* 🔗 Quick Links */}
          <div className="space-y-3 px-16">
            <h3 className="text-lg font-semibold text-blue-400">Quick Links</h3>
            <ul className="space-y-1">
              {["Home", "About Us", "Services", "Contact"].map(
                (link, index) => (
                  <li key={index}>
                    <a
                      href={`#${link.toLowerCase().replace(/\s+/g, "-")}`}
                      className="text-gray-300 hover:text-blue-400 transition"
                    >
                      {link}
                    </a>
                  </li>
                )
              )}
            </ul>
          </div>

          {/* 📜 Resources */}
          <div className="space-y-3 px-10">
            <h3 className="text-lg font-semibold text-blue-400">Resources</h3>
            <ul className="space-y-1">
              {["Policies", "FAQ", "Support", "Documents", "Forms"].map(
                (link, index) => (
                  <li key={index}>
                    <a
                      href={`#${link.toLowerCase()}`}
                      className="text-gray-300 hover:text-blue-400 transition"
                    >
                      {link}
                    </a>
                  </li>
                )
              )}
            </ul>
          </div>

          {/* 🌐 Social Media & Newsletter */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-blue-400">Follow Us</h3>
            <div className="flex justify-center md:justify-start space-x-4">
              {[
                { icon: Facebook, href: "#" },
                { icon: Twitter, href: "#" },
                { icon: Instagram, href: "#" },
              ].map((item, index) => (
                <a
                  key={index}
                  href={item.href}
                  className="text-gray-300 hover:text-blue-400 transition transform hover:scale-110"
                >
                  <item.icon size={22} />
                </a>
              ))}
            </div>
            <div className="mt-4">
              <h4 className="text-sm font-medium text-gray-400">
                Subscribe for Updates
              </h4>
              <div className="flex mt-2">
                <input
                  type="email"
                  placeholder="Your email"
                  className="bg-gray-800 text-white px-3 py-2 rounded-l w-full focus:ring-2 focus:ring-blue-400"
                />
                <button className="bg-blue-500 hover:bg-blue-600 px-4 rounded-r text-sm font-medium transition">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* ⚡ Footer Bottom */}
        <div className="mt-10 border-t border-gray-800 pt-6 flex flex-col md:flex-row justify-between items-center text-gray-400 text-sm">
          <p>
            &copy; {currentYear} Sahyog Gram Panchayat. All rights reserved.
          </p>
          <div className="flex flex-col sm:flex-row items-center mt-3 sm:mt-0 space-y-2 sm:space-y-0 sm:space-x-4">
            <p>"Striving for a better tomorrow"</p>
            <div className="flex space-x-4">
              <a href="#privacy" className="hover:text-blue-400 transition">
                Privacy
              </a>
              <span>|</span>
              <a href="#terms" className="hover:text-blue-400 transition">
                Terms
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
