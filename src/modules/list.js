export default class List {
  constructor(ItemType, listName, storageName = 'list') {
    this.ItemType = ItemType;
    this.storageName = storageName;
    this.listName = listName;
    this.list = {};
  }

  addItem(item) {
    this.list[item.index] = item;
    this.updateStorage();
  }

  removeItem(item) {
    delete this.list[item.index];
    this.updateStorage();
  }

}
