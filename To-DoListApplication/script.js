let tasks = [];

// Function to add a new task
function addTask() {
  const taskInput = document.getElementById("new-task");
  const taskText = taskInput.value.trim();

  if (taskText) {
    const task = { id: Date.now(), text: taskText, completed: false };
    tasks.push(task);
    taskInput.value = "";
    renderTasks();
  }
}

// Function to render tasks
function renderTasks() {
  const taskList = document.getElementById("task-list");
  taskList.innerHTML = "";

  tasks.forEach((task) => {
    const li = document.createElement("li");
    li.className = task.completed ? "completed" : "";

    const taskText = document.createElement("span");
    taskText.textContent = task.text;
    taskText.onclick = () => toggleComplete(task.id);

    const buttons = document.createElement("div");
    buttons.className = "task-buttons";

    const editButton = document.createElement("button");
    editButton.className = "edit";
    editButton.textContent = "Edit";
    editButton.onclick = () => editTask(task.id);

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.onclick = () => deleteTask(task.id);

    buttons.appendChild(editButton);
    buttons.appendChild(deleteButton);

    li.appendChild(taskText);
    li.appendChild(buttons);
    taskList.appendChild(li);
  });
}

// Function to mark a task as complete or incomplete
function toggleComplete(taskId) {
  tasks = tasks.map((task) =>
    task.id === taskId ? { ...task, completed: !task.completed } : task
  );
  renderTasks();
}

// Function to edit a task
function editTask(taskId) {
  const newTaskText = prompt("Edit your task:");

  if (newTaskText) {
    tasks = tasks.map((task) =>
      task.id === taskId ? { ...task, text: newTaskText } : task
    );
    renderTasks();
  }
}

// Function to delete a task
function deleteTask(taskId) {
  tasks = tasks.filter((task) => task.id !== taskId);
  renderTasks();
}
