const taskForm = document.getElementById("task-form");

const taskList = document.getElementById("task-list");

//Carga la funcion del localstorage que busca si hay info.
loadTasks();

taskForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const taskInput = document.getElementById("task-input");

  const task = taskInput.value;
  console.log(task);

  if (task) {
    //Carga la tarea
    taskList.append(createTaskElement(task));
    // Guarda en localStora
    storeTaskInLocalStorage(task);
    //Limpia el input
    taskInput.value = "";
  }
});

function createTaskElement(task) {
  const li = document.createElement("li");
  li.textContent = task;
  li.append(createButton("❌", "delete-btn"), createButton("✏️", "edit-btn"));
  return li;
}

function createButton(text, className) {
  const btn = document.createElement("span");
  btn.textContent = text;
  btn.className = className;
  return btn;
}

taskList.addEventListener("click", 
  (event) => {
    if(event.target.classList.contains
      ("delete-btn")) {
        deleteTask(event.target.parentElement);
      }else if (event.target.classList.contains("edit-btn")) {
        editTask(event.target.parentElement);
      }
  });

  function deleteTask(taskItem) {
    if(confirm("Estas segura / seguro de borrar este elemento?")) {
      taskItem.remove();
      }
  }

  function editTask(taskItem) {
    const newTask = prompt("Edita la tarea: ", taskItem.firstChild.textContent);
    if(newTask !== null) {
      taskItem.firstChild.textContent = newTask;
      updateLocalStorage()
    }
  }

  //Guardar en localStorage
  function storeTaskInLocalStorage (task) {
    const tasks = JSON.parse(localStorage.getItem("tasks") || "[]")
    tasks.push(task);
    localStorage.setItem("tasks", JSON.stringify(tasks));
  } 

  //Funcion para recargar la pagina con los datos del LocalStorage cuando se recarga la pagina
  function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem("tasks") || "[]")
    tasks.forEach((task) => {
      taskList.appendChild(createTaskElement(task))
    })
  }


  //Esta funcion va a hacer que cuando este en la funcion de editar va a traer el estado actual y asi actualizar el local storage
  function updateLocalStorage() {
    const tasks = Array.from(taskList.querySelectorAll("li")).map( (li) => li.firstChild.textContent);
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }

  const currentTheme = localStorage.getItem("theme")
  console.log(currentTheme)

  const themeToggleButton = document.getElementById("toggle-theme-btn");

  //Con esta funcion guarda en local storage la seleccion del tema
  themeToggleButton.addEventListener("click", () => {
    document.body.classList.toggle("dark-theme")

    const theme = document.body.classList.contains("dark-theme") ? "dark" : "light";
    localStorage.setItem("theme", theme);
  })

  if(currentTheme === "dark")  {
    document.body.classList.add("dark-theme");
  }