import React from 'react'
import {FaShoppingCart } from 'react-icons/fa';


function Smallboxes(props) {
  return (
    <div
      style={{
        height: '95px',
        width: '170px',
        marginLeft:'5px',
        borderRadius: '12px',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        marginTop: '20px',
        color: 'white',
        borderTop: '5px solid #FFC300',
        borderLeft: '1px solid white',
        borderRight: '1px solid white',
        borderBottom: '1px solid white',
      }}
    >
      <div
        style={{
          marginLeft: '100px',
          height: '20px',
          width: '100px',
          marginTop: '12px',
          fontSize: '18px'
        }}
      >
        {props.Title}
        <p style={{ margin: '2px', fontSize: '20px', fontWeight: 'bold', color: 'white' }}>{props.data}</p>
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

export default Smallboxes;