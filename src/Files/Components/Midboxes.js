import React from 'react'
import {FaShoppingCart } from 'react-icons/fa';

function Midboxes(props) {
  return (
    <div
      style={{
        height: '120px',
        width: '290px',
        borderRadius: '12px',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        marginTop: '20px',
        marginLeft: '10px',
        borderTop: '5px solid #FF5733', // red-orange
        borderLeft: '1px solid white',
        borderRight: '1px solid white',
        borderBottom: '1px solid white',
        color: 'white',
      
      }}
    >
      <div
        style={{
          marginLeft: '120px',
          height: '20px',
          width: '100px',
          marginTop: '20px',
          fontSize: '18px'
        }}
      >
        {props.Title}
        <p style={{  fontSize: '25px', fontWeight: 'bold', color: 'white',marginLeft:'30px'}}>{props.data}</p>
      </div>

      <div
        style={{
          backgroundColor: '#D8C8A6',
          height: '50px',
          width: '50px',
          alignItems: 'center',
          display: 'flex',
          justifyContent: 'center',
          borderRadius: '15px',
          position: 'absolute',
          left: '15px',
          top: '20px'
        }}
      >
        <FaShoppingCart color='#FFFF99' fontSize={24} />
      </div>
    </div>
  );
}

export default Midboxes;