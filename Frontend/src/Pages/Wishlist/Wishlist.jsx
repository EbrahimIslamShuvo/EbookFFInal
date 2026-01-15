const Wishlist = () => {
  const wishlist =
    JSON.parse(localStorage.getItem("wishlist")) || [];

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      <h1 className="text-2xl font-bold mb-6">Wishlist</h1>

      {wishlist.length === 0 ? (
        <p>No items in wishlist</p>
      ) : (
        wishlist.map(item => (
          <p key={item.id}>{item.name}</p>
        ))
      )}
    </div>
  );
};

export default Wishlist;
