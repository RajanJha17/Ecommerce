import React from 'react';
import { Link } from 'react-router-dom';
import { Star, StarHalf, StarBorder } from '@mui/icons-material';
import { Button } from '@mui/material';

const ProductCard = ({ product }) => {
  // Calculate average rating
  const averageRating = product.ratings || 0;
  const fullStars = Math.floor(averageRating);
  const hasHalfStar = averageRating % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  // Format price
  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(price);
  };

  return (
    <div style={{
      border: '1px solid #e2e8f0',
      borderRadius: '12px',
      overflow: 'hidden',
      transition: 'all 0.3s ease',
      '&:hover': {
        transform: 'translateY(-5px)',
        boxShadow: '0 10px 20px rgba(0, 0, 0, 0.1)'
      },
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      backgroundColor: '#fff'
    }}>
      {/* Product Image */}
      <Link to={`/product/${product._id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
        <div style={{ 
          position: 'relative', 
          paddingTop: '100%', 
          overflow: 'hidden',
          backgroundColor: '#f8f9fa'
        }}>
          <img
            src={product.images?.[0] || '/placeholder-product.jpg'}
            alt={product.name}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              objectFit: 'contain',
              padding: '1rem',
              transition: 'transform 0.3s ease',
              '&:hover': {
                transform: 'scale(1.05)'
              }
            }}
          />
        </div>
      </Link>

      {/* Product Info */}
      <div style={{ 
        padding: '1.25rem', 
        flexGrow: 1, 
        display: 'flex', 
        flexDirection: 'column' 
      }}>
        {/* Product Name */}
        <h3 style={{
          margin: '0 0 0.75rem',
          fontSize: '1rem',
          fontWeight: 600,
          lineHeight: '1.4',
          minHeight: '2.8rem',
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          color: '#2d3748'
        }}>
          {product.name}
        </h3>

        {/* Rating */}
        <div style={{ 
          display: 'flex', 
          alignItems: 'center',
          marginBottom: '0.75rem'
        }}>
          <div style={{ display: 'flex', marginRight: '0.5rem' }}>
            {[...Array(fullStars)].map((_, i) => (
              <Star key={`full-${i}`} sx={{ color: '#f59e0b', fontSize: '1rem' }} />
            ))}
            {hasHalfStar && <StarHalf sx={{ color: '#f59e0b', fontSize: '1rem' }} />}
            {[...Array(emptyStars)].map((_, i) => (
              <StarBorder key={`empty-${i}`} sx={{ color: '#d1d5db', fontSize: '1rem' }} />
            ))}
          </div>
          <span style={{ 
            fontSize: '0.8rem', 
            color: '#6b7280',
            marginLeft: '0.25rem'
          }}>
            ({product.numOfReviews || 0} reviews)
          </span>
        </div>

        {/* Price */}
        <div style={{ marginTop: 'auto' }}>
          <div style={{ 
            display: 'flex', 
            alignItems: 'center',
            marginBottom: '1rem'
          }}>
            <span style={{
              fontSize: '1.25rem',
              fontWeight: 700,
              color: '#1f2937'
            }}>
              {formatPrice(product.price)}
            </span>
            {product.originalPrice && (
              <span style={{
                fontSize: '0.875rem',
                color: '#9ca3af',
                textDecoration: 'line-through',
                marginLeft: '0.5rem'
              }}>
                {formatPrice(product.originalPrice)}
              </span>
            )}
            {product.originalPrice && (
              <span style={{
                fontSize: '0.75rem',
                fontWeight: 600,
                color: '#dc2626',
                backgroundColor: '#fee2e2',
                borderRadius: '4px',
                padding: '0.2rem 0.4rem',
                marginLeft: '0.5rem'
              }}>
                {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
              </span>
            )}
          </div>

          {/* View Details Button */}
          <Button
            component={Link}
            to={`/product/${product._id}`}
            variant="contained"
            fullWidth
            sx={{
              backgroundColor: '#f59e0b',
              color: 'white',
              textTransform: 'none',
              fontWeight: 600,
              padding: '0.5rem',
              borderRadius: '6px',
              '&:hover': {
                backgroundColor: '#d97706',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
              }
            }}
          >
            View Details
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
