const prompt = require('prompt');
const ProductService = require('./product');

const productService = new ProductService();

prompt.start();

const updateOption = async () => {
  console.log('\nUPDATE');
  console.log('\nIndique el número del producto');
  const { productNumber } = await prompt.get('productNumber');
  console.log('\nActualice el producto #', productNumber);
  const { name, cost } = await prompt.get(['name', 'cost']);

  const product = {
    name,
    cost: Number(cost),
  };

  await productService.updateProduct(Number(productNumber), product);
  console.log('Se ha actualizado con exito el producto #', productNumber);
};

module.exports = updateOption;
