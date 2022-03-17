import React from "react";

// CSS
import "../dashboard/Dashboard.css";

// Returns stylized title header for website
const NewTableHeader = () => {
  return (
    <h1 className="title">
      <div className="row">
        
        <div className="col">Create a Table</div>
      </div>
    </h1>
  );
};

export default NewTableHeader;