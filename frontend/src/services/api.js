import axios from 'axios';

const API_URL = 'https://ecommerce-jiot.onrender.com/api/v1'; // Update with your backend URL

// Search products by query
export const searchProducts = async (query) => {
  try {
    const response = await axios.get(`${API_URL}/products?keyword=${encodeURIComponent(query)}`);
    return response.data.products || [];
  } catch (error) {
    console.error('Error searching products:', error);
    return [];
  }
};

// Get all products with filters
export const getAllProducts = async (filters = {}) => {
  try {
    const queryString = Object.entries(filters)
      .filter(([_, value]) => value !== undefined && value !== '')
      .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
      .join('&');
    
    const url = `${API_URL}/products${queryString ? `?${queryString}` : ''}`;
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error('Error fetching products:', error);
    return { products: [], productCount: 0 };
  }
};

// Add other API calls here as needed
export default {
  searchProducts,
};
