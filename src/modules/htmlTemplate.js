const HTMLTemplate = (title, input, btn, list) => `
<div class="list-title">
  <label>${title}</label>
  <button class="fa-solid fa-arrows-rotate undo" id="sort${list}" aria-label="Undo task repositioning"></button>
</div>
<ul class="list">
  <li class="addItems">
    <input id="${input}" maxlength="128" placeholder="Add to your list..." spellcheck="false">
    <button id="${btn}" class="add-item">↵</button>
  </li>
</ul>
<div class="clear"><a href="#" onclick="return false;">Clear all completed</a></div>
`;

export default HTMLTemplate;
