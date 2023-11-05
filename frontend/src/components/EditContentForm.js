import React, { useState } from 'react';
import axios from 'axios';

const EditContentForm = ({ contentId, onEditSuccess }) => {
  const [formData, setFormData] = useState({
    field: '', // Field to edit (e.g., 'teacher_id', 'class_name', etc.)
    value: '', // New value for the field
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();

    try {
      // Make a PUT request to update the content
      await axios.put(`http://10.10.61.161:3001/api/content/updateContent/${contentId}`, formData);

      // Notify the parent component of the edit success
      onEditSuccess();

      // Clear the form data
      setFormData({
        field: '',
        value: '',
      });
    } catch (error) {
      console.error('Error updating content:', error);
    }
  };

  return (
    <form onSubmit={handleEditSubmit}>
      <label htmlFor="field">Field to Edit:</label>
      <select
        id="field"
        name="field"
        value={formData.field}
        onChange={handleInputChange}
        required
      >
        <option value="">Select Field</option>
        <option value="teacher_id">Teacher ID</option>
        <option value="class_name">Class Name</option>
        <option value="subject">Subject</option>
        <option value="category">Category</option>
        <option value="material_type">Material Type</option>
      </select>

      <label htmlFor="value">New Value:</label>
      <input
        type="text"
        id="value"
        name="value"
        value={formData.value}
        onChange={handleInputChange}
        required
      />

      <button type="submit">Update</button>
    </form>
  );
};

export default EditContentForm;