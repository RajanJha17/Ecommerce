import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getProductDetails } from "../features/products/productSlice";

const dummyProduct = {
  name: "Sample Product",
  description: "This is a sample product description.",
  price: 49.99,
  rating: 4.3,
  numReviews: 12,
  stock: 8,
  sizes: ["S", "M", "L", "XL"],
  colors: [
    { name: "Red", code: "#ef4444" },
    { name: "Blue", code: "#3b82f6" },
    { name: "Green", code: "#22c55e" }
  ],
  images: [
    "https://via.placeholder.com/400x400.png?text=Image+1",
    "https://via.placeholder.com/400x400.png?text=Image+2",
    "https://via.placeholder.com/400x400.png?text=Image+3"
  ]
};

// Example reviews data
const dummyReviews = [
  { user: 'Amit', rating: 5, comment: 'Great product, highly recommend!' },
  { user: 'Priya', rating: 4, comment: 'Good quality, but delivery was slow.' },
  { user: 'John', rating: 3, comment: 'Average, expected better.' },
];

const ProductDetails = () => {
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [reviewRating, setReviewRating] = useState(0);
  const [reviewComment, setReviewComment] = useState("");
  const { loading, error, product } = useSelector((state) => state.product);
  const dispatch = useDispatch();
  const { id } = useParams();
  // Use product images if available, else dummy, but only if not loading and no product
  const images = product && product.image && Array.isArray(product.image) && product.image.length > 0
    ? product.image
    : dummyProduct.images;
  const [mainImage, setMainImage] = useState(images[0]);
  useEffect(() => {
    if (id) {
      dispatch(getProductDetails(id));
    }
  }, [id, dispatch]);
  // Update mainImage if images change
  useEffect(() => {
    if (images && images[0]) setMainImage(images[0]);
  }, [images]);


  if (loading) {
    return <div style={{ padding: 40, textAlign: 'center', fontSize: 22 }}>Loading...</div>;
  }
  if (error) {
    return <div style={{ padding: 40, textAlign: 'center', color: 'red', fontSize: 20 }}>Error: {error}</div>;
  }
  // If no product and not loading, show dummy data
  // API shape: { success, product: { ...fields } }
  const prodData = product && product.product ? product.product : product;
  const showDummy = !prodData || Object.keys(prodData).length === 0;
  const prod = showDummy ? dummyProduct : prodData;
  // Transform API fields to match UI expectations
  const prodImages = showDummy
    ? dummyProduct.images
    : (prod.image && Array.isArray(prod.image) && prod.image.length > 0
        ? prod.image.map(img => img.url)
        : dummyProduct.images);

  const prodSizes = showDummy
    ? dummyProduct.sizes
    : (prod.sizes && prod.sizes.length > 0
        ? prod.sizes.map(s => (typeof s === 'string' ? s : s.size))
        : dummyProduct.sizes);

  const prodColors = showDummy
    ? dummyProduct.colors
    : (prod.colors && prod.colors.length > 0
        ? prod.colors.map(c => (typeof c === 'string' ? { name: c, code: undefined } : c))
        : dummyProduct.colors);
  const prodReviews = showDummy ? dummyReviews : (prod.reviews && prod.reviews.length > 0 ? prod.reviews : []);

  return (
    <div style={{ padding: 20, marginLeft: 0, marginRight: 32 }}>
      <div style={{ display: "flex", gap: 16 }}>
        {/* LEFT SIDE - IMAGES */}
        <div style={{ display: 'flex', flexDirection: 'row', flex: 1, marginLeft: 16 }}>
          {/* Thumbnails vertically */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginRight: 16 }}>
            {prodImages.map((img, idx) => (
              <img
                key={idx}
                src={img}
                alt={`Thumbnail ${idx + 1}`}
                onClick={() => setMainImage(img)}
                style={{
                  width: 60,
                  height: 60,
                  objectFit: 'cover',
                  borderRadius: 6,
                  cursor: 'pointer',
                  border: mainImage === img ? '2px solid #2563eb' : '1px solid #ccc',
                  marginBottom: 2,
                  background: '#f3f4f6',
                }}
              />
            ))}
          </div>
          {/* Main Image */}
          <img
            src={mainImage}
            alt={prod.name}
            style={{
              width: 520,
              height: 520,
              borderRadius: 8,
              objectFit: 'cover',
              background: '#f3f4f6',
              border: '1.5px solid #ddd',
            }}
          />
        </div>

        {/* RIGHT SIDE - DETAILS */}
        <div style={{ flex: 2, maxWidth: 500, marginRight: 16, marginLeft: 0 }}>
          <h2 style={{ marginBottom: 10, fontSize: 28, fontWeight: 700, color: "#222" }}>
            {prod.name}
          </h2>
          <p style={{ marginBottom: 14, color: "#444", fontSize: 16 }}>
            {prod.description}
          </p>
          <div style={{ marginBottom: 10 }}>
            <span style={{ fontWeight: 600, fontSize: 24, color: "#2563eb" }}>
              ${prod.price}
            </span>
          </div>

          {/* Rating */}
          <div style={{ marginBottom: 10, display: "flex", alignItems: "center" }}>
            <span style={{ color: "#f5a623", fontWeight: 600, fontSize: 18 }}>
              {"★".repeat(Math.floor(prod.ratings || prod.rating || 0))}
              {"☆".repeat(5 - Math.floor(prod.ratings || prod.rating || 0))}
            </span>
            <span style={{ marginLeft: 10, color: "#888", fontSize: 15 }}>
              {(prod.ratings || prod.rating || 0)} / 5
            </span>
            <span style={{ marginLeft: 8, color: "#aaa", fontSize: 14 }}>
              ({prod.numOfReviews ?? prod.numReviews ?? 0} reviews)
            </span>
          </div>

          {/* Stock */}
          <div
            style={{
              marginBottom: 16,
              color: (prod.stock ?? 0) > 0 ? "#22c55e" : "#e11d48",
              fontWeight: 500,
              fontSize: 15
            }}
          >
            {(prod.stock ?? 0) > 0
              ? `In Stock (${prod.stock})`
              : "Out of Stock"}
          </div>

          {/* Size Option */}
          <div style={{ marginBottom: 12, display: "flex", alignItems: "center" }}>
            <label style={{ fontWeight: 500, marginRight: 10, minWidth: 50 }}>
              Size:
            </label>
            <div>
              {prodSizes.map((size, idx) => (
                <button
                  key={size || idx}
                  onClick={() => setSelectedSize(size)}
                  style={{
                    marginRight: 8,
                    padding: "4px 14px",
                    border:
                      selectedSize === size
                        ? "2px solid #2563eb"
                        : "1px solid #ccc",
                    background: selectedSize === size ? "#e0e7ff" : "#fff",
                    borderRadius: 4,
                    cursor: "pointer",
                    fontWeight: 500
                  }}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Color Option */}
          <div style={{ marginBottom: 12, display: "flex", alignItems: "center" }}>
            <label style={{ fontWeight: 500, marginRight: 10, minWidth: 50 }}>
              Color:
            </label>
            <div>
              {prodColors.map((color, idx) => {
                const colorName = color.name || color;
                // Use a simple color code map for common colors, fallback to gray
                const colorCodeMap = {
                  black: '#222',
                  white: '#fff',
                  navy: '#1e3a8a',
                  gray: '#888',
                };
                const colorCode = color.code || colorCodeMap[colorName?.toLowerCase()] || '#ccc';
                return (
                  <button
                    key={colorName || idx}
                    onClick={() => setSelectedColor(colorName)}
                    style={{
                      marginRight: 8,
                      width: 28,
                      height: 28,
                      borderRadius: "50%",
                      border:
                        selectedColor === colorName
                          ? "2px solid #2563eb"
                          : "1px solid #ccc",
                      background: colorCode,
                      cursor: "pointer",
                      outline: "none",
                      display: "inline-block"
                    }}
                    title={colorName}
                  />
                );
              })}
            </div>
          </div>

          {/* Quantity Option */}
          <div style={{ marginBottom: 16, display: "flex", alignItems: "center" }}>
            <label style={{ fontWeight: 500, marginRight: 10, minWidth: 50 }}>
              Qty:
            </label>
            <button
              onClick={() => setQuantity(q => Math.max(1, q - 1))}
              style={{
                padding: "2px 10px",
                border: "1px solid #ccc",
                background: "#fff",
                borderRadius: 3,
                cursor: "pointer",
                fontWeight: 600
              }}
            >
              -
            </button>
            <span style={{ margin: "0 10px", fontWeight: 600 }}>{quantity}</span>
            <button
              onClick={() => setQuantity(q => q + 1)}
              style={{
                padding: "2px 10px",
                border: "1px solid #ccc",
                background: "#fff",
                borderRadius: 3,
                cursor: "pointer",
                fontWeight: 600
              }}
            >
              +
            </button>
          </div>

          {/* Add to Cart */}
          <button
            style={{
              padding: "12px 28px",
              background: "#2563eb",
              color: "#fff",
              border: "none",
              borderRadius: 6,
              cursor: "pointer",
              fontWeight: 600,
              fontSize: 16,
              width: "100%",
              marginBottom: 20
            }}
          >
            Add to Cart
          </button>

          {/* Review Form */}
          <div style={{ marginBottom: 8, width: "100%" }}>
            <div
              style={{
                fontWeight: 600,
                fontSize: 18,
                margin: "18px 0 8px 0",
                color: "#222"
              }}
            >
              Write a Review
            </div>

            {/* Star Rating */}
            <div
              style={{ display: "flex", alignItems: "center", marginBottom: 8 }}
            >
              {[1, 2, 3, 4, 5].map(star => (
                <span
                  key={star}
                  style={{
                    fontSize: 22,
                    color: "#f5a623",
                    cursor: "pointer",
                    marginRight: 2
                  }}
                  role="button"
                  tabIndex={0}
                  aria-label={`Rate ${star} star${star > 1 ? "s" : ""}`}
                  onClick={() => setReviewRating(star)}
                  onKeyDown={e => {
                    if (e.key === "Enter") setReviewRating(star);
                  }}
                >
                  {reviewRating >= star ? "★" : "☆"}
                </span>
              ))}
            </div>

            {/* Comment Box */}
            <textarea
              value={reviewComment}
              onChange={e => setReviewComment(e.target.value)}
              rows={3}
              placeholder="Write your review..."
              style={{
                width: "100%",
                padding: 8,
                borderRadius: 4,
                border: "1px solid #ccc",
                fontSize: 15,
                marginBottom: 8,
                resize: "vertical"
              }}
            />

            <button
              style={{
                padding: "10px 0",
                background: "#2563eb",
                color: "#fff",
                border: "none",
                borderRadius: 4,
                cursor: "pointer",
                fontWeight: 500,
                fontSize: 15,
                width: "100%"
              }}
              onClick={() => {
                alert(
                  `Review Submitted: ${reviewRating} stars, ${reviewComment}`
                );
              }}
              disabled={reviewRating === 0 || reviewComment.trim() === ""}
            >
              Submit Review
            </button>
          </div>
        </div>
      </div>
      {/* Reviews Section - full width below */}
      <div style={{ width: '100%', marginTop: 40 }}>
        <div style={{ fontWeight: 700, fontSize: 22, marginBottom: 18, color: '#222' }}>Product Reviews</div>
        {prodReviews.length === 0 && (
          <div style={{ color: '#888', fontSize: 16 }}>No reviews yet.</div>
        )}
        {prodReviews.map((review, idx) => (
          <div key={idx} style={{ marginBottom: 22, borderBottom: '1px solid #eee', paddingBottom: 10, maxWidth: 700 }}>
            <div style={{ fontWeight: 600, fontSize: 17, color: '#2563eb' }}>{review.user || review.name}</div>
            <div style={{ color: '#f5a623', fontSize: 18 }}>
              {'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}
            </div>
            <div style={{ fontSize: 16, color: '#444', marginTop: 2 }}>{review.comment}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductDetails;
