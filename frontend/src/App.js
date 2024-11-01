import React, { useState, useEffect } from "react";
import axios from "axios";
import AddBookForm from "./components/AddBookForm/AddBookForm.js";
import FilterForm from "./components/FilterForm/FilterForm.js";
import BookList from "./components/BookList/BookList.js";
import ExportButton from "./components/ExportButton/ExportButton.js";

const App = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false); // State for loading
  const [error, setError] = useState(null); // State for error

  // Fetch all books on initial render
  useEffect(() => {
    fetchBooks();
  }, []);

  // Function to fetch all books
  const fetchBooks = async () => {
    setLoading(true); // Set loading to true at the start
    setError(null); // Reset any previous errors

    try {
      const response = await axios.get("http://localhost:5000/books/filter");
      setBooks(response.data);
      console.log("Fetched books:", response.data); // Log the fetched books for debugging
    } catch (error) {
      console.error("Error fetching books:", error); // Log the error for debugging
      setError("Failed to fetch books."); // Set error message
    } finally {
      setLoading(false); // Set loading to false at the end
    }
  };

  return (
    <div className="App">
      <h1>Book Inventory</h1>
      {/* Add a new book */}
      <AddBookForm fetchBooks={fetchBooks} />
      <br />
      {/* Filter books */}
      <FilterForm setBooks={setBooks} fetchBooks={fetchBooks} />
      <br />
      {/* Display loading or error messages, or the list of books */}
      {loading ? (
        <p>Loading books...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <BookList books={books} />
      )}
      <br />
      {/* Export data */}
      <ExportButton />
    </div>
  );
};

export default App;
