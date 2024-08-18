// server.js
const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

app.get('/api/products', async (req, res) => {
  const { category, company, minPrice, maxPrice, rating, availability } = req.query;
  try {
    const response = await axios.get(`http://20.244.56.144/test/companies/${company}/categories/${category}/products`, {
      params: {
        top: 10, // You can adjust as needed
        minPrice,
        maxPrice
      }
    });
    const products = response.data.map((product, index) => ({
      id: index + 1, // Use a unique identifier logic
      name: product.productName,
      price: product.price,
      rating: product.rating,
      discount: product.discount,
      availability: product.availability
    }));
    res.json(products);
  } catch (error) {
    res.status(500).send('Error fetching products');
  }
});

app.get('/api/product/:id', async (req, res) => {
  const { id } = req.params;
  try {
    // Here you would need to get a specific product. This is just a placeholder.
    res.json({
      id,
      name: 'Product ' + id,
      company: 'AMZ',
      category: 'Laptop',
      price: 5000,
      rating: 4.5,
      discount: 10,
      availability: 'yes'
    });
  } catch (error) {
    res.status(500).send('Error fetching product');
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
