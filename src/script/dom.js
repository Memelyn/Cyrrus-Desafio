// Creates

function createSubtask(texto, feito = false) {
    const li = document.createElement("li");
    li.className = "subtask";
    li.innerHTML = `
      <label>
        <input type="checkbox" ${feito ? "checked" : ""}>
        <span>${texto}</span>
      </label>
      <button class="delete-subtask">–</button>
    `;
  
    li.querySelector(".delete-subtask").addEventListener("click", () => {
      li.remove();
      if (window.salvarTarefas) window.salvarTarefas();
    });
  
    li.querySelector("input[type=checkbox]").addEventListener("change", () => {
      if (window.salvarTarefas) window.salvarTarefas();
    });
  
    return li;
  }
  
  
  function createTask(nome, descricao = "", subtarefas = [], dataCriacao = null, dataEntrega = null) {
    const task = document.createElement("div");
    task.className = "task";
    task.draggable = true;

    task.id = "task-" + Date.now() + Math.floor(Math.random() * 1000);

  
    if (!dataCriacao) {
      const agora = new Date();
      dataCriacao = agora.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' }) +
                    ' ' + agora.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
    }
  
    const contentDiv = document.createElement("div");
    contentDiv.className = "task-header";
    contentDiv.innerHTML = `
      <h4>${nome}</h4>
      <p>${descricao}</p>
      ${dataEntrega ? `<small>Entrega: ${dataEntrega}</small>` : ""}
    `;

  const checklist = document.createElement("ul");
  checklist.className = "checklist";
  checklist.style.marginTop = "0.5rem";

  subtarefas.forEach(item => {
    checklist.appendChild(createSubtask(item.texto, item.feito));
  });

  const menu = document.createElement("menu");
  const editBtn = document.createElement("button");
  editBtn.setAttribute("data-edit", "");
  editBtn.innerHTML = `<i class="bi bi-pencil-square"></i>`;
  editBtn.addEventListener("click", (e) => {
    if (window.handleEdit) window.handleEdit(e);
  });

  const dateSpan = document.createElement("small");
  dateSpan.className = "task-date";
dateSpan.textContent = dataCriacao;

  const deleteBtn = document.createElement("button");
  deleteBtn.setAttribute("data-delete", "");
  deleteBtn.innerHTML = `<i class="bi bi-trash"></i>`;
  deleteBtn.addEventListener("click", (e) => {
    if (window.handleDelete) window.handleDelete(e);
  });

 const checklistBtn = document.createElement("button");
checklistBtn.setAttribute("data-subtask", "");
checklistBtn.innerHTML = `<i class="bi bi-card-checklist"></i>`;
checklistBtn.addEventListener("click", () => {
  if (task.querySelector(".new-subtask-input")) return; // Se já tiver um input aberto, não cria outro

  const input = document.createElement("input");
  input.type = "text";
  input.placeholder = "Digite a subtarefa e pressione Enter";
  input.className = "new-subtask-input";

  checklist.appendChild(input);
  input.focus();

  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const texto = input.value.trim();
      if (texto) {
        checklist.appendChild(createSubtask(texto));
        if (window.salvarTarefas) window.salvarTarefas();
      }
      input.remove();
    } else if (e.key === "Escape") {
      input.remove();
    }
  });

  input.addEventListener("blur", () => {
    input.remove();
  });
});


  menu.appendChild(dateSpan);
  menu.appendChild(editBtn);
  menu.appendChild(deleteBtn);
  menu.appendChild(checklistBtn);

  task.appendChild(contentDiv);
  task.appendChild(checklist);
  task.appendChild(menu);

  task.addEventListener("dragstart", (e) => {
    if (window.handleDragstart) window.handleDragstart(e);
  });
  task.addEventListener("dragend", (e) => {
    if (window.handleDragend) window.handleDragend(e);
  });

  return task;
}

  function createTaskInput(text = "") {
    const input = document.createElement("div");
    input.className = "task-input";
    input.dataset.placeholder = "Task name";
    input.contentEditable = true;
    input.innerText = text;
    input.addEventListener("blur", (e) => {
      if (window.handleBlur) window.handleBlur(e);
    });
    return input;
  }
  
  window.onload = () => {
    const searchInput = document.getElementById("search-input");
    const searchResults = document.getElementById("search-results");
  
    searchInput.addEventListener("input", () => {
      const query = searchInput.value.trim().toLowerCase();
      searchResults.innerHTML = "";
  
      if (!query) return;
  
      const columns = document.querySelectorAll(".column");
      columns.forEach(column => {
        const status = column.querySelector("h3").innerText;
        const color = getStatusColor(status);
  
        const tasks = column.querySelectorAll(".task");
        tasks.forEach(task => {
          const taskName = task.querySelector("h4")?.innerText.toLowerCase() || "";
  
          if (taskName.includes(query)) {
            const resultItem = document.createElement("div");
            resultItem.className = "result-item";
            resultItem.style.borderLeft = `5px solid ${color}`;
            resultItem.innerHTML = `
              <strong>${task.querySelector("h4").innerText}</strong>
              <small>(${status})</small>
            `;
  
            resultItem.addEventListener("click", () => {
              task.scrollIntoView({ behavior: "smooth", block: "center" });
              task.classList.add("highlight");
              setTimeout(() => {
                task.classList.remove("highlight");
              }, 2000);
  
              searchResults.innerHTML = "";
              searchInput.value = "";
            });
  
            searchResults.appendChild(resultItem);
          }
        });
      });
    });
  };
  
  
  function getStatusColor(status) {
    switch (status) {
      case "Aberto":
        return "red";
      case "Em Andamento":
        return "orange";
      case "Concluído":
        return "green";
      case "Done Done":
        return "blue";
      default:
        return "gray";
    }
  }
  

  window.createTask = createTask;
  window.createTaskInput = createTaskInput;
  