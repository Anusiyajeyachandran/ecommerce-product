import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './cart.css'; 

const Cart = () => {
    const [cartItems, setCartItems] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5000/cart') 
            .then(response => {
                setCartItems(response.data);
            })
            .catch(error => {
                console.error("There was an error fetching the cart data!", error);
            });
    }, []);

    const handleQuantityChange = (index, delta) => {
        const newCartItems = [...cartItems];
        newCartItems[index].quantity += delta;
        setCartItems(newCartItems);
    };

    const handleRemoveItem = (index) => {
        const itemId = cartItems[index].id;
        console.log("push", itemId)
        const newCartItems = cartItems.filter((_, i) => i !== index);
        setCartItems(newCartItems);

        axios.delete(`http://localhost:5000/cart/${itemId}`)
            .then(response => {
                console.log("Item removed successfully.");
            })
            .catch(error => {
                console.error("Error removing item", error);
            });
    };

    return (
        <div className="cart-container">
            {cartItems.map((item, index) => (
                <div key={index} className="cart-item">
                    <img src={item.image} alt={item.name} />
                    <div className="cart-item-details">
                        <h3 className="cart-item-name">{item.name}</h3>
                        <p className="cart-item-description">{item.description}</p>
                    </div>
                    <div className="cart-item-controls">
                        <button onClick={() => handleQuantityChange(index, -1)} disabled={item.quantity === 1}>-</button>
                        <span className="cart-item-quantity">{item.quantity}</span>
                        <button onClick={() => handleQuantityChange(index, 1)}>+</button>
                    </div>
                    <p className="cart-item-price">${item.price}</p>
                    <button onClick={() => handleRemoveItem(index)} className="cart-item-remove">Remove</button>
                </div>
            ))}
        </div>
    );
};

export default Cart;
