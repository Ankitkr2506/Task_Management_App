import React from "react";
import Sidebar from "../Components/Home/Sidebar";
import { Outlet } from "react-router-dom";
const Home = () => {
  return (
    <div className="flex h-screen gap-4 bg-gray-100">
      {/* Sidebar Section */}
      <div className=" w-1/6 border border-gray-500 rounded-xl p-4 justify-between flex flex-col gap-2 bg-purple-400">
        <Sidebar />
      </div>
      
      {/* Main Content */}
      <div className="bg-gray-700 w-5/6 border border-gray-500 rounded-xl p-4">
       <Outlet/>
      </div>
    </div>
  );
};

export default Home;
