import React, { useState } from 'react';
import { FaBirthdayCake, FaUser, FaShoppingCart, FaChartBar, FaCog, FaLock } from 'react-icons/fa';
import Dashboard from './Dashboard/Dashboard';
import Products from './Products/Products';
import ManageStaff from './Staff/Managestaff';
import { useNavigate } from 'react-router-dom';
import Customers from './Customer/Customers';
import Addcustomer from './Customer/Addcustomer';
import Editcustomer from './Customer/Editcustomer';
import Addproduct from './Products/Addproduct';
import Orders from './Orders/Orders.js';
import Addorder from './Orders/Addorder.js';
import Orderdetail from './Orders/Orderdetail.js';
import Addstaff from './Staff/Addstaff.js';
import Editproduct from './Products/Editproduct.js';
import './Mainpage.css';

const Mainpage = () => {
  const [activeComponent, setActiveComponent] = useState('Dashboard');
  const [selectedCustomerId, setSelectedCustomerId] = useState(null);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [selectedOrderId,setSelectedOrderId]=useState(null);
  const navigate = useNavigate();

  const pages = [
    { Icon: FaBirthdayCake, page: 'Dashboard', component: <Dashboard /> },
    { Icon: FaShoppingCart, page: 'Products', component: <Products setActiveComponent={setActiveComponent} setSelectedProductId={setSelectedProductId} /> },
    { Icon: FaUser, page: 'Customers', component: <Customers setActiveComponent={setActiveComponent} setSelectedCustomerId={setSelectedCustomerId} /> },
    { Icon: FaUser, page: 'Orders', component: <Orders setActiveComponent={setActiveComponent} setSelectedOrderId={setSelectedOrderId} />  },
    { Icon: FaCog, page: 'Manage Staff', component: <ManageStaff setActiveComponent={setActiveComponent} /> },
  ];

  const extras = [
    { page: 'Addcustomer', component: <Addcustomer setActiveComponent={setActiveComponent} /> },
    { page: 'Editcustomer', component: <Editcustomer setActiveComponent={setActiveComponent} customerId={selectedCustomerId} /> },
    { page: 'Addproduct', component: <Addproduct setActiveComponent={setActiveComponent} /> },
    { page: 'Editproduct', component: <Editproduct setActiveComponent={setActiveComponent} productId={selectedProductId} /> },
    { page: 'Addorder', component: <Addorder setActiveComponent={setActiveComponent} /> },
    { page: 'Orderdetail',component: <Orderdetail setActiveComponent={setActiveComponent} orderdetailid={selectedOrderId} /> },
    { page: 'Addstaff', component: <Addstaff setActiveComponent={setActiveComponent} /> },
  ];

  const handlePageClick = (pageName) => setActiveComponent(pageName);

  const renderActiveComponent = () => {
    const extraPage = extras.find(page => page.page === activeComponent);
    if (extraPage) return extraPage.component;

    const activePage = pages.find(page => page.page === activeComponent);
    return activePage ? activePage.component : <Dashboard />;
  };

  return (
    <div className='container-body'>
      <div className='container-left'>
        <div className='logo'>ミ★ 𝘗𝘢𝘴𝘵𝘳𝘺𝘗𝘳𝘰 ★彡
          <div className='slogan'>𝘍𝘳𝘰𝘮 𝘖𝘶𝘳 𝘖𝘷𝘦𝘯 𝘵𝘰 𝘠𝘰𝘶𝘳 𝘏𝘦𝘢𝘳𝘵</div>
        </div>

        <div className='sidebar-container'>
          {pages.map((item, index) => (
            <div key={index} className='sidebar-link'>
              <button
                onClick={() => handlePageClick(item.page)}
                className={activeComponent === item.page ? 'active-link' : ''}
              >
                <item.Icon style={{ marginRight: '8px' }} /> {item.page}
              </button>
            </div>
          ))}
        </div>

        <div className="logout-container">
          <button type="button" onClick={() => navigate('/loginscreen')}>
            Log Out <div className='logout-icon'><FaLock /></div>
          </button>
        </div>
      </div>

      <div className='right'>
        {renderActiveComponent()}
      </div>
    </div>
  );
};

export default Mainpage;
