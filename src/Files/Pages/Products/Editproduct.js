import React, { useState } from 'react';
import bg from '../../../assets/background.jpg';

const styles = {
  pageContainer: {
    display: 'flex',
    backgroundImage: `linear-gradient(rgba(0,0,0,0.55), rgba(0,0,0,0.55)), url(${bg})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    height: '100vh',
    alignItems: 'center',
    justifyContent: 'center',
    boxSizing: 'border-box',
    padding: '20px'
  },
  formWrapper: {
    width: '400px',
    margin: '0 auto',
    padding: '30px',
    borderRadius: '12px',
    background: 'rgba(255, 255, 255, 0.1)',
    backdropFilter: 'blur(6px)',
    boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
    color: '#fff',
    fontFamily: 'Segoe UI, Arial, sans-serif',
    textAlign: 'center'
  },
  heading: {
    color: '#fff',
    marginBottom: '25px',
    fontSize: '1.8rem',
    fontWeight: 'bold'
  },
  highlight: {
    color: '#ffeb3b'
  },
  infoBox: {
    background: 'rgba(255,255,255,0.15)',
    padding: '20px',
    borderRadius: '8px',
    marginBottom: '20px'
  },
  infoText: {
    color: '#f0f0f0',
    fontSize: '0.9rem',
    marginBottom: '15px'
  },
  infoHighlight: {
    color: '#ffeb3b',
    fontWeight: 'bold'
  },
  label: {
    display: 'block',
    marginBottom: '10px',
    color: '#ffeb3b',
    fontWeight: 'bold',
    fontSize: '1rem'
  },
  input: {
    width: '120px',
    padding: '12px 15px',
    background: 'rgba(255,255,255,0.15)',
    border: '1px solid rgba(255,255,255,0.3)',
    borderRadius: '6px',
    color: 'white',
    fontSize: '1rem',
    textAlign: 'center',
    marginBottom: '20px',
    fontWeight: 'bold'
  },
  buttonGroup: {
    display: 'flex',
    gap: '15px',
    justifyContent: 'center'
  },
  updateBtn: {
    padding: '12px 25px',
    background: '#4CAF50',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontWeight: 'bold',
    fontSize: '0.95rem',
    transition: 'background 0.3s ease, transform 0.2s ease'
  },
  cancelBtn: {
    padding: '12px 25px',
    background: '#ff5722',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontWeight: 'bold',
    fontSize: '0.95rem',
    transition: 'background 0.3s ease, transform 0.2s ease'
  }
};

const Editproduct = ({ setActiveComponent, productId }) => {
  const [stock, setStock] = useState('');

  const updatestock = async () => {
    try {
      const response = await fetch(`http://localhost:3000/products/update/${productId}/${stock}`, {
        method: 'PUT'
      });
      const data = await response.json();
      if (data.success) {
        alert('✅ Product stock updated successfully!');
        setActiveComponent('Products');
      } else {
        alert('❌ Update failed!');
      }
    } catch (e) {
      console.log('Error:', e);
    }
  };

  return (
    <div style={styles.pageContainer}>
      <div style={styles.formWrapper}>
        <h2 style={styles.heading}>
          Edit <span style={styles.highlight}>Product</span>
        </h2>

        <div style={styles.infoBox}>
          <p style={styles.infoText}>
            Product ID: <span style={styles.infoHighlight}>{productId}</span>
          </p>

          <label style={styles.label}>Enter New Stock Quantity</label>

          <input
            style={styles.input}
            type="number"
            placeholder="Stock..."
            onChange={(e) => setStock(e.target.value)}
            value={stock}
            min="0"
          />
        </div>

        <div style={styles.buttonGroup}>
          <button
            style={styles.updateBtn}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#45a049';
              e.currentTarget.style.transform = 'scale(1.05)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = '#4CAF50';
              e.currentTarget.style.transform = 'scale(1)';
            }}
            onClick={updatestock}
          >
            Update Stock
          </button>

          <button
            style={styles.cancelBtn}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#e64a19';
              e.currentTarget.style.transform = 'scale(1.05)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = '#ff5722';
              e.currentTarget.style.transform = 'scale(1)';
            }}
            onClick={() => setActiveComponent('Products')}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default Editproduct;
