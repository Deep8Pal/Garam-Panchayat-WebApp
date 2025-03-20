import React from "react";
import { Link } from "react-router-dom";

const SchemesCard = ({ data }) => {
  return (
    <div
      className="bg-white shadow-md rounded-xl overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1 
    flex flex-col w-full sm:w-[250px] md:w-[280px] lg:w-[300px] h-[380px]"
    >
      {/* Image Section */}
      <div className="h-[150px] bg-gray-100 flex items-center justify-center">
        <img
          loading="lazy"
          src={
            data.image ||
            "https://imgs.search.brave.com/Nmr4Kc5VCmuYReLcmd5gJiPIUkrTxauTI-HFeEoRi_Q/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly91cGxv/YWQud2lraW1lZGlh/Lm9yZy93aWtpcGVk/aWEvY29tbW9ucy84/Lzg0L0dvdmVybm1l/bnRfb2ZfSW5kaWFf/bG9nby5zdmc"
          }
          alt={data.title}
          className="h-full w-full object-contain p-4"
        />
      </div>

      {/* Content Section */}
      <div className="p-4 flex-1 flex flex-col">
        <h3 className="text-base md:text-lg font-semibold text-gray-900">
          {data.title}
        </h3>
        <p className="text-xs md:text-sm text-gray-600 mt-2 line-clamp-3">
          {data.desc}
        </p>
      </div>

      {/* Read More Section */}
      <div className="p-4 pt-0">
        <Link
          to={`/view-schemes-details/${data._id}`}
          className="text-blue-600 font-medium hover:underline flex items-center text-xs md:text-sm"
        >
          Read More <span className="ml-1">→</span>
        </Link>
      </div>
    </div>
  );
};

export default SchemesCard;
