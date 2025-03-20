import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Search, Calendar, Clock, MapPin, Download, Bell, FileText, AlertTriangle, Filter, ChevronDown, ChevronRight, X } from "lucide-react";

const NoticesPage = () => {
  const [selectedNotice, setSelectedNotice] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("All");
  const [showFilters, setShowFilters] = useState(false);
  
  const notices = [
    {
      id: 1,
      title: "Ram Navami Celebration Notice",
      date: "20 March 2025",
      time: "6:00 PM",
      location: "Central Temple",
      category: "Cultural",
      priority: "Medium",
      department: "Cultural Affairs",
      details: "The Gram Panchayat will organize a cultural event and special prayers for Ram Navami at the central temple. Residents are invited to participate. Various cultural programs will be held followed by prasad distribution. Please bring your family and join us for this auspicious celebration.",
      attachments: ["event_schedule.pdf", "venue_map.pdf"],
      icon: "🚀"
    },
    {
      id: 2,
      title: "Diwali Safety Advisory",
      date: "10 March 2025",
      time: "All Day",
      location: "Entire Village",
      category: "Safety",
      priority: "High",
      department: "Disaster Management",
      details: "To ensure a safe celebration, residents are advised to follow fire safety precautions and avoid loud fireworks. Police and fire services will be on standby. Children should not be allowed to burst crackers without adult supervision. Please maintain noise levels and consider elderly and pets.",
      attachments: ["safety_guidelines.pdf"],
      icon: "🪔"
    },
    {
      id: 3,
      title: "Gram Panchayat Meeting",
      date: "25 March 2025",
      time: "10:00 AM",
      location: "Village Office",
      category: "Administrative",
      priority: "Medium",
      department: "Gram Panchayat Office",
      details: "A Gram Panchayat meeting will be held to discuss upcoming development projects. All residents are welcome to attend and voice their concerns. The agenda includes discussion on road repairs, water supply improvements, and new community center construction.",
      attachments: ["meeting_agenda.pdf", "previous_minutes.pdf"],
      icon: "🏛️"
    },
    {
      id: 4,
      title: "Temporary Road Closure Notice",
      date: "22 March 2025",
      time: "8:00 AM - 5:00 PM",
      location: "Main Market Road",
      category: "Infrastructure",
      priority: "High",
      department: "Public Works",
      details: "Due to repair work, the Main Market Road will be closed. Please use alternate routes. Apologies for the inconvenience. The road will be repaved to fix potholes and drainage issues. Emergency vehicles will be allowed access if needed.",
      attachments: ["detour_map.pdf", "project_timeline.pdf"],
      icon: "⚠️"
    },
    {
      id: 5,
      title: "Swachh Bharat Abhiyan Drive",
      date: "28 March 2025",
      time: "7:00 AM",
      location: "Gram Panchayat Office",
      category: "Environment",
      priority: "Medium",
      department: "Sanitation",
      details: "Join us for a cleanliness drive under Swachh Bharat Abhiyan. Volunteers will be provided with gloves and garbage bags. Refreshments will be available. The drive will focus on clearing plastic waste from public areas and creating awareness about waste segregation.",
      attachments: ["volunteer_registration.pdf"],
      icon: "🌿"
    },
    {
      id: 6,
      title: "COVID-19 Vaccination Camp",
      date: "15 April 2025",
      time: "9:00 AM - 4:00 PM",
      location: "Primary Health Center",
      category: "Health",
      priority: "High",
      department: "Health Department",
      details: "A COVID-19 vaccination camp will be organized for all eligible residents. Please bring your ID proof and vaccination certificate (if applicable). Registration will be on-site. Please wear mask and maintain social distancing.",
      attachments: ["eligibility_criteria.pdf", "required_documents.pdf"],
      icon: "💉"
    },
    {
      id: 7,
      title: "Farmer Training Program",
      date: "5 April 2025",
      time: "11:00 AM",
      location: "Agricultural Extension Center",
      category: "Agriculture",
      priority: "Medium",
      department: "Agriculture Department",
      details: "Training session on modern farming techniques and organic farming methods. Agricultural experts will provide guidance on crop selection, soil health, and pest management. Farmers are encouraged to bring soil samples for testing.",
      attachments: ["program_schedule.pdf", "registration_form.pdf"],
      icon: "🌾"
    }
  ];

  const categories = ["All", "Administrative", "Cultural", "Safety", "Infrastructure", "Environment", "Health", "Agriculture"];
  
  const filteredNotices = notices.filter(notice => {
    const matchesSearch = notice.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          notice.details.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === "All" || notice.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const getPriorityColor = (priority) => {
    switch(priority) {
      case "High": return "bg-red-100 text-red-800";
      case "Medium": return "bg-yellow-100 text-yellow-800";
      case "Low": return "bg-green-100 text-green-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const clearFilters = () => {
    setSearchTerm("");
    setFilterCategory("All");
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-800 to-blue-900 text-white py-6 shadow-lg">
        <div className="max-w-6xl mx-auto px-4">
          <h1 className="text-2xl md:text-3xl font-bold text-center">
            Gram Panchayat Public Notices
          </h1>
          <p className="text-center text-blue-200 mt-2">
            Stay informed about official announcements, events, and regulations
          </p>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto py-8 px-4">
        {/* Search and Filter Bar */}
        <div className="bg-white p-4 rounded-lg shadow-md mb-6">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="w-full md:w-2/3 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="text"
                placeholder="Search notices by title or content..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="w-full md:w-1/3 flex gap-2">
              <button 
                className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
                onClick={() => setShowFilters(!showFilters)}
              >
                <Filter size={16} className="mr-2" />
                Filters
                {showFilters ? <ChevronDown size={16} className="ml-1" /> : <ChevronRight size={16} className="ml-1" />}
              </button>
              
              {(searchTerm || filterCategory !== "All") && (
                <button 
                  className="flex items-center px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition"
                  onClick={clearFilters}
                >
                  <X size={16} className="mr-1" />
                  Clear
                </button>
              )}
            </div>
          </div>
          
          {showFilters && (
            <div className="mt-4 pt-4 border-t border-gray-200">
              <div className="flex flex-wrap gap-3">
                <div className="font-medium text-gray-700 flex items-center">
                  Category:
                </div>
                {categories.map(category => (
                  <button
                    key={category}
                    className={`px-3 py-1 rounded-full text-sm ${
                      filterCategory === category 
                        ? 'bg-blue-100 text-blue-800 border border-blue-300' 
                        : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                    }`}
                    onClick={() => setFilterCategory(category)}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
        
        {/* Acts & Rules Section */}
        <section className="mb-8">
          <div className="flex items-center mb-4">
            <FileText className="text-blue-800 mr-2" size={24} />
            <h2 className="text-xl font-bold text-blue-800">
              Acts & Rules
            </h2>
          </div>
          <div className="bg-white p-5 rounded-lg shadow-md">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <Link to="/panchayat-act" className="flex items-center p-3 border border-gray-200 rounded-md hover:bg-blue-50 transition">
                <div className="bg-blue-100 p-2 rounded-md mr-3">
                  <FileText className="text-blue-600" size={18} />
                </div>
                <div>
                  <h3 className="font-medium">Gram Panchayat Act 1993</h3>
                  <p className="text-sm text-gray-600">Laws governing local governance</p>
                </div>
              </Link>
              <Link to="/building-rules" className="flex items-center p-3 border border-gray-200 rounded-md hover:bg-blue-50 transition">
                <div className="bg-blue-100 p-2 rounded-md mr-3">
                  <FileText className="text-blue-600" size={18} />
                </div>
                <div>
                  <h3 className="font-medium">Building Regulations & Bylaws</h3>
                  <p className="text-sm text-gray-600">Construction guidelines</p>
                </div>
              </Link>
              <Link to="/land-reform" className="flex items-center p-3 border border-gray-200 rounded-md hover:bg-blue-50 transition">
                <div className="bg-blue-100 p-2 rounded-md mr-3">
                  <FileText className="text-blue-600" size={18} />
                </div>
                <div>
                  <h3 className="font-medium">Land Reform Laws</h3>
                  <p className="text-sm text-gray-600">Land ownership and management</p>
                </div>
              </Link>
              <Link to="/water-management" className="flex items-center p-3 border border-gray-200 rounded-md hover:bg-blue-50 transition">
                <div className="bg-blue-100 p-2 rounded-md mr-3">
                  <FileText className="text-blue-600" size={18} />
                </div>
                <div>
                  <h3 className="font-medium">Water Management Rules</h3>
                  <p className="text-sm text-gray-600">Water conservation guidelines</p>
                </div>
              </Link>
              <Link to="/sanitation-rules" className="flex items-center p-3 border border-gray-200 rounded-md hover:bg-blue-50 transition">
                <div className="bg-blue-100 p-2 rounded-md mr-3">
                  <FileText className="text-blue-600" size={18} />
                </div>
                <div>
                  <h3 className="font-medium">Sanitation Bylaws</h3>
                  <p className="text-sm text-gray-600">Waste management regulations</p>
                </div>
              </Link>
            </div>
          </div>
        </section>

        {/* Notices Section */}
        <section className="mb-8">
          <div className="flex items-center mb-4">
            <Bell className="text-blue-800 mr-2" size={24} />
            <h2 className="text-xl font-bold text-blue-800">
              Public Notices
            </h2>
          </div>
          
          {filteredNotices.length === 0 ? (
            <div className="bg-white p-10 rounded-lg shadow-md text-center">
              <AlertTriangle size={48} className="mx-auto text-yellow-500 mb-4" />
              <h3 className="font-medium text-lg">No notices found</h3>
              <p className="text-gray-600">Try adjusting your search or filters</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredNotices.map((notice) => (
                <div key={notice.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition cursor-pointer" onClick={() => setSelectedNotice(notice)}>
                  <div className="border-l-4 border-blue-600 p-4">
                    <div className="flex justify-between items-start">
                      <div className="flex items-center">
                        <span className="text-2xl mr-3">{notice.icon}</span>
                        <h3 className="text-lg font-semibold text-gray-800">{notice.title}</h3>
                      </div>
                      <span className={`text-xs px-2 py-1 rounded-full ${getPriorityColor(notice.priority)}`}>
                        {notice.priority}
                      </span>
                    </div>
                    
                    <div className="mt-3 text-sm text-gray-600">
                      <div className="flex items-center mt-1">
                        <Calendar size={14} className="mr-2" />
                        <span>Date: {notice.date}</span>
                      </div>
                      {notice.time && (
                        <div className="flex items-center mt-1">
                          <Clock size={14} className="mr-2" />
                          <span>Time: {notice.time}</span>
                        </div>
                      )}
                      {notice.location && (
                        <div className="flex items-center mt-1">
                          <MapPin size={14} className="mr-2" />
                          <span>Location: {notice.location}</span>
                        </div>
                      )}
                    </div>
                    
                    <div className="mt-2 text-sm">
                      <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">
                        {notice.category}
                      </span>
                      <span className="ml-2 text-gray-500">
                        {notice.department}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Notice Popup */}
        {selectedNotice && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4 z-50">
            <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="border-b border-gray-200 p-4 flex justify-between items-center sticky top-0 bg-white">
                <h2 className="text-xl font-bold text-blue-800 flex items-center">
                  <span className="text-2xl mr-2">{selectedNotice.icon}</span>
                  {selectedNotice.title}
                </h2>
                <button 
                  className="text-gray-500 hover:text-gray-700" 
                  onClick={() => setSelectedNotice(null)}
                >
                  <X size={24} />
                </button>
              </div>
              
              <div className="p-6">
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className={`px-3 py-1 rounded-full text-sm ${getPriorityColor(selectedNotice.priority)}`}>
                    {selectedNotice.priority} Priority
                  </span>
                  <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                    {selectedNotice.category}
                  </span>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-md mb-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center">
                      <Calendar className="text-blue-600 mr-2" size={18} />
                      <div>
                        <p className="text-sm text-gray-500">Date</p>
                        <p className="font-medium">{selectedNotice.date}</p>
                      </div>
                    </div>
                    
                    {selectedNotice.time && (
                      <div className="flex items-center">
                        <Clock className="text-blue-600 mr-2" size={18} />
                        <div>
                          <p className="text-sm text-gray-500">Time</p>
                          <p className="font-medium">{selectedNotice.time}</p>
                        </div>
                      </div>
                    )}
                    
                    {selectedNotice.location && (
                      <div className="flex items-center">
                        <MapPin className="text-blue-600 mr-2" size={18} />
                        <div>
                          <p className="text-sm text-gray-500">Location</p>
                          <p className="font-medium">{selectedNotice.location}</p>
                        </div>
                      </div>
                    )}
                    
                    <div className="flex items-center">
                      <Bell className="text-blue-600 mr-2" size={18} />
                      <div>
                        <p className="text-sm text-gray-500">Department</p>
                        <p className="font-medium">{selectedNotice.department}</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="mb-4">
                  <h3 className="font-medium text-lg mb-2">Details</h3>
                  <p className="text-gray-700 whitespace-pre-line">{selectedNotice.details}</p>
                </div>
                
                {selectedNotice.attachments && selectedNotice.attachments.length > 0 && (
                  <div className="mb-4">
                    <h3 className="font-medium text-lg mb-2">Attachments</h3>
                    <div className="space-y-2">
                      {selectedNotice.attachments.map((attachment, index) => (
                        <a 
                          key={index}
                          href="#" 
                          className="flex items-center p-2 border border-gray-200 rounded-md hover:bg-blue-50 transition"
                        >
                          <Download size={16} className="mr-2 text-blue-600" />
                          <span>{attachment}</span>
                        </a>
                      ))}
                    </div>
                  </div>
                )}
                
                <div className="flex justify-end mt-6">
                  <button
                    className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 mr-2"
                    onClick={() => setSelectedNotice(null)}
                  >
                    Close
                  </button>
                  <button
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                    onClick={() => window.print()}
                  >
                    Print Notice
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default NoticesPage;