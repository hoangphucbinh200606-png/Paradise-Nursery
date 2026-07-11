import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from './CartSlice';
import './ProductList.css'; // Add basic grid styling here

const plantsData = [
  // Category 1: Air Purifying
  { id: 1, name: "Snake Plant", price: 15, category: "Air Purifying", thumbnail: "snake-plant.jpg" },
  { id: 2, name: "Spider Plant", price: 12, category: "Air Purifying", thumbnail: "spider-plant.jpg" },
  { id: 3, name: "Peace Lily", price: 18, category: "Air Purifying", thumbnail: "peace-lily.jpg" },
  { id: 4, name: "Boston Fern", price: 14, category: "Air Purifying", thumbnail: "boston-fern.jpg" },
  { id: 5, name: "Aloe Vera", price: 10, category: "Air Purifying", thumbnail: "aloe-vera.jpg" },
  { id: 6, name: "Rubber Plant", price: 20, category: "Air Purifying", thumbnail: "rubber-plant.jpg" },
  
  // Category 2: Low Light
  { id: 7, name: "ZZ Plant", price: 22, category: "Low Light", thumbnail: "zz-plant.jpg" },
  { id: 8, name: "Pothos", price: 11, category: "Low Light", thumbnail: "pothos.jpg" },
  { id: 9, name: "Cast Iron Plant", price: 25, category: "Low Light", thumbnail: "cast-iron.jpg" },
  { id: 10, name: "Philodendron", price: 16, category: "Low Light", thumbnail: "philodendron.jpg" },
  { id: 11, name: "Chinese Evergreen", price: 19, category: "Low Light", thumbnail: "chinese-evergreen.jpg" },
  { id: 12, name: "Parlor Palm", price: 17, category: "Low Light", thumbnail: "parlor-palm.jpg" },
  
  // Category 3: Succulents
  { id: 13, name: "Jade Plant", price: 13, category: "Succulents", thumbnail: "jade-plant.jpg" },
  { id: 14, name: "Echeveria", price: 8, category: "Succulents", thumbnail: "echeveria.jpg" },
  { id: 15, name: "Zebra Haworthia", price: 9, category: "Succulents", thumbnail: "zebra.jpg" },
  { id: 16, name: "Burro's Tail", price: 14, category: "Succulents", thumbnail: "burros-tail.jpg" },
  { id: 17, name: "String of Pearls", price: 15, category: "Succulents", thumbnail: "string-of-pearls.jpg" },
  { id: 18, name: "Hens and Chicks", price: 7, category: "Succulents", thumbnail: "hens.jpg" }
];

const ProductList = ({ onHomeClick }) => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.cartItems);
  const totalQuantity = useSelector((state) => state.cart.totalQuantity);

  // Group plants by category
  const categories = plantsData.reduce((acc, plant) => {
    if (!acc[plant.category]) acc[plant.category] = [];
    acc[plant.category].push(plant);
    return acc;
  }, {});

  const handleAddToCart = (plant) => {
    dispatch(addItem(plant));
  };

  const isAddedToCart = (id) => {
    return cartItems.some((item) => item.id === id);
  };

  return (
    <div className="product-list-page">
      {/* Navbar implementation */}
      <nav className="navbar">
        <div className="logo">Paradise Nursery</div>
        <div className="nav-links">
          <a href="#" onClick={(e) => { e.preventDefault(); onHomeClick(); }}>Home</a>
          <a href="#plants">Plants</a>
          <a href="#cart">Cart 🛒 ({totalQuantity})</a>
        </div>
      </nav>

      {/* Product Listings grouped by category */}
      <div className="products-container" id="plants">
        {Object.keys(categories).map((category) => (
          <div key={category} className="category-section">
            <h2>{category}</h2>
            <div className="plant-grid" style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
              {categories[category].map((plant) => (
                <div key={plant.id} className="plant-card" style={{ border: '1px solid #ccc', padding: '15px', width: '200px' }}>
                  {/* Replace src with actual images if needed */}
                  <img src={`https://via.placeholder.com/150?text=${plant.name}`} alt={plant.name} style={{ width: '100%' }} />
                  <h3>{plant.name}</h3>
                  <p>${plant.price}</p>
                  <button 
                    onClick={() => handleAddToCart(plant)}
                    disabled={isAddedToCart(plant.id)}
                    style={{ 
                      backgroundColor: isAddedToCart(plant.id) ? '#ccc' : '#4CAF50', 
                      color: 'white', padding: '10px', border: 'none', cursor: 'pointer' 
                    }}
                  >
                    {isAddedToCart(plant.id) ? "Added to Cart" : "Add to Cart"}
                  </button>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
