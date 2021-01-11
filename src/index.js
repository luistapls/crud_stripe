const prompt = require('prompt');
const crudOption = require('./crud');
const comprarOption = require('./comprar/index');

prompt.start();

const main = async () => {
  console.log('¡Bienvenido! \n[1] Comprar \n[2] CRUD \n[3] Salir');
  const { numberOption } = await prompt.get('numberOption');
  switch (numberOption) {
    case '1':
      comprarOption();
      break;
    case '2':
      crudOption();
      break;
    case '3':
      break;
    default:
  }
};

main();
