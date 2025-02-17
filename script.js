document.addEventListener('DOMContentLoaded', () => {
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    function addTask() {
        const taskText = taskInput.value.trim(); // get and trim input value
        if(taskText === "") {
            alert('Enter a task!');
            // return;// stops execution if the input is empty, but if I were to use the return statement the else block isn't needed(meaning the code inside else block can be written outside of it, and an if block above it only)
        } else {
            // create ne list item
            const li = document.createElement('li')
            li.textContent = taskText;

            // create remove button
            const button = document.createElement('button');
            button.textContent = 'Remove';
            button.className = 'remove-btn'; // creates a class name for the button
            button.onclick = function() {
                li.remove(); // when clicked removes the task added by the user from the taskList
            } 
            li.append(button); // if not appended remove button will not be shown
            taskList.append(li); // if not appended the user input isn't not stored in the taskList(my to do list)
            taskInput.value = ''; // to clear the input field once a task is added
        }
        // taskInput.value = ''; // works fine here too. but if taskText is already empty(it would throw an alert and) clearing an empty input field would be redundant
    }

    addButton.addEventListener('click', addTask); // when calling the callback function here we shouldn't use the parenthesis, cause it will immediately executes it without wait for a click event.
    taskInput.addEventListener('keypress', (event) => {
        if(event.key === 'Enter') { // this lets user add task by pressing "Enter" key on keyboard without clicking the "Add Task" button
            addTask();
        }
    });
});