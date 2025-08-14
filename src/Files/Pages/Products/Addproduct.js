import React, { useState, useRef } from 'react';
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
  highlight: {
    color: '#ffeb3b'
  },
  contentRow: {
    display: 'flex',
    gap: '25px',
    alignItems: 'flex-start'
  },
  imageBox: {
    flex: '0 0 140px'
  },
  imageLabel: {
    display: 'block',
    background: 'rgba(255,255,255,0.15)',
    padding: '20px',
    borderRadius: '8px',
    textAlign: 'center',
    cursor: 'pointer',
    transition: 'background 0.2s ease, transform 0.2s ease',
    border: '2px dashed rgba(255,255,255,0.3)',
    height: '120px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  },
  cameraIcon: {
    fontSize: '2rem',
    marginBottom: '8px'
  },
  imageText: {
    margin: 0,
    fontSize: '0.85rem',
    color: '#f0f0f0',
    wordBreak: 'break-word'
  },
  hiddenInput: {
    display: 'none'
  },
  formSection: {
    flex: '1'
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
  select: {
    width: '100%',
    padding: '10px 12px',
    background: 'grey',
    border: '1px solid rgba(255,255,255,0.3)',
    borderRadius: '6px',
    color: '#fff',
    fontSize: '0.9rem',
    boxSizing: 'border-box'
  },
  buttonGroup: {
    display: 'flex',
    gap: '12px',
    justifyContent: 'center'
  },
  saveBtn: {
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
  cancelBtn: {
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

const Addproduct = ({ setActiveComponent }) => {
  const fileInputRef = useRef();

  const [formData, setFormData] = useState({
    name: '',
    category: '',
    price: '',
    stock: '',
    image: null
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, image: file });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = new FormData();
    form.append('name', formData.name);
    form.append('category', formData.category);
    form.append('price', formData.price);
    form.append('stock', formData.stock);
    if (formData.image) form.append('image', formData.image);

    try {
      const res = await fetch('http://localhost:3000/products/post', {
        method: 'POST',
        body: form
      });
      const data = await res.json();

      if (res.ok) {
        alert(data.message);
        if (fileInputRef.current) fileInputRef.current.value = '';
        setFormData({ name: '', category: '', price: '', stock: '', image: null });
        setActiveComponent('Products');
      } else {
        alert(data.message || 'Error adding product');
      }
    } catch (err) {
      console.error('Error:', err);
      alert('Network error. Please try again.');
    }
  };

  return (
    <div style={styles.pageContainer}>
      <div style={styles.formWrapper}>
        <h2 style={styles.heading}>
          Add <span style={styles.highlight}>Product</span>
        </h2>

        <div style={styles.contentRow}>
          <div style={styles.imageBox}>
            <label
              htmlFor="image-upload"
              style={styles.imageLabel}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(255,255,255,0.25)';
                e.currentTarget.style.transform = 'scale(1.02)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(255,255,255,0.15)';
                e.currentTarget.style.transform = 'scale(1)';
              }}
            >
              <span style={styles.cameraIcon}>📷</span>
              <p style={styles.imageText}>
                {formData.image?.name || 'Select Image'}
              </p>
            </label>
            <input
              id="image-upload"
              type="file"
              accept="image/*"
              ref={fileInputRef}
              onChange={handleImageChange}
              style={styles.hiddenInput}
            />
          </div>

          <form onSubmit={handleSubmit} style={styles.formSection}>
            <div style={styles.formGroup}>
              <label style={styles.label}>Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                style={styles.input}
              />
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>Category</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
                style={styles.select}
              >
                <option value="">Select Category</option>
                <option value="Cake">Cake</option>
                <option value="Pastry">Pastry</option>
                <option value="Bread">Bread</option>
                <option value="Cookies">Cookies</option>
                <option value="Snacks">Snacks</option>
              </select>
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>Price (PKR)</label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                min="0"
                step="0.01"
                required
                style={styles.input}
              />
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>Stock</label>
              <input
                type="number"
                name="stock"
                value={formData.stock}
                onChange={handleChange}
                min="0"
                required
                style={styles.input}
              />
            </div>

            <div style={styles.buttonGroup}>
              <button
                type="submit"
                style={styles.saveBtn}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = '#45a049';
                  e.currentTarget.style.transform = 'scale(1.05)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = '#4CAF50';
                  e.currentTarget.style.transform = 'scale(1)';
                }}
              >
                Save Product
              </button>
              <button
                type="button"
                onClick={() => setActiveComponent('Products')}
                style={styles.cancelBtn}
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
    </div>
  );
};

export default Addproduct;
