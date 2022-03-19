const checkAddProductWishlist = ({ wishDB, wishData }) => {
  if (!wishDB) return wishData;

  const newWishDB = [...wishDB.wishlist];
  wishData.forEach((data) => {
    const product = newWishDB.find((db) => db.sku === data.sku);
    if (product) product.quantity += data.quantity;
    if (!product) newWishDB.push(data);
  });
  return newWishDB;
};

export default checkAddProductWishlist;
