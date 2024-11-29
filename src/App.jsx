import React, { useState } from 'react';
import './App.css';
import cartImage from './assets/cart.png'; 
import rectangleImage from './assets/Rectangle.png';
import rectangleCopy1 from './assets/Rectangle Copy.png'; 
import rectangleCopy2 from './assets/Rectangle Copy 2.png'; 
import rectangleCopy3 from './assets/Rectangle Copy 3.png'; 
import rectangleCopy4 from './assets/Rectangle Copy 4.png'; 

function App() {
  const [count, setCount] = useState(0); 
  const [mainImage, setMainImage] = useState(rectangleImage);
  const [cart, setCart] = useState([]); 
  const [showModal, setShowModal] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false); 
  const [currentIndex, setCurrentIndex] = useState(0);

  const images = [rectangleImage, rectangleCopy1, rectangleCopy2, rectangleCopy3, rectangleCopy4]; 
  const price = 125.00; 
  const increment = () => setCount(count + 1);
  const decrement = () => {
    if (count > 0) {
      setCount(count - 1);
    }
  };

  const addToCart = () => {
    if (count > 0) {
      const product = { image: mainImage, quantity: count, unitPrice: price }; 
      setCart([...cart, product]); 
      setCount(0);
    }
  };

  const clearCart = () => {
    setCart([]);
  };
  const handleImageClick = (image, index) => {
    setMainImage(image); 
    setCurrentIndex(index); 
  };

 const openModal = (index) => {
    setShowModal(true); 
    setCurrentIndex(index); 
  };
  const closeModal = () => setShowModal(false);
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const goToNextImage = () => {
    const nextIndex = (currentIndex + 1) % images.length;
    setMainImage(images[nextIndex]);
    setCurrentIndex(nextIndex);
  };

  const goToPreviousImage = () => {
    const prevIndex = (currentIndex - 1 + images.length) % images.length;
    setMainImage(images[prevIndex]);
    setCurrentIndex(prevIndex);
  };

  const totalPrice = cart.reduce((acc, product) => acc + product.quantity * product.unitPrice, 0);

  return (
    <div className="App">
      <header className="header">
        <div className="header-container">
          <a href="#" className="sneakers">Sneakers</a>
          <div className={`menu ${isMenuOpen ? "open" : ""}`}>
            <ul className="menu-items">
              <li><a href="#">Collections</a></li>
              <li><a href="#">Men</a></li>
              <li><a href="#">Women</a></li>
              <li><a href="#">About</a></li>
              <li><a href="#">Contact</a></li>
            </ul>
          </div>
          <div className="cart-container">
            <img src={cartImage} alt="Cart" className="cart-image" onClick={() => setShowModal(true)} />
            {cart.length > 0 && <div className="cart-count">{cart.length}</div>}
          </div>
          <button className="burger-icon" onClick={toggleMenu}>☰</button>
        </div>
        <hr className="top-line" />
      </header>

      <div className="rectangle-container">
        <img
          src={mainImage}
          alt="Main"
          className="rectangle-image"
          onClick={() => openModal(images.indexOf(mainImage))}
        />
        <div className="company-text-container">
          <div className="company-name">SNEAKER COMPANY</div>
          <div className="fall-limited-edition">
            <div className="fall-text">Fall Limited Edition</div>
            <div className="sneakers-text">Sneakers</div>
          </div>
          <div className="product-description">
            These low-profile sneakers are your perfect casual wear companion. Featuring a durable rubber outer sole, they’ll withstand everything the weather can offer.
          </div>
          <div className="price">${price.toFixed(2)}</div>
          <div className="old-price">$250.00</div>
          <div className="counter-container">
            <div className="counter-box">
              <button onClick={decrement} className="counter-btn">-</button>
              <div className="counter-value">{count}</div>
              <button onClick={increment} className="counter-btn">+</button>
            </div>
            <div className="add-to-cart-box" onClick={addToCart}>
              <img src={cartImage} alt="Cart" className="add-to-cart-icon" />
              <span className="add-to-cart-text">Add To Cart</span>
            </div>
          </div>
        </div>
      </div>

      <div className="new-images-container">
        {images.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`Thumbnail ${index}`}
            className="new-image"
            onClick={() => handleImageClick(image, index)}
          />
        ))}
      </div>

      {showModal && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={closeModal}>×</button>
            <div className="modal-images">
              <div className="modal-arrow left-arrow" onClick={goToPreviousImage}>&lt;</div>
              <img src={mainImage} alt="Main Image" className="modal-main-image" />
              <div className="modal-arrow right-arrow" onClick={goToNextImage}>&gt;</div>
            </div>
            <div className="modal-thumbnails">
              {images.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`Thumbnail ${index}`}
                  className="modal-thumbnail"
                  onClick={() => handleImageClick(image, index)}
                />
              ))}
            </div>
          </div>
        </div>
      )}

      {cart.length > 0 && (
        <div className="cart-modal">
          <div className="cart-items">
            <h3>Cart</h3>
            {cart.map((item, index) => (
              <div key={index} className="cart-item">
                <img src={item.image} alt="Cart Item" className="cart-item-image" />
                <div className="cart-item-details">
                  <div>Quantity: {item.quantity}</div>
                  <div>Unit Price: ${item.unitPrice.toFixed(2)}</div>
                  <div>Total: ${(item.quantity * item.unitPrice).toFixed(2)}</div>
                </div>
              </div>
            ))}
            <hr />
            <div className="cart-total">
              <div>Total Price: ${totalPrice.toFixed(2)}</div>
              <button className="clear-cart" onClick={clearCart}>Clear Cart</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
