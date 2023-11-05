import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/AdminStudents.css';

const AdminStudents = () => {
  const [students, setStudents] = useState([]);
  const [isAddFormVisible, setIsAddFormVisible] = useState(false);
  const [editingStudent, setEditingStudent] = useState(null);
  const [editedStudent, setEditedStudent] = useState({
    student_id: '',
    name: '',
    class_name: '',
    password: '',
  });

  const [classOptions, setClassOptions] = useState([]);
  const [selectedClass, setSelectedClass] = useState('');

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const response = await axios.get('http://10.10.61.161:3001/api/students/getStudents');
      setStudents(response.data);

      // Extract unique class names from the data
      const uniqueClasses = [...new Set(response.data.map((student) => student.class_name))];
      setClassOptions(uniqueClasses);
    } catch (error) {
      console.error('Error fetching students:', error);
    }
  };

  const handleAddClick = () => {
    setIsAddFormVisible(true);
  };

  const handleAddCancel = () => {
    setIsAddFormVisible(false);
    clearEditedStudent();
  };

  const clearEditedStudent = () => {
    setEditedStudent({
      student_id: '',
      name: '',
      class_name: '',
      password: '',
    });
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setEditedStudent({
      ...editedStudent,
      [name]: value,
    });
  };

  const handleAddSubmit = async (event) => {
    event.preventDefault();

    try {
      const { student_id, name, class_name, password } = editedStudent;

      await axios.post('http://10.10.61.161:3001/api/students/addStudent', {
        student_id,
        name,
        class_name,
        password,
      });
      fetchStudents();
      setIsAddFormVisible(false);
      clearEditedStudent();
    } catch (error) {
      console.error('Error adding student:', error);
    }
  };

  const handleEditClick = (student) => {
    setEditingStudent(student);
    setEditedStudent({
      student_id: student.student_id,
      name: student.name,
      class_name: student.class_name,
      password: '', // Password field should be empty for security
    });
  };

  const handleEditCancel = () => {
    setEditingStudent(null);
    clearEditedStudent();
  };

  const handleEditSubmit = async (studentId) => {
    try {
      const { student_id, name, class_name, password } = editedStudent;

      await axios.put(`http://10.10.61.161:3001/api/students/updateStudent/${studentId}`, {
        student_id,
        name,
        class_name,
        password,
      });
      setEditingStudent(null);
      clearEditedStudent();
      fetchStudents();
    } catch (error) {
      console.error('Error updating student:', error);
    }
  };

  const handleDeleteClick = async (studentId) => {
    try {
      await axios.delete(`http://10.10.61.161:3001/api/students/deleteStudent/${studentId}`);
      fetchStudents();
    } catch (error) {
      console.error('Error deleting student:', error);
    }
  };

  const handleClassSelect = (className) => {
    setSelectedClass(className);
  };

  return (
    <div className="student-list-container">
      <h1>Student List</h1>
      {/* Add the filter dropdown */}
      <div className="filter-container">
        <select
          value={selectedClass}
          onChange={(e) => setSelectedClass(e.target.value)}
        >
          <option value="">All Students</option>
          {classOptions.map((className) => (
            <option key={className} value={className}>
              {className}
            </option>
          ))}
        </select>
      </div>
      <button className="add-student-button" onClick={handleAddClick}>
        Add Student
      </button>
      {isAddFormVisible && (
        <div className="add-student-form">
          <h3>Add Student</h3>
          <form onSubmit={handleAddSubmit}>
            <input
              type="text"
              name="student_id"
              placeholder="Student ID"
              value={editedStudent.student_id}
              onChange={handleInputChange}
            />
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={editedStudent.name}
              onChange={handleInputChange}
            />
            <input
              type="text"
              name="class_name"
              placeholder="Class Name"
              value={editedStudent.class_name}
              onChange={handleInputChange}
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={editedStudent.password}
              onChange={handleInputChange}
            />
            <button type="submit">Submit</button>
            <button type="button" onClick={handleAddCancel}>
              Cancel
            </button>
          </form>
        </div>
      )}
      <table className="student-list-table">
        <thead>
          <tr>
            <th>Student ID</th>
            <th>Name</th>
            <th>Class Name</th>
            <th>Password</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {students
            .filter((student) => selectedClass === '' || student.class_name === selectedClass)
            .map((student) => (
              <tr key={student.id}>
                <td>{student.student_id}</td>
                <td>{student.name}</td>
                <td>{student.class_name}</td>
                <td>{student.password}</td>
                <td>
                  <button className="edit-button" onClick={() => handleEditClick(student)}>
                    Edit
                  </button>
                </td>
                <td>
                  <button className="delete-button" onClick={() => handleDeleteClick(student.id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      {editingStudent && (
        <div className="edit-student-form">
          <h3>Edit Student</h3>
          <form onSubmit={() => handleEditSubmit(editingStudent.id)}>
            <input
              type="text"
              name="student_id"
              placeholder="Student ID"
              value={editedStudent.student_id}
              onChange={handleInputChange}
            />
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={editedStudent.name}
              onChange={handleInputChange}
            />
            <input
              type="text"
              name="class_name"
              placeholder="Class Name"
              value={editedStudent.class_name}
              onChange={handleInputChange}
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={editedStudent.password}
              onChange={handleInputChange}
            />
            <button type="submit">Save Changes</button>
            <button type="button" onClick={handleEditCancel}>
              Cancel
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default AdminStudents;
