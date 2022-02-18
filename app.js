const form = document.querySelector('#task-form');
const toDoInput = document.querySelector('#task');
const template = document.querySelector('template');
const list = document.querySelector('.collection');
const LOCAL_STORAGE_PREFIX = 'ADVANCED_TASKS_LIST';
const TASKS_STORAGE_KEY = `${LOCAL_STORAGE_PREFIX}-TASKS`;
const alert = document.querySelector('#alert');
const filter = document.querySelector('#filter');
const clearAll = document.querySelector('.clear-task');



init();


//initiate functions 
function init() {

  // get tasks from local strorage
  let tasks = getTasks();

  //render tasks
  renderTask(tasks);

}

//add event listener to clearAll button
clearAll.addEventListener('click', () => {

  //remove alert
  removeAlert();

  if (list.innerText == '') {
    //show alert
    getAlert('There are no tasks available to remove', 'danger', 'success')

    return setTimeout(removeAlert, 3000);
  }


  //clear all tasks from storage
  clearAllTasks();

  //clear list
  list.innerText = '';

  //show alert
  getAlert('All tasks has been deleted', 'danger', 'success');

  //remove alert after 3 seconds
  setTimeout(removeAlert, 3000);
})

//add event listener to filter input
filter.addEventListener('keyup', e => {

  const filterValue = filter.value.toLowerCase();
  console.log(filterValue);

  let listItems = document.querySelectorAll('.list-task');

  listItems.forEach(item => {

    const taskText = item.textContent;

    if (taskText.toLowerCase().indexOf(filterValue) != -1) {
      item.closest('.collection-item').classList.add('active');
      item.closest('.collection-item').classList.remove('inactive');
    }
    else
      item.closest('.collection-item').classList.add('inactive');
    item.closest('.collection-item').classList.remove('active');
  })




})

//add event listener to list item
list.addEventListener('click', e => {

  //if task is checked or unchecked
  if (e.target.matches('#tasks-checkbox')) {

    //update item status
    const tasks = updateStatus(e.target);

    //update local storage
    updateLocalStorage(tasks);

  }

  //task deleted option is clicked
  if (e.target.matches('.fa-remove')) {

    removeAlert();

    const listItem = e.target.closest('.collection-item');

    //delete list item
    const tasks = deleteListItem(listItem);

    //update local storage
    // updateLocalStorage(tasks);

  }

})

//add event listener to form 
form.addEventListener('submit', e => {

  //remove alert
  removeAlert();

  e.preventDefault();


  //get task 
  let name = toDoInput.value;

  //check if input task is valid , otherwise return
  if (name === '') return

  //status of task
  let task = {
    name,
    completed: false,
    id: new Date().valueOf()
  };

  // Save task to local storage
  storeTask(task);

  let tasks = [task];

  //render task
  renderTask(tasks);

  //clear input
  toDoInput.value = '';

  //show alert 
  getAlert('Task has been added', 'success', 'danger');

  //remove alert afer 3 seconds
  setTimeout(removeAlert, 3000)

})


//update task status
function updateStatus(target) {

  // get tasks from local storage
  let tasks = getTasks();

  //get text from list element
  let taskId = target.closest('.collection-item').id

  tasks.forEach(task => {
    if (task.id === parseInt(taskId)) {
      target.checked ? task.completed = true : task.completed = false;
    }

  });

  return tasks;

}

//render Task
function renderTask(tasks) {

  tasks.forEach(task => {

    const templateClone = template.content.cloneNode(true);
    const textElement = templateClone.querySelector('.list-task');
    let checkBox = templateClone.querySelector('#tasks-checkbox');
    let li = templateClone.querySelector('.collection-item');

    // add li id
    li.id = `${task.id}`;

    //set checked value
    checkBox.checked = task.completed;
    //populate task
    textElement.innerText = task.name;

    list.appendChild(templateClone);

  })

}

//delete list item
function deleteListItem(listItem) {

  //get tasks from local storage
  tasks = getTasks();

  tasks.forEach((task, index, tasksArray) => {

    if (task.id === parseInt(listItem.id)) {
      tasksArray.splice(index, 1);
      isDeleted = true;
      listItem.remove();
      return getAlert('Task has been deleted', 'danger', 'success');
    }

  });

  // //remove alert
  setTimeout(removeAlert, 3000)

  return tasks;

}

//remove alert
function removeAlert() {
  alert.classList.remove('active');
}

//display alert
function getAlert(message, addClass, rmClass) {

  alert.innerText = message;
  alert.classList.add(addClass);
  alert.classList.add('active');
  alert.classList.remove(rmClass);
}

// add tasks to local storage
function storeTask(task) {

  let tasks;

  if (localStorage.getItem(TASKS_STORAGE_KEY) === null) {
    tasks = [];
    tasks.push(task);
    localStorage.setItem(TASKS_STORAGE_KEY, JSON.stringify(tasks));

  } else {
    tasks = JSON.parse(localStorage.getItem(TASKS_STORAGE_KEY));
    tasks.push(task);
    localStorage.setItem(TASKS_STORAGE_KEY, JSON.stringify(tasks));
  }

}

//update local Storage
function updateLocalStorage(tasks) {

  localStorage.setItem(TASKS_STORAGE_KEY, JSON.stringify(tasks));

}

//clear all tasks from local storage
function clearAllTasks() {

  localStorage.clear();
}

//get tasks from local storage
function getTasks() {
  return JSON.parse(localStorage.getItem(TASKS_STORAGE_KEY)) || []
}