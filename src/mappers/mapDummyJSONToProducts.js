import Product from '../models/Product';

/**
 * Maps the dummyJSON data to an array of Product instances.
 * @param {Array} data - An array of products from the dummyJSON API.
 * @returns {Array} - An array of Product instances.
 */
function mapDummyJSONToProducts(data) {
  return data.map((item) => {
    const id = item.id;
    const title = item.title;
    const category = item.category;
    
    // Price handling
    let price;
    if (item.price < 50) {
      price = 5;
    } else if (item.price >= 50 && item.price < 100) {
      price = 10;
    } else if (item.price >= 100 && item.price < 1000) {
      price = 15;
    } else {
      price = 20;
    }

    const description = item.description;
    const image = item.images[0];
    
    // Rating handling
    let rating;
    if (item.rating < 4.5) {
      rating = 3;
    } else if (item.rating >= 4.5 && item.rating < 4.75) {
      rating = 4;
    } else {
      rating = 5;
    }
    
    // Discount handling
    const discount = Math.random() < 0.1 ? 20 : 0;
    
    // Instock handling
    const instock = Math.random() >= 0.1;

    return new Product(id, title, category, price, image, description, rating, discount, instock);
  });
}

export default mapDummyJSONToProducts;
