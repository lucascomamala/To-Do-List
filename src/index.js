import './style.css';
// import HTMLTemplate from './modules/htmlTemplate.js';
// import Item from './modules/listItem.js';
// import List from './modules/list.js';
const TEMP = require('./modules/htmlTemplate.js');
const ITEM = require('./modules/listItem.js');
const LIST = require('./modules/list.js');

// Builds list HTML
const myapp = document.getElementById('list-app');
const template = document.createElement('div');
const listTitle = 'Today\'s To Do:';
const inputName = 'add-todo';
const btnName = 'add-task';
const listName = 'to-do';
const clearName = `clear-${listName}`;
template.innerHTML = TEMP.HTMLTemplate(listTitle, inputName, btnName, listName, clearName);
template.classList.add('template');
myapp.appendChild(template);

// Page elements selectors
const input = document.querySelector(`#${inputName}`);
const button = document.querySelector(`#${btnName}`);
const domList = document.querySelector(`#${listName}`);
const clearBtn = document.querySelector(`#${clearName}`);

const list = new LIST.List(ITEM.Item, listName, 'list');

const render = (newItem = false) => {
  if (newItem) {
    const item = newItem.template(list);
    setTimeout(() => {}, 0);
    domList.appendChild(item);
  } else {
    domList.innerHTML = '';
    list.renderItems().forEach((item) => {
      setTimeout(() => {}, 0);
      domList.appendChild(item);
    });
  }
  input.select();
};

// Add a new element to the list
button.addEventListener('click', () => {
  if (input.value.replace('\n', '').replace(' ', '') === '') return; // if user hasn't entered input
  render(list.addItem(input.value));
  input.value = '';
});

input.addEventListener('keypress', (event) => {
  if (event.key === 'Enter' && event.shiftKey) return;
  if (event.key === 'Enter') {
    button.dispatchEvent(new Event('click'));
  }
});

clearBtn.addEventListener('click', () => {
  list.clearCompleted();
  render();
});

render();
