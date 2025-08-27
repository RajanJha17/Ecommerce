import { ArrowForward, LocalOffer, Star, TrendingUp, ArrowBackIos, ArrowForwardIos, FlashOn, Whatshot, Category, Timer, LocalShipping, Security, SupportAgent, Replay, CheckCircle, PlayArrow } from '@mui/icons-material';

// Helper function to generate random gradients
const getRandomGradient = () => {
    const gradients = [
        '#667eea, #764ba2',
        '#ff9a9e, #fad0c4',
        '#a1c4fd, #c2e9fb',
        '#ffc3a0, #ffafbd',
        '#84fab0, #8fd3f4',
        '#a6c1ee, #fbc2eb'
    ];
    return gradients[Math.floor(Math.random() * gradients.length)];
};
import { Box, Button, Card, CardContent, Chip, Container, Divider, Grid, IconButton, keyframes, Link, Paper, Rating, Stack, styled, Typography, useMediaQuery, useTheme } from '@mui/material';
import Product from '../components/Product';
import React, { useState, useRef } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Loader from '../components/Loader';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getProduct, removeError } from '../features/products/productSlice';
import { toast } from 'react-toastify';
import { Link as RouterLink } from 'react-router-dom';



// Clothing categories
const categories = [
    { id: 1, name: 'New Arrivals', icon: '🆕', count: 45 },
    { id: 2, name: 'Men', icon: '👔', count: 128 },
    { id: 3, name: 'Women', icon: '👗', count: 156 },
    { id: 4, name: 'Accessories', icon: '🕶️', count: 89 },
    { id: 5, name: 'Sale', icon: '🏷️', count: 67 },
];

// Featured clothing products
const featuredProducts = [
    { 
        id: 1, 
        name: 'Classic White Shirt', 
        price: 49.99, 
        originalPrice: 69.99,
        rating: 4.7, 
        image: 'https://images.unsplash.com/photo-1598033129183-c4f50c736f10?w=500&h=600&fit=crop&crop=faces',
        colors: ['white', 'blue', 'black']
    },
    { 
        id: 2, 
        name: 'Slim Fit Jeans', 
        price: 79.99, 
        originalPrice: 99.99,
        rating: 4.5, 
        image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=500&h=600&fit=crop&crop=faces',
        colors: ['blue', 'black']
    },
    { 
        id: 3, 
        name: 'Summer Dress', 
        price: 59.99, 
        originalPrice: 79.99,
        rating: 4.8, 
        image: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=500&h=600&fit=crop&crop=faces',
        colors: ['yellow', 'pink', 'white']
    },
    { 
        id: 4, 
        name: 'Leather Jacket', 
        price: 199.99, 
        rating: 4.9, 
        image: 'https://images.unsplash.com/photo-1551028719-00167d1e1b1b?w=500&h=600&fit=crop&crop=faces',
        colors: ['black', 'brown']
    },
];

const Home = () => {
    const { products, loading, error } = useSelector((state) => state.product);
    const sliderRef = useRef(null);
    const dispatch = useDispatch();
    
    useEffect(() => {
        dispatch(getProduct());
    }, [dispatch]);

    useEffect(() => {
        if (error) {
            toast.error(error.message, { position: 'top-center', autoClose: 3000 });
            dispatch(removeError());
        }
    }, [error, dispatch]);

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 1024,
                settings: { slidesToShow: 3, slidesToScroll: 1 }
            },
            {
                breakpoint: 768,
                settings: { slidesToShow: 2, slidesToScroll: 1 }
            },
            {
                breakpoint: 480,
                settings: { slidesToShow: 1, slidesToScroll: 1 }
            },
        ],
    };

    const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    const [currentSlide, setCurrentSlide] = useState(0);

    const float = keyframes`
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-10px);
  }
`;

    const pulse = keyframes`
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
  100% {
    transform: scale(1);
  }
`;

    const HeroBanner = styled(Box)(({ theme }) => ({
        position: 'relative',
        width: '100%',
        height: '100vh',
        minHeight: '600px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        [theme.breakpoints.down('md')]: {
            height: '70vh',
            minHeight: '500px',
            padding: '0',
        },
    }));


    const HeroContent = styled(Box)(({ theme }) => ({
        position: 'relative',
        zIndex: 2,
        color: 'white',
        maxWidth: '600px',
        animation: `${fadeInUp} 1s ease-out`,
        [theme.breakpoints.down('md')]: {
            textAlign: 'center',
            maxWidth: '100%',
        },
    }));

    const FloatingElement = styled(Box)(({ theme }) => ({
        position: 'absolute',
        animation: `${float} 3s ease-in-out infinite`,
        opacity: 0.1,
        [theme.breakpoints.down('md')]: {
            display: 'none',
        },
    }));
    // Custom Arrow Components
    // Custom Arrow Components for Slick (these will be rendered by Slick inside the banner)
    const ArrowLeft = (props) => (
        <button
            {...props}
            style={{
                ...props.style,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'absolute',
                left: 20,
                top: '50%',
                transform: 'translateY(-50%)',
                zIndex: 12,
                width: 48,
                height: 48,
                background: 'rgba(255,255,255,0.3)',
                border: 'none',
                borderRadius: '50%',
                cursor: 'pointer',
                boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
            }}
            aria-label="Previous slide"
        >
            <ArrowBackIos style={{ color: '#333', fontSize: 24 }} />
        </button>
    );

    const ArrowRight = (props) => (
        <button
            {...props}
            style={{
                ...props.style,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'absolute',
                right: 20,
                top: '50%',
                transform: 'translateY(-50%)',
                zIndex: 12,
                width: 48,
                height: 48,
                background: 'rgba(255,255,255,0.3)',
                border: 'none',
                borderRadius: '50%',
                cursor: 'pointer',
                boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
            }}
            aria-label="Next slide"
        >
            <ArrowForwardIos style={{ color: '#333', fontSize: 24 }} />
        </button>
    );

    const heroSliderSettings = {
        dots: true,
        infinite: true,
        speed: 800,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 5000,
        fade: true,
        cssEase: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        beforeChange: (current, next) => setCurrentSlide(next),
        customPaging: (i) => (
            <Box
                sx={{
                    width: 12,
                    height: 12,
                    borderRadius: '50%',
                    backgroundColor: i === currentSlide ? '#667eea' : 'rgba(255,255,255,0.5)',
                    transition: 'all 0.3s ease',
                    cursor: 'pointer',
                    '&:hover': {
                        backgroundColor: '#667eea',
                        transform: 'scale(1.2)',
                    }
                }}
            />
        ),
        dotsClass: 'slick-dots custom-dots',
        arrows: false,
    };

    const AnimatedButton = styled(Button)(({ theme }) => ({
        background: 'linear-gradient(45deg, #667eea 30%, #764ba2 90%)',
        border: 0,
        borderRadius: 25,
        boxShadow: '0 3px 15px 2px rgba(102, 126, 234, .3)',
        color: 'white',
        height: 48,
        padding: '0 30px',
        fontSize: '1.1rem',
        fontWeight: 600,
        transition: 'all 0.3s ease',
        '&:hover': {
            background: 'linear-gradient(45deg, #764ba2 30%, #667eea 90%)',
            transform: 'translateY(-2px)',
            boxShadow: '0 6px 20px 4px rgba(102, 126, 234, .4)',
        },
    }));

    const CategoryName = styled(Typography)(({ theme }) => ({
        fontWeight: 700,
        fontSize: '1.1rem',
        marginBottom: theme.spacing(1.5),
        color: theme.palette.text.primary,
        letterSpacing: 0.5,
    }));

    const CategoryCard = styled(Card)(({ theme }) => ({
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: theme.spacing(3),
        textAlign: 'center',
        textDecoration: 'none',
        transition: 'all 0.3s ease-in-out',
        borderRadius: theme.shape.borderRadius * 2,
        border: `1px solid ${theme.palette.divider}`,
        '&:hover': {
            transform: 'translateY(-4px)',
            boxShadow: theme.shadows[8],
            borderColor: 'transparent',
        },
    }));

    const IconContainer = styled(Box)(({ theme }) => ({
        width: 90,
        height: 90,
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: theme.spacing(3),
        fontSize: '2.8rem',
        color: theme.palette.primary.contrastText,
        background: `linear-gradient(45deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
        transition: 'all 0.3s ease-in-out',
        '&:hover': {
            transform: 'scale(1.1) rotate(5deg)',
        },
    }));

    const banner = {
        image: 'https://images.unsplash.com/photo-1485462537746-965f33f7f6a7?w=1920&h=1080&fit=crop',
        title: 'Summer Collection 2024',
        subtitle: 'Discover the latest in fashion',
        description: 'Step into summer with our exclusive collection of premium clothing and accessories',
        cta: 'Shop Now',
        badge: 'NEW',
        color: 'linear-gradient(135deg, #ff6b6b 0%, #ff8e8e 100%)',
        icon: <TrendingUp />
    };
    if (loading) return <Loader />;

    const SectionHeader = ({ title, subtitle, linkText, linkTo = '#' }) => (
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
            <Box>
                <Typography variant="h4" component="h2" sx={{ fontWeight: 700, color: 'text.primary' }}>
                    {title}
                </Typography>
                {subtitle && (
                    <Typography variant="subtitle1" color="text.secondary">
                        {subtitle}
                    </Typography>
                )}
            </Box>
            <Button
                component={RouterLink}
                to={linkTo}
                endIcon={<ArrowForward />}
                sx={{ textTransform: 'none', color: 'primary.main' }}
            >
                {linkText}
            </Button>
        </Box>
    );

    const FeatureCard = ({ icon, title, description }) => (
        <Box sx={{ textAlign: 'center', p: 3 }}>
            <Box sx={{ 
                width: 80, 
                height: 80, 
                borderRadius: '50%', 
                bgcolor: 'primary.light', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                mx: 'auto',
                mb: 2
            }}>
                {icon}
            </Box>
            <Typography variant="h6" sx={{ mb: 1, fontWeight: 600 }}>{title}</Typography>
            <Typography variant="body2" color="text.secondary">{description}</Typography>
        </Box>
    );

    return (
        <Box sx={{ overflowX: 'hidden' }}>
            {/* Hero Section */}
            <Box sx={{ mb: 8, position: 'relative', overflowX: 'hidden' }}>
                <HeroBanner>
                    {/* Background Image */}
                    <Box
                        sx={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            backgroundImage: `url(${banner.image})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            backgroundAttachment: isMobile ? 'scroll' : 'fixed',
                            transition: 'transform 8s ease-out',
                        }}
                    />
                    {/* Gradient Overlay */}
                    <Box
                        sx={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            background: `linear-gradient(135deg, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 50%, rgba(0,0,0,0.5) 100%)`,
                            zIndex: 1,
                        }}
                    />
                    {/* Floating Elements */}
                    <FloatingElement
                        sx={{
                            top: '20%',
                            right: '10%',
                            fontSize: '120px',
                            animationDelay: '0s',
                        }}
                    >
                        {banner.icon}
                    </FloatingElement>
                    <FloatingElement
                        sx={{
                            bottom: '30%',
                            left: '5%',
                            fontSize: '80px',
                            animationDelay: '1s',
                        }}
                    >
                        ✨
                    </FloatingElement>
                    <FloatingElement
                        sx={{
                            top: '40%',
                            right: '20%',
                            fontSize: '60px',
                            animationDelay: '2s',
                        }}
                    >
                        💎
                    </FloatingElement>
                    {/* Content Container */}
                    <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2, height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', py: { xs: 4, md: 0 } }}>
                        <Grid container spacing={4} alignItems="center" justifyContent="center" sx={{ height: '100%' }}>
                            <Grid item xs={12} md={7} sx={{ display: 'flex', alignItems: 'center', height: { xs: 'auto', md: '100%' }, justifyContent: { xs: 'center', md: 'flex-start' } }}>
                                <HeroContent sx={{ width: '100%' }}>
                                    {/* Badge */}
                                    <Chip
                                        label={banner.badge}
                                        sx={{
                                            background: banner.color,
                                            color: 'white',
                                            fontWeight: 'bold',
                                            mb: 2,
                                            fontSize: '0.9rem',
                                            animation: `${pulse} 2s infinite`,
                                        }}
                                    />
                                    {/* Main Title */}
                                    <Typography
                                        variant={isMobile ? 'h3' : 'h1'}
                                        sx={{
                                            fontWeight: 800,
                                            mb: 2,
                                            background: 'linear-gradient(45deg, #fff 30%, #f0f0f0 90%)',
                                            WebkitBackgroundClip: 'text',
                                            WebkitTextFillColor: 'transparent',
                                            textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
                                            lineHeight: 1.2,
                                        }}
                                    >
                                        {banner.title}
                                    </Typography>
                                    {/* Subtitle */}
                                    <Typography
                                        variant={isMobile ? 'h6' : 'h4'}
                                        sx={{
                                            mb: 2,
                                            fontWeight: 300,
                                            opacity: 0.95,
                                            textShadow: '1px 1px 2px rgba(0,0,0,0.5)',
                                        }}
                                    >
                                        {banner.subtitle}
                                    </Typography>
                                    {/* Description */}
                                    <Typography
                                        variant="h6"
                                        sx={{
                                            mb: 4,
                                            opacity: 0.8,
                                            fontWeight: 300,
                                            maxWidth: '500px',
                                            display: { xs: 'none', md: 'block' }
                                        }}
                                    >
                                        {banner.description}
                                    </Typography>
                                    {/* CTA Buttons */}
                                    <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', justifyContent: { xs: 'center', md: 'flex-start' } }}>
                                        <AnimatedButton
                                            component={Link}
                                            to="/products"
                                            size="large"
                                            endIcon={<ArrowForward />}
                                        >
                                            <Link to="/product">
                                            {banner.cta}
                                            </Link>
                                        </AnimatedButton>
                                        <Button
                                            variant="outlined"
                                            size="large"
                                            startIcon={<PlayArrow />}
                                            sx={{
                                                borderColor: 'rgba(255,255,255,0.5)',
                                                color: 'white',
                                                borderRadius: 25,
                                                backdropFilter: 'blur(10px)',
                                                backgroundColor: 'rgba(255,255,255,0.1)',
                                                '&:hover': {
                                                    borderColor: 'white',
                                                    backgroundColor: 'rgba(255,255,255,0.2)',
                                                    transform: 'translateY(-2px)',
                                                }
                                            }}
                                        >
                                            Watch Video
                                        </Button>
                                    </Box>
                                </HeroContent>
                            </Grid>
                            {/* Stats Section */}
                            <Grid item xs={12} md={5} sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', height: '100%' }}>
                                <Box sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: 2,
                                    alignItems: 'flex-end',
                                    justifyContent: 'center',
                                    height: '100%'
                                }}>
                                    <Paper
                                        sx={{
                                            p: 2,
                                            backgroundColor: 'rgba(255,255,255,0.1)',
                                            backdropFilter: 'blur(10px)',
                                            border: '1px solid rgba(255,255,255,0.2)',
                                            borderRadius: 2,
                                            color: 'white',
                                            minWidth: 200,
                                            animation: `${fadeInUp} 1s ease-out 0.5s both`,
                                        }}
                                    >
                                        <Typography variant="h4" fontWeight="bold">10K+</Typography>
                                        <Typography variant="body2" sx={{ opacity: 0.8 }}>Happy Customers</Typography>
                                    </Paper>
                                    <Paper
                                        sx={{
                                            p: 2,
                                            backgroundColor: 'rgba(255,255,255,0.1)',
                                            backdropFilter: 'blur(10px)',
                                            border: '1px solid rgba(255,255,255,0.2)',
                                            borderRadius: 2,
                                            color: 'white',
                                            minWidth: 200,
                                            animation: `${fadeInUp} 1s ease-out 0.7s both`,
                                        }}
                                    >
                                        <Typography variant="h4" fontWeight="bold">500+</Typography>
                                        <Typography variant="body2" sx={{ opacity: 0.8 }}>Premium Products</Typography>
                                    </Paper>
                                    <Paper
                                        sx={{
                                            p: 2,
                                            backgroundColor: 'rgba(255,255,255,0.1)',
                                            backdropFilter: 'blur(10px)',
                                            border: '1px solid rgba(255,255,255,0.2)',
                                            borderRadius: 2,
                                            color: 'white',
                                            minWidth: 200,
                                            animation: `${fadeInUp} 1s ease-out 0.9s both`,
                                        }}
                                    >
                                        <Typography variant="h4" fontWeight="bold">4.9★</Typography>
                                        <Typography variant="body2" sx={{ opacity: 0.8 }}>Customer Rating</Typography>
                                    </Paper>
                                </Box>
                            </Grid>
                        </Grid>
                    </Container>
                </HeroBanner>
            </Box>
            <Box
                sx={{
                    mt: { xs: 4, md: 8 },
                    mb: { xs: 4, md: 8 },
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 2,
                }}
            >
                <TrendingUp sx={{ fontSize: 36, color: '#764ba2', mr: 2, filter: 'drop-shadow(0 2px 8px #764ba2)' }} />
                <Typography
                    variant="h2"
                    sx={{
                        fontWeight: 900,
                        letterSpacing: 2,
                        background: 'linear-gradient(90deg, #667eea 0%, #764ba2 100%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        textShadow: '2px 2px 8px rgba(102,126,234,0.18)',
                        fontSize: { xs: '2rem', md: '3rem' },
                        textTransform: 'uppercase',
                    }}
                >
                    Trending Now
                </Typography>
            </Box>
            <Box
                sx={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    justifyContent: 'center',
                    gap: 4,
                    px: { xs: 1, md: 4 },
                    mb: 8,
                }}
            >
                {products && products.map((item) => (
                    <Product key={item._id} product={item} />
                ))}
            </Box>

            {/* Features Section */}
            <Box sx={{ py: 10, bgcolor: 'background.paper' }}>
                <Container maxWidth="lg">
                    <SectionHeader 
                        title="Why Choose Us" 
                        subtitle="We provide the best shopping experience" 
                        linkText=""
                        linkTo=""
                    />
                    <Grid container spacing={4} justifyContent="center">
                        <Grid item xs={12} sm={6} md={4} sx={{ display: 'flex', justifyContent: 'center' }}>
                            <Box sx={{ maxWidth: 360, width: '100%' }}>
                                <FeatureCard 
                                    icon={<LocalShipping sx={{ fontSize: 48, color: 'primary.main' }} />}
                                    title="Free Shipping"
                                    description="Free delivery on all orders over $50"
                                />
                            </Box>
                        </Grid>
                        <Grid item xs={12} sm={6} md={4} sx={{ display: 'flex', justifyContent: 'center' }}>
                            <Box sx={{ maxWidth: 360, width: '100%' }}>
                                <FeatureCard 
                                    icon={<Security sx={{ fontSize: 48, color: 'primary.main' }} />}
                                    title="Secure Payment"
                                    description="100% secure payment processing"
                                />
                            </Box>
                        </Grid>
                        <Grid item xs={12} sm={6} md={4} sx={{ display: 'flex', justifyContent: 'center' }}>
                            <Box sx={{ maxWidth: 360, width: '100%' }}>
                                <FeatureCard 
                                    icon={<SupportAgent sx={{ fontSize: 48, color: 'primary.main' }} />}
                                    title="24/7 Support"
                                    description="Dedicated customer support team"
                                />
                            </Box>
                        </Grid>
                    </Grid>
                </Container>
            </Box>

           

            {/* Featured Products */}
            <Box sx={{ py: 8, bgcolor: 'background.default' }}>
                <Container maxWidth="lg">
                    <SectionHeader 
                        title="Featured Products" 
                        subtitle="Handpicked for you" 
                        linkText="View All"
                        linkTo="/products"
                    />
                    <Slider ref={sliderRef} {...settings}>
                        {featuredProducts.map((product) => (
                            <Box key={product.id} sx={{ px: 1 }}>
                                <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', p: 2, borderRadius: 2 }}>
                                    <Box sx={{ 
                                        height: 200, 
                                        display: 'flex', 
                                        alignItems: 'center', 
                                        justifyContent: 'center',
                                        mb: 2
                                    }}>
                                        <img 
                                            src={product.image} 
                                            alt={product.name} 
                                            style={{ 
                                                width: '100%',
                                                height: '100%',
                                                objectFit: 'cover',
                                                transition: 'transform 0.3s ease',
                                                '&:hover': {
                                                    transform: 'scale(1.05)'
                                                }
                                            }} 
                                        />
                                    </Box>
                                    <Box sx={{ mt: 'auto' }}>
                                        <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 0.5 }}>
                                            {product.name}
                                        </Typography>
                                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                                            <Rating value={product.rating} precision={0.5} readOnly size="small" />
                                            <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
                                                ({product.rating})
                                            </Typography>
                                        </Box>
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                            <Typography variant="h6" color="error" sx={{ fontWeight: 700 }}>
                                                ${product.price.toFixed(2)}
                                            </Typography>
                                            {product.originalPrice && (
                                                <Typography variant="body2" color="text.secondary" sx={{ textDecoration: 'line-through' }}>
                                                    ${product.originalPrice.toFixed(2)}
                                                </Typography>
                                            )}
                                        </Box>
                                        <Box sx={{ display: 'flex', gap: 1, mt: 1 }}>
                                            {product.colors && product.colors.map((color, index) => (
                                                <Box 
                                                    key={index}
                                                    sx={{
                                                        width: 20,
                                                        height: 20,
                                                        borderRadius: '50%',
                                                        backgroundColor: color,
                                                        border: '1px solid #e0e0e0',
                                                        cursor: 'pointer',
                                                        '&:hover': {
                                                            transform: 'scale(1.1)'
                                                        }
                                                    }}
                                                />
                                            ))}
                                        </Box>
                                    </Box>
                                </Card>
                            </Box>
                        ))}
                    </Slider>
                </Container>
            </Box>

            {/* Call to Action */}
            <Box sx={{ py: 12, bgcolor: 'primary.main', color: 'white', textAlign: 'center' }}>
                <Container maxWidth="md">
                    <Typography variant="h3" component="h2" sx={{ mb: 3, fontWeight: 700 }}>
                        Ready to Experience the Best?
                    </Typography>
                    <Typography variant="h6" sx={{ mb: 4, opacity: 0.9, maxWidth: 700, mx: 'auto' }}>
                        Join thousands of satisfied customers who trust us for quality products and exceptional service.
                    </Typography>
                    <Button 
                        variant="contained" 
                        color="secondary" 
                        size="large"
                        component={RouterLink}
                        to="/products"
                        sx={{
                            px: 6,
                            py: 1.5,
                            borderRadius: 2,
                            textTransform: 'none',
                            fontSize: '1.1rem',
                            fontWeight: 600,
                            '&:hover': {
                                transform: 'translateY(-2px)',
                                boxShadow: 3,
                            }
                        }}
                    >
                        Shop Now
                    </Button>
                </Container>
            </Box>
        </Box>
    )
}

export default Home