const LIST = require('./list.js');
const ITEM = require('./listItem.js');

describe('Add and remove', () => {
  const list = new LIST.List(ITEM.Item, 'testing list', 'test list sto');
  test('Expect addItem to increase list length', () => {
    const listLength = list.list.length;
    list.addItem('Hola');
    expect(list.list.length).toBe(listLength + 1);
  });
  test('Expect removeItem to increase list length', () => {
    const listLength = list.list.length;
    list.removeItemByIndex(0);
    expect(list.list.length).toBe(listLength - 1);
  });
});
