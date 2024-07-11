const express = require('express');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const API_BASE_URL = 'http://20.244.56.144/test/companies';

// Authentication middleware
const authenticate = async (req, res, next) => {
  try {
    // In a real-world scenario, you'd use this info to get an access token
    // For this example, we'll just add it to the headers
    req.headers['X-Client-ID'] = process.env.CLIENT_ID;
    req.headers['X-Client-Secret'] = process.env.CLIENT_SECRET;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Authentication failed' });
  }
};

app.get('/api/products', authenticate, async (req, res) => {
  try {
    const { company, category, top, minPrice, maxPrice } = req.query;
    const response = await axios.get(
      `${API_BASE_URL}/${company}/categories/${category}/products?top=${top}&minPrice=${minPrice}&maxPrice=${maxPrice}`,
      {
        headers: {
          'X-Client-ID': req.headers['X-Client-ID'],
          'X-Client-Secret': req.headers['X-Client-Secret'],
        }
      }
    );
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ error: 'An error occurred while fetching products' });
  }
});

// New route for company information
app.get('/api/company-info', (req, res) => {
  res.json({
    companyName: process.env.COMPANY_NAME,
    ownerName: process.env.OWNER_NAME,
    ownerEmail: process.env.OWNER_EMAIL,
    rollNo: process.env.ROLL_NO
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});