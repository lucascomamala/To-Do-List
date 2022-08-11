import './style.css';
import HTMLTemplate from './modules/htmlTemplate.js';
import Item from './modules/listItem.js';

// Hard-coded list, will remove later
const tasks = [];
tasks.push(new Item('Take out trash'));
tasks.push(new Item('Walk the dog'));
tasks.push(new Item('Buy groceries'));

const myapp = document.getElementById('list-app');
const template = document.createElement('div');
const listTitle = 'Today\'s To Do:';
const inputName = 'add-todo';
const btnName = 'add-task';
const listName = 'to-do';
template.innerHTML = HTMLTemplate(listTitle, inputName, btnName, listName);
template.classList.add('template');
myapp.appendChild(template);

const taskList = document.querySelector('.list');
tasks.forEach((item) => {
  taskList.appendChild(item.template());
});
