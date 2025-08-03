document.addEventListener('DOMContentLoaded', function () {
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // Load and display tasks from localStorage on page load
    loadTasks();

    // Function to load tasks from localStorage
    function loadTasks() {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        storedTasks.forEach(taskText => addTask(taskText, false));
    }

    // Function to save tasks to localStorage
    function saveTasksToStorage() {
        const tasks = [];
        document.querySelectorAll('#task-list li').forEach(li => {
            const taskText = li.firstChild.textContent.trim(); // get only the task text
            tasks.push(taskText);
        });
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    // Function to add a task (with optional save flag)
    function addTask(taskText, save = true) {
        // Prevent empty tasks
        if (!taskText || taskText.trim() === '') {
            if (save) alert('Please enter a task!');
            return;
        }

        // Create task item
        const li = document.createElement('li');
        li.textContent = taskText;

        // Create remove button
        const removeBtn = document.createElement('button');
        removeBtn.textContent = 'Remove';
        removeBtn.classList.add('remove-btn');

        // Remove task both from DOM and storage
        removeBtn.onclick = function () {
            li.remove();
            saveTasksToStorage(); // update localStorage after removal
        };

        // Append button and add to task list
        li.appendChild(removeBtn);
        taskList.appendChild(li);

        // Clear input field after adding manually
        if (save) {
            taskInput.value = '';
            saveTasksToStorage(); // update storage
        }
    }

    // Add task on button click
    addButton.addEventListener('click', function () {
        addTask(taskInput.value);
    });

    // Add task on Enter key press
    taskInput.addEventListener('keypress', function (event) {
        if (event.key === 'Enter') {
            addTask(taskInput.value);
        }
    });
});
