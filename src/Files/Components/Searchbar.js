import React from 'react';
import { FaSearch} from 'react-icons/fa';

function Searchbar({title,width,left,onChange}) {
  return (
    <div style={{ position: 'relative' }}>
      <input
      onChange={onChange}
        placeholder={title}
        style={{
          padding: '8px 10px 8px 30px',
          margin: '10px',
          width: width,
          height:'35px',
          borderRadius: '10px',
          backgroundColor:'white',
          border: '1px solid #ccc',
        }}
      />
      <FaSearch
        style={{
          position: 'absolute',
          left: left,
          top:'25px',
          color: 'black',
          
          fontSize: '22px',
        }}
      />
    </div>
  );
}

export default Searchbar;
