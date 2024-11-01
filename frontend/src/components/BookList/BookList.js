import React, { useEffect, useState } from "react";
import axios from "axios";
import './BookList.css';


const BookList = () => {
  const [books, setBooks] = useState([]); 
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null); 

  // Fetch the list of books from the backend API when the component mounts
  useEffect(() => {
    const fetchBooks = async () => {
      setLoading(true); // Start loading before fetching data
      setError(null); // Reset any previous errors
    
      try {
        const response = await axios.get("http://localhost:5000/books/filter");
        setBooks(response.data);
        console.log("Books fetched:", response.data); // Log the fetched books for debugging
      } catch (err) {
        console.error("Error fetching books:", err); // Log the error for debugging
        setError("Failed to fetch books."); // Set error message
      } finally {
        setLoading(false); // Stop loading
      }
    };

    fetchBooks(); 
  }, []); 

  // Render loading state or error message if applicable
  if (loading) return <p>Loading books...</p>;
  if (error) return <p>{error}</p>;

  // Render the list of books
  return (
    <div>
      <h2>Book List</h2>
      {books.length === 0 ? (
        <p>No books available.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Author</th>
              <th>Genre</th>
              <th>Publication Date</th>
              <th>ISBN</th>
            </tr>
          </thead>
          <tbody>
            {books.map((book) => (
              <tr key={book.isbn}>
                <td>{book.title}</td>
                <td>{book.author}</td>
                <td>{book.genre}</td>
                <td>{book.publicationDate}</td>
                <td>{book.isbn}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};


export default BookList;
