import React from 'react';
import { NavLink } from 'react-router-dom';
import '../styles/AdminDashboard.css';

const StudentDashboard = () => {
  return (
    <div className="admin-dashboard">
      <div className="logo">Student Dashboard</div>
      <ul className="nav-links">
        <li>
          <NavLink to="/student/books">Books</NavLink>
        </li>
        <li>
          <NavLink to="/student/contents">Contents</NavLink>
        </li>
        <li>
          <NavLink to="/admin/profile">Student Profile</NavLink>
        </li>
        {/* Add more links as needed */}
      </ul>
    </div>
  );
};

export default StudentDashboard;
