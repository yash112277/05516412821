import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Filter from './Filter';
import Pagination from './Pagination';

function ProductList() {
  const [products, setProducts] = useState([]);
  const [companyInfo, setCompanyInfo] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(10);
  const [filters, setFilters] = useState({
    company: 'AMZ',
    category: 'Laptop',
    minPrice: '1',
    maxPrice: '10000',
    top: '100'
  });

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/products', { params: filters });
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    const fetchCompanyInfo = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/company-info');
        setCompanyInfo(response.data);
      } catch (error) {
        console.error('Error fetching company info:', error);
      }
    };

    fetchProducts();
    fetchCompanyInfo();
  }, [filters]);

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div>
      <div className="company-info">
        <h2>{companyInfo.companyName}</h2>
        <p>Owner: {companyInfo.ownerName}</p>
        <p>Email: {companyInfo.ownerEmail}</p>
        <p>Roll No: {companyInfo.rollNo}</p>
      </div>
      <Filter filters={filters} setFilters={setFilters} />
      <div className="product-list">
        {currentProducts.map(product => (
          <div className="product-card" key={`${product.productName}-${product.price}`}>
            <h2>{product.productName}</h2>
            <p>Price: ${product.price}</p>
            <p>Rating: {product.rating}</p>
            <p>Discount: {product.discount}%</p>
            <p>Availability: {product.availability}</p>
            <Link to={`/product/${product.productName}`}>View Details</Link>
          </div>
        ))}
      </div>
      <Pagination
        productsPerPage={productsPerPage}
        totalProducts={products.length}
        paginate={paginate}
      />
    </div>
  );
}

export default ProductList;