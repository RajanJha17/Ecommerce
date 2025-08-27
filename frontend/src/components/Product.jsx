
import React from 'react';
import { Card, CardMedia, CardContent, Typography, Button, CardActions, Box } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import { Link } from 'react-router-dom';


const Product = ({ product }) => {
  return (
    <Link to={`/product/${product._id}`} style={{ textDecoration: 'none' }}>
      <Card
        sx={{
          width: { xs: 160, sm: 200, md: 250, lg: 260 },
          maxWidth: '100%',
          borderRadius: 4,
          boxShadow: '0 4px 24px 0 rgba(102,126,234,0.10)',
          transition: 'transform 0.2s',
          '&:hover': {
            transform: 'translateY(-8px) scale(1.03)',
            boxShadow: '0 8px 32px 0 rgba(102,126,234,0.18)',
          },
          m: 2,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <CardMedia
          component="img"
          image={product.image[0].url}
          alt={product.name}
          sx={{
            height: 200,
            width: '100%',
            objectFit: 'cover',
            borderTopLeftRadius: 16,
            borderTopRightRadius: 16,
          }}
        />
        <CardContent sx={{ width: '100%', textAlign: 'center', flexGrow: 1 }}>
          <Typography gutterBottom variant="h6" component="div" sx={{ fontWeight: 700 }}>
            {product.name}
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 1 }}>
            <strong>Price:</strong> ₹{product.price}/-
          </Typography>
        </CardContent>
        <CardActions sx={{ flexDirection: 'column', alignItems: 'center', width: '100%', pb: 2, pt: 0 }}>
          {/* Star Rating */}
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
            {Array.from({ length: 5 }).map((_, i) =>
              i < Math.round(product.ratings || 0) ? (
                <StarIcon key={i} sx={{ color: '#FFD700', fontSize: 22 }} />
              ) : (
                <StarBorderIcon key={i} sx={{ color: '#FFD700', fontSize: 22 }} />
              )
            )}
          </Box>
          {/* Number of Reviews */}
          <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 600, mb: 1 }}>
            {product.numOfReviews || 0} review{(product.numOfReviews || 0) === 1 ? '' : 's'}
          </Typography>
          <Button
            variant="contained"
            color="primary"
            sx={{
              borderRadius: 25,
              px: 3,
              fontWeight: 600,
              background: 'linear-gradient(90deg, #667eea 0%, #764ba2 100%)',
              boxShadow: '0 2px 8px 0 rgba(102,126,234,0.10)',
              textTransform: 'none',
              '&:hover': {
                background: 'linear-gradient(90deg, #764ba2 0%, #667eea 100%)',
              },
            }}
          >
            View Details
          </Button>
        </CardActions>
      </Card>
    </Link>
  );
};

export default Product;