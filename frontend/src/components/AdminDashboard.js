import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import '../styles/AdminDashboard.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUser,
  faNoteSticky,
  faBookOpen,
  faGraduationCap,
  faChalkboardUser,
  faSignOutAlt,
} from '@fortawesome/free-solid-svg-icons';

const AdminDashboard = ({ setUserRole, handleSignOut }) => {
  const navigate = useNavigate();

  // Function to handle the sign-out action
  const handleSignOutButton = () => {
    handleSignOut(); // Call the handleSignOut function to log the user out
    navigate('/'); // Redirect to the login page
  };

  return (
    <div className="admin-dashboard">
      <div className="logo">Admin Dashboard</div>
      <ul className="nav-links">
        <li>
          <Link to="/admin/teachers">
            <FontAwesomeIcon icon={faChalkboardUser} beatFade /> Teachers
          </Link>
        </li>
        <li>
          <Link to="/admin/students">
            <FontAwesomeIcon icon={faGraduationCap} beatFade /> Students
          </Link>
        </li>
        <li>
          <Link to="/admin/books">
            <FontAwesomeIcon icon={faBookOpen} beatFade /> Books
          </Link>
        </li>
        <li>
          <Link to="/admin/contents">
            <FontAwesomeIcon icon={faNoteSticky} beatFade /> Notes
          </Link>
        </li>
        <li>
          <Link to="/admin/profile">
            <FontAwesomeIcon icon={faUser} beatFade /> Admin Profile
          </Link>
        </li>
        <li>
          <button className="dark-button" onClick={handleSignOut}>
            <FontAwesomeIcon icon={faSignOutAlt} /> Sign Out
          </button>
        </li>
      </ul>
    </div>
  );
};

AdminDashboard.propTypes = {
  setUserRole: PropTypes.func.isRequired, // Define setUserRole prop as a function
};

export default AdminDashboard;
