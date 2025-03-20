import React, { useEffect } from "react";
import Hero from "../components/Home/Hero";
import RuralDevelopmentLifeCycle from "../components/Home/RuralDevelopmentLifeCycle";
import RecentlyAdded from "../components/Home/RecentlyAdded";

const Home = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="bg-white">
      <Hero />
      <RuralDevelopmentLifeCycle />
      <RecentlyAdded />
    </div>
  );
};

export default Home;
