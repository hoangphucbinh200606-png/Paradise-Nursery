import React, { useState } from 'react';
import { Provider } from 'react-redux';
import store from './store'; // Assuming you configure your Redux store here
import ProductList from './ProductList';
import './App.css';

function App() {
  const [showProducts, setShowProducts] = useState(false);

  const handleGetStarted = () => {
    setShowProducts(true);
  };

  return (
    <Provider store={store}>
      <div className="App">
        {!showProducts ? (
          <div className="landing-page">
            <h1>Welcome to Paradise Nursery</h1>
            <p>Bringing Nature to Your Doorstep</p>
            <button className="get-started-btn" onClick={handleGetStarted}>
              Get Started
            </button>
          </div>
        ) : (
          <ProductList onHomeClick={() => setShowProducts(false)} />
        )}
      </div>
    </Provider>
  );
}

export default App;
