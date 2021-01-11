const prompt = require('prompt');
const ProductService = require('./product');

const productService = new ProductService();

prompt.start();

const createOption = async () => {
  console.log('\nCREATE');
  const { name, cost } = await prompt.get(['name', 'cost']);
  const product = {
    number: (await productService.countCollectionProducts()) + 1,
    name,
    cost: Number(cost),
  };
  await productService.createProduct({ product });
  console.log(`Se ha creado con exito el siguiente producto: ${name} ${cost}$`);
};

module.exports = createOption;
