const CART_KEY = "cart";
const PURCHASED_KEY = "purchasedBooks";

// 🔹 helper: normalize book id
const getBookId = (book) => book._id || book.id;

// get all cart items
export const getCartList = () => {
  return JSON.parse(localStorage.getItem(CART_KEY)) || [];
};

// get purchased book ids
const getPurchasedIds = () => {
  return JSON.parse(
    localStorage.getItem(PURCHASED_KEY)
  ) || [];
};

// add to cart
export const addToCartList = (book) => {
  const cart = getCartList();
  const purchasedIds = getPurchasedIds();

  const bookId = getBookId(book);

  // ❌ already purchased
  if (purchasedIds.includes(bookId)) {
    alert("You already purchased this book 📚");
    return;
  }

  // ❌ already in cart
  const exists = cart.find(
    (item) => (item._id || item.id) === bookId
  );

  if (exists) {
    alert("This book is already in your cart");
    return;
  }

  // ✅ normalize & add
  const normalizedBook = {
    ...book,
    _id: bookId,
  };

  localStorage.setItem(
    CART_KEY,
    JSON.stringify([...cart, normalizedBook])
  );

  window.dispatchEvent(new Event("cartUpdated"));
};

// remove from cart
export const removeFromCartList = (id) => {
  const cart = getCartList();

  const updatedCart = cart.filter(
    (item) => (item._id || item.id) !== id
  );

  localStorage.setItem(
    CART_KEY,
    JSON.stringify(updatedCart)
  );

  window.dispatchEvent(new Event("cartUpdated"));
};

// clear cart
export const clearCartList = () => {
  localStorage.removeItem(CART_KEY);
  window.dispatchEvent(new Event("cartUpdated"));
};
