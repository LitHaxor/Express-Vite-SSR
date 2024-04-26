import React from "react";
import Navbar from "../components/layout/Navbar";

const HomePage = () => {
  return (
    <>
      <Navbar />
      <div className="h-screen w-screen">
        <div className="flex items-center justify-center h-full">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-800">Task Manager</h1>
            <p className="text-lg text-gray-600 mt-4">
              Welcome to the task manager
            </p>

            <div className="mt-8">
              <a
                href="/tasks"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                View Tasks
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;
