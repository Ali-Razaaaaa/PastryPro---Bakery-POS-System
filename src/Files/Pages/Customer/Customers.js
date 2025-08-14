import React, { useEffect, useState } from 'react';
import Commonbtn from '../../Components/Commonbtn.js';
import Usericon from '../../Components/Usericons.js';
import Searchbar from '../../Components/Searchbar.js';
import './Customers.css';

const Customers = ({ setActiveComponent, setSelectedCustomerId }) => {
  const [customers, setcustomers] = useState([]);
  const [searchterm, setsearchterm] = useState('');

  const fetchcustomers = async () => {
    try {
      const response = await fetch('http://localhost:3000/customers/');
      const data = await response.json();
      setcustomers(data);
    } catch (e) {
      console.log('Error', e);
    }
  };

  useEffect(() => {
    fetchcustomers();
  }, []);

  const handleAddCustomer = () => {
    setActiveComponent('Addcustomer');
  };

  const handleEditCustomer = (id) => {
    setSelectedCustomerId(id);
    setActiveComponent('Editcustomer', id);
  };

  const handleDeleteCustomer = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/customers/delete/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        const data = await response.json();
        alert(data.message || 'Customer deleted successfully');
        fetchcustomers();
      } else {
        const error = await response.json();
        alert(error.error || 'Failed to delete customer');
      }
    } catch (e) {
      console.error('Error deleting customer:', e);
      alert('An error occurred while deleting the customer.');
    }
  };

  const filteredresults = customers.filter((item) =>
    Object?.values(item).some((val) =>
      val?.toString().toLowerCase().includes(searchterm.toLowerCase())
    )
  );

  return (
    <div className="customers-main-container">
      <div className="customers-header">
        <h1>Customers</h1>
        <div className="customers-header-section">
          <Searchbar
            title="Search Customer"
            width="420px"
            left="430px"
            onChange={(e) => setsearchterm(e.target.value)}
          />
          <div className="customers-controls-wrapper">
            <div className="customers-user-icon-container">
              <Usericon />
            </div>
            <div className="customers-button-container">
              <Commonbtn
                className="customers-add-button"
                height="40px"
                width="200px"
                title="Add Customer"
                onClick={handleAddCustomer}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="customers-data-table-wrapper">
        <table className="customers-data-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Address</th>
              <th colSpan={2} style={{ textAlign: 'center' }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredresults.length > 0 ? (
              filteredresults.map((item, index) => (
                <tr key={index}>
                  <td>{item.name}</td>
                  <td>{item.email}</td>
                  <td>{item.phone}</td>
                  <td>{item.address}</td>
                  <td>
                    <button
                      className="customers-edit-action-btn"
                      onClick={() => handleEditCustomer(item.id)}
                    >
                      Edit
                    </button>
                  </td>
                  <td>
                    <button
                      className="customers-delete-action-btn"
                      onClick={() => handleDeleteCustomer(item.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="customers-no-data-message">
                  No Customers Found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Customers;
