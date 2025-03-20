import React from "react";
import { Link } from "react-router-dom";
import { FaShoppingCart, FaHistory } from "react-icons/fa";
import { CgFileAdd } from "react-icons/cg";
import { useSelector } from "react-redux";

const MobileBar = () => {
  const role = useSelector((state) => state.auth.role);
  return (
    <>
      {role === "user" && (
        <div className=" w-full bg-slate-700 flex lg:hidden justify-around items-center py-4">
          <Link
            to="/profile"
            className="flex flex-col items-center text-white text-sm font-medium hover:text-gray-300 transition-all"
          >
            <FaShoppingCart size={20} />
            <span>Applications Cart</span>
          </Link>
          <Link
            to="/profile/applications-history"
            className="flex flex-col items-center text-white text-sm font-medium hover:text-gray-300 transition-all"
          >
            <FaHistory size={20} />
            <span> Applications History</span>
          </Link>
        </div>
      )}
      {role === "admin" && (
        <div className=" w-full bg-slate-700 flex lg:hidden justify-around items-center py-4">
          <Link
            to="/profile"
            className="flex flex-col items-center text-white text-sm font-medium hover:text-gray-300 transition-all"
          >
            <FaShoppingCart size={20} />
            <span> All Applications Orders:</span>
          </Link>
          <Link
            to="/profile/add-schemes"
            className="flex flex-col items-center text-white text-sm font-medium hover:text-gray-300 transition-all"
          >
            <CgFileAdd size={20} />
            <span> Add Schemes :</span>
          </Link>
        </div>
      )}
    </>
  );
};

export default MobileBar;
