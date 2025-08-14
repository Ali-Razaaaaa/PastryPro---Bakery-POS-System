import React, { useEffect, useState } from 'react';
import Commonbtn from '../../Components/Commonbtn.js';
import Usericon from '../../Components/Usericons.js';
import Searchbar from '../../Components/Searchbar.js';
import './Products.css';

const Products = ({ setActiveComponent, setSelectedProductId }) => {
  const [getproducts, setproducts] = useState([]);
  const [searchterm, setsearchterm] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:3000/products/');
        const data = await response.json();
        setproducts(data);
      } catch (e) {
        console.log('Error fetching products:', e);
      }
    };

    fetchProducts();
  }, []);

  const handleAddProduct = () => {
    setActiveComponent('Addproduct');
  };

  const handleDeleteProduct = async (productId) => {
    try {
      const response = await fetch(`http://localhost:3000/products/delete/${productId}`, {
        method: 'DELETE',
      });
      const data = await response.json();
      alert(data.message);
    } catch (e) {
      alert("Error deleting product");
    }
  };

  const handleEditProduct = (productId) => {
    setSelectedProductId(productId);
    setActiveComponent('Editproduct');
  };

  const filteredresults = getproducts.filter((item) =>
    Object?.values(item).some((val) =>
      val?.toString().toLowerCase().includes(searchterm.toLowerCase())
    )
  );

  return (
    <div className='products-main-container'>
      <div className='products-header'>
        <h1>Products</h1>
        <div className='products-header-section'>
          <Searchbar
            title='Search Products'
            width='420px'
            left='430px'
            onChange={(e) => setsearchterm(e.target.value)}
            
          />
          <div className='products-controls-wrapper'>
            <div className='products-user-icon-container'>
              <Usericon />
            </div>
            
            <div className='products-button-container'>
              <Commonbtn
                className='products-add-button'
                height='40px'
                width='200px'
                title='Add Product'
                onClick={handleAddProduct}
              />
            </div>
          </div>
        </div>
      </div>

      <div className='products-data-table-wrapper'>
        <table className='products-data-table'>
          <thead>
            <tr>
              <th>ID:</th>
              <th>Image</th>
              <th>Name</th>
              <th>Price</th>
              <th>Stock</th>
              <th>Category</th>
              <th colSpan={2} style={{textAlign:'center'}}>Action</th>
            </tr>
          </thead>

          <tbody>
            {filteredresults.length > 0 ? (
              filteredresults.map((product, index) => (
                <tr key={index}>
                  <td>{product.id}</td>
                  <td>
                    <img
                      src={`http://localhost:3000${product.image_url}`}
                      alt={product.name}
                      className='products-item-image'
                    />
                  </td>
                  <td>{product.name}</td>
                  <td>${product.price}</td>
                  <td>{product.stock}</td>
                  <td>{product.category}</td>
                  <td>
                    <button 
                      className='products-edit-action-btn' 
                      onClick={() => handleEditProduct(product.id)}
                    >
                      Edit
                    </button>
                    </td>
                    <td>
                    <button 
                      className='products-delete-action-btn' 
                      onClick={() => handleDeleteProduct(product.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan='8' className='products-no-data-message'>
                  No products found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Products;