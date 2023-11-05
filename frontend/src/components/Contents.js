import React, { useState, useEffect } from 'react';
import axios from 'axios';
import moment from 'moment';
import '../styles/Contents.css';
import VideoModal from './VideoModal'; // Import your VideoModal component

const Contents = () => {
  const [contentList, setContentList] = useState([]);
  const [filters, setFilters] = useState({
    departmentFilter: '',
    teacherNameFilter: '',
    classNameFilter: '',
    materialTypeFilter: '',
  });
  const [selectedContent, setSelectedContent] = useState(null);
  const [videoUrl, setVideoUrl] = useState(null);

  const handleViewVideo = (videoUrl) => {
    setVideoUrl(videoUrl);
  };

  const handleCloseVideoViewer = () => {
    setVideoUrl(null);
  };

  // Track the PDF URL to display
  const [pdfUrl, setPdfUrl] = useState(null);

  const fetchContent = async () => {
    try {
      const response = await axios.get('http://10.10.61.161:3001/api/content/getContentWithTeacherNames', {
        params: filters, // Pass the filters as query parameters
      });
      setContentList(response.data);
    } catch (error) {
      console.error('Error fetching content:', error);
    }
  };

  useEffect(() => {
    fetchContent();
  }, [filters]);

  const handleFilterChange = (filterName, value) => {
    setFilters({
      ...filters,
      [filterName]: value,
    });
  };
  // Function to handle clicking the "View PDF" link
  const handleViewPdf = (pdfUrl) => {
    setPdfUrl(pdfUrl);
  };

  // Function to close the PDF viewer
  const handleClosePdfViewer = () => {
    setPdfUrl(null);
  };
   // Apply filter logic to contentList
   const filteredContent = contentList.filter((content) => {
    if (
      (filters.departmentFilter === '' || content.department === filters.departmentFilter) &&
      (filters.teacherNameFilter === '' || content.teacher_name === filters.teacherNameFilter) &&
      (filters.classNameFilter === '' || content.class_name === filters.classNameFilter) &&
      (filters.materialTypeFilter === '' || content.material_type === filters.materialTypeFilter)
    ) {
      return true;
    }
    return false;
  });

  // Update the useState for materialTypes and selectedMaterialType
  const [materialTypes, setMaterialTypes] = useState([]);
  const [selectedMaterialType, setSelectedMaterialType] = useState('');

  // Add a useEffect to fetch material types when the component mounts
  useEffect(() => {
    const fetchMaterialTypes = async () => {
      try {
        const response = await axios.get('http://10.10.61.161:3001/api/content/getMaterialTypes');
        setMaterialTypes(response.data);
      } catch (error) {
        console.error('Error fetching material types:', error);
      }
    };

    fetchMaterialTypes();
  }, []);
  const [departments, setDepartment] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('');
  useEffect(() => {
    const fetchTeacherDepartment = async () => {
      try {
        const response = await axios.get('http://10.10.61.161:3001/api/teachers/getDepartments');
        setDepartment(response.data);
      } catch (error) {
        console.error('Error fetching Deparment:', error);
      }
    };

    fetchTeacherDepartment();
  }, []);

  return (
    <div className="contents-container">
      <h1 className="heading">Content Page</h1>
      <div className="container">
         
        {/* Teacher Name Filter */}
        <div className="filter-dropdown">
          <label htmlFor="teacherNameFilter" className="filter-label">
            Teacher Name:
          </label>
          <select
            id="teacherNameFilter"
            name="teacherNameFilter"
            value={filters.teacherNameFilter}
            onChange={(e) => handleFilterChange('teacherNameFilter', e.target.value)}
            className="filter-select"
          >
            <option value="">All Teachers</option>
            {Array.from(new Set(contentList.map((content) => content.teacher_name))).map(
              (teacherName) => (
                <option key={teacherName} value={teacherName}>
                  {teacherName}
                </option>
              )
            )}
          </select>
        </div>

        {/* Class Name Filter */}
        <div className="filter-dropdown">
          <label htmlFor="classNameFilter" className="filter-label">
            Class Name:
          </label>
          <select
            id="classNameFilter"
            name="classNameFilter"
            value={filters.classNameFilter}
            onChange={(e) => handleFilterChange('classNameFilter', e.target.value)}
            className="filter-select"
          >
            <option value="">All Classes</option>
            {Array.from(new Set(contentList.map((content) => content.class_name))).map(
              (className) => (
                <option key={className} value={className}>
                  {className}
                </option>
              )
            )}
          </select>
        </div>

        {/* Material Type Filter */}
        <div className="filter-dropdown">
  <label htmlFor="materialTypeFilter" className="filter-label">
    Material Type:
  </label>
  <select
    id="materialTypeFilter"
    name="materialTypeFilter"
    value={selectedMaterialType} // Use selectedMaterialType here
    onChange={(e) => setSelectedMaterialType(e.target.value)} // Update selectedMaterialType when the user selects a value
    className="filter-select"
  >
    <option value="">All Material Types</option>
    {materialTypes.map((materialType) => (
      <option key={materialType} value={materialType}>
        {materialType}
      </option>
    ))}
  </select>
</div>
      </div>

      <div className="content-grid">
      {filteredContent.map((content) => (
          <div key={content.id} className="content-card">
            <p className="content-info">Teacher Name: {content.teacher_name}</p>
            <p className="content-info">Class Name: {content.class_name}</p>
            <p className="content-info">Subject: {content.subject}</p>
            <p className="content-info">Category: {content.category}</p>
            <p className="content-info">Material Type: {content.material_type}</p>
            {content.study_material && (
              <div className="material-viewer">
                {content.material_type === 'notes' ? (
                  <button
                    className="content-link"
                    onClick={() => handleViewPdf(`http://10.10.61.161:3001/api/content/getPdf/${content.study_material}`)}
                  >
                    View PDF
                  </button>
                ) : content.material_type === 'videos' ? (
                  <button
                    className="content-link"
                    onClick={() => handleViewVideo(`http://10.10.61.161:3001/api/content/getVideo/${content.study_material}`)}
                  >
                    View Video
                  </button>
                ) : content.material_type === 'ppt' ? (
                  <a
                    className="content-link"
                    href={`http://10.10.61.161:3001/api/content/getPpt/${content.study_material}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Download PPT
                  </a>
                ) : null}
              </div>
            )}
            <p className="content-info">
              Uploaded At: {moment(content.uploaded_at).format('MMMM DD, YYYY')}
            </p>
          </div>
        ))}
      </div>

      {/* PDF Viewer */}
      {pdfUrl && (
        <div className="pdf-viewer">
          <iframe src={pdfUrl} title="PDF Viewer" width="100%" height="600px"></iframe>
          <button className="close-pdf-button" onClick={handleClosePdfViewer}>
            Close PDF
          </button>
        </div>
      )}

      {/* Video Modal */}
      {videoUrl && (
        <VideoModal
          videoUrl={videoUrl}
          onClose={handleCloseVideoViewer}
        />
      )}
    </div>
  );
};

export default Contents;