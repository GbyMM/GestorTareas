const cardTask = document.querySelector(".cardTask");
const formTarea = document.querySelector(".formAnnadir");
const colors = ["#ff8c5f", "#ffda7d", "#acdeaa", "#c1c8e3", "#fad7dc"];
const dialogConfirm = document.querySelector("#customDialogConfirm");
const btnAccept = document.querySelector("#accept");
const btnCancel = document.querySelector("#cancel");
const btnCloseDialog = document.querySelector("#close-button-confirm");

let taskIdToDelete = null;

document.addEventListener("DOMContentLoaded", () => {
  if (localStorage.getItem("arrayTasks")) {
    renderTasks();
  }
});

formTarea.addEventListener("submit", saveTask);

function saveTask(e) {
  e.preventDefault();
  const titleTask = document.querySelector("#title-task").value;
  const descriptionTask = document.querySelector("#description-task").value;
  const dateTask = document.querySelector("#date-task").value;
  const priorityTask = document.querySelector("#priority-task").value;

  const task = {
    id: Date.now(),
    title: titleTask,
    description: descriptionTask,
    date: dateTask,
    priority: priorityTask,
    completed: false,
    color: colors[Math.floor(Math.random() * colors.length)],
  };

  const arrayTasks = JSON.parse(localStorage.getItem("arrayTasks")) || [];
  arrayTasks.push(task);
  localStorage.setItem("arrayTasks", JSON.stringify(arrayTasks));
  formTarea.reset();
  renderTasks();
  console.log(`Tarea "${titleTask}" guardada con éxito`);
  console.log(task);
  
  
}

function renderTasks() {
  const arrayTasks = JSON.parse(localStorage.getItem("arrayTasks")) || [];
  cardTask.innerHTML = "";

  arrayTasks.forEach((task) => {
    cardTask.innerHTML += `
      <div class="container" style="background-color: ${task.color}">
        <h2>${task.title}</h2>
        <p class="description">${task.description}</p>
        <div class="container-priority">
          <p class="fecha"><i class="fa-solid fa-calendar-days"></i> ${task.date}</p>
          <p><i class="fa-solid fa-triangle-exclamation"></i> ${task.priority}</p>
        </div>
        <div class="buttons">
          <button class="btn-delete" data-id="${task.id}">
            <i class="fa-regular fa-trash-can trash"></i>
          </button>
          <button class="btn-edit"><i class="fa-solid fa-pen edit"></i></button>
        </div>
        <i class="fa-solid fa-map-pin pin"></i>
      </div>
    `;
  });

  document.querySelectorAll(".btn-delete").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      taskIdToDelete = parseInt(e.currentTarget.dataset.id);
      dialogConfirm.style.display = "flex";
      dialogConfirm.showModal();
    });
  });

  document.querySelectorAll(".btn-edit").forEach((btn) => {
    btn.addEventListener("click", editTask); // Asumiendo que implementarás esta función
  });
}

/* --- Confirmación de eliminación --- */
btnAccept.addEventListener("click", () => {
  if (taskIdToDelete !== null) {
    const arrayTasks = JSON.parse(localStorage.getItem("arrayTasks")) || [];
    const newArrayTasks = arrayTasks.filter((task) => task.id !== taskIdToDelete);
    localStorage.setItem("arrayTasks", JSON.stringify(newArrayTasks));
    taskIdToDelete = null;
    closeDialog();
    renderTasks();
  }
});

btnCancel.addEventListener("click", closeDialog);
btnCloseDialog.addEventListener("click", closeDialog);

function closeDialog() {
  dialogConfirm.close();
  dialogConfirm.style.removeProperty("display");
}

/* --- Opcional: Función de edición --- */
function editTask() {
  alert("Funcionalidad de editar aún no implementada.");
}
