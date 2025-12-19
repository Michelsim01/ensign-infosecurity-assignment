import { createContext, useContext, useState, useEffect, useMemo } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  // Load initial state from LocalStorage
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem('ensign-cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  // Save to LocalStorage whenever cart changes
  useEffect(() => {
    localStorage.setItem('ensign-cart', JSON.stringify(cart));
  }, [cart]);

  // Add product to cart
  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);
      if (existingItem) {
        // If item exists in cart, increase item quantity by 1
        return prevCart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      // else, retrieve everything from the previous cart and add the new item at the end 
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  // remove product from cart
  const removeFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
  };

  // update quantity for a product in cart page
  const updateQuantity = (productId, amount) => {
    setCart((prevCart) => {
      return prevCart
        .map((item) => {
          if (item.id === productId) {
            const newQuantity = item.quantity + amount;
            // If quantity reaches 0 or below, return null to filter it out
            return newQuantity <= 0 ? null : { ...item, quantity: newQuantity };
          }
          return item;
        })
        .filter((item) => item !== null); // Remove items with null (quantity <= 0)
    });
  };

  // Performance: Memoize totals
  const cartCount = useMemo(() => 
    cart.reduce((total, item) => total + item.quantity, 0), [cart]
  );

  const cartTotal = useMemo(() => 
    cart.reduce((total, item) => total + (item.price * item.quantity), 0), [cart]
  );

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity, cartCount, cartTotal }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);