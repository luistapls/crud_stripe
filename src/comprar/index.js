require('dotenv').config();

const prompt = require('prompt');
const stripe = require('stripe')(process.env.STRIPE_KEY);

const ProductService = require('../product');

prompt.start();
const productService = new ProductService();

const comprarOption = async () => {
  console.log('\nIndique el numero del producto que desea comprar');
  const arrayProducts = await productService.getProducts();
  productService.mongoDB.closeClient();

  arrayProducts.map((product) =>
    console.log(`[${product.number}] ${product.name} ${product.cost}$`),
  );
  const { productNumber } = await prompt.get('productNumber');

  const productName = arrayProducts[Number(productNumber) - 1].name;
  const productCost = arrayProducts[Number(productNumber) - 1].cost;

  console.log('\nNumero de la tarjeta');
  const { number } = await prompt.get('number');

  console.log('\nNumero del mes de vencimiento');
  const { exp_month } = await prompt.get('exp_month');

  console.log('\nAño de vencimiento');
  const { exp_year } = await prompt.get('exp_year');

  console.log('\nCVC');
  const { cvc } = await prompt.get('cvc');

  console.log('\nIndique su correo');
  const { email } = await prompt.get('email');

  console.log('\nIndique su nombre y apellido');
  const { name } = await prompt.get('name');

  const paymentMethod = await stripe.paymentMethods.create({
    type: 'card',
    card: {
      number,
      exp_month,
      exp_year,
      cvc,
    },
  });

  const customer = await stripe.customers.create({
    email,
    payment_method: paymentMethod.id,
    name,
  });

  await stripe.paymentIntents.create({
    amount: productCost * 100,
    currency: 'usd',
    confirm: true,
    customer: customer.id,
    payment_method: paymentMethod.id,
  });

  console.log(`Ha comprado ${productName} con un costo de ${productCost}$`);
  console.log('Gracias por su compra.');
};

module.exports = comprarOption;
