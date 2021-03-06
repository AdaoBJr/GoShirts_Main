const decreaseProductWishlist = ({ wishDB, wishData }) => {
  const newWishDB = [...wishDB.items];
  wishData.forEach((data) => {
    const product = newWishDB.find((db) => db.sku === data.sku);
    if (product) {
      const decrease = product.quantity - data.quantity;
      if (decrease < 0) product.quantity = 0;
      if (decrease >= 0) product.quantity = decrease;
    }
  });
  return newWishDB.filter((item) => item.quantity !== 0);
};

export default decreaseProductWishlist;
