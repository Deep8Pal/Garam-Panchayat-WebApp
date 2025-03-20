import React, { useState } from "react";
import {
  FaFileAlt,
  FaUserShield,
  FaDownload,
  FaTractor,
  FaBuilding,
  FaTimes,
  FaCalendarCheck,
  FaUserTie,
  FaInfoCircle,
  FaSearch,
  FaFilter,
  FaLanguage,
} from "react-icons/fa";

const Documents = () => {
  const [selectedDoc, setSelectedDoc] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("all");
  const [language, setLanguage] = useState("english");

  const documents = [
    {
      id: 1,
      title: "Aadhaar Card",
      category: "Identity",
      icon: <FaUserShield className="text-yellow-400" />,
      issuedBy: "UIDAI, Government of India",
      validity: "Lifetime",
      requiredDocs: "Proof of Identity, Proof of Address",
      applicationProcess:
        "Apply online via UIDAI portal or visit an Aadhaar center.",
      usage:
        "Identity verification for banks, government schemes, and tax filing.",
      deadline: "N/A",
      fees: "Free for first issue, ₹50 for updates",
      helpline: "1800-300-1947",
    },
    {
      id: 2,
      title: "Kisan Credit Card",
      category: "Agriculture",
      icon: <FaTractor className="text-yellow-400" />,
      issuedBy: "NABARD & Banks",
      validity: "5 Years (Renewable)",
      requiredDocs: "Land Ownership Proof, Bank Account Details, ID Proof",
      applicationProcess: "Apply through banks or cooperative societies.",
      usage:
        "Short-term credit for farmers for purchasing seeds, fertilizers & equipment.",
      deadline: "Year-round application",
      fees: "Varies by bank",
      helpline: "1800-180-1551",
    },
    {
      id: 3,
      title: "MGNREGA Job Card",
      category: "Employment",
      icon: <FaBuilding className="text-yellow-400" />,
      issuedBy: "Ministry of Rural Development",
      validity: "1 Year (Renewable)",
      requiredDocs: "Ration Card, Address Proof, Age Proof",
      applicationProcess:
        "Apply at the Gram Panchayat office or online portal.",
      usage: "Guarantees 100 days of wage employment to rural laborers.",
      deadline: "Year-round application",
      fees: "Free",
      helpline: "1800-110-707",
    },
  ];

  const filteredDocuments = documents.filter((doc) => {
    const matchesSearch = doc.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesFilter =
      filter === "all" || doc.category.toLowerCase() === filter.toLowerCase();
    return matchesSearch && matchesFilter;
  });

  const getTranslatedTitle = () => {
    return language === "hindi"
      ? "ग्राम पंचायत दस्तावेज़"
      : "Gram Panchayat Documents";
  };

  const getTranslatedSubtitle = () => {
    return language === "hindi"
      ? "महत्वपूर्ण सरकारी दस्तावेज़ जिनका उपयोग ग्राम पंचायत, कृषि, शिक्षा, और कल्याण योजनाओं में किया जाता है।"
      : "Essential government documents used in village administration, agriculture, education, and welfare schemes.";
  };

  return (
    <div className="min-h-screen bg- py-6 px-4 md:px-8">
      {/* Header with Language Toggle */}
      <div className="max-w-6xl mx-auto mb-6">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="bg-blue-700 text-white p-2 rounded-lg">
              <FaFileAlt size={20} />
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
              {getTranslatedTitle()}
            </h1>
          </div>
          <button
            onClick={() =>
              setLanguage(language === "english" ? "hindi" : "english")
            }
            className="flex items-center gap-2 px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-full text-sm"
          >
            <FaLanguage /> {language === "english" ? "हिंदी" : "English"}
          </button>
        </div>
        <p className="text-gray-600 mt-2 max-w-3xl">
          {getTranslatedSubtitle()}
        </p>
      </div>

      {/* Search and Filter Section */}
      <div className="max-w-6xl mx-auto mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-grow">
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search documents..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="relative">
            <FaFilter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <select
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            >
              <option value="all">All Categories</option>
              <option value="identity">Identity</option>
              <option value="agriculture">Agriculture</option>
              <option value="employment">Employment</option>
            </select>
          </div>
        </div>
      </div>

      {/* Documents Grid */}
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredDocuments.map((doc) => (
            <div
              key={doc.id}
              className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100"
            >
              {/* Document Header */}
              <div className="bg-blue-600 p-4 text-white">
                <div className="flex items-center gap-3">
                  {doc.icon}
                  <h2 className="font-semibold">{doc.title}</h2>
                </div>
                <div className="text-blue-100 text-sm mt-1">
                  Category: {doc.category}
                </div>
              </div>

              {/* Document Content */}
              <div className="p-4">
                <div className="flex items-center text-sm text-gray-600 mb-3">
                  <FaUserTie className="mr-2 text-gray-500" />
                  <span>Issued by: {doc.issuedBy}</span>
                </div>
                <div className="flex items-center text-sm text-gray-600 mb-3">
                  <FaCalendarCheck className="mr-2 text-gray-500" />
                  <span>Validity: {doc.validity}</span>
                </div>

                {/* Buttons */}
                <div className="flex gap-2 mt-4">
                  <button
                    className="flex-1 bg-blue-50 hover:bg-blue-100 text-blue-700 py-2 rounded-lg text-sm font-medium transition-colors duration-150 flex items-center justify-center gap-1"
                    onClick={() => setSelectedDoc(doc)}
                  >
                    <FaInfoCircle /> Details
                  </button>
                  <button className="flex-1 bg-blue-700 hover:bg-blue-800 text-white py-2 rounded-lg text-sm font-medium transition-colors duration-150 flex items-center justify-center gap-1">
                    <FaDownload /> Download
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* No Results Message */}
        {filteredDocuments.length === 0 && (
          <div className="text-center py-10">
            <p className="text-gray-500">
              No documents found matching your search criteria.
            </p>
          </div>
        )}
      </div>

      {/* Modal */}
      {selectedDoc && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4 z-50">
          <div className="bg-white w-full max-w-2xl rounded-xl shadow-2xl overflow-hidden">
            {/* Modal Header */}
            <div className="bg-blue-700 p-4 text-white relative">
              <div className="flex items-center gap-3">
                {selectedDoc.icon}
                <h2 className="text-xl font-semibold">{selectedDoc.title}</h2>
              </div>
              <button
                className="absolute top-4 right-4 text-white hover:text-red-200 transition-colors"
                onClick={() => setSelectedDoc(null)}
              >
                <FaTimes size={24} />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <div>
                    <h3 className="text-gray-500 text-sm">Issued By</h3>
                    <p className="text-gray-800">{selectedDoc.issuedBy}</p>
                  </div>
                  <div>
                    <h3 className="text-gray-500 text-sm">Validity</h3>
                    <p className="text-gray-800">{selectedDoc.validity}</p>
                  </div>
                  <div>
                    <h3 className="text-gray-500 text-sm">
                      Required Documents
                    </h3>
                    <p className="text-gray-800">{selectedDoc.requiredDocs}</p>
                  </div>
                  <div>
                    <h3 className="text-gray-500 text-sm">
                      Application Deadline
                    </h3>
                    <p className="text-gray-800">{selectedDoc.deadline}</p>
                  </div>
                </div>
                <div className="space-y-3">
                  <div>
                    <h3 className="text-gray-500 text-sm">
                      Application Process
                    </h3>
                    <p className="text-gray-800">
                      {selectedDoc.applicationProcess}
                    </p>
                  </div>
                  <div>
                    <h3 className="text-gray-500 text-sm">Usage</h3>
                    <p className="text-gray-800">{selectedDoc.usage}</p>
                  </div>
                  <div>
                    <h3 className="text-gray-500 text-sm">Fees</h3>
                    <p className="text-gray-800">{selectedDoc.fees}</p>
                  </div>
                  <div>
                    <h3 className="text-gray-500 text-sm">Helpline</h3>
                    <p className="text-gray-800">{selectedDoc.helpline}</p>
                  </div>
                </div>
              </div>

              {/* Download Button */}
              <div className="mt-6 flex justify-center">
                <button className="px-8 py-3 bg-blue-700 hover:bg-blue-800 text-white font-medium rounded-lg flex items-center gap-2 transition-all">
                  <FaDownload />
                  Download Document
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Documents;
