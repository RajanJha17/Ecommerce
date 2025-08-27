import React from 'react';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import { Box, Typography } from '@mui/material';

const RatingStars = ({ value = 0, numReviews = 0, onRate, size = 22, showNumReviews = true, interactive = false }) => {
  // value: rating value (0-5)
  // numReviews: number of reviews
  // onRate: function(index) => void, called when a star is clicked (if interactive)
  // size: star icon size
  // showNumReviews: whether to show the number of reviews
  // interactive: if true, stars are clickable for rating

  const handleClick = (index) => {
    if (interactive && onRate) {
      onRate(index + 1);
    }
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', cursor: interactive ? 'pointer' : 'default' }}>
        {Array.from({ length: 5 }).map((_, i) =>
          i < Math.round(value) ? (
            <StarIcon
              key={i}
              sx={{ color: '#FFD700', fontSize: size, transition: 'color 0.2s' }}
              onClick={() => handleClick(i)}
            />
          ) : (
            <StarBorderIcon
              key={i}
              sx={{ color: '#FFD700', fontSize: size, transition: 'color 0.2s' }}
              onClick={() => handleClick(i)}
            />
          )
        )}
      </Box>
      {showNumReviews && (
        <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 600, mt: 0.5 }}>
          {numReviews} review{numReviews === 1 ? '' : 's'}
        </Typography>
      )}
    </Box>
  );
};

export default RatingStars;
