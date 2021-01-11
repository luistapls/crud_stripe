const prompt = require('prompt');
const ProductService = require('./product');
const readOneOption = require('./readOne');

const productService = new ProductService();

prompt.start();

const readOption = async () => {
  console.log('\nREAD');
  console.log(
    '[1] Leer todos los productos \n[2] Leer un producto \n[3] Salir',
  );
  const { numberOption } = await prompt.get('numberOption');
  switch (numberOption) {
    case '1':
      console.log(await productService.getProducts());
      break;
    case '2':
      readOneOption();
      break;
    case '3':
      break;
    default:
  }
  // await productService.createProduct({ product });
};

module.exports = readOption;
