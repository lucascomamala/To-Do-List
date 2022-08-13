import './style.css';
import HTMLTemplate from './modules/htmlTemplate.js';
import Item from './modules/listItem.js';
import List from './modules/list.js';

// Builds list HTML
const myapp = document.getElementById('list-app');
const template = document.createElement('div');
const listTitle = 'Today\'s To Do:';
const inputName = 'add-todo';
const btnName = 'add-task';
const listName = 'to-do';
const clearName = `clear-${listName}`;
template.innerHTML = HTMLTemplate(listTitle, inputName, btnName, listName, clearName);
template.classList.add('template');
myapp.appendChild(template);

// Page elements selectors
const input = document.querySelector(`#${inputName}`);
const button = document.querySelector(`#${btnName}`);
const domList = document.querySelector(`#${listName}`);

const list = new List(Item, listName, 'list');

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

render();
