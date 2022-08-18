// const LIST = require('./modules/list.js');
// const ITEM = require('./modules/listItem.js');
import Item from "./modules/listItem.js";
import List from "./modules/list.js";



describe('Add and remove', () => {
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
});

describe("DOM Tests", () => {
  jest.mock("./index");
  const list1 = new List(Item, "testing list", "test list sto");
  test("Expect addItem to add to DOM", () => {
    document.body.innerHTML = "<div>" + '<ul id="list"></ul>' + "</div>";
    const item = (list1.addItem("Task 1")).template();
    document.querySelector("#list").appendChild(item);
    const check = document.querySelectorAll("#list li");
    expect(check).toHaveLength(1);
  });
});