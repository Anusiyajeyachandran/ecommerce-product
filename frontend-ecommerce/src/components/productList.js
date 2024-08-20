
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './productList.css'; 

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [inputValue, setInputValue] = useState('1');
 

  useEffect(() => {
    
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/products'); // Replace with your API endpoint
        console.log("data",response.data)
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products', error);
      }
    };

    fetchProducts();
  }, []);

  const handleAddToCart = (product) => {
    console.log('Add to Cart:', product);
    let requestBody = {}
    requestBody.product_id = product.id;
    requestBody.quantity = inputValue;
    console.log("result",requestBody)
    axios.post(`http://localhost:5000/cart`, requestBody)
    .then(response => {
        console.log("Quantity updated successfully:", response.data);
    })
    .catch(error => {
        console.error("There was an error updating the quantity!", error);
    });

    
  };
  const handleInputChange = (event) => {
    console.log("data",event.target.value)
    setInputValue(event.target.value); 
};

  return (
    <div className="product-list">
      {products.map((product) => (
        <div key={product.id} className="product-item">
          <img src={product.image} alt={product.name} className="product-image" />
          <div className="product-details">
            <h2 className="product-name">{product.name}</h2>
            <p className="product-price">${product.price}</p>
            <div className="product-quantity">
              <label>Quantity:</label>
              <input type="number" defaultValue="1" min="1"  value={inputValue}
                onChange={handleInputChange}/>

            </div>
            <button className="add-to-cart-button" onClick={() => handleAddToCart(product)}>
              Add to Cart
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductList;



