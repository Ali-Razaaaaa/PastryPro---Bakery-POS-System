import React from "react";

function Commonbtn({ ClassName, height, width, title, onClick }) {
  return (
    <button
      className={ClassName}
      onClick={onClick}
      style={{
        height: height,
        width: width,
        fontSize: '12px',
        borderRadius: '10px',
        border: '1px solid #cc7a00',
        backgroundColor: '#ff9900',
        cursor: 'pointer',
        color: "white",
        textAlign: 'center'
      }}
    >
      {title}
    </button>
  );
}

export default Commonbtn;