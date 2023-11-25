//追加の関数を行う
function addTodo() {
  let input = document.getElementById('todo-input');
  let todoText = input.value.trim();

  if (todoText !== '') {
    let li = document.createElement('li');
    let todoContent = document.createElement('div');
    todoContent.classList.add('todo-content');
    todoContent.textContent = todoText;
    li.appendChild(todoContent);

    addTodoButtons(li);

    document.getElementById('todo-list').appendChild(li);
    input.value = '';
  }
}

//何をすべきかについてボタン関数を追加します
function addTodoButtons(li) {
  let buttonContainer = document.createElement('div');
  buttonContainer.classList.add('button-container');

  buttonContainer.appendChild(createButton('修正', () => editTodo(li)));
  buttonContainer.appendChild(createButton('削除', () => deleteTodo(li)));
  buttonContainer.appendChild(createButton('完了', () => toggleComplete(li, buttonContainer)));

  li.appendChild(buttonContainer);
}

//ボタンの作成ヘルパー機能
function createButton(text, onClickFunction) {
  let button = document.createElement('button');
  button.textContent = text;
  button.onclick = onClickFunction;
  return button;
}

//関数を削除します
function deleteTodo(li) {
  li.parentNode.removeChild(li);
}

//変更関数
function editTodo(li) {
  let currentText = li.firstChild.nodeValue;
  let input = createEditInput(currentText);
  let saveButton = createButton('保存', () => saveEdit(li, input.value));

  li.innerHTML = '';
  li.appendChild(input);
  li.appendChild(saveButton);
}

//入力フィールド生成関数を変更します
function createEditInput(value) {
  let input = document.createElement('input');
  input.type = 'text';
  input.value = value;
  return input;
}

function saveEdit(li, input, todoContent) {
  todoContent.textContent = input.value;
  todoContent.removeChild(input.nextSibling);
}

function toggleComplete(li, buttonContainer) {
  let todoContent = li.querySelector('.todo-content');
  todoContent.classList.toggle('completed');
  let completeButton = buttonContainer.querySelector('button:last-child');
  completeButton.textContent = completeButton.textContent === '完了' ? '未完了' : '完了';
}