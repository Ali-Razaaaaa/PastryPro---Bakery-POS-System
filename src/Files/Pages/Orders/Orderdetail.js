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
    margin: '0 auto',
    padding: '25px',
    borderRadius: '12px',
    background: 'rgba(255, 255, 255, 0.1)',
    backdropFilter: 'blur(6px)',
    boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
    color: '#fff',
    fontFamily: 'Segoe UI, Arial, sans-serif'
  },
  title: {
    textAlign: 'center',
    color: '#fff',
    marginBottom: '20px',
    fontSize: '1.8rem',
    fontWeight: 'bold'
  },
  highlight: { color: '#ffeb3b' },
  item: {
    background: 'rgba(255,255,255,0.15)',
    padding: '12px 18px',
    marginBottom: '12px',
    borderRadius: '8px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    transition: 'background 0.2s ease, transform 0.2s ease',
    cursor: 'pointer'
  },
  productName: {
    fontWeight: 'bold',
    color: '#ffeb3b',
    fontSize: '1rem'
  },
  qty: {
    color: '#f0f0f0',
    fontSize: '0.9rem',
    marginTop: '4px'
  },
  price: {
    color: '#4CAF50',
    fontWeight: 'bold',
    fontSize: '1rem'
  },
  noProducts: {
    textAlign: 'center',
    color: '#ddd',
    marginTop: '20px'
  },
  backBtn: {
    marginTop: '20px',
    display: 'block',
    padding: '10px 20px',
    background: '#ff5722',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontWeight: 'bold',
    fontSize: '0.95rem',
    marginLeft: 'auto',
    marginRight: 'auto',
    transition: 'background 0.3s ease, transform 0.2s ease'
  }
};

function Orderdetail({ setActiveComponent, orderdetailid }) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    if (!orderdetailid) return;
    const fetchOrderItems = async () => {
      try {
        const res = await fetch('http://localhost:3000/orders/orderitems', {
          method: 'POST',
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ orderId: orderdetailid })
        });
        const data = await res.json();
        setProducts(data);
      } catch (err) {
        console.error("Error fetching order items:", err);
      }
    };
    fetchOrderItems();
  }, [orderdetailid]);

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>
          Order Detail <span style={styles.highlight}>(ID: {orderdetailid})</span>
        </h2>

        {products.length > 0 ? (
          <div>
            {products.map((item, index) => (
              <div
                key={index}
                style={styles.item}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.25)';
                  e.currentTarget.style.transform = 'scale(1.02)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.15)';
                  e.currentTarget.style.transform = 'scale(1)';
                }}
              >
                <div>
                  <div style={styles.productName}>{item.product_name}</div>
                  <div style={styles.qty}>Qty: {item.quantity}</div>
                </div>
                <div style={styles.price}>{item.price.toLocaleString()} PKR</div>
              </div>
            ))}
          </div>
        ) : (
          <p style={styles.noProducts}>No products found for this order.</p>
        )}

        <button
          style={styles.backBtn}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = '#e64a19';
            e.currentTarget.style.transform = 'scale(1.05)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = '#ff5722';
            e.currentTarget.style.transform = 'scale(1)';
          }}
          onClick={() => setActiveComponent('Orders')}
        >
          Back to Orders
        </button>
      </div>
    </div>
  );
}

export default Orderdetail;
