export default class ListItem {
  constructor(description, completed = false, index = new Date().getTime()) {
    this.description = description;
    this.completed = completed;
    this.index = index;
  }

  template(list) {
    const li = document.createElement('li');
    const check = document.createElement('input');
    check.setAttribute('type', 'checkbox');
    check.setAttribute('aria-label', 'Check completed task');
    const task = document.createElement('textarea');
    task.value = this.description;
    task.setAttribute('maxlength', '128');
    task.setAttribute('style', 'resize:none;');
    task.setAttribute('spellcheck', 'false');
    task.setAttribute('id', `${this.index}`);
    const taskLabel = document.createElement('label');
    taskLabel.setAttribute('for', `${this.index}`);
    taskLabel.style.display = 'none';
    const options = document.createElement('div');
    const del = document.createElement('i');
    del.setAttribute('class', 'fa-solid fa-trash options');
    del.addEventListener('click', () => {
      document.querySelector('myapp').remove(li);
      list.removeItem(this);
    });
    const move = document.createElement('i');
    move.setAttribute('class', 'fas fa-ellipsis-v options');
    task.addEventListener('focusin', () => {
      del.setAttribute('style', 'display:block');
      move.setAttribute('style', 'display:none');
    });
    task.addEventListener('focusout', () => {
      del.setAttribute('style', 'display:none');
      move.setAttribute('style', 'display:block');
    });
    move.setAttribute('style', 'display:block;');
    options.appendChild(del);
    options.appendChild(move);

    li.appendChild(check);
    li.appendChild(task);
    li.appendChild(taskLabel);
    li.appendChild(options);
    return li;
  }
}
