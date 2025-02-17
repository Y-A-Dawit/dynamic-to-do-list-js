document.addEventListener('DOMContentLoaded', () => {
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    function addTask() {
        const tasktext = document.getElementById('task-input');
        const taskText = tasktext.value.trim();
        if(taskText === "") {
            alert('Enter a task!');
        } else {
            const li = document.createElement('li')
            li.textContent = taskText;
            const button = document.createElement('button');
            button.textContent = 'Remove';
            button.className = 'remove-btn'; // creates a class name for the button
            button.onclick = function() {
                li.remove(); // when clicked removes the task added by the user from the taskList
            } 
            li.append(button);
            taskList.append(li); // check
            taskInput.value = ''; // check
        }
    }

    addButton.addEventListener('click', addTask); // when calling the callback function here we shouldn't use the parenthesis, cause it will immediately executes it without wait for a click event.
    taskInput.addEventListener('keypress', (event) => {
        if(event.key === 'Enter') {
            addTask();
        }
    });
    document.addEventListener('DOMContentLoaded', addTask); // ensure the data fethcing logic(starting from addTask function, to variables storing) runs/gets ready once the HTML document has fully loaded
});