window.observeTaskChanges();
window.carregarTarefas();

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
        searchResults.appendChild(resultItem);
      }
    });
  });
});

function getStatusColor(status) {
  switch (status.toLowerCase()) {
    case "aberto":
      return "red";
    case "em andamento":
      return "goldenrod";
    case "concluído":
      return "blue";
    case "done done":
      return "green";
    default:
      return "gray";
  }
}


document.querySelectorAll(".tasks").forEach(tasksEl => {
  tasksEl.addEventListener("dragover", window.handleDragover);
  tasksEl.addEventListener("drop", window.handleDrop);
});

window.columnsContainer.addEventListener("click", event => {
  if (event.target.closest("button[data-add]")) {
    window.handleAdd(event);
  }
  else if (event.target.closest("button[data-edit]")) {
    window.handleEdit(event);
  }
  else if (event.target.closest("button[data-delete]")) {
    window.handleDelete(event);
  }
  else if (event.target.closest("button[data-subtask]")) {
    window.handleSubtask(event); 
  }
});
