import { NavLink } from "react-router-dom";
import { useState } from "react";
import {
  getCartList,
  removeFromCartList,
} from "../../Data/addToCartList";

const Cart = () => {
  const [cartItems, setCartItems] = useState(getCartList());

  // 🔥 Remove item from cart
  const handleRemove = (id) => {
    removeFromCartList(id);
    setCartItems(getCartList());

    // notify navbar to update count
    window.dispatchEvent(new Event("cartUpdated"));
  };

  // 🧮 Total price
  const totalPrice = cartItems.reduce(
    (sum, item) => sum + Number(item.price),
    0
  );

  // 🛑 Empty cart
  if (cartItems.length === 0) {
    return (
      <div className="max-w-5xl mx-auto px-6 py-20 text-center">
        <h2 className="text-2xl font-bold mb-4">
          Your cart is empty
        </h2>
        <NavLink to="/all-books">
          <button className="bg-[#3059b8] text-white px-6 py-2 rounded">
            Browse Books
          </button>
        </NavLink>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-16">
      <h1 className="text-2xl font-bold mb-8">
        Shopping Cart
      </h1>

      {/* Cart Items */}
      <div className="space-y-6">
        {cartItems.map((book) => (
          <div
            key={book.id}
            className="flex flex-col md:flex-row items-center gap-6 border-b pb-4"
          >
            {/* Image */}
            <img
              src={book.coverimage}
              alt={book.name}
              className="w-28 h-36 object-cover rounded"
            />

            {/* Info */}
            <div className="flex-1">
              <h3 className="font-semibold text-lg">
                {book.name}
              </h3>
              <p className="text-sm text-gray-500">
                Language: {book.language}
              </p>
            </div>

            {/* Price */}
            <p className="font-semibold text-[#3059b8]">
              ৳ {book.price}
            </p>

            {/* Remove */}
            <button
              onClick={() => handleRemove(book.id)}
              className="text-red-500 hover:underline"
            >
              Remove
            </button>
          </div>
        ))}
      </div>

      {/* Summary */}
      <div className="mt-10 flex flex-col md:flex-row justify-between items-center gap-6">
        <p className="text-lg font-semibold">
          Total: <span className="text-[#3059b8]">৳ {totalPrice}</span>
        </p>

        <NavLink to="/checkout">
          <button className="bg-[#3059b8] text-white px-8 py-2 rounded">
            Proceed to Checkout
          </button>
        </NavLink>
      </div>
    </div>
  );
};

export default Cart;
