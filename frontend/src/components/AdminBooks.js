import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/AdminBooks.css'; // Import your CSS file

const AdminBooks = () => {
  const [books, setBooks] = useState([]);
  const [isAddFormVisible, setIsAddFormVisible] = useState(false);
  const [editingBook, setEditingBook] = useState(null);
  const [editedBook, setEditedBook] = useState({
    isbn: '',
    title: '',
    author: '',
    description: '',
    category: '',
    department: '',
    bookposter: null,
    bookpdf: null,
  });
  const [departments, setDepartments] = useState([]); // State to hold departments
  const [departmentFilter, setDepartmentFilter] = useState(''); // State to filter by department
  const [selectedPdfUrl, setSelectedPdfUrl] = useState(null);
  const [iframeVisible, setIframeVisible] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchBooks();
    fetchDepartments(); // Fetch departments when the component mounts
  }, []);

  const fetchBooks = async () => {
    try {
      const response = await axios.get('http://10.10.61.161:3001/api/books/getBooks');
      setBooks(response.data);
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

  const handleEdit = (book) => {
    setEditingBook(book);
    setEditedBook({
      isbn: book.isbn,
      title: book.title,
      author: book.author,
      description: book.description,
      category: book.category,
      department: book.department,
      bookposter: null,
      bookpdf: null,
    });
  };

  const handleEditInputChange = (event) => {
    const { name, value } = event.target;
    setEditedBook({
      ...editedBook,
      [name]: value,
    });
  };

  const handleEditFileChange = (event) => {
    const { name, files } = event.target;
    setEditedBook({
      ...editedBook,
      [name]: files[0],
    });
  };

  const handleEditSubmit = async (event, bookId) => {
    event.preventDefault();

    // Create a FormData object to send the form data including files
    const formData = new FormData();
    formData.append('isbn', editedBook.isbn);
    formData.append('title', editedBook.title);
    formData.append('author', editedBook.author);
    formData.append('description', editedBook.description);
    formData.append('category', editedBook.category);
    formData.append('department', editedBook.department);
    formData.append('bookposter', editedBook.bookposter);
    formData.append('bookpdf', editedBook.bookpdf);

    try {
      await axios.put(`http://10.10.61.161:3001/api/books/updateBook/${bookId}`, formData);
      setEditingBook(null); // Clear editing book
      setEditedBook({
        isbn: '',
        title: '',
        author: '',
        description: '',
        category: '',
        department: '',
        bookposter: null,
        bookpdf: null,
      });
      fetchBooks();
    } catch (error) {
      console.error('Error updating book:', error);
    }
  };

  const handleEditCancel = () => {
    setEditingBook(null); // Clear editing book
    setEditedBook({
      isbn: '',
      title: '',
      author: '',
      description: '',
      category: '',
      department: '',
      bookposter: null,
      bookpdf: null,
    });
  };

  const handleDelete = async (bookId) => {
    try {
      await axios.delete(`http://10.10.61.161:3001/api/books/deleteBook/${bookId}`);
      fetchBooks();
    } catch (error) {
      console.error('Error deleting book:', error);
    }
  };

  const toggleAddForm = () => {
    setIsAddFormVisible(!isAddFormVisible);
  };

  const handleAddSubmit = async (event) => {
    event.preventDefault();
    
    // Create a FormData object to send the form data including files
    const formData = new FormData();
    formData.append('isbn', editedBook.isbn);
    formData.append('title', editedBook.title);
    formData.append('author', editedBook.author);
    formData.append('description', editedBook.description);
    formData.append('category', editedBook.category);
    formData.append('department', editedBook.department);
    formData.append('bookposter', editedBook.bookposter);
    formData.append('bookpdf', editedBook.bookpdf);

    try {
      await axios.post('http://10.10.61.161:3001/api/books/addBook', formData);
      toggleAddForm();
      setEditedBook({
        isbn: '',
        title: '',
        author: '',
        description: '',
        category: '',
        department: '',
        bookposter: null,
        bookpdf: null,
      });
      fetchBooks();
    } catch (error) {
      console.error('Error adding book:', error);
    }
  };

  const handleAddCancel = () => {
    toggleAddForm();
    setEditedBook({
      isbn: '',
      title: '',
      author: '',
      description: '',
      category: '',
      department: '',
      bookposter: null,
      bookpdf: null,
    });
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setEditedBook({
      ...editedBook,
      [name]: value,
    });
  };

  const handleFileChange = (event) => {
    const { name, files } = event.target;
    setEditedBook({
      ...editedBook,
      [name]: files[0],
    });
  };

  const handleFilterChange = (event) => {
    const { value } = event.target;
    setDepartmentFilter(value);
  };
  const showIframe = (src) => {
    setSelectedPdfUrl(src);
    setIframeVisible(true);
  };

  const closePdfViewer = () => {
    setSelectedPdfUrl(null);
    setIframeVisible(false);
  };
  return (
    <div className="admin-books-container">
      <h1>Book List</h1>
      <button className="add-book-button" onClick={toggleAddForm}>Add Book</button>
      <div className="filter-container">
  <label htmlFor="departmentFilter">Filter by Department:</label>
  <select
    id="departmentFilter"
    name="departmentFilter"
    value={departmentFilter}
    onChange={handleFilterChange}
  >
    <option value="">All Departments</option>
    {departments.map((department) => (
      <option key={department} value={department}>
        {department}
      </option>
    ))}
  </select>
</div>
      {isAddFormVisible && (
        <div className="add-book-form">
          {/* Add Book Form */}
          <h3>Add Book</h3>
          <form onSubmit={handleAddSubmit} encType="multipart/form-data">
            <input
              type="text"
              name="isbn"
              placeholder="ISBN"
              value={editedBook.isbn}
              onChange={handleInputChange}
            />
            <input
              type="text"
              name="title"
              placeholder="Title"
              value={editedBook.title}
              onChange={handleInputChange}
            />
            <input
              type="text"
              name="author"
              placeholder="Author"
              value={editedBook.author}
              onChange={handleInputChange}
            />
            <input
              type="text"
              name="description"
              placeholder="Description"
              value={editedBook.description}
              onChange={handleInputChange}
            />
            <input
              type="text"
              name="category"
              placeholder="Category"
              value={editedBook.category}
              onChange={handleInputChange}
            />
            <input
              type="text"
              name="department"
              placeholder="Department"
              value={editedBook.department}
              onChange={handleInputChange}
            />
            <input
              type="file"
              name="bookposter"
              accept="image/*"
              onChange={handleFileChange}
            />
            <input
              type="file"
              name="bookpdf"
              accept=".pdf"
              onChange={handleFileChange}
            />
            <button type="submit">Submit</button>
            <button type="button" onClick={handleAddCancel}>Cancel</button>
          </form>
        </div>
      )}
      <table className="book-list-table">
        <thead>
          <tr>
            <th>Book ID</th>
            <th>Book Poster</th>
            <th>ISBN</th>
            <th>Title</th>
            <th>Author</th>
            <th>Description</th>
            <th>Category</th>
            <th>Department</th>
            <th>PDF</th>
            <th>Created At</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {books
            .filter((book) => {
              // Apply department filter
              if (!departmentFilter) {
                return true; // Show all books when no filter is applied
              }
              return book.department === departmentFilter;
            })
            .map((book) => (
              <React.Fragment key={book.id}>
                <tr>
                  <td>{book.id}</td>
                  <td>
                    <img src={`http://10.10.61.161:3001/api/books/uploads/${book.bookposter}`} alt={book.title} className="book-poster" />
                  </td>
                  <td>{book.isbn}</td>
                  <td>{book.title}</td>
                  <td>{book.author}</td>
                  <td>{book.description}</td>
                  <td>{book.category}</td>
                  <td>{book.department}</td>
                  <td>
                  <button className="pdf-button" onClick={() => showIframe(`http://10.10.61.161:3001/api/books/uploads/${book.bookpdf}`)}>View PDF</button>
                  </td>
                  <td>{book.created_at}</td>
                  <td>
                    <button className="edit-button" onClick={() => handleEdit(book)}>Edit</button>
                  </td>
                  <td>
                    <button className="delete-button" onClick={() => handleDelete(book.id)}>Delete</button>
                  </td>
                </tr>
                {editingBook && editingBook.id === book.id && (
                  <tr key={`edit-${book.id}`}>
                    <td colSpan="10">
                      <form onSubmit={(event) => handleEditSubmit(event, book.id)}>
                        <input
                          type="text"
                          name="isbn"
                          placeholder="ISBN"
                          value={editedBook.isbn}
                          onChange={handleEditInputChange}
                        />
                        <input
                          type="text"
                          name="title"
                          placeholder="Title"
                          value={editedBook.title}
                          onChange={handleEditInputChange}
                        />
                        <input
                          type="text"
                          name="author"
                          placeholder="Author"
                          value={editedBook.author}
                          onChange={handleEditInputChange}
                        />
                        <input
                          type="text"
                          name="description"
                          placeholder="Description"
                          value={editedBook.description}
                          onChange={handleEditInputChange}
                        />
                        <input
                          type="text"
                          name="category"
                          placeholder="Category"
                          value={editedBook.category}
                          onChange={handleEditInputChange}
                        />
                        <input
                          type="text"
                          name="department"
                          placeholder="Department"
                          value={editedBook.department}
                          onChange={handleEditInputChange}
                        />
                        <input
                          type="file"
                          name="bookposter"
                          accept="image/*"
                          onChange={handleEditFileChange}
                        />
                        <input
                          type="file"
                          name="bookpdf"
                          accept=".pdf"
                          onChange={handleEditFileChange}
                        />
                        <button type="submit">Save Changes</button>
                        <button type="button" onClick={handleEditCancel}>Cancel</button>
                      </form>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
        </tbody>
      </table>
      {iframeVisible && (
        <div className="iframe-overlay">
          <button className="close-pdf-button" onClick={closePdfViewer}>Close PDF</button>
          <iframe
            title="PDF Viewer"
            src={selectedPdfUrl}
            width="100%"
            height="500px"
            frameBorder="0"
          />
        </div>
         )}
    </div>
  );
};

export default AdminBooks;
