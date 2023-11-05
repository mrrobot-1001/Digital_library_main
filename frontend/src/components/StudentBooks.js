import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/StudentBooks.css';

const BookGridView = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/books/getBooks');
      setBooks(response.data);
    } catch (error) {
      console.error('Error fetching books:', error);
    }
  };

  const openBookPdf = (pdfUrl) => {
    // Open the book PDF in a new tab or window
    window.open(`http://localhost:3001/api/books/uploads/${pdfUrl}`, '_blank');
  };

  return (
    <div className="book-grid-container">
      <h1>All Uploaded Books</h1>
      <div className="book-grid">
        {books.map((book) => (
          <div key={book.id} className="book-card">
            <div className="book-image">
              <img src={`http://localhost:3001/api/books/uploads/${book.bookposter}`} alt={book.title} />
            </div>
            <div className="book-details">
              <h3 className="book-title">{book.title}</h3>
              <p className="book-author">Author: {book.author}</p>
              <p className="book-description">Description: {book.description}</p>
            </div>
            <div className="book-actions">
              <button className="read-button" onClick={() => openBookPdf(book.bookpdf)}>Read</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookGridView;
