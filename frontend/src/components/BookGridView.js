import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/BookGridView.css'; // Create this CSS file for styling

const Book = () => {
  const [books, setBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('');
  const [departments, setDepartments] = useState([]); // State to hold department options
  const [selectedPdfUrl, setSelectedPdfUrl] = useState(null); // State to store the selected PDF URL

  useEffect(() => {
    fetchBooks();
    fetchDepartments(); // Fetch department options
  }, [searchTerm, departmentFilter]);

  const fetchBooks = async () => {
    try {
      const response = await axios.get('http://10.10.61.161:3001/api/books/getBooks');
      let filteredBooks = response.data;

      if (searchTerm) {
        filteredBooks = filteredBooks.filter((book) =>
          book.title.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }

      if (departmentFilter) {
        filteredBooks = filteredBooks.filter(
          (book) => book.department === departmentFilter
        );
      }

      setBooks(filteredBooks);
    } catch (error) {
      console.error('Error fetching books:', error);
    }
  };

  const fetchDepartments = async () => {
    try {
      const response = await axios.get('http://10.10.61.161:3001/api/books/getDepartments');
      setDepartments(response.data);
    } catch (error) {
      console.error('Error fetching departments:', error);
    }
  };

  const openBookPdf = (pdfUrl) => {
    setSelectedPdfUrl(pdfUrl); // Set the selected PDF URL to display in the iframe
  };

  const closeBookPdf = () => {
    setSelectedPdfUrl(null); // Clear the selected PDF URL to hide the iframe
  };

  return (
    <div className="book-grid-container">
      <h1 id='heading'>All Uploaded Books</h1>

      <div className="container">
        <div className="search-container">
          <input
            type="text"
            placeholder="Search by book name"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input" // Apply a custom class for styling
          />
          <button className="search-button" onClick={() => fetchBooks()}>
            Search
          </button>
        </div>

        <div className="filter-container">
          <label htmlFor="departmentFilter">Filter by Department:</label>
          <select
            id="departmentFilter"
            name="departmentFilter"
            value={departmentFilter}
            onChange={(e) => setDepartmentFilter(e.target.value)}
            className="filter-select" // Apply a custom class for styling
          >
            <option value="">All Departments</option>
            {departments.map((department) => (
              <option key={department} value={department}>
                {department}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="book-grid">
        {books.map((book) => (
          <div key={book.id} className="book-card">
            <div className="book-image">
              <img
                src={`http://10.10.61.161:3001/api/books/uploads/${book.bookposter}`}
                alt={book.title}
              />
            </div>
            <div className="book-details">
              <h3 className="book-title">{book.title}</h3>
              <p className="book-author">Author: {book.author}</p>
              <p className="book-description">Description: {book.description}</p>
            </div>
            <div className="book-actions">
              <button
                className="read-button"
                onClick={() => openBookPdf(book.bookpdf)}
              >
                Read
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* PDF Viewer */}
      {selectedPdfUrl && (
        <div className="pdf-viewer">
          <button className="close-pdf-button" onClick={closeBookPdf}>
            Close PDF
          </button>
          <iframe
            title="Book PDF Viewer"
            src={`http://10.10.61.161:3001/api/books/uploads/${selectedPdfUrl}`}
            width="800px"
            height="800px" // Adjust the height as needed
          ></iframe>
        </div>
      )}
    </div>
  );
};

export default Book;
