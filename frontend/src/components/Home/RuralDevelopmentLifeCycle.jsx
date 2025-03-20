import React, { useState, useEffect } from "react";
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";
import {
  CheckCircle,
  Users,
  Home,
  Briefcase,
  ShieldCheck,
  Building,
  Leaf,
  Handshake,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const steps = [
  {
    number: "1",
    icon: <CheckCircle size={40} />,
    title: "Planning",
    desc: "Strategic planning ensures clear objectives and efficient resource allocation.",
    color: "blue",
  },
  {
    number: "2",
    icon: <Users size={40} />,
    title: "Community Engagement",
    desc: "Involving local people fosters better execution and social development.",
    color: "green",
  },
  {
    number: "3",
    icon: <Home size={40} />,
    title: "Infrastructure Development",
    desc: "Building essential services like roads and schools improves living standards.",
    color: "amber",
  },
  {
    number: "4",
    icon: <Briefcase size={40} />,
    title: "Employment Generation",
    desc: "Creating rural job opportunities boosts economic growth and stability.",
    color: "purple",
  },
  {
    number: "5",
    icon: <ShieldCheck size={40} />,
    title: "Sustainability",
    desc: "Long-term development strategies ensure continued progress.",
    color: "teal",
  },
  {
    number: "6",
    icon: <Building size={40} />,
    title: "Government Schemes",
    desc: "Providing subsidies and financial aid supports rural projects.",
    color: "red",
  },
  {
    number: "7",
    icon: <Leaf size={40} />,
    title: "Agriculture Support",
    desc: "Modern farming techniques improve productivity and income.",
    color: "emerald",
  },
  {
    number: "8",
    icon: <Handshake size={40} />,
    title: "Public-Private Partnership",
    desc: "Collaboration with private sectors enhances investment.",
    color: "indigo",
  },
];

const RuralDevelopmentLifeCycle = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);

  // Check screen size for responsive adjustments
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640);
      setIsTablet(window.innerWidth >= 640 && window.innerWidth < 1024);
    };

    // Initial check
    handleResize();

    // Add resize listener
    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const progressPercentage = ((currentStep + 1) / steps.length) * 100;

  // Get color functions
  const getBgColor = (color) => {
    const colorMap = {
      blue: "bg-blue-600",
      green: "bg-green-600",
      amber: "bg-amber-600",
      purple: "bg-purple-600",
      teal: "bg-teal-600",
      red: "bg-red-600",
      emerald: "bg-emerald-600",
      indigo: "bg-indigo-600",
    };
    return colorMap[color] || "bg-blue-600";
  };

  const getBorderColor = (color) => {
    const borderMap = {
      blue: "border-blue-600",
      green: "border-green-600",
      amber: "border-amber-600",
      purple: "border-purple-600",
      teal: "border-teal-600",
      red: "border-red-600",
      emerald: "border-emerald-600",
      indigo: "border-indigo-600",
    };
    return borderMap[color] || "border-blue-600";
  };

  const getHoverColor = (color) => {
    const hoverMap = {
      blue: "hover:bg-blue-700",
      green: "hover:bg-green-700",
      amber: "hover:bg-amber-700",
      purple: "hover:bg-purple-700",
      teal: "hover:bg-teal-700",
      red: "hover:bg-red-700",
      emerald: "hover:bg-emerald-700",
      indigo: "hover:bg-indigo-700",
    };
    return hoverMap[color] || "hover:bg-blue-700";
  };

  // Calculate circle position based on device
  const getCirclePosition = (index) => {
    // Smaller radius for mobile
    const radius = isMobile ? 35 : isTablet ? 38 : 42;

    return {
      top: `${50 + radius * Math.sin((index * 2 * Math.PI) / steps.length)}%`,
      left: `${50 + radius * Math.cos((index * 2 * Math.PI) / steps.length)}%`,
    };
  };

  return (
    <section className="bg-gradient-to-br from-blue-100 to-blue-300 py-2 sm:py-12 md:py-16 px-4 sm:px-6 md:px-12 lg:px-20 flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-indigo-900 mb-5 sm:mb-6 text-center">
        Rural Development <span className="text-blue-600">Life Cycle</span>
      </h1>

      {/* Container */}
      <div className="w-full max-w-6xl flex flex-col lg:flex-row items-center mt-5 justify-between gap-6 sm:gap-8 lg:gap-10">
        {/* Left Content Section */}
        <div className="w-full lg:w-1/2 flex flex-col items-start">
          <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-800">
            Stage {currentStep + 1} of {steps.length}
          </h2>

          {/* Progress Bar */}
          <div className="w-full h-2 bg-gray-200 rounded-full my-3 sm:my-4">
            <motion.div
              className={`h-full rounded-full ${getBgColor(
                steps[currentStep].color
              )}`}
              animate={{ width: `${progressPercentage}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>

          {/* Animated Content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ duration: 0.5 }}
              className={`p-4 sm:p-6 bg-white shadow-lg rounded-lg border-l-4 ${getBorderColor(
                steps[currentStep].color
              )} text-left w-full`}
            >
              <h3 className="text-xl sm:text-2xl font-semibold text-gray-800">
                {steps[currentStep].title}
              </h3>
              <p className="text-gray-700 mt-2 sm:mt-4 text-base sm:text-lg">
                {steps[currentStep].desc}
              </p>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Buttons */}
          <div className="mt-4 sm:mt-6 flex gap-2 sm:gap-4 w-full">
            <motion.button
              className={`${getBgColor(
                steps[currentStep].color
              )} text-white px-3 sm:px-5 py-2 rounded-lg text-sm sm:text-base flex items-center gap-1 sm:gap-2 ${getHoverColor(
                steps[currentStep].color
              )} flex-1`}
              onClick={() =>
                setCurrentStep((prev) =>
                  prev > 0 ? prev - 1 : steps.length - 1
                )
              }
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <ChevronLeft size={isMobile ? 16 : 20} /> Previous
            </motion.button>
            <motion.button
              className={`${getBgColor(
                steps[currentStep].color
              )} text-white px-3 sm:px-5 py-2 rounded-lg text-sm sm:text-base flex items-center gap-1 sm:gap-2 ${getHoverColor(
                steps[currentStep].color
              )} flex-1 justify-center`}
              onClick={() =>
                setCurrentStep((prev) =>
                  prev < steps.length - 1 ? prev + 1 : 0
                )
              }
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Next <ChevronRight size={isMobile ? 16 : 20} />
            </motion.button>
          </div>
        </div>

        {/* Circular Navigation */}
        <div className="relative w-full lg:w-1/2 h-[250px] sm:h-[300px] md:h-[350px] lg:h-[400px] flex justify-center items-center mt-6 lg:mt-0">
          {/* Center icon */}
          <motion.div
            className="absolute w-1/2 sm:w-2/3 h-1/2 sm:h-2/3 rounded-full bg-white shadow-lg border-4 sm:border-6 border-gray-100 flex items-center justify-center"
            animate={{
              boxShadow: [
                "0 0 10px rgba(59, 130, 246, 0.2)",
                "0 0 20px rgba(59, 130, 246, 0.4)",
                "0 0 10px rgba(59, 130, 246, 0.2)",
              ],
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <motion.div
              key={currentStep}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col items-center"
            >
              {React.cloneElement(steps[currentStep].icon, {
                size: isMobile ? 36 : isTablet ? 50 : 64,
              })}
              <p className="text-sm sm:text-base font-medium mt-2 text-gray-800">
                {steps[currentStep].title}
              </p>
            </motion.div>
          </motion.div>

          {/* Circle navigation */}
          {steps.map((step, index) => {
            const position = getCirclePosition(index);

            return (
              <motion.div
                key={index}
                className="absolute cursor-pointer"
                style={{
                  top: position.top,
                  left: position.left,
                  transform: "translate(-50%, -50%)",
                  zIndex: currentStep === index ? 10 : 1,
                }}
                onClick={() => setCurrentStep(index)}
              >
                <motion.div
                  className={`${
                    currentStep === index ? "ring-2 ring-offset-2" : ""
                  } 
                  bg-white shadow-md p-2 sm:p-3 rounded-full border-2 border-gray-300 
                  flex items-center justify-center 
                  w-8 h-8 sm:w-12 sm:h-12 md:w-14 md:h-14`}
                  whileHover={{ scale: 1.1 }}
                  animate={
                    currentStep === index
                      ? {
                          scale: 1.1,
                          boxShadow: "0 0 10px rgba(59, 130, 246, 0.4)",
                        }
                      : { scale: 1 }
                  }
                >
                  <div
                    className={`absolute -top-1 -left-1 ${getBgColor(
                      step.color
                    )} text-white 
                    px-1 rounded-full text-xs font-bold 
                    ${
                      isMobile ? "w-4 h-4 flex items-center justify-center" : ""
                    }`}
                  >
                    {step.number}
                  </div>
                  {React.cloneElement(step.icon, {
                    size: isMobile ? 16 : isTablet ? 20 : 24,
                  })}
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default RuralDevelopmentLifeCycle;
