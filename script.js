document.addEventListener('DOMContentLoaded', () => {
    loadTasks(); // Load tasks when page is opened

    const addButton = document.getElementById('add-task-btn');
    addButton.addEventListener('click', () =>  addTask()); // creates an anonymous function that calls addTask() without any arguments
    // here since there is a parenthesis as soon as the page loads, it will execute but the arrow function prevents that and trigers the addTask function when add task button is clicked
    
    const taskInput = document.getElementById('task-input'); // this one listens to physical keyboard changes to add the tasks without the add button
    taskInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            addTask();
        }
    });
});

function addTask(taskText = null, save = true) { // just use this when storing, adding and removing tasks from local storage
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    if (!taskText) { // if taskText is 'falsy(empty, null, 0..)' store taskInput's value removing the leading empty spaces inside taskText
        taskText = taskInput.value.trim(); // taskText is falsy because, when defining the addTask function we set its value to null, and which is falsy.
    } // we can't sets its parameter value to empty string(''), because it will display a div container when a task is added but doesn't display the inner html/text content
    
    if (taskText === '') {
        alert('Enter a task!');
        return;
    }

    // Create task item
    const li = document.createElement('li');
    li.textContent = taskText;

    // Create remove button
    const button = document.createElement('button');
    button.textContent = 'Remove';
    button.classList.add('remove-btn');
    button.onclick = function () {
        li.remove();
        removeTaskFromStorage(taskText); // custom defined function
    };

    // Append to list
    li.appendChild(button);
    taskList.appendChild(li);
    
    // Save to Local Storage
    if (save) { // has a boolean value(either true or false), if save === true task gets saved in local storage, if not(lke when calling addTask(taskText, false) inside loadTasks()) task only added to UI(webpage) without saving
        let storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]'); // retrieves task from local storage as JSON string or "null(if there isn't any taks)" converts them into object
        storedTasks.push(taskText); // storedTasks in an array since json.parse is used above, and add each task(string) into the array updating storedTasks
        localStorage.setItem('tasks', JSON.stringify(storedTasks)); // array to string conversion, since local storage can only store strings, and .setItem stores it in the browser's local storage
    }

    // Clear input field
    taskInput.value = '';
}

// Function to load tasks from Local Storage
function loadTasks() {
    const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]'); // retrieve task from storage(if any)
    storedTasks.forEach(taskText => addTask(taskText, false)); // Load tasks without re-saving/ to prevent duplicate saving
}

// Function to remove tasks from Local Storage
function removeTaskFromStorage(taskText) {
    let storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
    storedTasks = storedTasks.filter(task => task !== taskText); // generally removes the selected task
    localStorage.setItem('tasks', JSON.stringify(storedTasks)); // .setItem(key(name of the item), value(the data to store))
}