export default class Item {
  constructor(description, completed = false, index = new Date().getTime()) {
    this.description = description;
    this.completed = completed;
    this.index = index;
    this.mouseOver = false;
  }

  template(list) {
    const li = document.createElement('li');
    const check = document.createElement('input');
    check.setAttribute('type', 'checkbox');
    const task = document.createElement('textarea');
    
    check.addEventListener('click', checkTask);
    window.addEventListener('load', () => {
      this.completed = !list.list[this.index].completed;
      checkTask();
    });
    task.value = this.description;
    task.setAttribute('wrap', 'soft');
    task.setAttribute('maxlength', '128');
    task.setAttribute('style', 'resize:none;');
    task.setAttribute('onfocus', 'this.style.height = \'0px\'; this.style.height = this.scrollHeight +\'px\'');
    task.setAttribute('autofocus', 'true');
    task.setAttribute('spellcheck', 'false');
    task.setAttribute('id', `${this.index}`);
    task.addEventListener('input', () => {
      list.list[this.index].description = task.value;
      list.updateStorage();
    });
    task.addEventListener('focusout', () => {
      if (task.value.replace('\n', '').replace(' ', '') === '') {
        li.remove();
        list.removeItem(this);
      }
    });
    const taskLabel = document.createElement('label');
    taskLabel.setAttribute('for', `${this.index}`);
    taskLabel.style.display = 'none';
    const options = document.createElement('div');
    const del = document.createElement('i');
    del.setAttribute('class', 'fa-solid fa-trash options');
    del.addEventListener('click', () => {
      li.remove();
      list.removeItem(this);
    });
    const move = document.createElement('i');
    move.setAttribute('class', 'fas fa-ellipsis-v options');
    task.addEventListener('focusin', () => {
      del.setAttribute('style', 'display:block');
      move.setAttribute('style', 'display:none');
    });
    task.addEventListener('focusout', () => {
      if (this.mouseOver) return;
      del.setAttribute('style', 'display:none');
      move.setAttribute('style', 'display:block');
    });
    del.addEventListener('mouseover', () => {
      this.mouseOver = true;
    });
    del.addEventListener('mouseout', () => {
      this.mouseOver = false;
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
