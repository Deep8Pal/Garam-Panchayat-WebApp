import React, { useEffect, useState } from "react";
import axios from "axios";
import SchemesCard from "../SchemesCard/SchemesCard";
import Loader from "../../pages/Loader";

const RecentlyAdded = () => {
  const [Data, setData] = useState();
  useEffect(() => {
    const fetch = async () => {
      const response = await axios.get(
        "http://localhost:7000/api/v1/get-recent-applications"
      );
      setData(response.data.data);
    };
    fetch();
  }, []);

  return (
    <div className="mt-8 px-11">
      <div className="text-center mb-8">
        <h3 className="text-3xl font-bold text-gray-900">Recently Added</h3>
        <p className="text-gray-600 text-sm mt-2">
          Explore the latest applications and updates recently added to our
          platform.
        </p>
      </div>
      {!Data && (
        <div className="flex items-center justify-center my-8">
          <Loader />
        </div>
      )}
      <div className="my-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {Data &&
          Data.map((items, i) => (
            <div key={i}>
              {" "}
              <SchemesCard data={items} />
            </div>
          ))}
      </div>
    </div>
  );
};

export default RecentlyAdded;
