const MongoLib = require('./mongo');

class ProductService {
  constructor() {
    this.collection = 'project_1';
    this.mongoDB = new MongoLib();
  }

  async getProducts() {
    const products = await this.mongoDB.getAll(this.collection);
    // this.mongoDB.closeClient();
    return products || [];
  }

  async getProduct(productNumber) {
    const product = await this.mongoDB.get(this.collection, productNumber);
    this.mongoDB.closeClient();
    return product || {};
  }

  async createProduct({ product }) {
    await this.mongoDB.create(this.collection, product);
    this.mongoDB.closeClient();
  }

  async updateProduct(productNumber, product) {
    await this.mongoDB.update(this.collection, productNumber, product);
    this.mongoDB.closeClient();
  }

  async deleteProduct(productNumber) {
    const arrayProducts = await this.getProducts();
    arrayProducts.map(async (product) => {
      if (product.number > productNumber) {
        const productUpdate = {
          number: product.number - 1,
        };
        await this.updateProduct(product.number, productUpdate);
      }
    });

    await this.mongoDB.delete(this.collection, productNumber);
    this.mongoDB.closeClient();
  }

  async countCollectionProducts() {
    return this.mongoDB.countCollection(this.collection);
  }
}

module.exports = ProductService;
