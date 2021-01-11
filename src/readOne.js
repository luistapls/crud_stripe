const prompt = require('prompt');
const ProductService = require('./product');

const productService = new ProductService();

prompt.start();

const readOneOption = async () => {
  console.log('\nIndique el número del producto');
  const { productNumber } = await prompt.get('productNumber');
  console.log(await productService.getProduct(Number(productNumber)));
};

module.exports = readOneOption;
