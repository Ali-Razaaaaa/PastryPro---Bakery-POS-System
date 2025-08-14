import React, { useEffect, useState } from 'react';
import './Orders.css';
import Searchbar from '../../Components/Searchbar';
import Usericon from '../../Components/Usericons';
import { AiOutlineInfoCircle } from "react-icons/ai";

import Commonbtn from '../../Components/Commonbtn';

const Orders = ({ setActiveComponent,setSelectedOrderId }) => {

  const [statusFilter, setStatusFilter] = useState('');
  const [dateFilter, setDateFilter] = useState('');
  const [orders, setOrders] = useState([]);
  const [searchTerm, setsearchTerm] = useState("");
  
  const handleStatusChange = (e) => setStatusFilter(e.target.value);
  const handleDateChange = (e) => setDateFilter(e.target.value);
  const handleAddOrder = () => setActiveComponent('Addorder');

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch('http://localhost:3000/orders');
        const data = await response.json();
        setOrders(data);
      } catch (e) {
        console.error('Error fetching orders:', e);
      }
    };
    fetchOrders();
  }, []);

  const filteredresults = orders
  .filter((item) =>
    Object.values(item).some((val) =>
      val?.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  )
  .filter((item) =>
    statusFilter ? item.status.toLowerCase() === statusFilter.toLowerCase() : true
  )
  .filter((item) => {
    if (!dateFilter) return true;

    const orderDate = new Date(item.order_date);
    const today = new Date();

    if (dateFilter === "today") {
      return (
        orderDate.getDate() === today.getDate() &&
        orderDate.getMonth() === today.getMonth() &&
        orderDate.getFullYear() === today.getFullYear()
      );
    }

    if (dateFilter === "thisWeek") {
      const startOfWeek = new Date(today);
      startOfWeek.setDate(today.getDate() - today.getDay()); 
      const endOfWeek = new Date(startOfWeek);
      endOfWeek.setDate(startOfWeek.getDate() + 6);
      return orderDate >= startOfWeek && orderDate <= endOfWeek;
    }

    if (dateFilter === "thisMonth") {
      return (
        orderDate.getMonth() === today.getMonth() &&
        orderDate.getFullYear() === today.getFullYear()
      );
    }

    return true;
  });


  const handledetailpage=(order_id)=>
  {
    setActiveComponent('Orderdetail');
    setSelectedOrderId(order_id);
  }
  return (
    <div className='orders-container'>
      <h1>Orders List</h1>
      <div className='orders-search-container'>
        <Searchbar 
          title="Search Order" 
          width="420px" 
          left="430px" 
          onChange={(e) => { setsearchTerm(e.target.value) }}
     
        />
        
        <div className='orders-btn-icon-wrap'>
          <div className='orders-user-icon'>
            <Usericon />
          </div>
          
          <div className='orders-filters-wrap'>
            <select
              value={statusFilter}
              onChange={handleStatusChange}
              className='orders-status-filter'
            >
              <option value="">Status</option>
              <option value="pending">Pending</option>
              <option value="deleted">Deleted</option>
              <option value="completed">Completed</option>
            </select>

            <select
              value={dateFilter}
              onChange={handleDateChange}
              className='orders-date-filter'
            >
              <option value="">Date</option>
              <option value="today">Today</option>
              <option value="thisWeek">This Week</option>
              <option value="thisMonth">This Month</option>
            </select>
          </div>
          
          <div className='orders-btn-wrap'>
            <Commonbtn
              className='orders-add-btn'
              height='40px'
              width='200px'
              title='Add Order'
              onClick={handleAddOrder}
            />
          </div>
        </div>
      </div>

      <div className='orders-table-wrap'>
        <table className='orders-table'>
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Customer ID</th>
              <th>Customer Name</th>
              <th>Date</th>
              <th>Status</th>
              <th>Total</th>
              <th>Detail</th>
            </tr>
          </thead>
          <tbody>
            {filteredresults.length > 0 ? (
              filteredresults.map((order, index) => (
                <tr key={index}>
                  <td>{order.order_id}</td>
                  <td>{order.customer_id}</td>
                  <td>{order.customer_name}</td>
                  <td>{new Date(order.order_date).toLocaleDateString()}</td>
                   <td>
                  <button style={{ backgroundColor: 'green', color: 'white', padding: '5px 10px', border: 'none', borderRadius: '4px' }}>
                          {order.status}
                    </button>
                      </td>
                  <td>Rs. {order.total_amount}</td>
                  <td>
                    <AiOutlineInfoCircle
                    size={25}
                    onClick={()=>handledetailpage(order.order_id)}
                      className='orders-detail-btn'
                    />
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className='orders-no-data'>
                  No orders found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Orders;