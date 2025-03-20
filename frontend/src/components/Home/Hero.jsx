import React, { useEffect, useState } from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

import { Link } from "react-router-dom";

const Hero = () => {
  const welcomeMessages = [
    "Welcome",
    "नमस्ते",
    "આવકાર",
    "স্বাগতম",
    "வரவேற்பு",
    "స్వాగతం",
    "ಸ್ವಾಗತ",
    "സ്വാഗതം",
    "स्वागत",
    "ਸਵਾਗਤ",
    "خوش آمدید",
    "স্বাগতম",
    "ସ୍ବାଗତ",
    "خوش آمدید",

    "स्वागतम्",
    "स्वागत छ",
    "ڀلي ڪري آيا",
    "ꯁꯥꯎꯒꯠ",
    "ॠगसुन",

    "ᱥᱟᱹᱜᱩᱴᱟᱢ",
  ];

  // Counter Animation
  const [counters, setCounters] = useState({
    treesPlanted: 0,
    documentsVerified: 0,
    peopleHelped: 0,
    freeServices: 0,
    totalBeneficiaries: 0,
  });

  useEffect(() => {
    const animateCounter = (key, target) => {
      let start = 0;
      const duration = 2000; // Smooth Animation
      const stepTime = Math.max(10, Math.floor(duration / target));

      const timer = setInterval(() => {
        start += Math.ceil(target / (duration / stepTime));
        setCounters((prev) => ({ ...prev, [key]: Math.min(start, target) }));
        if (start >= target) clearInterval(timer);
      }, stepTime);
    };

    animateCounter("treesPlanted", 5500);
    animateCounter("documentsVerified", 5000);
    animateCounter("peopleHelped", 10000);
    animateCounter("freeServices", 800);
    animateCounter("totalBeneficiaries", 12000);

    return () => clearInterval();
  }, []);

  return (
    <div className="relative min-h-[80vh] md:min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-blue-100 to-blue-50 text-gray-800 px-6 md:px-14 lg:px-40">
      {/* Language Marquee Animation */}
      <div className="overflow-hidden w-full py-2 bg-blue-600 text-white font-semibold">
        <motion.div
          className="flex space-x-8"
          initial={{ x: "100%" }}
          animate={{ x: "-100%" }}
          transition={{ ease: "linear", duration: 15, repeat: Infinity }}
        >
          {welcomeMessages.concat(welcomeMessages).map((text, index) => (
            <span
              key={index}
              className="px-4 whitespace-nowrap text-lg sm:text-xl"
            >
              {text}
            </span>
          ))}
        </motion.div>
      </div>

      {/* Main Title */}
      <h1
        className="text-3xl sm:text-6xl md:text-7xl lg:text-8xl font-heading mt-4 md:mt-6 text-center text-gray-800 relative"
        style={{
          textShadow: "2px 2px 4px rgba(0, 0, 0, 0.3)", // Adds a subtle black outline
        }}
      >
        Sahyog Gram Panchayat
      </h1>
      <p className="text-md sm:text-lg md:text-xl lg:text-2xl text-center max-w-2xl mt-2 md:mt-4 font-body text-gray-600">
        Empowering rural development through transparent governance and
        community participation.
      </p>

      {/* Discover Schemes Button */}
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="mt-6 md:mt-8"
      >
        <Link
          to="/all-schemes"
          className="px-6 py-3 rounded-full bg-blue-700 text-white font-semibold shadow-lg hover:bg-blue-500 transition duration-300"
        >
          Discover Schemes
        </Link>
      </motion.div>

      {/* Information Cards Grid */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut", staggerChildren: 0.2 }}
        className="hidden md:grid md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6 mt-8 md:mt-10 px-6 md:px-10"
      >
        {[
          { icon: "🌳", label: "Trees Planted", value: counters.treesPlanted },
          {
            icon: "📄",
            label: "Documents Verified",
            value: counters.documentsVerified,
          },
          { icon: "👥", label: "People Helped", value: counters.peopleHelped },
          { icon: "🆓", label: "Free Services", value: counters.freeServices },
          {
            icon: "🏠",
            label: "Beneficiaries",
            value: counters.totalBeneficiaries,
          },
        ].map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: index * 0.2, ease: "easeOut" }}
            className="flex flex-col items-center p-3 bg-white bg-opacity-50 rounded-lg shadow-md border border-gray-200 backdrop-blur-xl transition-all duration-300 w-36 h-24 sm:w-44 sm:h-28 md:w-48 md:h-32"
          >
            <div className="text-2xl sm:text-3xl md:text-4xl">{item.icon}</div>
            <p className="text-xs sm:text-sm md:text-md font-medium text-gray-700 mt-1">
              {item.label}
            </p>
            <p className="text-lg sm:text-xl md:text-2xl font-bold text-blue-600">
              {item.value.toLocaleString()}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default Hero;
