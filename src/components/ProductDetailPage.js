import React, { useContext, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import '../assets/styles/ProductDetailPage.css';
import coinIcon from '../assets/images/coin-icon.png';
import AppContext from '../context/AppContext';
import Breadcrumbs from './Breadcrumbs';
import axios from 'axios';
import mapJSONToSingleProduct from '../mappers/mapJSONToSingleProduct';

const PRODUCTS_API = process.env.REACT_APP_PRODUCTS_API;

function ProductDetailPage() {
  // Destructure the required values from AppContext
  const { cartItems, setCartItems, coinBalance, setCoinBalance } = useContext(AppContext);
  const [product, setProduct] = useState(null);
  const { id } = useParams();
  
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        //const response = await axios.get(`https://taekimdev.pythonanywhere.com/api/products/${id}/`);
        const response = await axios.get(`${PRODUCTS_API}${id}/`);
        const data = response.data;
        const mappedData = mapJSONToSingleProduct(data); 
        setProduct(mappedData);
      } catch (error) {
        console.error("There was a problem with the request:", error);
      }
    };
  
    fetchProduct();
  }, [id]);
  
  

// Function to handle the collect button click
function handleCollectButtonClick(e, product) {
    e.stopPropagation();
  
    const newCoinBalance = coinBalance - product.price;
  
    if (newCoinBalance >= 0) {
      const itemIndex = cartItems.findIndex((item) => item.id === product.id);
  
      if (itemIndex !== -1) {
        const updatedCartItems = [...cartItems];
        updatedCartItems[itemIndex].quantity += 1;
        setCartItems(updatedCartItems);
      } else {
        setCartItems([...cartItems, { ...product, quantity: 1 }]);
      }
  
      setCoinBalance(newCoinBalance);
    } else {
      alert("Not enough coins for this item!");
    }
  }

  // Function to generate stars for the rating display
  function generateStars(rating) {
    let stars = '';
    for (let i = 0; i < rating; i++) {
      stars += '★';
    }
    return stars;
  }

  return (
    <div className="product-detail-page">
      <Breadcrumbs
        items={[
          { label: "Home", path: "/home" },
          { label: "Product" },
          //{ label: product.category, path: `/category/${product.category}` },
        ]}
      />
      <div className="product-detail-page-wrapper">
        <div className="content">
          {product ? ( 
            <div className="product-detail">
              <div className="product-image-container">
                <img
                  src={product.image}
                  alt={product.title}
                  className="product-image"
                />
              </div>
              <div className="product-info">
                <div className="ratings">{generateStars(product.rating)}</div>
                <h2 className="product-title">{product.title}</h2>
                <div className="product-price">
                <img src={coinIcon} alt="Coin" className="coin-icon" />
                <span>{product.price}</span>
                {product.discount > 0 && (
                    <>
                    <span className="original-price">
                        {Math.round((product.price / (1 - product.discount / 100)))}
                    </span>
                    </>
                )}


                </div>
                {product.discount > 0 && (
                  <span className="product-discount">
                    {product.discount}% OFF
                  </span>
                )}
                <p className="product-description">{product.description}</p>
                <button
                  className={`collect-button${
                    product.instock ? "" : " disabled"
                  }`}
                  onClick={(e) => handleCollectButtonClick(e, product)}
                  disabled={!product.instock}
                >
                  {product.instock ? "COLLECT" : "Out of Stock"}
                </button>
              </div>
            </div>
          ) : (
        // Skeleton loading JSX
        <div className="product-detail">
            <div className={`product-image-container skeleton product-image-container-skeleton`} />
            <div className="product-info skeleton">
            <div className={`ratings ratings-skeleton`} />
            <div className={`product-title product-title-skeleton`} />
            <div className={`product-price product-price-skeleton`} />
            <p className={`product-description product-description-skeleton`} />
            <button className={`collect-button collect-button-skeleton`} />
            </div>
        </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProductDetailPage;
