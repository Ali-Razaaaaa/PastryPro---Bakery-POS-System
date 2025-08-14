import React, { useEffect, useState } from 'react';
import Searchbar from '../../Components/Searchbar.js';
import Usericons from '../../Components/Usericons.js';
import Midboxes from '../../Components/Midboxes.js';
import Smallboxes from '../../Components/Smallboxes.js';
import { FaBirthdayCake } from 'react-icons/fa';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import './Dashboard.css';

const Dashboard = () => {
  const [searchterm, setsearchterm] = useState('');
  const [totalorder, settotalorders] = useState('');
  const [totalorderitems, settotalorderitems] = useState('');
  const [lowStockCount, setLowStockCount] = useState('');
  const [salesSummary, setSalesSummary] = useState([]);
  const [topproduct, settopproduct] = useState('');

  useEffect(() => {
    const gettotalorders = async () => {
      try {
        const response = await fetch('http://localhost:3000/orders/totalorders/count');
        const data = await response.json();
        settotalorders(data.total);
      } catch (e) {
        console.log('Error fetching total orders');
      }
    };

    const gettotalitems = async () => {
      try {
        const response = await fetch('http://localhost:3000/orders/totalorders/items');
        const data = await response.json();
        settotalorderitems(data.totalitems);
      } catch (e) {
        console.log('Error fetching total items');
      }
    };

    const getLowStock = async () => {
      try {
        const response = await fetch('http://localhost:3000/products/lowstock');
        const data = await response.json();
        setLowStockCount(data.lowStockCount);
      } catch (e) {
        console.log('Error fetching low stock count');
      }
    };

    const getSalesSummary = async () => {
      try {
        const response = await fetch('http://localhost:3000/orders/salessummary');
        const data = await response.json();
        
        // Debug ke liye console log
        console.log('Sales Summary Response:', data);
        
        // Ensure data is an array
        if (Array.isArray(data)) {
          setSalesSummary(data);
        } else {
          console.error('Sales summary data is not an array:', data);
          setSalesSummary([]); // Fallback to empty array
        }
      } catch (e) {
        console.log('Error fetching sales summary:', e);
        setSalesSummary([]); // Set empty array on error
      }
    };
    const gettopproduct=async()=>
    {
       try {
        const response = await fetch('http://localhost:3000/products/topproduct');
        const data=await response.json();
        settopproduct(typeof data === 'string' ? data : 'No Product');
        
       }catch(e)
       {
        console.log('Error',e);
       }
    };

    gettotalorders();
    gettotalitems();
    getLowStock();
    getSalesSummary();
    gettopproduct();
  }, []);

  return (
    <div className='container-dash'>
      <div className='Dash-container'>
        <h1 style={{ color: 'white' }}>Dashboard</h1>
        <div className='search-bar'>
          <Searchbar
            title='Search'
            width='300px'
            left='310px'
            onChange={(e) => setsearchterm(e.target.value)}
          />
          <Usericons />
        </div>
      </div>

      <div className='boxes-container'>
        <Midboxes Title='Total Orders' data={totalorder} />
        <div style={{ marginLeft: '190px', display: 'flex', columnGap: '60px' }}>
          <Smallboxes Title='Sales' data={totalorderitems} />
          <Smallboxes Title='Low' data={lowStockCount} />
        </div>
      </div>

      <div style={{ display: 'flex', columnGap: '60px', marginBottom: '30px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div
            style={{
              borderTop: '5px solid #10B981',
              borderLeft: '1px solid white',
              borderRight: '1px solid white',
              borderBottom: '1px solid white',
              marginLeft: '10px',
              height: '120px',
              width: '290px',
              borderRadius: '12px',
              display: 'flex',
              flexDirection: 'column',
              position: 'relative',
            
              color: 'white',
            }}
          >
            <div
              style={{
                marginLeft: '15px',
                height: '20px',
                width: '130px',
                marginTop: '10px',
                fontSize: '18px',
              }}
            >
              Top Product
              <p
                style={{
                  marginLeft: '100px',
                  fontSize: '28px',
                  fontWeight: 'bold',
                 
                  position: 'absolute',
                  bottom: '8px',
                  left: '20px',
                }}
              >
             {topproduct}
              </p>
            </div>
            <div
              style={{
                backgroundColor: '#D8C8A6',
                height: '50px',
                width: '50px',
                alignItems: 'center',
                display: 'flex',
                justifyContent: 'center',
                borderRadius: '15px',
                position: 'absolute',
                left: '15px',
                top: '40px',
              }}
            >
              <FaBirthdayCake color='red' fontSize={28} />
            </div>
          </div>

          <div
            style={{
              borderTop: '5px solid #F59E0B',
              borderLeft: '1px solid white',
              borderRight: '1px solid white',
              borderBottom: '1px solid white',
              marginLeft: '10px',
              height: '160px',
              width: '290px',
              borderRadius: '12px',
              display: 'flex',
              flexDirection: 'column',
              position: 'relative',
              color: 'white',
            }}
          >
            <div
              style={{
                marginLeft: '18px',
                height: '20px',
                width: '130px',
                marginTop: '10px',
                fontSize: '18px',
              }}
            >
              Sales Overview
            </div>
            <div
              style={{
                height: '90px',
                width: '90px',
                borderRadius: '90px',
                position: 'relative',
                marginLeft: '100px',
                marginTop: '8px',
                alignItems: 'center',
                justifyContent: 'center',
                display: 'flex',
                border: '15px solid #D3D3D3',
              }}
            >
              <p
                style={{
                  fontSize: '28px',
                  fontWeight: 'bold',
                  position: 'absolute',
                  left: '20px',
                  right: '30px',
                }}
              >
                62%
              </p>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div style={{ display: 'flex', flexDirection: 'column', rowGap: '10px' }}>
          {/* Sales Summary */}
          <div style={{ marginLeft: '125px' }}>
            <div
              style={{
                borderTop: '5px solid #38BDF8',
                borderLeft: '1px solid white',
                borderRight: '1px solid white',
                borderBottom: '1px solid white',
                marginLeft: '10px',
                height: '45vh',
                width: '450px',
                borderRadius: '12px',
                display: 'flex',
                flexDirection: 'column',
                position: 'relative',
                padding: '15px',
                
                color: 'white',
              }}
            >
              <div style={{ fontSize: '18px', marginBottom: '15px', marginLeft: '30px' }}>
                Sales Summary
              </div>
              <div style={{marginTop:'60px'}}>
              {salesSummary && salesSummary.length > 0 ? (
                <ResponsiveContainer width="100%" height={200}>
                  <BarChart data={salesSummary}>
                    <XAxis dataKey="time" stroke="#fff" />
                    <YAxis stroke="#fff" />
                    <Tooltip />
                    <Bar dataKey="sales" fill="#FFA500" radius={[10, 10, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
                
              ) : (
                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'center', 
                  alignItems: 'center', 
                  height: '200px',
                  color: '#ccc' 
                }}>
                  No sales data available
                </div>
              )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;