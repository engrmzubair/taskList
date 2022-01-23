//define UI vars
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-task');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

//loadEventsListeners
loadEventListeners();

//load all event listener
function loadEventListeners() {
  //add task event
  form.addEventListener('submit', addTask);
  //Remove task
  taskList.addEventListener('click', removeTask);
  //clear all tasks
  clearBtn.addEventListener('click', clearTasks);
  //filter tasks
  filter.addEventListener('keyup', filterTask)
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
  // alert('Task Added');
  //clear input
  taskInput.value = '';

  e.preventDefault();
}
//remove task
function removeTask(e) {
  if (e.target.parentElement.classList.contains('delete-item'))
    if (confirm('Are You Sure?'))
      e.target.parentElement.parentElement.remove();
}
//clear all tasks 
function clearTasks() {
  if (confirm('Are You Sure?'))
    while (taskList.firstChild)
      taskList.removeChild(taskList.firstChild);
}
function filterTask(e) {
  const text = e.target.value.toLowerCase();
  document.querySelectorAll('.collection-item').forEach(task => {
    const item = task.firstChild.textContent;
    if (item.toLowerCase().indexOf(text) != -1)
      return task.style.display = 'block';
    task.style.display = 'none';
  })
}