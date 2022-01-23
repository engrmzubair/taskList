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
  //DOM load event
  document.addEventListener('DOMContentLoaded', getTasks);
  //add task event
  form.addEventListener('submit', addTask);
  //Remove task
  taskList.addEventListener('click', removeTask);
  //clear all tasks
  clearBtn.addEventListener('click', clearTasks);
  //filter tasks
  filter.addEventListener('keyup', filterTask)
}

//get tasks
function getTasks() {
  let tasks;
  if (localStorage.getItem('tasks') === null)
    tasks = [];
  else
    tasks = JSON.parse(localStorage.getItem('tasks'));
  tasks.forEach(task => {
    //create Element from scratch
    const li = document.createElement('li');
    //add class
    li.className = 'collection-item';
    //create text node and append to li
    li.appendChild(document.createTextNode(task));
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
  })
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
  //add task to local storage
  storeTaskInLocalStorage(taskInput.value);
  //clear input
  taskInput.value = '';
  e.preventDefault();
}
//remove task
function removeTask(e) {
  if (e.target.parentElement.classList.contains('delete-item') && confirm('Are You Sure?'))
    e.target.parentElement.parentElement.remove();
  //remove task from local storage
  removeTaskFromLocalStorage(e.target.parentElement.parentElement)
}
//add task to local storage
function storeTaskInLocalStorage(task) {
  let tasks;
  if (localStorage.getItem('tasks') === null)
    tasks = [];
  else
    tasks = JSON.parse(localStorage.getItem('tasks'));
  tasks.push(task);
  localStorage.setItem('tasks', JSON.stringify(tasks));

  console.log(tasks);
}
//remove task from local storage
function removeTaskFromLocalStorage(taskItem) {
  let tasks;
  if (localStorage.getItem('tasks') === null)
    tasks = [];
  else
    tasks = JSON.parse(localStorage.getItem('tasks'));

  tasks.forEach((task, index) => {
    if (task === taskItem.textContent)
      tasks.splice(index, 1);
  });
  localStorage.setItem('tasks', JSON.stringify(tasks));
}
//clear all tasks 
function clearTasks() {
  if (confirm('Are You Sure?'))
    while (taskList.firstChild)
      taskList.removeChild(taskList.firstChild);
  //clear all tasks from local storage
  clearAllTaskFromLocalStorage();
}
//clear all from ls
function clearAllTaskFromLocalStorage() {
  localStorage.clear();
}
//filter task
function filterTask(e) {
  const text = e.target.value.toLowerCase();
  document.querySelectorAll('.collection-item').forEach(task => {
    const item = task.firstChild.textContent;
    if (item.toLowerCase().indexOf(text) != -1)
      return task.style.display = 'block';
    task.style.display = 'none';
  });
}