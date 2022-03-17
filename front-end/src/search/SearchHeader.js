import React from "react";

// CSS
import "../dashboard/Dashboard.css";

// Returns stylized title header for website
const SearchHeader = () => {
  return (
    <h1 className="title">
      <div className="row">
        
        <div className="col">Search</div>
      </div>
    </h1>
  );
};

export default SearchHeader;