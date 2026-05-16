import React, { useState, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { addItem } from '../redux/CartSlice';
import '../styles/ProductList.css';

/**
 * ProductList.jsx - Product Listing Page Component
 * Displays a shopping page for Paradise Nursery with:
 * - Product grid display with 12+ plants
 * - Search functionality by name and description
 * - Category filtering (Indoor, Low-Light, Decorative, etc.)
 * - Price range filtering (min and max)
 * - Multiple sort options (name, price low/high, rating)
 * - Add to cart with instant feedback
 * - Responsive grid layout
 */

const ProductList = () => {
  const dispatch = useDispatch();

  // Sample product data
  const [products] = useState([
    {
      id: 1,
      name: 'Monstera Deliciosa',
      price: 45.99,
      category: 'Indoor',
      rating: 4.8,
      image: '🪴',
      description: 'Beautiful tropical plant with split leaves. Perfect for bright indoors.',
    },
    {
      id: 2,
      name: 'Pothos (Devil\'s Ivy)',
      price: 22.99,
      category: 'Low-Light',
      rating: 4.6,
      image: '🌿',
      description: 'Trailing plant that thrives in low light. Easy to care for.',
    },
    {
      id: 3,
      name: 'Snake Plant',
      price: 28.50,
      category: 'Low-Light',
      rating: 4.7,
      image: '🌱',
      description: 'Air-purifying plant that requires minimal care.',
    },
    {
      id: 4,
      name: 'Fiddle Leaf Fig',
      price: 65.00,
      category: 'Decorative',
      rating: 4.5,
      image: '🌳',
      description: 'Large statement plant with beautiful violin-shaped leaves.',
    },
    {
      id: 5,
      name: 'Spider Plant',
      price: 18.99,
      category: 'Indoor',
      rating: 4.9,
      image: '🕷️',
      description: 'Compact plant producing cute baby plantlets. Very easy to grow.',
    },
    {
      id: 6,
      name: 'Peace Lily',
      price: 32.99,
      category: 'Low-Light',
      rating: 4.6,
      image: '🤍',
      description: 'Elegant flowering plant that signals when it needs water.',
    },
    {
      id: 7,
      name: 'Rubber Plant',
      price: 55.00,
      category: 'Decorative',
      rating: 4.4,
      image: '🍃',
      description: 'Bold foliage plant with deep glossy leaves.',
    },
    {
      id: 8,
      name: 'ZZ Plant',
      price: 38.99,
      category: 'Low-Light',
      rating: 4.5,
      image: '🎋',
      description: 'Extremely hardy plant perfect for neglectful owners.',
    },
    {
      id: 9,
      name: 'Pilea Peperomioides',
      price: 42.50,
      category: 'Indoor',
      rating: 4.7,
      image: '🪴',
      description: 'Trendy plant with coin-shaped leaves. Popular for gifting.',
    },
    {
      id: 10,
      name: 'Boston Fern',
      price: 35.99,
      category: 'Indoor',
      rating: 4.3,
      image: '🌿',
      description: 'Classic fern with delicate feathery fronds.',
    },
    {
      id: 11,
      name: 'Calathea',
      price: 48.00,
      category: 'Decorative',
      rating: 4.6,
      image: '🌺',
      description: 'Stunning patterned leaves with unique leaf movements.',
    },
    {
      id: 12,
      name: 'Succulents Mix',
      price: 24.99,
      category: 'Low-Light',
      rating: 4.8,
      image: '🌵',
      description: 'Assortment of 5 different succulent varieties.',
    },
  ]);

  // State management
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [priceRange, setPriceRange] = useState([0, 100]);
  const [sortBy, setSortBy] = useState('name');
  const [addedItems, setAddedItems] = useState(new Set());

  // Get unique categories
  const categories = ['All', ...new Set(products.map((p) => p.category))];

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let filtered = products.filter((product) => {
      const matchesSearch =
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;

      const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];

      return matchesSearch && matchesCategory && matchesPrice;
    });

    // Sort products
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'rating':
          return b.rating - a.rating;
        default:
          return 0;
      }
    });

    return filtered;
  }, [searchTerm, selectedCategory, priceRange, sortBy, products]);

  // Handle add to cart
  const handleAddToCart = (product) => {
    dispatch(addItem({ ...product, quantity: 1 }));
    setAddedItems(new Set([...addedItems, product.id]));

    // Remove the check mark after 2 seconds
    setTimeout(() => {
      setAddedItems((prev) => {
        const newSet = new Set(prev);
        newSet.delete(product.id);
        return newSet;
      });
    }, 2000);
  };

  return (
    <div className="product-list-container">
      {/* Header */}
      <div className="product-header">
        <h1>🌿 Paradise Nursery Products</h1>
        <p>Discover our beautiful collection of plants and gardening supplies</p>
      </div>

      {/* Filters Section */}
      <div className="filters-section">
        {/* Search Bar */}
        <div className="search-box">
          <input
            type="text"
            placeholder="🔍 Search plants by name or description..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>

        <div className="filters-row">
          {/* Category Filter */}
          <div className="filter-group">
            <label>Category:</label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="filter-select"
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          {/* Price Range Filter */}
          <div className="filter-group">
            <label>Price Range:</label>
            <div className="price-inputs">
              <input
                type="number"
                placeholder="Min"
                value={priceRange[0]}
                onChange={(e) =>
                  setPriceRange([Math.max(0, parseInt(e.target.value) || 0), priceRange[1]])
                }
                className="price-input"
              />
              <span>-</span>
              <input
                type="number"
                placeholder="Max"
                value={priceRange[1]}
                onChange={(e) =>
                  setPriceRange([priceRange[0], Math.min(200, parseInt(e.target.value) || 200)])
                }
                className="price-input"
              />
            </div>
          </div>

          {/* Sort By */}
          <div className="filter-group">
            <label>Sort By:</label>
            <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="filter-select">
              <option value="name">Name (A-Z)</option>
              <option value="price-low">Price (Low to High)</option>
              <option value="price-high">Price (High to Low)</option>
              <option value="rating">Rating (High to Low)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Results Count */}
      <div className="results-info">
        <p>Showing {filteredProducts.length} of {products.length} products</p>
      </div>

      {/* Products Grid */}
      {filteredProducts.length === 0 ? (
        <div className="no-products">
          <p>😢 No products found matching your filters.</p>
          <p>Try adjusting your search criteria.</p>
        </div>
      ) : (
        <div className="products-grid">
          {filteredProducts.map((product) => (
            <div key={product.id} className="product-card">
              <div className="product-image">
                <span className="image-emoji">{product.image}</span>
              </div>

              <div className="product-info">
                <h3 className="product-name">{product.name}</h3>

                <div className="product-category">
                  <span className="category-tag">{product.category}</span>
                </div>

                <p className="product-description">{product.description}</p>

                <div className="product-rating">
                  <span className="stars">⭐ {product.rating}</span>
                  <span className="rating-count">(Based on customer reviews)</span>
                </div>

                <div className="product-footer">
                  <p className="product-price">${product.price.toFixed(2)}</p>
                  <button
                    onClick={() => handleAddToCart(product)}
                    className={`add-to-cart-btn ${addedItems.has(product.id) ? 'added' : ''}`}
                  >
                    {addedItems.has(product.id) ? '✓ Added' : '🛒 Add to Cart'}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Footer Benefits */}
      <div className="products-benefits">
        <div className="benefit">
          <span className="benefit-icon">🌱</span>
          <p>Premium Quality Plants</p>
        </div>
        <div className="benefit">
          <span className="benefit-icon">📦</span>
          <p>Secure Packaging</p>
        </div>
        <div className="benefit">
          <span className="benefit-icon">🚚</span>
          <p>Fast Delivery</p>
        </div>
        <div className="benefit">
          <span className="benefit-icon">💚</span>
          <p>30-Day Guarantee</p>
        </div>
      </div>
    </div>
  );
};

export default ProductList;
