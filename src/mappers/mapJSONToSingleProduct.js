import Product from '../models/Product';

/**
 * Maps the dummyJSON data to a Product instance.
 * @param {Object} item - A single product object from the JSON API.
 * @returns {Product} - A Product instance.
 */
function mapJSONToSingleProduct(item) {
  const id = item.id;
  const title = item.title;
  const category = item.category;
  const price = item.price;

  const description = item.description;
  const image = item.images[0];

  const rating = item.rating;

  // Discount handling
  const discount = item.discountPercentage;

  // Instock handling
  const instock = item.stock > 0;

  return new Product(id, title, category, price, image, description, rating, discount, instock);
}

export default mapJSONToSingleProduct;
