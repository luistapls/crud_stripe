const prompt = require('prompt');
const ProductService = require('./product');

const productService = new ProductService();

prompt.start();

const deleteOption = async () => {
  console.log('\nDELETE');
  console.log('\nIndique el número del producto');
  const { productNumber } = await prompt.get('productNumber');
  await productService.deleteProduct(Number(productNumber));
  console.log('Se ha borrado con exito el producto #', productNumber);
};

module.exports = deleteOption;
