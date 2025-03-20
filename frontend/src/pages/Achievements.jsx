import React, { useState } from "react";
import { FaEye, FaTrophy, FaTimes } from "react-icons/fa";

const awardsData = [
  {
    id: 1,
    year: "2017-18",
    title: "PriaSoft",
    remark: "Recognized for innovation in Panchayati Raj governance.",
    achievedBy: "Ministry of Rural Development",
    description:
      "PriaSoft was awarded for its pioneering approach in financial management and e-Governance in Panchayati Raj institutions, improving efficiency and transparency.",
  },
  {
    id: 2,
    year: "2009-10",
    title: "National e-Governance Award",
    remark: "Award for Innovative Technology in e-Governance.",
    achievedBy: "Department of Administrative Reforms",
    description:
      "Recognized for implementing advanced digital transformation in governance to enhance transparency and efficiency.",
  },
];

const Achievements = () => {
  const [selectedAward, setSelectedAward] = useState(null);

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 md:px-10 text-gray-800">
      {/* Header */}
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold flex items-center gap-2 justify-center text-green-900 tracking-wide leading-tight">
        <FaTrophy className="text-yellow-600" /> Awards & Achievements
      </h1>
      <p className="text-center text-gray-600 text-md md:text-lg mt-2">
        Recognizing milestones in rural and e-Governance advancements.
      </p>

      {/* Table Container (Scrollable on Small Screens) */}
      <div className="mt-10 bg-white shadow-lg rounded-lg overflow-hidden border border-gray-300 overflow-x-auto">
        <table className="w-full min-w-[600px] border-collapse">
          <thead className="bg-green-900 text-white text-sm md:text-lg font-medium">
            <tr>
              <th className="py-3 px-4 text-left">#</th>
              <th className="py-3 px-4 text-left">Year</th>
              <th className="py-3 px-4 text-left">Title</th>
              <th className="py-3 px-4 text-left hidden md:table-cell">
                Remark
              </th>
              <th className="py-3 px-4 text-center">View</th>
            </tr>
          </thead>
          <tbody>
            {awardsData.map((award, index) => (
              <tr
                key={award.id}
                className="border-b border-gray-300 hover:bg-gray-100 transition-all"
              >
                <td className="py-3 px-4">{index + 1}</td>
                <td className="py-3 px-4">{award.year}</td>
                <td className="py-3 px-4 font-semibold">{award.title}</td>
                <td className="py-3 px-4 text-gray-700 hidden md:table-cell">
                  {award.remark}
                </td>
                <td className="py-3 px-4 text-center">
                  <button
                    className="bg-yellow-600 hover:bg-yellow-700 text-white px-3 py-1 rounded-md flex items-center gap-1 mx-auto transition-all"
                    onClick={() => setSelectedAward(award)}
                  >
                    <FaEye /> View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Detailed View Modal */}
      {selectedAward && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 px-4">
          <div className="bg-white p-6 md:p-8 w-full max-w-lg rounded-lg shadow-xl border border-gray-300 relative">
            {/* Close Button */}
            <button
              className="absolute top-4 right-4 text-gray-600 hover:text-red-500"
              onClick={() => setSelectedAward(null)}
            >
              <FaTimes size={24} />
            </button>

            {/* Modal Content */}
            <h2 className="text-xl md:text-2xl font-bold text-gray-900 font-serif">
              {selectedAward.title}
            </h2>
            <p className="text-gray-700 text-sm md:text-base mt-2">
              <strong>Year:</strong> {selectedAward.year}
            </p>
            <p className="text-gray-700 text-sm md:text-base mt-2">
              <strong>Achieved By:</strong> {selectedAward.achievedBy}
            </p>
            <p className="text-gray-800 text-md md:text-lg mt-4 leading-relaxed">
              {selectedAward.description}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Achievements;
