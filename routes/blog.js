const express = require('express');
const router = express.Router();
const multer = require('multer');
const { connection } = require('../database/sql'); // Import the database connection
const {v4: uuidv4} = require('uuid'); // Import the uuid library to generate unique IDs
// For demonstration purposes, let's assume you have an array of blogs stored in your backend
const blogs = [];

// Create a Multer storage configuration
var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Define the destination folder where the uploaded images will be stored
    cb(null, "./public/images/");
  },
  filename: (req, file, cb) => {
    // Define the filename of the uploaded image (you can customize this as needed)
    cb(null, Date.now() + file.originalname);
  }
});

// Create a Multer instance with the storage configuration
var upload = multer({ storage });

// Route to handle the POST request for creating a new blog with image upload
router.post('/', upload.single("blogImage"), (req, res) => {
  const { blogTitle, blogContent } = req.body;
  const blogImage = req.file; // This contains the file information if uploaded successfully

  console.log('Data received in the backend:', { title: blogTitle, content: blogContent, image: blogImage });

  // Assuming you have a unique ID for each blog (you can use a library like uuid to generate IDs)
  const newBlog = { id: uuidv4, blogTitle, blogContent, blogImage: blogImage ? blogImage.filename : null };
  blogs.push(newBlog);

  connection.query('INSERT INTO BlogData SET ?', newBlog, (error, results, fields) => {
    if (error) {
      console.error('Error while inserting blog into database!', error);
      res.status(500).json({ message: 'Internal Server Error!' });
      return;
    }
    console.log('Blog inserted into database successfully!');
    // Send a success response
    res.status(201).json({ message: 'Blog created successfully!', blog: newBlog });
  });
});

router.get('/', (req, res) => {
    // Perform a SELECT query to fetch all blogs from the database
    connection.query('SELECT * FROM BlogData', (error, results, fields) => {
      if (error) {
        console.error('Error while fetching blogs from the database!', error);
        res.status(500).json({ message: 'Internal Server Error!' });
        return;
      }
  
      // Send the fetched blogs in the response
      res.json(results);
    });
  });
module.exports = router;
