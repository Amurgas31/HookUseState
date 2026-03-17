import React from "react";

const Boton = ({ label, onClick, className = "btn-primary" }) => {
    return (
      <button onClick={onClick} className={`btn ${className} m-1`}>
        {label}
      </button>
    );
  };

export default Boton;