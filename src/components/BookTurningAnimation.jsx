import React from "react";
import "./Book.css"; // Import the CSS file

const BookTurningAnimation = () => {
  return (
    <div className="book">
      <span className="page turn"></span>
      <span className="page turn"></span>
      <span className="page turn"></span>
      <span className="page turn"></span>
      <span className="page turn"></span>
      <span className="page turn"></span>
      <span className="cover"></span>
      <span className="page"></span>
      <span className="cover turn"></span>
    </div>
  );
};

export default BookTurningAnimation;
