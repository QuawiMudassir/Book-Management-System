import React, { useState } from "react";
import axios from "axios";
import './FilterForm.css';

const FilterForm = ({ setBooks }) => {
  const [filters, setFilters] = useState({
    title: "",
    author: "",
    genre: "",
    publicationDate: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({ ...prevFilters, [name]: value }));
  };

  const handleSearch = async () => {
    try {
      const response = await axios.get("http://localhost:5000/books/filter", { params: filters });
      console.log("Filtered books response:", response.data); // Log the response to check what data is received
      setBooks(response.data); // Update the state with the fetched books
    } catch (error) {
      console.error("Error fetching filtered books:", error);
      alert("Error fetching filtered books: " + error.message);
    }
  };
  

  return (
    <div>
      <h2>Filter Books</h2>

      <div>
        <label>Title:</label>
        <input
          type="text"
          name="title"
          value={filters.title}
          onChange={handleChange}
        />
      </div>

      <div>
        <label>Author:</label>
        <input
          type="text"
          name="author"
          value={filters.author}
          onChange={handleChange}
        />
      </div>

      <div>
        <label>Genre:</label>
        <input
          type="text"
          name="genre"
          value={filters.genre}
          onChange={handleChange}
        />
      </div>

      <div>
        <label>Publication Date:</label>
        <input
          type="date"
          name="publicationDate"
          value={filters.publicationDate}
          onChange={handleChange}
        />
      </div>

      <button onClick={handleSearch}>Filter</button>
    </div>
  );
};

export default FilterForm;
