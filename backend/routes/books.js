const express = require("express");
const { Op } = require("sequelize");
const Book = require("../models/Book");
const router = express.Router();
const { Parser } = require("json2csv");

router.post("/add", async (req, res) => {
  try {
    const book = await Book.create(req.body);
    res.status(201).json(book);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/filter", async (req, res) => {
  const filters = { ...req.query };
  console.log("Received filters:", filters); // Log the received filters

  try {
    const books = await Book.findAll({
      where: {
        ...(filters.title && { title: { [Op.like]: `%${filters.title}%` } }), // Partial match for title
        ...(filters.author && { author: { [Op.like]: `%${filters.author}%` } }), // Partial match for author
        ...(filters.genre && { genre: { [Op.like]: `%${filters.genre}%` } }), // Partial match for genre
        ...(filters.publicationDate && { publicationDate: filters.publicationDate }), // Exact match for publication date
      },
    });

    console.log("Books found:", books); // Log the found books
    if (books.length === 0) {
      return res.status(404).json({ message: "No books found matching the filters." });
    }

    res.json(books);
  } catch (error) {
    console.error("Error fetching books:", error); // Log the error
    res.status(500).json({ error: error.message });
  }
});

router.get("/export/:format", async (req, res) => {
    try {
        // Fetch all books from the database
        const books = await Book.findAll();
    
        // Check requested format (CSV or JSON)
        const format = req.params.format.toLowerCase();
    
        if (format === "json") {
          // Export as JSON
          res.setHeader("Content-Type", "application/json");
          res.status(200).json(books);
        } else if (format === "csv") {
          // Export as CSV
          const fields = ["id", "title", "author", "genre", "publicationDate", "ISBN"]; // Specify fields for CSV
          const json2csvParser = new Parser({ fields });
          const csv = json2csvParser.parse(books);
    
          res.setHeader("Content-Type", "text/csv");
          res.setHeader("Content-Disposition", "attachment; filename=books.csv");
          res.status(200).send(csv);
        } else {
          res.status(400).json({ error: "Invalid format specified. Use 'json' or 'csv'." });
        }
      } catch (error) {
        console.error("Error exporting data:", error);
        res.status(500).json({ error: "An error occurred while exporting data." });
      }
    });

module.exports = router;
