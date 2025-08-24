import React from 'react';
import {
  Box,
  Container,
  Grid,
  Typography,
  Link,
  IconButton,
  Divider
} from '@mui/material';
import {
  Facebook,
  Twitter,
  Instagram,
  YouTube,
  Email,
  Phone
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';

const StyledFooter = styled(Box)(() => ({
  background: 'linear-gradient(135deg, #1e1e1e 0%, #292929 50%, #3b3b3b 100%)',
  color: 'white',
  marginTop: 'auto',
}));



const SocialIconButton = styled(IconButton)(() => ({
  color: 'white',
  backgroundColor: 'rgba(255,255,255,0.15)',
  margin: '0 4px',
  transition: 'all 0.3s ease',
  '&:hover': {
    backgroundColor: 'rgba(255,255,255,0.25)',
    transform: 'translateY(-2px)',
  },
}));

const Footer = () => {
  const shopLinks = [
    { name: "Men's T-Shirts", href: "/products?category=men" },
    { name: "Women's T-Shirts", href: "/products?category=women" },
    { name: "Unisex Collection", href: "/products?category=unisex" },
    { name: "Limited Edition", href: "/products?category=limited" },
  ];

  const supportLinks = [
    { name: "Contact Us", href: "/contact" },
    { name: "Size Guide", href: "/size-guide" },
    { name: "Shipping & Returns", href: "/returns" },
    { name: "FAQ", href: "/faq" },
  ];

  return (
    <StyledFooter component="footer">
      <Container maxWidth="lg" sx={{ py: 3 }}>
        <Grid container spacing={3}>
          {/* Brand Info */}
          <Grid item xs={12} md={4}>
            <Typography variant="h5" fontWeight={700} gutterBottom>
              Sika
            </Typography>
            <Typography variant="body2" sx={{ mb: 2, opacity: 0.9 }}>
              Premium T-Shirts crafted for comfort, style, and individuality.
            </Typography>

            {/* Contact Info */}
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <Email sx={{ mr: 1, fontSize: 16 }} />
              <Typography variant="body2" sx={{ opacity: 0.9 }}>
                support@sika.com
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Phone sx={{ mr: 1, fontSize: 16 }} />
              <Typography variant="body2" sx={{ opacity: 0.9 }}>
                +91 98765 43210
              </Typography>
            </Box>

            {/* Social Media */}
            <Box>
              <SocialIconButton href="#" aria-label="Facebook">
                <Facebook />
              </SocialIconButton>
              <SocialIconButton href="#" aria-label="Twitter">
                <Twitter />
              </SocialIconButton>
              <SocialIconButton href="#" aria-label="Instagram">
                <Instagram />
              </SocialIconButton>
              <SocialIconButton href="#" aria-label="YouTube">
                <YouTube />
              </SocialIconButton>
            </Box>
          </Grid>

          {/* Shop Links */}
          <Grid item xs={6} md={2}>
            <Typography variant="h6" gutterBottom fontWeight={600}>
              Shop
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              {shopLinks.map((link, index) => (
                <Link
                  key={index}
                  href={link.href}
                  color="inherit"
                  sx={{
                    mb: 0.5,
                    opacity: 0.8,
                    textDecoration: 'none',
                    fontSize: '0.875rem',
                    '&:hover': { opacity: 1, color: '#e74c3c' }
                  }}
                >
                  {link.name}
                </Link>
              ))}
            </Box>
          </Grid>

          {/* Support Links */}
          <Grid item xs={6} md={2}>
            <Typography variant="h6" gutterBottom fontWeight={600}>
              Support
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              {supportLinks.map((link, index) => (
                <Link
                  key={index}
                  href={link.href}
                  color="inherit"
                  sx={{
                    mb: 0.5,
                    opacity: 0.8,
                    textDecoration: 'none',
                    fontSize: '0.875rem',
                    '&:hover': { opacity: 1, color: '#e74c3c' }
                  }}
                >
                  {link.name}
                </Link>
              ))}
            </Box>
          </Grid>

          {/* Company Info */}
          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom fontWeight={600}>
              Company
            </Typography>
            <Grid container spacing={1}>
              <Grid item xs={6}>
                <Link href="/about" color="inherit" sx={{ display: 'block', mb: 0.5, opacity: 0.8, textDecoration: 'none', fontSize: '0.875rem', '&:hover': { opacity: 1, color: '#e74c3c' } }}>
                  About Us
                </Link>
                <Link href="/careers" color="inherit" sx={{ display: 'block', mb: 0.5, opacity: 0.8, textDecoration: 'none', fontSize: '0.875rem', '&:hover': { opacity: 1, color: '#e74c3c' } }}>
                  Careers
                </Link>
                <Link href="/privacy" color="inherit" sx={{ display: 'block', mb: 0.5, opacity: 0.8, textDecoration: 'none', fontSize: '0.875rem', '&:hover': { opacity: 1, color: '#e74c3c' } }}>
                  Privacy Policy
                </Link>
              </Grid>
              <Grid item xs={6}>
                <Link href="/terms" color="inherit" sx={{ display: 'block', mb: 0.5, opacity: 0.8, textDecoration: 'none', fontSize: '0.875rem', '&:hover': { opacity: 1, color: '#e74c3c' } }}>
                  Terms of Service
                </Link>
                <Link href="/sustainability" color="inherit" sx={{ display: 'block', mb: 0.5, opacity: 0.8, textDecoration: 'none', fontSize: '0.875rem', '&:hover': { opacity: 1, color: '#e74c3c' } }}>
                  Sustainability
                </Link>
                <Link href="/collaborations" color="inherit" sx={{ display: 'block', mb: 0.5, opacity: 0.8, textDecoration: 'none', fontSize: '0.875rem', '&:hover': { opacity: 1, color: '#e74c3c' } }}>
                  Collaborations
                </Link>
              </Grid>
            </Grid>
          </Grid>
        </Grid>

        <Divider sx={{ my: 2, bgcolor: 'rgba(255,255,255,0.2)' }} />

        {/* Bottom Section */}
        <Box sx={{ textAlign: 'center' }}>
          <Typography variant="body2" sx={{ opacity: 0.8 }}>
            © 2025 Sika. All rights reserved. Designed for T-shirt lovers.
          </Typography>
        </Box>
      </Container>
    </StyledFooter>
  );
};

export default Footer;
