// Armazenamento

function salvarTarefas() {
  if (isEditing) return; 

  const columns = document.querySelectorAll(".column");
  const data = [...columns].map(column => {
    const tasks = [...column.querySelectorAll(".task")].map(task => {
      const nome = task.querySelector("h4")?.innerText || "";
      const descricao = task.querySelector("p")?.innerText || "";
      const dataCriacao = task.querySelector(".task-date")?.innerText || "";
      const subtarefas = [...task.querySelectorAll(".subtask")].map(sub => ({
        texto: sub.querySelector("span")?.innerText || "",
        feito: sub.querySelector("input[type=checkbox]")?.checked || false
      }));
      const dataEntrega = task.querySelector(".task-header small")?.innerText.replace("Entrega: ", "") || null;
      return { nome, descricao, subtarefas, dataCriacao, dataEntrega };
    });
    return tasks;
  });

  localStorage.setItem("tarefas", JSON.stringify(data));
}

function carregarTarefas() {
  const data = JSON.parse(localStorage.getItem("tarefas"));
  if (!data) return;

  const columns = document.querySelectorAll(".column");

  data.forEach((tasks, index) => {
    const tasksEl = columns[index].querySelector(".tasks");
    tasks.forEach(task => {
      const { nome, descricao, subtarefas, dataCriacao, dataEntrega } = task;
      const taskEl = createTask(nome, descricao, subtarefas, dataCriacao, dataEntrega);
      tasksEl.appendChild(taskEl);
    });
  });
}

window.salvarTarefas = salvarTarefas;
window.carregarTarefas = carregarTarefas;
