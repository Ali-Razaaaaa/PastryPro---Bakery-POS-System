import React, { useEffect, useState } from 'react';
import Searchbar from '../../Components/Searchbar';
import Usericons from '../../Components/Usericons';
import Commonbtn from '../../Components/Commonbtn';
import './Managestaff.css';

const ManageStaff = ({ setActiveComponent }) => {
  const [staffList, setStaffList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchStaff = async () => {
    try {
      const response = await fetch('http://localhost:3000/staff/');
      const data = await response.json();
      setStaffList(data);
    } catch (e) {
      console.error('Error fetching staff:', e);
    }
  };

  useEffect(() => { fetchStaff(); }, []);

  const handleAddStaff = () => setActiveComponent('Addstaff');

  const handleDeleteStaff = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/staff/delete/${id}`, { method: 'DELETE' });
      const data = await response.json();
      alert(data.message || 'Staff Deleted Successfully');
      fetchStaff();
    } catch {
      alert('Error Deleting Staff');
    }
  };

  const filteredStaff = staffList.filter((item) =>
    Object.values(item).some((val) =>
      val?.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  return (
    <div className="staff-main-container">
      <h1>Staff Management</h1>

      <div className="staff-header-section">
        <Searchbar
          title="Search Staff"
          width="420px"
          left="430px"
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <div className="staff-controls-wrapper">
          <div className="staff-user-icon-container">
            <Usericons />
          </div>
          <div className="staff-button-container">
            <Commonbtn
              className="staff-add-button"
              height="40px"
              width="200px"
              title="Add Staff"
              onClick={handleAddStaff}
            />
          </div>
        </div>
      </div>

      <div className="staff-data-table-wrapper">
        <table className="staff-data-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Role</th>
              <th>Address</th>
              <th style={{textAlign: 'center'}}>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredStaff.length > 0 ? (
              filteredStaff.map((item, index) => (
                <tr key={index}>
                  <td>{item.name}</td>
                  <td>{item.email}</td>
                  <td>{item.phone}</td>
                  <td>{item.role}</td>
                  <td>{item.address}</td>
                  <td style={{textAlign: 'center'}}>
                    <button
                      className="staff-delete-action-btn"
                      onClick={() => handleDeleteStaff(item.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="staff-no-data-message">
                  No Staff Found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageStaff;
