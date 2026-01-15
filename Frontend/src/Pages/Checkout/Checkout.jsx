import { authHeader, API_BASE_URL } from "../../config/api";

const Checkout = ({ book }) => {
  const handlePayment = async () => {
    const res = await fetch(`${API_BASE_URL}/payment/init`, {
      method: "POST",
      headers: authHeader(),
      body: JSON.stringify({
        bookId: book._id,
        amount: book.price,
      }),
    });

    const data = await res.json();
    window.location.href = data.url;
  };

  return <button onClick={handlePayment}>Pay Now</button>;
};

export default Checkout;
