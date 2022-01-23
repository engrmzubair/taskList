//define UI vars
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');


//loadEventsListeners
loadEventListeners();

//load all event listener
function loadEventListeners() {
  //add task event
  form.addEventListener('submit', addTask);
}

//add task
function addTask(e) {
  if (taskInput.value === '')
    return alert('Add a Task');

  //create Element from scratch
  const li = document.createElement('li');
  //add class
  li.className = 'collection-item';
  //create text node and append to li
  li.appendChild(document.createTextNode(taskInput.value));
  //create new link element
  const link = document.createElement('a');
  //add class
  link.className = 'delete-item secondary-content';
  //add icon html
  link.innerHTML = `<i class = 'fa fa-remove'></i>`;
  //append link to li
  li.appendChild(link);
  //append li to ul
  taskList.appendChild(li);
  alert('Task Added');
  //clear input
  taskInput.value = '';

  console.log(li);



  e.preventDefault();
}