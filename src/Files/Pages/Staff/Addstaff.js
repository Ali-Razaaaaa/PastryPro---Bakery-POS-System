import React, { useState } from 'react';
import bg from '../../../assets/background.jpg';

const styles = {
  container: {
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
  card: {
    width: '60%',
    maxWidth: '600px',
    margin: '0 auto',
    padding: '25px',
    borderRadius: '12px',
    background: 'rgba(255, 255, 255, 0.1)',
    backdropFilter: 'blur(6px)',
    boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
    color: '#fff',
    fontFamily: 'Segoe UI, Arial, sans-serif'
  },
  heading: {
    textAlign: 'center',
    color: '#fff',
    marginBottom: '25px',
    fontSize: '1.8rem',
    fontWeight: 'bold'
  },
  headingHighlight: {
    color: '#ffeb3b'
  },
  formGroup: {
    marginBottom: '15px'
  },
  label: {
    display: 'block',
    marginBottom: '6px',
    color: '#ffeb3b',
    fontWeight: 'bold',
    fontSize: '0.95rem'
  },
  input: {
    width: '100%',
    padding: '10px 12px',
    background: 'rgba(255,255,255,0.15)',
    border: '1px solid rgba(255,255,255,0.3)',
    borderRadius: '6px',
    color: '#fff',
    fontSize: '0.9rem',
    boxSizing: 'border-box'
  },
  buttonGroup: {
    display: 'flex',
    gap: '12px',
    justifyContent: 'center',
    marginTop: '20px'
  },
  saveButton: {
    padding: '10px 25px',
    background: '#4CAF50',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontWeight: 'bold',
    fontSize: '0.95rem',
    transition: 'background 0.3s ease, transform 0.2s ease'
  },
  cancelButton: {
    padding: '10px 25px',
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

const Addstaff = ({ setActiveComponent }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    role: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:3000/staff/post', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        alert('Staff added successfully!');
        setFormData({ name: '', email: '', phone: '', address: '', role: '' });
        setActiveComponent('Staff');
      } else {
        const errorData = await response.json();
        alert(`Failed: ${errorData.message || 'Something went wrong'}`);
      }
    } catch (error) {
      alert('Server error. Please try again later.');
      console.error('Error:', error);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.heading}>
          Add <span style={styles.headingHighlight}>Staff</span>
        </h2>

        <form onSubmit={handleSubmit}>
          {[
            { label: 'Name', name: 'name', type: 'text' },
            { label: 'Email', name: 'email', type: 'email' },
            { label: 'Phone', name: 'phone', type: 'tel' },
            { label: 'Address', name: 'address', type: 'text' },
            { label: 'Role', name: 'role', type: 'text' }
          ].map((field, idx) => (
            <div style={styles.formGroup} key={idx}>
              <label style={styles.label}>
                {field.label}
              </label>
              <input
                type={field.type}
                name={field.name}
                value={formData[field.name]}
                onChange={handleChange}
                required
                style={styles.input}
              />
            </div>
          ))}

          <div style={styles.buttonGroup}>
            <button
              type="submit"
              style={styles.saveButton}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#45a049';
                e.currentTarget.style.transform = 'scale(1.05)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = '#4CAF50';
                e.currentTarget.style.transform = 'scale(1)';
              }}
            >
              Save Staff
            </button>
            <button
              type="button"
              onClick={() => setActiveComponent('Staff')}
              style={styles.cancelButton}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#e64a19';
                e.currentTarget.style.transform = 'scale(1.05)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = '#ff5722';
                e.currentTarget.style.transform = 'scale(1)';
              }}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Addstaff;
