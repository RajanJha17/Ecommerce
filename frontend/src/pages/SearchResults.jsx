import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Search as SearchIcon } from '@mui/icons-material';
import { Box, Typography, CircularProgress, TextField, Button } from '@mui/material';
import ProductCard from '../components/ProductCard';
import { searchProducts } from '../services/api';

const SearchResults = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const query = searchParams.get('q');
    
    const fetchSearchResults = async () => {
      try {
        setLoading(true);
        const results = await searchProducts(query);
        setProducts(results);
      } catch (error) {
        console.error('Error fetching search results:', error);
      } finally {
        setLoading(false);
      }
    };

    if (query) {
      fetchSearchResults();
    } else {
      navigate('/');
    }
  }, [location.search, navigate]);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '50vh' }}>
        <CircularProgress />
        <Typography variant="body1" sx={{ ml: 2 }}>Searching for products...</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ maxWidth: '1200px', margin: '0 auto', p: 3 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Search Results
        </Typography>
        <Typography variant="body1" color="text.secondary" gutterBottom>
          {products.length > 0 
            ? `Found ${products.length} ${products.length === 1 ? 'product' : 'products'}`
            : 'No products found matching your search.'}
        </Typography>
      </Box>

      {products.length > 0 ? (
        <Box sx={{
          display: 'grid',
          gridTemplateColumns: {
            xs: '1fr',
            sm: 'repeat(2, 1fr)',
            md: 'repeat(3, 1fr)',
            lg: 'repeat(4, 1fr)'
          },
          gap: 3,
          py: 2
        }}>
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </Box>
      ) : (
        <Box sx={{ 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '50vh',
          textAlign: 'center',
          p: 3
        }}>
          <SearchIcon sx={{ fontSize: 64, color: 'text.secondary', mb: 2 }} />
          <Typography variant="h6" color="text.secondary" gutterBottom>
            No products found
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ maxWidth: '500px', mb: 3 }}>
            We couldn't find any products matching your search. Try different keywords or check out our full catalog.
          </Typography>
          <Button 
            variant="contained" 
            color="primary"
            onClick={() => navigate('/product')}
            sx={{ mt: 2 }}
          >
            Browse All Products
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default SearchResults;
