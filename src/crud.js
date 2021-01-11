const prompt = require('prompt');
const createOption = require('./create');
const readOption = require('./read');
const updateOption = require('./update');
const deleteOption = require('./delete');

prompt.start();

const crudOption = async () => {
  console.log('\nCRUD');
  console.log('[1] Create \n[2] Read \n[3] Update \n[4] Delete \n[5] Salir');
  const { numberOption } = await prompt.get('numberOption');
  switch (numberOption) {
    case '1':
      createOption();
      break;
    case '2':
      readOption();
      break;
    case '3':
      updateOption();
      break;
    case '4':
      deleteOption();
      break;
    case '5':
      break;
    default:
  }
};

module.exports = crudOption;
