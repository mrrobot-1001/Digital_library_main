import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '../styles/AdminDashboard.css';
import { faUser, faNoteSticky, faBookOpen, faGraduationCap, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

const TeacherDashboard = ({ setUserRole, handleSignOut }) => {
  const navigate = useNavigate();

  // Function to handle the sign-out action
  const handleSignOutButton = () => {
    handleSignOut(); // Call the handleSignOut function to log the user out
    navigate('/'); // Redirect to the login page
  };

  return (
    <div className="admin-dashboard">
      <div className="logo">Teacher Dashboard</div>
      <ul className=" nav-links">
        <li>
          <NavLink to="/admin/students">
            <FontAwesomeIcon icon={faGraduationCap} beatFade /> Students
          </NavLink>
        </li>
        <li>
          <NavLink to="/admin/books">
            <FontAwesomeIcon icon={faBookOpen} beatFade /> Books
          </NavLink>
        </li>
        <li>
          <NavLink to="/admin/contents">
            <FontAwesomeIcon icon={faNoteSticky} beatFade /> Notes
          </NavLink>
        </li>
        <li>
          <NavLink to="/admin/profile">
            <FontAwesomeIcon icon={faUser} beatFade /> Teacher Profile
          </NavLink>
        </li>
        <li>
          <button onClick={handleSignOut}>
            <FontAwesomeIcon icon={faSignOutAlt} /> Sign Out
          </button>
        </li>
      </ul>
    </div>
  );
};

export default TeacherDashboard;
