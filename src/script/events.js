const modal = document.querySelector(".confirm-modal");
const columnsContainer = document.querySelector(".columns");
const columns = document.querySelectorAll(".column");
let currentTask = null;
let isEditing = false;
let isDragging = false;
let scrollInterval = null;

function handleDragover(event) {
  event.preventDefault();

  // reordenamento
  const draggedTask = document.querySelector(".dragging");
  const target = event.target.closest(".task, .tasks");

  if (!target || target === draggedTask) return;

  if (target.classList.contains("tasks")) {
    const lastTask = target.lastElementChild;
    if (!lastTask) {
      target.appendChild(draggedTask);
    } else {
      const { bottom } = lastTask.getBoundingClientRect();
      if (event.clientY > bottom) {
        target.appendChild(draggedTask);
      }
    }
  } else {
    const { top, height } = target.getBoundingClientRect();
    const distance = top + height / 2;
    if (event.clientY < distance) {
      target.before(draggedTask);
    } else {
      target.after(draggedTask);
    }
  }

  // scroll 
  const scrollThreshold = 100;
  const scrollSpeed = 10;
  const windowHeight = window.innerHeight;
  const mouseY = event.clientY;

  if (mouseY < scrollThreshold) {
    startScroll('up', scrollSpeed);
  } else if (mouseY > windowHeight - scrollThreshold) {
    startScroll('down', scrollSpeed);
  } else {
    stopScroll();
  }
}

function startScroll(direction, speed) {
  if (scrollInterval) return; 

  scrollInterval = setInterval(() => {
    if (direction === 'up') {
      window.scrollBy(0, -speed);
    } else if (direction === 'down') {
      window.scrollBy(0, speed);
    }
  }, 16); 
}

function stopScroll() {
  clearInterval(scrollInterval);
  scrollInterval = null;
}

const handleDrop = (event) => {
  event.preventDefault();
  stopScroll(); 
  setTimeout(() => {
    window.salvarTarefas();
  }, 50); 
};

function handleDragstart(event) {
  event.dataTransfer.effectsAllowed = "move";
  event.dataTransfer.setData("text/plain", "");
  requestAnimationFrame(() => event.target.classList.add("dragging"));
  isDragging = true;
}

function handleDragend(event) {
  event.target.classList.remove("dragging");
  stopScroll();
  isDragging = false;
  window.salvarTarefas();
}

function handleDelete(event) {
  currentTask = event.target.closest(".task");
  modal.querySelector(".preview").innerText = currentTask.innerText.substring(0, 100);
  modal.showModal();
}

function handleEdit(event) {
  if (isEditing) return; 
  isEditing = true;

  const task = event.target.closest(".task");
  const header = task.querySelector(".task-header");

  task.dataset.originalContent = header.innerHTML;

  const nomeEl = task.querySelector("h4");
  const descEl = task.querySelector("p");
  const entregaEl = task.querySelector(".task-header small");

  const nomeAntigo = nomeEl?.innerText || "";
  const descAntiga = descEl?.innerText || "";
  const entregaAntiga = entregaEl ? entregaEl.innerText.replace("Entrega: ", "") : "";

  const nomeInput = document.createElement("input");
  nomeInput.type = "text";
  nomeInput.value = nomeAntigo;
  nomeInput.className = "edit-task-input";

  const descInput = document.createElement("textarea");
  descInput.value = descAntiga;
  descInput.className = "edit-task-textarea";

  const entregaInput = document.createElement("input");
  entregaInput.type = "date";
  entregaInput.className = "edit-task-deadline";

  if (entregaAntiga) {
    const partes = entregaAntiga.split("/");
    entregaInput.value = `${partes[2]}-${partes[1]}-${partes[0]}`;
  }

  const actionsDiv = document.createElement("div");
  actionsDiv.className = "edit-actions";

  const saveBtn = document.createElement("button");
  saveBtn.textContent = "Salvar";
  saveBtn.className = "save-edit-button";

  const cancelBtn = document.createElement("button");
  cancelBtn.textContent = "Cancelar";
  cancelBtn.className = "cancel-edit-button";

  actionsDiv.appendChild(saveBtn);
  actionsDiv.appendChild(cancelBtn);

  header.innerHTML = "";
  header.appendChild(nomeInput);
  header.appendChild(descInput);
  header.appendChild(entregaInput);
  header.appendChild(actionsDiv);

  nomeInput.focus();

  function salvarEdicao() {
    isEditing = false;

    const novoNome = nomeInput.value.trim() || "Sem nome";
    const novaDesc = descInput.value.trim() || "Sem descrição";
    const novaEntrega = entregaInput.value ? 
      entregaInput.value.split("-").reverse().join("/") : null;

    header.innerHTML = `
      <h4>${novoNome}</h4>
      <p>${novaDesc}</p>
      ${novaEntrega ? `<small>Entrega: ${novaEntrega}</small>` : ''}`;
    
    if (window.salvarTarefas) window.salvarTarefas();
  }

  function cancelarEdicao() {
    isEditing = false;
    header.innerHTML = task.dataset.originalContent; 
  }

  saveBtn.addEventListener("click", salvarEdicao, { once: true });
  cancelBtn.addEventListener("click", cancelarEdicao, { once: true });
}

function handleBlur(event) {
  const input = event.target;
  const content = input.innerText.trim() || "Untitled";
  const task = window.createTask(content.replace(/\n/g, "<br>"));
  input.replaceWith(task);
  window.salvarTarefas();
}

function handleAdd(event) {
  const column = event.target.closest(".column");
  const tasksEl = column.querySelector(".tasks");

  const taskModal = document.getElementById("task-modal");
  const taskNameInput = document.getElementById("task-name");
  const taskDescInput = document.getElementById("task-desc");
  const taskDeadlineInput = document.getElementById("task-deadline"); 

  const saveBtn = document.getElementById("save-task");
  const cancelBtn = document.getElementById("cancel-task");

  taskNameInput.value = "";
  taskDescInput.value = "";
  taskDeadlineInput.value = ""; 

  taskModal.showModal();

  function salvarNovaTarefa(e) {
    e.preventDefault();
    const nome = taskNameInput.value.trim();
    const descricao = taskDescInput.value.trim();
    const dataEntrega = taskDeadlineInput.value ? 
      taskDeadlineInput.value.split("-").reverse().join("/") : null;

    if (!nome || !descricao) return;

    const novaTask = window.createTask(nome, descricao, [], null, dataEntrega); 
    tasksEl.appendChild(novaTask);
    window.salvarTarefas();
    taskModal.close();
    saveBtn.removeEventListener("click", salvarNovaTarefa);
  }

  saveBtn.addEventListener("click", salvarNovaTarefa);

  cancelBtn.addEventListener("click", () => {
    taskModal.close();
    saveBtn.removeEventListener("click", salvarNovaTarefa);
  });
}

function observeTaskChanges() {
  columns.forEach(column => {
    const observer = new MutationObserver(() => {
      const tasks = column.querySelector(".tasks").children;
      const taskCount = tasks.length;
      column.querySelector("h3").dataset.tasks = taskCount;
    });
    observer.observe(column.querySelector(".tasks"), { childList: true });
  });
}

modal.addEventListener("submit", () => {
  if (currentTask) {
    currentTask.remove();
    window.salvarTarefas();
  }
});

modal.querySelector("#cancel").addEventListener("click", () => modal.close());
modal.addEventListener("close", () => (currentTask = null));


window.handleAdd = handleAdd;
window.handleEdit = handleEdit;
window.handleDelete = handleDelete;
window.handleDragstart = handleDragstart;
window.handleDragend = handleDragend;
window.handleDragover = handleDragover;
window.handleDrop = handleDrop;
window.handleBlur = handleBlur;
window.observeTaskChanges = observeTaskChanges;
window.columnsContainer = columnsContainer;
window.handleSubtask = handleSubtask;
