import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/AdminTeachers.css';

const AdminTeachers = () => {
  const [teachers, setTeachers] = useState([]);
  const [isAddFormVisible, setIsAddFormVisible] = useState(false);
  const [editedTeacher, setEditedTeacher] = useState({
    name: '',
    contactNumber: '',
    department: '',
    username: '',
    password: '',
    profilePhoto: null,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [departmentFilter, setDepartmentFilter] = useState(''); // Department filter
  const [filteredTeachers, setFilteredTeachers] = useState([]);

  useEffect(() => {
    fetchTeachers();
  }, [departmentFilter]); // Include departmentFilter in the dependency array

  const fetchTeachers = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get('http://10.10.61.161:3001/api/teachers/getTeachers');
      setTeachers(response.data);
      filterTeachersByDepartment(); // Call filter function after fetching teachers
    } catch (error) {
      console.error('Error fetching teachers:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const filterTeachersByDepartment = () => {
    if (!departmentFilter) {
      setFilteredTeachers(teachers);
    } else {
      const filtered = teachers.filter((teacher) => teacher.department === departmentFilter);
      setFilteredTeachers(filtered);
    }
  };

  const handleAddClick = () => {
    setIsAddFormVisible(true);
  };

  const handleAddCancel = () => {
    setIsAddFormVisible(false);
    clearEditedTeacher();
  };

  const clearEditedTeacher = () => {
    setEditedTeacher({
      name: '',
      contactNumber: '',
      department: '',
      username: '',
      password: '',
      profilePhoto: null,
    });
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setEditedTeacher({
      ...editedTeacher,
      [name]: value,
    });
  };

  const handleFileChange = (event) => {
    const { name, files } = event.target;
    setEditedTeacher({
      ...editedTeacher,
      [name]: files[0],
    });
  };

  const handleAddSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('name', editedTeacher.name);
    formData.append('contactNumber', editedTeacher.contactNumber);
    formData.append('department', editedTeacher.department);
    formData.append('username', editedTeacher.username);
    formData.append('password', editedTeacher.password);
    formData.append('profilePhoto', editedTeacher.profilePhoto);

    try {
      await axios.post('http://10.10.61.161:3001/api/teachers/addTeacher', formData);
      fetchTeachers();
      setIsAddFormVisible(false);
      clearEditedTeacher();
    } catch (error) {
      console.error('Error adding teacher:', error);
    }
  };

  const handleDeleteClick = async (teacherId) => {
    try {
      await axios.delete(`http://10.10.61.161:3001/api/teachers/deleteTeacher/${teacherId}`);
      fetchTeachers();
    } catch (error) {
      console.error('Error deleting teacher:', error);
    }
  };

  return (
    <div className="teacher-list-container">
      <h1>Teacher Management</h1>
      {/* Department filter dropdown */}
      <div className="department-filter">
        <select
          id="departmentFilter"
          name="departmentFilter"
          value={departmentFilter}
          onChange={(e) => setDepartmentFilter(e.target.value)}
        >
          <option value="">All Departments</option>
          {/* Generate options from unique department names */}
          {Array.from(new Set(teachers.map((teacher) => teacher.department))).map((department) => (
            <option key={department} value={department}>
              {department}
            </option>
          ))}
        </select>
      </div>
      <button className="add-teacher-button" onClick={handleAddClick}>
        Add Teacher
      </button>
      {isAddFormVisible && (
        <div className="add-teacher-form">
          <h3>Add Teacher</h3>
          <form onSubmit={handleAddSubmit} encType="multipart/form-data">
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={editedTeacher.name}
              onChange={handleInputChange}
            />
            <input
              type="text"
              name="contactNumber"
              placeholder="Contact Number"
              value={editedTeacher.contactNumber}
              onChange={handleInputChange}
            />
            <input
              type="text"
              name="department"
              placeholder="Department"
              value={editedTeacher.department}
              onChange={handleInputChange}
            />
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={editedTeacher.username}
              onChange={handleInputChange}
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={editedTeacher.password}
              onChange={handleInputChange}
            />
            <input
              type="file"
              name="profilePhoto"
              accept="image/*"
              onChange={handleFileChange}
              required
            />
            <button type="submit">Submit</button>
            <button type="button" onClick={handleAddCancel}>
              Cancel
            </button>
          </form>
        </div>
      )}
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <table className="teacher-list-table">
          <thead>
            <tr>
              <th>Teacher ID</th>
              <th>Profile Photo</th>
              <th>Name</th>
              <th>Contact Number</th>
              <th>Department</th>
              <th>Username</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {filteredTeachers.map((teacher) => (
              <tr key={teacher.id}>
                <td>{teacher.id}</td>
                <td>
                  {teacher.profilePhoto && (
                    <img
                      src={`http://10.10.61.161:3001/api/teachers/uploads/${teacher.profile_photo}`}
                      alt={teacher.name}
                      className="teacher-photo"
                    />
                  )}
                </td>
                <td>{teacher.name}</td>
                <td>{teacher.contact_number}</td>
                <td>{teacher.department}</td>
                <td>{teacher.username}</td>
                <td>
                  <button className="delete-button" onClick={() => handleDeleteClick(teacher.id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AdminTeachers;
