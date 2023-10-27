const todoForm = document.querySelector("#form");
const todoList = document.querySelector("#todos");
const taskInput = document.querySelector("#input");


// Function to check and render stored todos from localStorage
function checkLocalStorage() {
  const storedTodos = localStorage.getItem("todos");

  if (storedTodos !== null) {
    const todos = JSON.parse(storedTodos);
    const tasks = todos.tasks;

    if (tasks !== undefined && tasks !== null && typeof tasks === 'object') {
      Object.entries(tasks).forEach(([taskId, task]) => {
        const todoItem = createTodoItem(task, taskId);
        todoList.appendChild(todoItem);
      });
    } 
  }
}

checkLocalStorage();

todoForm.addEventListener("submit", (event) => {
  event.preventDefault();
  if (taskInput.value === "") {
    return;
  }
  const newTodo = createTodoItem(taskInput.value);
  todoList.appendChild(newTodo);
  storeTodos(taskInput.value);
  console.log(taskInput.value);
  todoForm.reset();
});

function createTodoItem(task, taskId) {
  const todoItem = document.createElement("li");
  todoItem.classList.add("todo");
  todoItem.innerText = task;

  const deleteButton = document.createElement("button");
  deleteButton.classList.add("delete");
  deleteButton.innerText = "❌";

  deleteButton.addEventListener("click", () => {
    const storedTodos = JSON.parse(localStorage.getItem("todos"));
    delete storedTodos.tasks[taskId];
    localStorage.setItem("todos", JSON.stringify(storedTodos));
    todoItem.remove();
    storeTodos(); // Call storeTodos after deleting a task
  });

  todoItem.appendChild(deleteButton);
  return todoItem;
}

function storeTodos() {
  const todoItems = document.querySelectorAll(".todo");
  console.log(todoItems);
  const tasks = Array.from(todoItems).map((item) => item.innerText.replace(/\n/g, "").replace("❌", ""));

  const todos = {
    count: tasks.length,
    tasks: tasks.reduce((obj, task, index) => {
      obj[index] = task;
      return obj;
    }, {})
  };

  localStorage.setItem("todos", JSON.stringify(todos));
}
