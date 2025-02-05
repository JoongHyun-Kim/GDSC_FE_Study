const toDoForm = document.getElementById('todo-form');
const toDoInput = toDoForm.querySelector('#todo-form input');
const toDoList = document.getElementById('todo-list');

const TODOS_KEY = 'todos';

let toDos = [];
//let percentage;

function saveToDos() {
   localStorage.setItem(TODOS_KEY, JSON.stringify(toDos));
}

function toggleToDo(event) {
   const target = event.target;
   if (target.style.textDecoration !== 'line-through') {
      target.style.textDecoration = 'line-through';
      target.style.color = 'gray';
   } else {
      target.style.textDecoration = 'none';
      target.style.color = 'white';
   }
}

/*
function getPercentage() {
   const parsedToDos = JSON.parse(savedToDos);
   toDos = parsedToDos;

   if (toDoList.childElementCount !== 0) {
      percentage = (done / parsedToDos.length) * 100;
   } else {
      percentage = 0;
   }
}
*/

function deleteToDo(event) {
   const li = event.target.parentElement;
   li.remove();
   toDos = toDos.filter((toDo) => toDo.id !== parseInt(li.id));
   saveToDos();
}
function paintToDo(newTodo) {
   const li = document.createElement('li');
   li.id = newTodo.id;
   const span = document.createElement('span');
   span.innerText = `📌 ${newTodo.text}`;
   const button = document.createElement('button');
   button.innerText = '✘';
   button.style.padding = '0';
   button.style.marginLeft = '5px';
   button.style.border = '0';
   button.style.background = `none`;
   button.addEventListener('click', deleteToDo);
   li.appendChild(span);
   li.appendChild(button);
   toDoList.appendChild(li);
}

function handleToDoSubmit(event) {
   event.preventDefault();
   const newTodo = toDoInput.value;
   toDoInput.value = '';
   const newTodoObj = {
      text: newTodo,
      id: Date.now(),
   };
   toDos.push(newTodoObj);
   paintToDo(newTodoObj);
   saveToDos();
}

toDoForm.addEventListener('submit', handleToDoSubmit);
toDoList.addEventListener('click', toggleToDo);

const savedToDos = localStorage.getItem(TODOS_KEY);

if (savedToDos !== null) {
   const parsedToDos = JSON.parse(savedToDos);
   toDos = parsedToDos;
   parsedToDos.forEach(paintToDo);
}
