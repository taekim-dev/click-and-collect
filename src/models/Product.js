/**
 * Represents a product.
 */
class Product {
    /**
     * @param {number} id - The unique identifier for the product.
     * @param {string} title - The title of the product.
     * @param {string} category - The category of the product.
     * @param {number} price - The price of the product.
     * @param {string} image - The image URL of the product.
     * @param {string} description - The description of the product.
     * @param {number} rating - The rating of the product.
     * @param {number} discount - The discount percentage of the product.
     * @param {boolean} instock - The in-stock status of the product.
     */
    constructor(id, title, category, price, image, description, rating, discount, instock) {
      this.id = id;
      this.title = title;
      this.category = category;
      this.price = price;
      this.image = image;
      this.description = description;
      this.rating = rating;
      this.discount = discount;
      this.instock = instock;
    }
  }
  
  export default Product;