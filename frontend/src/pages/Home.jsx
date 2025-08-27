import { ArrowForward, LocalOffer, PlayArrow, Star, TrendingUp, ArrowBackIos, ArrowForwardIos } from '@mui/icons-material';
import { Box, Button, Chip, Container, Grid, keyframes, Link, Paper, styled, Typography, useMediaQuery, useTheme } from '@mui/material';
import React, { useState } from 'react'
import Slider from 'react-slick';
import Product from '../components/Product';
import Loader from '../components/Loader';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getProduct, removeError } from '../features/products/productSlice';
import { toast } from 'react-toastify';



const Home = () => {
    const { products, loading, error,productCount } = useSelector((state) => state.product);
    console.log("Products:", products);
    const dispatch=useDispatch();
    useEffect(() => {
        dispatch(getProduct());
    }, [dispatch]);

    useEffect(()=>{
        if(error){
            toast.error(error.message,{position:'top-center',autoClose:3000})
            dispatch(removeError());
        }
    },[error,dispatch])

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

    

    // Banner image and content (static)
    const banner = {
        image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1920&h=1080&fit=crop',
        title: 'New Collection 2024',
        subtitle: 'Discover the latest trends in fashion',
        description: 'Step into the future of style with our carefully curated collection',
        cta: 'Shop Now',
        badge: 'NEW',
        color: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        icon: <TrendingUp />
    };
    if (loading) return <Loader />;

    return (
        <div style={{ overflowX: 'hidden' }}>
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
                                            {banner.cta}
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
        </div>
    )
}

export default Home