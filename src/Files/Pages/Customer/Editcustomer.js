import React, { useEffect, useState } from 'react';
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
  buttonContainer: {
    display: 'flex',
    gap: '12px',
    justifyContent: 'center',
    marginTop: '20px'
  },
  submitButton: {
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

const Editcustomer = ({ setActiveComponent, customerId }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: ''
  });

  useEffect(() => {
    const fetchCustomer = async () => {
      try {
        const res = await fetch(`http://localhost:3000/customers/edit/${customerId}`);
        const data = await res.json();
        setFormData({
          name: data.name,
          email: data.email,
          phone: data.phone,
          address: data.address,
        });
      } catch (e) {
        console.error('Failed to fetch customer', e);
      }
    };

    fetchCustomer();
  }, [customerId]);

  const handleChange = (e) => {
    setFormData({ 
      ...formData, 
      [e.target.name]: e.target.value 
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:3000/customers/edit/${customerId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert('User Updated Successfully');
        setFormData({ name: '', email: '', phone: '', address: '' });
        setActiveComponent('Customers');
      } else {
        alert('Failed to update customer');
      }
    } catch (e) {
      console.log('Failed to update customer:', e);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.heading}>
          Edit <span style={styles.headingHighlight}>Customer</span>
        </h2>

        <form onSubmit={handleSubmit}>
          {[
            { label: 'Name', name: 'name', type: 'text' },
            { label: 'Email', name: 'email', type: 'email' },
            { label: 'Phone', name: 'phone', type: 'text' },
            { label: 'Address', name: 'address', type: 'text' }
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

          <div style={styles.buttonContainer}>
            <button
              type="submit"
              style={styles.submitButton}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#45a049';
                e.currentTarget.style.transform = 'scale(1.05)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = '#4CAF50';
                e.currentTarget.style.transform = 'scale(1)';
              }}
            >
              Update Customer
            </button>
            <button
              type="button"
              onClick={() => setActiveComponent('Customers')}
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

export default Editcustomer;
