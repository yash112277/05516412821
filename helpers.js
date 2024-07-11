import axios from 'axios';

export const fetchProducts = async (company, category, top, minPrice, maxPrice) => {
  try {
    const response = await axios.get(
      `http://20.244.56.144/test/companies/${company}/categories/${category}/products?top=${top}&minPrice=${minPrice}&maxPrice=${maxPrice}`
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
};

export const generateUniqueId = (product) => {
  return `${product.productName}-${product.price}-${product.rating}`;
};

export const sortProducts = (products, sortBy) => {
  return [...products].sort((a, b) => {
    if (sortBy === 'price') return a.price - b.price;
    if (sortBy === 'rating') return b.rating - a.rating;
    if (sortBy === 'discount') return b.discount - a.discount;
    return 0;
  });
};

export const getRandomImage = () => {
  const imageNumber = Math.floor(Math.random() * 10) + 1;
  return `https://picsum.photos/200/300?random=${imageNumber}`;
};