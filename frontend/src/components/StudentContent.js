import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/StudentContent.css';

const StudentContent = () => {
  const [contentList, setContentList] = useState([]);
  const [filterType, setFilterType] = useState('notes'); // Default filter type is 'notes'

  const fetchContent = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/content/getContent');
      setContentList(response.data);
    } catch (error) {
      console.error('Error fetching content:', error);
    }
  };

  useEffect(() => {
    fetchContent();
  }, []);

  // Function to filter content by type (Notes/Videos)
  const filterContentByType = (type) => {
    return contentList.filter((content) => content.material_type === type);
  };

  return (
    <div className="admin-content">
      <h1>Content Page</h1>
      <div className="category-dropdown">
        <select
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
        >
          <option value="notes">Notes</option>
          <option value="videos">Videos</option>
        </select>
      </div>
      <div className="content-grid">
        {filterContentByType(filterType).map((content) => (
          <div key={content.id} className="content-card">
            {/* Add your content card details here */}
            <p>Teacher ID: {content.teacher_id}</p>
            <p>Class Name: {content.class_name}</p>
            <p>Subject: {content.subject}</p>
            <p>Category: {content.category}</p>
            <p>Material Type: {content.material_type}</p>
            {content.study_material && (
              content.material_type === 'notes' ? (
                <div className="pdf-viewer">
                  <a
                    href={`http://localhost:3000/api/content/getPdf/${content.study_material}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View PDF
                  </a>
                </div>
              ) : (
                <a
                  href={`http://localhost:3000/api/content/getVideo/${content.study_material}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View Video
                </a>
              )
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default StudentContent;
