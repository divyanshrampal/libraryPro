import React from "react";
import { Link } from "react-router-dom";
import BookTurningAnimation from "./BookTurningAnimation";

const Cover = () => {
  return (
    <div className="bg-gray-900 min-h-screen flex flex-col justify-center items-center">
      <div className="text-white text-center">
        <h1 className="text-5xl font-bold mb-4">Library Management App</h1>
        <p className="text-lg mb-8">Your gateway to an organized library experience</p>
        <Link to="/books">
          <button className="bg-white text-gray-800 py-2 px-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition duration-300">
            Explore Books
          </button>
        </Link>
      </div>
      <div className="m-auto">
        <BookTurningAnimation />
      </div>
    </div>
  );
};

export default Cover;
