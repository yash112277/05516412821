import React from 'react';
import { TextField, Select, MenuItem, FormControl, InputLabel } from '@material-ui/core';

function Filter({ filters, setFilters, setSortBy }) {
  const handleFilterChange = (event) => {
    setFilters({ ...filters, [event.target.name]: event.target.value });
  };

  return (
    <div>
      <TextField
        name="company"
        label="Company"
        value={filters.company}
        onChange={handleFilterChange}
      />
      <TextField
        name="category"
        label="Category"
        value={filters.category}
        onChange={handleFilterChange}
      />
      <TextField
        name="minPrice"
        label="Min Price"
        type="number"
        value={filters.minPrice}
        onChange={handleFilterChange}
      />
      <TextField
        name="maxPrice"
        label="Max Price"
        type="number"
        value={filters.maxPrice}
        onChange={handleFilterChange}
      />
      <TextField
        name="rating"
        label="Min Rating"
        type="number"
        value={filters.rating}
        onChange={handleFilterChange}
      />
      <FormControl>
        <InputLabel>Availability</InputLabel>
        <Select
          name="availability"
          value={filters.availability}
          onChange={handleFilterChange}
        >
          <MenuItem value="">All</MenuItem>
          <MenuItem value="yes">In Stock</MenuItem>
          <MenuItem value="out-of-stock">Out of Stock</MenuItem>
        </Select>
      </FormControl>
      <FormControl>
        <InputLabel>Sort By</InputLabel>
        <Select
          onChange={(e) => setSortBy(e.target.value)}
          defaultValue="price"
        >
          <MenuItem value="price">Price</MenuItem>
          <MenuItem value="rating">Rating</MenuItem>
          <MenuItem value="discount">Discount</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}

export default Filter;