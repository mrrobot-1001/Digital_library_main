import React, { useState,useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faBook, faInfoCircle, faFile } from '@fortawesome/free-solid-svg-icons';

import '../styles/HomePage.css';

// Sample data for the grid view
const gridViewData = [
  {
    imageSrc: '/images/nlistlogo.jpg',
    title: 'NList',
    description: 'A college component of e-ShodhSindhu consortium with access to 6,000+ journals, 1,99,500+ ebooks under N-LIST and 6,00,000 ebooks through NDL.',
    link: 'https://nlist.inflibnet.ac.in/',
  },
  {
    imageSrc: '/images/nptel.png',
    title: 'NPTEL',
    description: 'NPTEL is a MoE-funded project by IITs and IISc to offer quality online courses in 22 disciplines.',
    link: 'https://nptel.ac.in/',
  },
  {
    imageSrc: '/images/Syllabus_logo.jpg',
    title: 'Syllabus',
    description: 'All the UG and PG syllabus available here!',
    link: '/syllabus',
  },
  {
    imageSrc: '/images/swayam.jpeg',
    title: 'Swayam',
    description: 'SWAYAM is a government project to provide quality online education to all, especially the marginalized.',
    link: 'https://swayam.gov.in/',
  },
  {
    imageSrc: '/images/ndli.png',
    title: 'NDLI',
    description: 'NDLI is an online library with various learning services, sponsored by MoE and run by IIT Kharagpur.',
    link: 'https://ndl.iitkgp.ac.in/',
  },
  
];

function HomePage({ setUserRole }) {
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState('');
  const [loginSuccess, setLoginSuccess] = useState(false);
  const [visitorCount, setVisitorCount] = useState(0); // Add this state
  const navigate = useNavigate();

  // Function to fetch visitor count
   // Function to fetch visitor count
   async function fetchVisitorCount() {
    try {
      const response = await fetch('/api/visitors/count'); // Replace with your server endpoint
      if (response.ok) {
        const data = await response.json();
        return data.count;
      } else {
        console.error('Failed to fetch visitor count');
        return 0;
      }
    } catch (error) {
      console.error('Error fetching visitor count:', error);
      return 0;
    }
  }

  // Fetch visitor count when the component mounts
  useEffect(() => {
    fetchVisitorCount().then((count) => {
      setVisitorCount(count);
    });
  }, []);

  // Increment the visitor count when the component mounts
  useEffect(() => {
    // Make a GET request to increment the visitor count
    fetch('/api/visitors/increment')
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Failed to increment visitor count');
        }
      })
      .then((data) => {
        // Visitor count has been incremented, update the count state
        setVisitorCount(data.count);
      })
      .catch((error) => {
        console.error('Error incrementing visitor count:', error);
      });
  }, []);

  const handleLoginButtonClick = () => {
    setShowLoginForm(true);
  };

  const handleCancelButtonClick = () => {
    setShowLoginForm(false);
  };

  const handleUserTypeClick = (type) => {
    setUserType(type);
  };

  const handleLogin = async (e) => {
    e.preventDefault(); // Prevent the default form submission

    try {
      // Determine the login endpoint based on userType
      let loginEndpoint = '';

      if (userType === 'admin') {
        loginEndpoint = 'http://10.10.61.161:3001/api/adminlogin/adminLogin'; // Update with your admin login endpoint
      } else if (userType === 'teacher') {
        loginEndpoint = 'http://10.10.61.161:3001/api/teacherlogin/teacherLogin';
      } else {
        console.error('Invalid user type');
        return;
      }

      // Make a POST request to authenticate the user
      const response = await fetch(loginEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('userRole', data.role);
        // Redirect to the appropriate dashboard based on the role returned from the server
        if (data.role === 'admin') {
          navigate('/admin/dashboard');
          setUserRole('admin'); // Set the user role
        } else if (data.role === 'teacher') {
          navigate('/teacher/dashboard');
          setUserRole('teacher'); // Set the user role
        } else {
          console.error('Unknown role:', data.role);
        }

        // Set login success message
        setLoginSuccess(true);
      } else {
        console.error('Authentication failed');
      }
    } catch (error) {
      console.error('Error logging in', error);
    }
  };

  return (
    <div>
      {/* Navigation Bar */}
      <div className="navbar">
        <a href="#" className="logo">
          <img src="/images/dlimage1.png" alt="E-Library Logo" />
        </a>
        <Link to="/books" className="right button text-xl ">
        <span className="icon-container">
          <FontAwesomeIcon icon={faBook} fade />  Books</span>
        </Link>
        <Link to="/contents" className="right button">
        <span className="icon-container">
          <FontAwesomeIcon icon={faFile} fade/> Notes</span>
        </Link>
        <Link to="/about-us" className="right button">
        <span className="icon-container">
          <FontAwesomeIcon icon={faInfoCircle} fade/>  About Us </span>
        </Link>
        {/* Login Button */}
        <button className="button" id="loginButton" onClick={handleLoginButtonClick}>
          <FontAwesomeIcon icon={faUser}  /> 
        </button>
      </div>
      {/*Login Form*/}
      <div id="loginFormContainer" style={{ display: showLoginForm ? 'block' : 'none' }}>
        <form id="loginForm" onSubmit={handleLogin}>
          <h2>Login to E-Library</h2>
          <div className="user-type-buttons">
            <button
              className={`user-type-button ${userType === 'admin' ? 'selected' : ''}`}
              type="button"
              onClick={() => handleUserTypeClick('admin')}
            >
              Admin
            </button>
            <button
              className={`user-type-button ${userType === 'teacher' ? 'selected' : ''}`}
              type="button"
              onClick={() => handleUserTypeClick('teacher')}
            >
              Teacher
            </button>
          </div>
          {userType && <p className="selected-user-type">Selected User Type: {userType}</p>}
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          /><br />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">Login</button>
          <button id="cancelButton" onClick={handleCancelButtonClick}>
            Cancel
          </button>
          {loginSuccess && <p className="login-success">Login successful!</p>}
        </form>
      </div>
   
      {/* Grid View */}
      <section className="u-clearfix u-section-2" id="sec-abd3">
        <div className="u-clearfix u-sheet u-sheet-1">
          <div className="u-expanded-width u-list u-list-1">
            <div className="u-repeater u-repeater-1">
              
              {gridViewData.map((item, index) => (
                <div className="u-container-style u-hover-feature u-list-item u-repeater-item u-shape-rectangle" key={index}>
                  <div className="u-container-layout u-similar-container u-valign-top">
                    <img alt="" className="u-expanded-width u-image u-image-default u-image-1" src={item.imageSrc} />
                    <h3 className="u-text u-text-default u-text-1">{item.title}</h3>
                    <p className="u-text u-text-2">{item.description}</p>
                    <a href={item.link} className="u-active-none u-border-2 u-border-hover-palette-2-base u-border-palette-2-light-1 u-btn u-button-style u-hover-none u-none u-text-body-color u-btn-1" target="_blank">Learn More</a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      <section>
      <div className="responsive-container-block outer-container">
      <div className="responsive-container-block inner-container">
        <p className="text-blk heading-text">
          OUR TEAM
        </p>
        
        <div className="responsive-container-block cards-container">
          <div className="responsive-cell-block wk-desk-4 wk-ipadp-4 wk-mobile-12 wk-tab-12 card-container">
            <p className="text-blk name">
              Harsh Rana
            </p>
            <p className="text-blk position">
              Full Stack Developer
            </p>
            <div className="team-member-image-container">
            <img className="team-member-image" src="/images/harsh.jpg" alt="Instructor 1" />
            </div>
          </div>
          <div className="responsive-cell-block wk-desk-4 wk-ipadp-4 wk-mobile-12 wk-tab-12 card-container">
            <p className="text-blk name">
              Abhinav Pandey 
            </p>
            <p className="text-blk position">
              Front End Developer
            </p>
            <div className="team-member-image-container">
            <img className="team-member-image" src="/images/abhinav.jpg" alt="Instructor 2" />
            </div>
          </div>
          <div className="responsive-cell-block wk-desk-4 wk-ipadp-4 wk-mobile-12 wk-tab-12 card-container">
            <p className="text-blk name">
              Priyansh Kesharwani
            </p>
            <p className="text-blk position">
              UI/UX
            </p>
            <div className="team-member-image-container">
            <img className="team-member-image" src="/images/priyansh.jpg" alt="Instructor 3" />
            </div>
          </div>
          <div className="responsive-cell-block wk-desk-4 wk-ipadp-4 wk-mobile-12 wk-tab-12 card-container">
            <p className="text-blk name">
                Manas Vyas
            </p>
            <p className="text-blk position">
                Deploment Executive
            </p>
            <div className="team-member-image-container">
            <img className="team-member-image" src="/images/manas.jpg" alt="Instructor 4" />
            </div>
          </div>
          <div className="responsive-cell-block wk-desk-4 wk-ipadp-4 wk-mobile-12 wk-tab-12 card-container">
            <p className="text-blk name">
                Harsha Verma
            </p>
            <p className="text-blk position">
                Mentor
            </p>
            <div className="team-member-image-container">
            <img className="team-member-image" src="/images/harsha.jpeg" alt="Instructor 4" />
            </div>
          </div>
        </div>
      </div>
    </div>
      </section>
      <footer>
      <div className="footer-social-icons">
        <a href="#" target="_blank">
          <img className="footer-logo" src="/images/dc1.png" alt="nahi pata"></img>
        </a>
        <a href="#" target="_blank">
          <i className="fab fa-twitter"></i>
        </a>
        <a href="#" target="_blank">
          <i className="fab fa-instagram"></i>
        </a>
      </div>

      <div className="footer-content">
        <b>
          <p>&copy; 2023 Digital Library. All rights reserved. Disha College, Raipur(C.G.)</p>
        </b>
      </div>

      <div className="footer-social-icons">
        <a href="#" target="_blank">
          <i className="fab fa-facebook-f"></i>
        </a>
        <a href="#" target="_blank">
          <i className="fab fa-twitter"></i>
        </a>
        <a href="#" target="_blank">
          <i className="fab fa-instagram"></i>
        </a>
      </div>

      <div className="visitor-counter">
  
      <img src="https://hitwebcounter.com/counter/counter.php?page=9446117&style=0006&nbdigits=5&type=page&initCount=1201" title="Counter Widget" Alt="Visit counter For Websites"   border="0" />
      </div>
    </footer>

      {/* Login Form hidden */}
      <div id="loginFormContainer" style={{ display: showLoginForm ? 'block' : 'none' }}>
  <form id="loginForm" onSubmit={handleLogin}>
    <h2>Login to E-Library</h2>
    <div className="user-type-buttons">
      <button
        className={`user-type-button ${userType === 'admin' ? 'selected' : ''}`}
        type="button"
        onClick={() => handleUserTypeClick('admin')}
      >
        Admin
      </button>
      <button
        className={`user-type-button ${userType === 'teacher' ? 'selected' : ''}`}
        type="button"
        onClick={() => handleUserTypeClick('teacher')}
      >
        Teacher
      </button>
    </div>
    {userType && <p className="selected-user-type">Selected User Type: {userType}</p>}
    <input
      type="text"
      placeholder="Username"
      value={username}
      onChange={(e) => setUsername(e.target.value)}
    /><br />
    <input
      type="password"
      placeholder="Password"
      value={password}
      onChange={(e) => setPassword(e.target.value)}
    />
    <button type="submit">Login</button>
    <button id="cancelButton" onClick={handleCancelButtonClick}>
      Cancel
    </button>
    {loginSuccess && <p className="login-success">Login successful!</p>}
  </form>
</div>
</div>
  );
}

export default HomePage;
