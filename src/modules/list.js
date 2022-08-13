import Item from './listItem.js';

export default class List {
  constructor(ItemType, listName, storageName = 'list') {
    this.ItemType = ItemType;
    this.storageName = storageName;
    this.listName = listName;
    this.list = [];
    this.retrieveStorage();
  }

  assignIndex() {

    return this.list.length;
  }

  fixIndexes() {
    for (let i = 0; i < this.list.length; i++) {
      this.list[i].index = i;
      console.log(this.list[i].index)
    }

  }

  addItem(value) {
    let i = this.assignIndex();
    const newItem = new Item(value, i);
    this.assignIndex();
    this.list[newItem.index] = newItem;
    this.updateStorage();
    return newItem;
  }

  removeItem(item) {
    this.list.splice(item.index, 1)
    this.fixIndexes();
    this.updateStorage();
  }

  updateStorage() {
    localStorage.setItem(this.storageName, JSON.stringify(this.list));
  }

  retrieveStorage() {
    if (localStorage.getItem(this.storageName) === null) {
      this.updateStorage();
    }
    else {
      const tempList = JSON.parse(localStorage.getItem(this.storageName));
      Object.values(tempList).forEach((item) => {
        this.list[item.index] = new this.ItemType(item.description, item.index, item.completed);
      });
    }
  }

  renderItems() {
    const renders = [];
    Object.values(this.list).forEach((item, i) => {
      renders.push(item.template(this));
    });
    return renders;
  }
}
