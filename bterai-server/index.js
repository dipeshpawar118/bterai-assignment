const express = require('express');
const { Pool } = require('pg');
const bodyParser = require('body-parser');
var cors = require('cors')

const app = express();
const port = 4000; 

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'bterai',
  password: 'postgres',
  port: 5432, 
});
app.use(cors())
app.use(bodyParser.json());

// API endpoint for user registration
app.post('/register', async (req, res) => {
  const { email } = req.body;
  try {
    const query = 'INSERT INTO users (email) VALUES ($1) RETURNING *';
    const values = [email];
    const result = await pool.query(query, values);
    const name =  email.split("@")[0];
    res.status(201).json({ message: 'User registered successfully' , name });
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: 'email already exists or an error occurred' });
  }
});

// API endpoint for user login
app.post('/login', async (req, res) => {
  const { email } = req.body;

  try {
    const query = 'SELECT * FROM users WHERE email = $1';
    const values = [email];
    const result = await pool.query(query, values);
    const name =  email.split("@")[0];
    if (result.rows.length > 0) {
      res.json({ message: 'Login successful', login : true , name});
    } else {
      res.status(401).json({ message: 'Invalid credentials', login : false  });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred during login' , login : false });
  }
});

pool.connect((err, client, done) => {
    if (err) {
      console.error('Error connecting to the database:', err);
      process.exit(1);
    }
  
    console.log('Connected to the database');
    // Release the database connection when the server is closed
    app.on('close', () => {
      done();
    });
  
    // Start the server
    const server = app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
    });
  
    // Handle server shutdown
    process.on('SIGTERM', () => {
      console.log('Closing the server and database connection');
      server.close(() => {
        pool.end(() => {
          console.log('Server and database connection closed');
          process.exit(0);
        });
      });
    });
  });
