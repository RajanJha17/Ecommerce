import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProduct } from '../features/products/productSlice';
import Loader from '../components/Loader';

const categories = ['Shirt', 'Pants', 'Shoes'];
const colors = ['Black', 'White', 'Navy', 'Gray'];
const sizes = ['S', 'M', 'L', 'XL'];

const Product = () => {
  const dispatch = useDispatch();
  const { products, loading, error, productCount } = useSelector((state) => state.product);
  
  // Filter state
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedSize, setSelectedSize] = useState('');
  const [priceRange, setPriceRange] = useState([0, 20000]);
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 8;

  // Test API connection on component mount
  // useEffect(() => {
  //   const testApiConnection = async () => {
  //     try {
  //       console.log('Testing API connection...');
  //       const response = await fetch('http://localhost:8000/api/v1/products?limit=1');
  //       const data = await response.json();
  //       console.log('API Test Response:', data);
  //     } catch (error) {
  //       console.error('API Connection Error:', error);
  //     }
  //   };
    
  //   testApiConnection();
  // }, []);

  // Fetch products on component mount and when filters change
  useEffect(() => {
    let isMounted = true;
    
    const fetchProducts = async () => {
      if (isMounted) {
        dispatch({ type: 'product/getProduct/pending' });
      }
      
      const params = [];
      
      // Add filters to query params if they are selected
      if (selectedCategory) params.push(`category=${encodeURIComponent(selectedCategory.toLowerCase())}`);
      if (selectedColor) params.push(`colors=${encodeURIComponent(selectedColor)}`);
      if (selectedSize) params.push(`sizes.size=${encodeURIComponent(selectedSize)}`);
      
      // Add price range
      params.push(`minPrice=${priceRange[0]}`);
      params.push(`maxPrice=${priceRange[1]}`);
      
      // Add pagination
      const pageSize = 8;
      params.push(`page=${currentPage}`);
      params.push(`limit=${pageSize}`);
      
      // Build the URL
      const queryString = params.join('&');
      const apiUrl = `https://ecommerce-jiot.onrender.com/api/v1/products?${queryString}`;
      
      try {
        const response = await fetch(apiUrl, {
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }
        });
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        if (isMounted) {
          dispatch({ type: 'product/getProduct/fulfilled', payload: data });
        }
      } catch (error) {
        console.error('Error fetching products:', error);
        if (isMounted) {
          dispatch({ type: 'product/getProduct/rejected', payload: error.message });
        }
      }
    };
    
    fetchProducts();
    
    return () => {
      isMounted = false;
    };
  }, [dispatch, selectedCategory, selectedColor, selectedSize, priceRange, currentPage]);

  // Calculate total pages - ensure we have a minimum of 1 page
  const totalPages = Math.max(1, Math.ceil(productCount / productsPerPage));

  // Handlers
  const handleReset = () => {
    setSelectedCategory('');
    setSelectedColor('');
    setSelectedSize('');
    setPriceRange([0, 20000]);
    setCurrentPage(1);
    
    // Trigger a refresh with default filters
    const queryParams = new URLSearchParams();
    queryParams.append('price[gte]', 0);
    queryParams.append('price[lte]', 20000);
    queryParams.append('page', 1);
    queryParams.append('limit', 8);
    
    dispatch(getProduct(`?${queryParams.toString()}`));
  };

  if (loading && products.length === 0) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
        <Loader />
      </div>
    );
  }
  
  if (error) return <div className="text-center py-10">Error: {error.message || 'Failed to load products'}</div>;

  return (
    <div style={{ display: 'flex', minHeight: '80vh', padding: 24 }}>
      {/* Sidebar Filters */}
      <aside style={{ width: 240, marginRight: 32, background: '#f8fafc', borderRadius: 8, padding: 20, boxShadow: '0 1px 4px #e5e7eb' }}>
        <h3 style={{ fontSize: 20, fontWeight: 700, marginBottom: 18 }}>Filters</h3>
        <div style={{ marginBottom: 18 }}>
          <div style={{ fontWeight: 600, marginBottom: 6 }}>Category</div>
          {categories.map(cat => (
            <label key={cat} style={{ display: 'block', marginBottom: 4 }}>
              <input
                type="radio"
                name="category"
                checked={selectedCategory === cat}
                onChange={() => { setSelectedCategory(cat); setCurrentPage(1);
                  ; }}
              /> {cat}
            </label>
          ))}
        </div>
        <div style={{ marginBottom: 18 }}>
          <div style={{ fontWeight: 600, marginBottom: 6 }}>Color</div>
          {colors.map(color => (
            <label key={color} style={{ display: 'inline-block', marginRight: 10 }}>
              <input
                type="radio"
                name="color"
                checked={selectedColor === color}
                onChange={() => { setSelectedColor(color); setCurrentPage(1);
                  ; }}
              /> {color}
            </label>
          ))}
        </div>
        <div style={{ marginBottom: 18 }}>
          <div style={{ fontWeight: 600, marginBottom: 6 }}>Size</div>
          {sizes.map(size => (
            <label key={size} style={{ display: 'inline-block', marginRight: 10 }}>
              <input
                type="radio"
                name="size"
                checked={selectedSize === size}
                onChange={() => { setSelectedSize(size); setCurrentPage(1);
                  ; }}
              /> {size}
            </label>
          ))}
        </div>
        <div style={{ marginBottom: 18 }}>
          <div style={{ fontWeight: 600, marginBottom: 6 }}>Price</div>
          <input
            type="range"
            min={0}
            max={20000}
            value={priceRange[1]}
            onChange={e => { setPriceRange([0, Number(e.target.value)]); setCurrentPage(1);
              ; }}
            style={{ width: '100%' }}
          />
          <div style={{ fontSize: 14, color: '#555', marginTop: 2 }}>Up to ₹{priceRange[1]}</div>
        </div>
        <button onClick={handleReset} style={{ marginTop: 10, padding: '6px 18px', border: 'none', background: '#2563eb', color: '#fff', borderRadius: 4, cursor: 'pointer', fontWeight: 600 }}>Reset</button>
      </aside>

      {/* Products Grid */}
      <main style={{ flex: 1, position: 'relative' }}>
        {loading && (
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(255, 255, 255, 0.7)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 10
          }}>
            <div style={{ transform: 'scale(0.8)' }}>
              <Loader />
            </div>
          </div>
        )}
        {error ? (
          <div style={{ textAlign: 'center', padding: 40, color: 'red', fontSize: 18 }}>
            {error.message || 'Failed to load products'}
          </div>
        ) : products?.length === 0 ? (
          <div style={{ textAlign: 'center', padding: 60, color: '#888', fontSize: 20 }}>
            🚫 No products found. Try adjusting your filters.
          </div>
        ) : (
    <>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
          gap: 24,
        }}
      >
        {products.map((product) => (
          <div
            key={product._id}
            style={{
              background: '#fff',
              borderRadius: 8,
              boxShadow: '0 1px 4px #e5e7eb',
              padding: 16,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <img
              src={product.image}
              alt={product.name}
              style={{
                width: 160,
                height: 160,
                objectFit: 'cover',
                borderRadius: 6,
                marginBottom: 10,
              }}
            />
            <p className="text-gray-600">₹{product.price.toFixed(2)}</p>
            <div
              style={{
                fontWeight: 600,
                fontSize: 17,
                marginBottom: 4,
                textAlign: 'center',
              }}
            >
              {product.name}
            </div>
            <div
              style={{ fontSize: 14, color: '#555', marginBottom: 2 }}
            >
              {product.category} | {product.color} | {product.size}
            </div>
            <button
              style={{
                marginTop: 8,
                padding: '6px 18px',
                border: 'none',
                background: '#2563eb',
                color: '#fff',
                borderRadius: 4,
                cursor: 'pointer',
                fontWeight: 600,
              }}
            >
              View
            </button>
          </div>
        ))}
      </div>

      {/* Pagination */}
      {/* Pagination */}
{/* Pagination */}
{totalPages >= 1 && (
  <div
    style={{
      display: 'flex',
      justifyContent: 'center',
      marginTop: '2rem',
      gap: '0.5rem',
      flexWrap: 'wrap',
      padding: '1rem 0',
    }}
  >
    {/* Previous */}
    <button
      onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
      disabled={currentPage === 1}
      style={{
        padding: '0.5rem 1rem',
        border: '1px solid #e2e8f0',
        borderRadius: '0.25rem',
        background: currentPage === 1 ? '#f1f5f9' : 'white',
        cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
        color: currentPage === 1 ? '#94a3b8' : '#334155',
        fontWeight: 500,
      }}
    >
      ‹ Previous
    </button>

    {/* Next */}
    <button
      onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
      disabled={currentPage === totalPages}
      style={{
        padding: '0.5rem 1rem',
        border: '1px solid #e2e8f0',
        borderRadius: '0.25rem',
        background: currentPage === totalPages ? '#f1f5f9' : 'white',
        cursor: currentPage === totalPages ? 'not-allowed' : 'pointer',
        color: currentPage === totalPages ? '#94a3b8' : '#334155',
        fontWeight: 500,
      }}
    >
      Next ›
    </button>

    {/* Last Page */}
    <button
      onClick={() => setCurrentPage(totalPages)}
      disabled={currentPage === totalPages}
      style={{
        padding: '0.5rem 1rem',
        border: '1px solid #e2e8f0',
        borderRadius: '0.25rem',
        background: currentPage === totalPages ? '#f1f5f9' : 'white',
        cursor: currentPage === totalPages ? 'not-allowed' : 'pointer',
        color: currentPage === totalPages ? '#94a3b8' : '#334155',
        fontWeight: 500,
      }}
    >
      Last »
    </button>

    {/* Page Info */}
    <div
      style={{
        marginLeft: '1rem',
        fontSize: '0.875rem',
        color: '#64748b',
        display: 'flex',
        alignItems: 'center',
      }}
    >
      {productCount || 0} items • Page {currentPage} of {totalPages}
    </div>
  </div>
)}


    </>
  )}
</main>

    </div>
  );
};

export default Product;