import React from "react";
import axios from "axios";
import './ExportButton.css';

const ExportButton = () => {
  const handleExport = async () => {
    try {
      const response = await axios.get("http://localhost:5000/books/export/csv", {
        responseType: "blob", // Important for downloading files
      });
      
      // Create a Blob from the response data
      const blob = new Blob([response.data], { type: "text/csv" });
      
      // Create a link element
      const link = document.createElement("a");
      link.href = window.URL.createObjectURL(blob);
      link.download = "books_export.csv"; // Name of the file to download
      document.body.appendChild(link);
      
      // Programmatically click the link to trigger the download
      link.click();
      
      // Clean up and remove the link element
      document.body.removeChild(link);
      
      alert("Books exported successfully!");
    } catch (error) {
      console.error("Error exporting books:", error);
      alert("Failed to export books.");
    }
  };

  return <button onClick={handleExport}>Export Books</button>;
};

export default ExportButton;
