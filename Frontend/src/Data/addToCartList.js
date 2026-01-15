const CART_KEY = "cart";

// get all cart items
export const getCartList = () => {
  return JSON.parse(localStorage.getItem(CART_KEY)) || [];
};

// add to cart (NO DUPLICATE)
export const addToCartList = (book) => {
  const cart = getCartList();

  const exists = cart.find(item => item.id === book.id);
  if (exists) {
    alert("This book is already in cart!");
    return;
  }

  localStorage.setItem(CART_KEY, JSON.stringify([...cart, book]));

  // 🔥 notify navbar
  window.dispatchEvent(new Event("cartUpdated"));
};

export const removeFromCartList = (id) => {
  const cart = getCartList().filter(item => item.id !== id);
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
  window.dispatchEvent(new Event("cartUpdated"));
};

export const clearCartList = () => {
  localStorage.removeItem(CART_KEY);
  window.dispatchEvent(new Event("cartUpdated"));
};
