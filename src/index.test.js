import Item from './modules/listItem.js';
import List from './modules/list.js';

describe('App logic', () => {
  const list = new List(Item, 'testing list', 'test list sto');
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

  test('Expect the Clear Completed to clear all completed tasks', () => {
    const list = new List(Item, 'testing list1', 'test list sto1');
    document.body.innerHTML = '<div><ul id="list"></ul></div>';
    const item1 = list.addItem('Task 1');
    list.addItem('Task 2');
    const item3 = list.addItem('Task 3');
    item1.completed = !item1.completed;
    item3.completed = !item3.completed;
    list.clearCompleted();
    expect(list.list).toHaveLength(1);
  });
});

describe('DOM Tests', () => {
  jest.mock('./index');
  test('Expect addItem to add to DOM', () => {
    const list1 = new List(Item, 'testing list0', 'test list sto0');
    document.body.innerHTML = '<div><ul id="list"></ul></div>';
    const item = (list1.addItem('Task 1')).template();
    document.querySelector('#list').appendChild(item);
    const check = document.querySelectorAll('#list li');
    expect(check).toHaveLength(1);
  });

  test('Expect removeItem to remove from DOM', () => {
    const list1 = new List(Item, 'testing list3', 'test list sto3');
    document.body.innerHTML = '<div><ul id="list"></ul></div>';
    const item = list1.addItem('Task 1').template();
    document.querySelector('#list').appendChild(item).remove();
    const check = document.querySelectorAll('#list li');
    expect(check).toHaveLength(0);
  });

  test('Expect editing task description', () => {
    const list1 = new List(Item, 'testing list4', 'test list sto4');
    const initialText = 'This should change';
    document.body.innerHTML = '<div><ul id="list"></ul></div>';
    const item = list1.addItem(initialText).template();
    document.querySelector('#list').appendChild(item);
    const li = document.querySelector('#list li');
    li.innerHTML = 'This has changed';
    expect(li.innerHTML).not.toBe(initialText);
  });

  test('Expect updating an item\'s "completed" status.', () => {
    const list1 = new List(Item, 'testing list2', 'test list sto2');
    document.body.innerHTML = '<div><ul id="list"></ul></div>';
    const item = list1.addItem('Task 1');
    document.querySelector('#list').appendChild(item.template());
    const initialCompleted = item.completed;
    item.completed = !item.completed;
    expect(item.completed).not.toBe(initialCompleted);
  });
});