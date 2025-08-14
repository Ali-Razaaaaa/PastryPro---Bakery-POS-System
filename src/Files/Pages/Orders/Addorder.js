import React, { useEffect, useState } from 'react';
import Usericons from '../../Components/Usericons';
import Searchbar from '../../Components/Searchbar';
import bg from '../../../assets/background.jpg';

const styles = {
  page: {
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
    backgroundImage: `linear-gradient(rgba(0,0,0,0.55), rgba(0,0,0,0.55)), url(${bg})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    color: '#fff',
    fontFamily: 'Segoe UI, Arial, sans-serif',
    padding: '20px',
    boxSizing: 'border-box',
    overflow: 'hidden'
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: '10px'
  },
  title: {
    fontSize: '1.8rem',
    fontWeight: 'bold'
  },
  titleHighlight: {
    color: '#ffeb3b'
  },
  searchRow: {
    marginBottom: '12px'
  },
  mainBody: {
    display: 'flex',
    gap: '20px',
    flex: 1,
    minHeight: 0,
    overflow: 'hidden'
  },
  glassPanel: {
    background: 'rgba(255, 255, 255, 0.1)',
    backdropFilter: 'blur(6px)',
    borderRadius: '12px',
    padding: '15px',
    boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
    display: 'flex',
    flexDirection: 'column',
    minHeight: 0
  },
  sectionTitle: {
    color: '#ffeb3b',
    marginBottom: '10px',
    fontWeight: 'bold'
  },
  leftPanel: {
    flex: 2,
    minWidth: 0
  },
  productsScroll: {
    flex: 1,
    minHeight: 0,
    overflowY: 'auto',
    paddingRight: '6px'
  },
  productCard: {
    background: 'rgba(255,255,255,0.15)',
    border: '1px solid rgba(255,255,255,0.3)',
    borderRadius: '8px',
    padding: '10px',
    marginBottom: '10px',
    display: 'flex',
    alignItems: 'center',
    gap: '10px'
  },
  productImg: {
    width: '60px',
    height: '60px',
    borderRadius: '6px',
    objectFit: 'cover'
  },
  productInfo: {
    flex: 1,
    fontSize: '0.9rem'
  },
  qtyButtons: {
    display: 'flex',
    flexDirection: 'column',
    gap: '6px'
  },
  rightPanel: {
    flex: 1,
    minWidth: 0
  },
  customerSelect: {
    width: '100%',
    padding: '10px 12px',
    background: 'rgba(255,255,255,0.15)',
    border: '1px solid rgba(255,255,255,0.3)',
    borderRadius: '6px',
    color: '#fff'
  },
  cartBlock: {
    flex: 1,
    minHeight: 0,
    display: 'flex',
    flexDirection: 'column',
    marginTop: '15px'
  },
  cartList: {
    flex: 1,
    minHeight: 0,
    overflowY: 'auto',
    paddingRight: '6px'
  },
  cartCard: {
    background: 'rgba(255,255,255,0.15)',
    border: '1px solid rgba(255,255,255,0.3)',
    borderRadius: '8px',
    padding: '10px',
    marginBottom: '10px',
    display: 'flex',
    justifyContent: 'space-between',
    gap: '10px'
  },
  cartFooter: {
    marginTop: '10px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  totalBill: {
    fontWeight: 'bold'
  },
  btnPlus: {
    background: '#4CAF50',
    color: '#fff',
    border: 'none',
    padding: '6px 10px',
    borderRadius: '6px',
    cursor: 'pointer',
    fontWeight: 'bold',
    transition: 'background 0.2s ease, transform 0.2s ease'
  },
  btnMinus: {
    background: '#ff5722',
    color: '#fff',
    border: 'none',
    padding: '6px 10px',
    borderRadius: '6px',
    cursor: 'pointer',
    fontWeight: 'bold',
    transition: 'background 0.2s ease, transform 0.2s ease'
  },
  btnAddOrder: {
    padding: '10px 20px',
    background: '#4CAF50',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    fontWeight: 'bold',
    cursor: 'pointer',
    fontSize: '1rem',
    transition: 'background 0.3s ease, transform 0.2s ease'
  }
};

const Addorder = ({ setActiveComponent }) => {
  const [products, setProducts] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [cart, setCart] = useState([]);
  const [selectedcustomer, setselectedcustomer] = useState({ id: "", name: "" });

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch('http://localhost:3000/products/');
        const data = await res.json();
        setProducts(data);
      } catch (e) {
        console.error('Error fetching products:', e);
      }
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const res = await fetch('http://localhost:3000/customers/');
        const data = await res.json();
        setCustomers(data);
      } catch (e) {
        console.error('Error fetching customers:', e);
      }
    };
    fetchCustomers();
  }, []);

  const handleAddToCart = (newItem) => {
    const existing = cart.find(ci => ci.id === newItem.id);
    if (existing) {
      if (existing.quantity < newItem.stock) {
        setCart(cart.map(ci =>
          ci.id === newItem.id ? { ...ci, quantity: ci.quantity + 1 } : ci
        ));
      } else {
        alert('Stock limit reached!');
      }
    } else {
      if (newItem.stock > 0) {
        setCart([...cart, { ...newItem, quantity: 1 }]);
      } else {
        alert('Out of stock!');
      }
    }
  };

  const handleRemoveFromCart = (productId) => {
    setCart(
      cart
        .map(ci => ci.id === productId ? { ...ci, quantity: ci.quantity - 1 } : ci)
        .filter(ci => ci.quantity > 0)
    );
  };

  const handleaddorder = async () => {
    if (!selectedcustomer.id) return alert('Please select a customer!');
    if (cart.length === 0) return alert('Cart is empty!');

    const orderData = {
      customerId: selectedcustomer.id,
      customerName: selectedcustomer.name,
      items: cart.map(item => ({ productId: item.id, quantity: item.quantity }))
    };

    try {
      const res = await fetch('http://localhost:3000/orders/post', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderData)
      });
      if (res.ok) {
        alert('Order placed successfully!');
        setCart([]);
        setselectedcustomer({ id: "", name: "" });
        setActiveComponent('Orders');
      } else {
        alert('Failed to place order');
      }
    } catch (e) {
      console.error('Error placing order:', e);
      alert('Error placing order');
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.header}>
        <h1 style={styles.title}>
          Add <span style={styles.titleHighlight}>Order</span>
        </h1>
        <Usericons />
      </div>
      <div style={styles.searchRow}>
        <Searchbar title='search products' width='320px' left='310px' />
      </div>
      <div style={styles.mainBody}>
        <div style={{ ...styles.glassPanel, ...styles.leftPanel }}>
          <h3 style={styles.sectionTitle}>Products</h3>
          <div style={styles.productsScroll}>
            {products.length ? (
              products.map(item => {
                const inCart = cart.find(ci => ci.id === item.id);
                return (
                  <div key={item.id} style={styles.productCard}>
                    <img
                      src={`http://localhost:3000${item.image_url}`}
                      alt={item.name}
                      style={styles.productImg}
                    />
                    <div style={styles.productInfo}>
                      <div>{item.name}</div>
                      <div>Stock: {item.stock}</div>
                      <div>Price: {item.price}</div>
                    </div>
                    <div style={styles.qtyButtons}>
                      <button
                        style={styles.btnPlus}
                        onMouseEnter={(e) => { e.currentTarget.style.background = '#45a049'; e.currentTarget.style.transform = 'scale(1.05)'; }}
                        onMouseLeave={(e) => { e.currentTarget.style.background = '#4CAF50'; e.currentTarget.style.transform = 'scale(1)'; }}
                        onClick={() => handleAddToCart(item)}
                      >+</button>
                      {inCart && (
                        <button
                          style={styles.btnMinus}
                          onMouseEnter={(e) => { e.currentTarget.style.background = '#e64a19'; e.currentTarget.style.transform = 'scale(1.05)'; }}
                          onMouseLeave={(e) => { e.currentTarget.style.background = '#ff5722'; e.currentTarget.style.transform = 'scale(1)'; }}
                          onClick={() => handleRemoveFromCart(item.id)}
                        >-</button>
                      )}
                    </div>
                  </div>
                );
              })
            ) : (
              <div>No products found.</div>
            )}
          </div>
        </div>
        <div style={{ ...styles.glassPanel, ...styles.rightPanel }}>
          <div>
            <h3 style={styles.sectionTitle}>Customer</h3>
            <select
              style={styles.customerSelect}
              value={selectedcustomer.id}
              onChange={(e) => {
                const selected = customers.find(c => c.id == e.target.value);
                if (selected) setselectedcustomer({ id: selected.id, name: selected.name });
              }}
            >
              <option value="">Select Customer</option>
              {customers.map(c => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
          </div>
          <div style={styles.cartBlock}>
            <h3 style={styles.sectionTitle}>Cart</h3>
            <div style={styles.cartList}>
              {cart.length ? (
                cart.map((item, idx) => (
                  <div key={idx} style={styles.cartCard}>
                    <div>
                      <div>{item.name}</div>
                      <div>Quantity: {item.quantity}</div>
                      <div>Total: {item.quantity * item.price}</div>
                    </div>
                    <div style={styles.qtyButtons}>
                      <button
                        style={styles.btnPlus}
                        onMouseEnter={(e) => { e.currentTarget.style.background = '#45a049'; e.currentTarget.style.transform = 'scale(1.05)'; }}
                        onMouseLeave={(e) => { e.currentTarget.style.background = '#4CAF50'; e.currentTarget.style.transform = 'scale(1)'; }}
                        onClick={() => handleAddToCart(item)}
                      >+</button>
                      <button
                        style={styles.btnMinus}
                        onMouseEnter={(e) => { e.currentTarget.style.background = '#e64a19'; e.currentTarget.style.transform = 'scale(1.05)'; }}
                        onMouseLeave={(e) => { e.currentTarget.style.background = '#ff5722'; e.currentTarget.style.transform = 'scale(1)'; }}
                        onClick={() => handleRemoveFromCart(item.id)}
                      >-</button>
                    </div>
                  </div>
                ))
              ) : (
                <div>Cart is empty.</div>
              )}
            </div>
            <div style={styles.cartFooter}>
              <div style={styles.totalBill}>
                Total PKR: {cart.reduce((sum, item) => sum + item.quantity * item.price, 0)}
              </div>
              <button
                style={styles.btnAddOrder}
                onMouseEnter={(e) => { e.currentTarget.style.background = '#45a049'; e.currentTarget.style.transform = 'scale(1.03)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = '#4CAF50'; e.currentTarget.style.transform = 'scale(1)'; }}
                onClick={handleaddorder}
              >
                Add Order
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Addorder;
