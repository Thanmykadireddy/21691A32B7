// src/components/ProductList.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Grid, Card, CardContent, Typography, Button, TextField, Select, MenuItem } from '@mui/material';
import { Link } from 'react-router-dom';

function ProductList() {
  const [products, setProducts] = useState([]);
  const [filters, setFilters] = useState({
    category: '',
    company: '',
    minPrice: 0,
    maxPrice: 10000,
    rating: 0,
    availability: ''
  });

  useEffect(() => {
    fetchProducts();
  }, [filters]);

  const fetchProducts = async () => {
    const response = await axios.get(`http://localhost:5000/api/products`, { params: filters });
    setProducts(response.data);
  };

  const handleFilterChange = (event) => {
    const { name, value } = event.target;
    setFilters({ ...filters, [name]: value });
  };

  return (
    <div>
      <Typography variant="h4" gutterBottom>Product List</Typography>
      <div>
        <TextField name="minPrice" label="Min Price" type="number" value={filters.minPrice} onChange={handleFilterChange} />
        <TextField name="maxPrice" label="Max Price" type="number" value={filters.maxPrice} onChange={handleFilterChange} />
        <Select name="category" value={filters.category} onChange={handleFilterChange}>
          <MenuItem value="">All Categories</MenuItem>
          <MenuItem value="Laptop">Laptop</MenuItem>
          <MenuItem value="Phone">Phone</MenuItem>
          {/* Add other categories */}
        </Select>
        <Select name="company" value={filters.company} onChange={handleFilterChange}>
          <MenuItem value="">All Companies</MenuItem>
          <MenuItem value="AMZ">AMZ</MenuItem>
          <MenuItem value="FLP">FLP</MenuItem>
          {/* Add other companies */}
        </Select>
        <Button onClick={fetchProducts}>Apply Filters</Button>
      </div>
      <Grid container spacing={2}>
        {products.map((product) => (
          <Grid item xs={12} sm={6} md={4} key={product.id}>
            <Card>
              <CardContent>
                <Typography variant="h5">{product.name}</Typography>
                <Typography>Price: ${product.price}</Typography>
                <Typography>Rating: {product.rating}</Typography>
                <Typography>Discount: {product.discount}%</Typography>
                <Typography>Availability: {product.availability}</Typography>
                <Link to={`/product/${product.id}`}>
                  <Button>View Details</Button>
                </Link>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}

export default ProductList;
