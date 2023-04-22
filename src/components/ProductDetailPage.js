import React, { useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from './Header';
import '../assets/styles/ProductDetailPage.css';
import product1 from '../assets/images/product-1.png';
import product2 from '../assets/images/product-2.png';
import product3 from '../assets/images/product-3.png';
import coinIcon from '../assets/images/coin-icon.png';
import AppContext from '../context/AppContext';

const productImages = [product1, product2, product3];

function ProductDetailPage() {
  const { cartItems, setCartItems } = useContext(AppContext);
  const { id } = useParams();
  const productId = parseInt(id, 10);
  const navigate = useNavigate();
  const product = {
    id: productId,
    image: productImages[productId - 1],
    title: `Product ${productId}`,
    price: 10 * productId,
    description: `This is a description for Product ${productId}`,
  };

  function handleCollectButtonClick() {
    setCartItems([...cartItems, product]);
  }

  function handleBackButtonClick() {
    navigate(-1);
  }

  return (
    <div className="product-detail-page">
      <Header />
      <div className="product-detail-page-wrapper">
        <div className="content">
          <button className="back-button" onClick={handleBackButtonClick}>
            &lt;- Back
          </button>
          <div className="product-detail">
            <div className="product-image-container">
              <img src={product.image} alt={product.title} className="product-image" />
            </div>
            <div className="product-info">
              <div className="ratings">★★★★★</div>
              <h2 className="product-title">{product.title}</h2>
              <div className="product-price">
                <img src={coinIcon} alt="Coin" className="coin-icon" />
                <span>{product.price}</span>
              </div>
              <p className="product-description">{product.description}</p>
              <button className="collect-button" onClick={handleCollectButtonClick}>
                COLLECT
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetailPage;
