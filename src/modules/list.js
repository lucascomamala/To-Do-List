// import Item from './listItem.js';
const ITEM = require('./listItem.js');

class List {
  constructor(ItemType, listName, storageName = 'list') {
    this.ItemType = ItemType;
    this.storageName = storageName;
    this.listName = listName;
    this.list = [];
    this.retrieveStorage();
  }

  clearCompleted() {
    this.list = this.list.filter((item) => !item.completed);
    this.fixIndexes();
    this.updateStorage();
  }

  fixIndexes() {
    for (let i = 0; i < this.list.length; i += 1) {
      this.list[i].index = i;
    }
  }

  addItem(value) {
    const newItem = new ITEM.Item(value, this.list.length);
    this.list[newItem.index] = newItem;
    this.updateStorage();
    return newItem;
  }

  removeItem(item) {
    this.list.splice(item.index, 1);
    this.fixIndexes();
    this.updateStorage();
  }

  removeItemByIndex(index) {
    this.list.splice(index, 1);
    this.fixIndexes();
    this.updateStorage();
  }

  updateStorage() {
    localStorage.setItem(this.storageName, JSON.stringify(this.list));
  }

  retrieveStorage() {
    if (localStorage.getItem(this.storageName) === null) {
      this.updateStorage();
    } else {
      const tempList = JSON.parse(localStorage.getItem(this.storageName));
      Object.values(tempList).forEach((item) => {
        this.list[item.index] = new this.ItemType(item.description, item.index, item.completed);
      });
    }
  }

  renderItems() {
    const renders = [];
    Object.values(this.list).forEach((item) => {
      renders.push(item.template(this));
    });
    return renders;
  }
}

exports.List = List;
