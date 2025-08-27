import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { TextField, Button, Typography, Container, Box, Avatar, InputAdornment, IconButton } from '@mui/material';
import { Visibility, VisibilityOff, PersonAdd } from '@mui/icons-material';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser, clearError } from '../features/user/userSlice';

const SignUp = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, isAuthenticated } = useSelector((state) => state.user);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    avatar: null,
    avatarPreview: '/default-avatar.png'
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    if (e.target.name === 'avatar') {
      const reader = new FileReader();
      
      reader.onload = () => {
        if (reader.readyState === 2) { // 2 means DONE
          setFormData({ 
            ...formData, 
            [e.target.name]: e.target.files[0],
            avatarPreview: reader.result 
          });
        }
      };

      if (e.target.files[0]) {
        reader.readAsDataURL(e.target.files[0]);
      }
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        dispatch(clearError());
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [error, dispatch]);

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(registerUser(formData));
  };

  return (
    <Container component="main" maxWidth="xs" sx={{ minHeight: '60vh', display: 'flex', alignItems: 'center' }}>
      <Box
        sx={{
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          py: 2,
        }}
      >
        <Avatar sx={{ width: 40, height: 40, bgcolor: 'primary.main', mb: 1 }}>
          <PersonAdd fontSize="small" />
        </Avatar>
        <Typography component="h1" variant="h6" sx={{ mb: 1 }}>
          Create an Account
        </Typography>
        
        {error && (
          <Typography color="error" sx={{ mt: 2, textAlign: 'center' }}>
            {error}
          </Typography>
        )}

        <Box 
          component="form" 
          onSubmit={handleSubmit} 
          sx={{ mt: 3, width: '100%' }}
          encType="multipart/form-data"
        >
          <TextField
            margin="dense"
            size="small"
            required
            fullWidth
            id="name"
            label="Full Name"
            name="name"
            autoComplete="name"
            autoFocus
            value={formData.name}
            onChange={handleChange}
            sx={{ mb: 1 }}
          />
          
          <TextField
            margin="dense"
            size="small"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            sx={{ mb: 1 }}
          />
          
          <TextField
            margin="dense"
            size="small"
            required
            fullWidth
            name="password"
            label="Password"
            type={showPassword ? 'text' : 'password'}
            id="password"
            autoComplete="new-password"
            value={formData.password}
            onChange={handleChange}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    size="small"
                    aria-label="toggle password visibility"
                    onClick={() => setShowPassword(!showPassword)}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff fontSize="small" /> : <Visibility fontSize="small" />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            sx={{ mb: 1 }}
          />
          
          <Box sx={{ mt: 2, mb: 2 }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', my: 1 }}>
              <Avatar
                src={formData.avatarPreview}
                alt="Avatar Preview"
                sx={{
                  width: 80,
                  height: 80,
                  mb: 1,
                  border: '1px solid #e0e0e0',
                  '&:hover': {
                    opacity: 0.8,
                    cursor: 'pointer'
                  }
                }}
                onClick={() => document.getElementById('avatar-upload').click()}
              />
              <input
                accept="image/*"
                style={{ display: 'none' }}
                id="avatar-upload"
                type="file"
                name="avatar"
                onChange={handleChange}
              />
              <Button
                variant="outlined"
                component="span"
                size="small"
                startIcon={<PersonAdd />}
                sx={{ textTransform: 'none' }}
              >
                {formData.avatar ? 'Change Photo' : 'Upload Photo (Optional)'}
              </Button>
              {formData.avatar && (
                <Typography variant="caption" color="textSecondary" sx={{ mt: 1 }}>
                  {formData.avatar.name}
                </Typography>
              )}
            </Box>
          </Box>
          
          <Button
            type="submit"
            fullWidth
            variant="contained"
            size="small"
            sx={{ 
              mt: 2, 
              mb: 1, 
              py: 1,
              fontWeight: 600,
              fontSize: '0.9rem'
            }}
            disabled={loading}
          >
            {loading ? 'Signing Up...' : 'Create Account'}
          </Button>
          
          <Box sx={{ 
            textAlign: 'center', 
            mt: 1,
            mb: 2,
            width: '100%',
            py: 1.5,
            borderTop: '1px solid #e0e0e0',
            borderBottom: '1px solid #e0e0e0'
          }}>
            <Typography variant="body1" color="text.secondary">
              Already have an account?{' '}
              <Link 
                to="/login" 
                style={{ 
                  textDecoration: 'none', 
                  color: '#1976d2',
                  fontWeight: 600,
                  '&:hover': {
                    textDecoration: 'underline'
                  }
                }}
              >
                Login here
              </Link>
            </Typography>
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default SignUp;
