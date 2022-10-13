var container = document.querySelector("#container");
var form1 = document.getElementById("form1");
var form2 = document.getElementById("form2");
var deletebtns = document.querySelectorAll(".deletebtn");
var completebtns = document.querySelectorAll(".completebtn");

var todos = [];

checkTodos = () => {
  if (todos.length == 0) {
    container.innerHTML = `<div class="text-zinc-400 text-center py-7 bg-zinc-100 border-2 border-zinc-300">Nothing to do...</div>`;
  } else {
    renderTodos();
  }
};
var compare = (a, b) => {
  if (a.completed < b.completed) {
    return -1;
  }
  if (a.completed > b.completed) {
    return 1;
  }
  return 0;
};
const renderTodos = () => {
  container.innerHTML = "";

  todos.sort(compare);
  todos.forEach((todo, i) => {
    container.innerHTML += `<div
        class="w-full ${
          !todos[i].completed ? `bg-zinc-100` : `bg-green-50`
        } py-4 px-6 flex rounded justify-between items-center shadow-sm"
      >
        <div>
          <h3 class="text-sm">
            <span class="text-zinc-500">${todo.time}</span>
          </h3>
          <h2 class="text-lg text-zinc-600 font-normal">
          ~${todo.title}
          </h2>
          </div>
          <div class="flex gap-4 items-center">
          <div
          class=" hover:cursor-pointer rounded-full bg-zinc-50 p-2 h-max completebtn"
          data-index=${i}
          >
          ${
            !todos[i].completed
              ? `<svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-5 h-5 text-green-500"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M4.5 12.75l6 6 9-13.5"
          />
        </svg>`
              : `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5 text-zinc-500">
        <path stroke-linecap="round" stroke-linejoin="round" d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3" />
      </svg>
      `
          }
            
          </div>
          <div
          data-index=${i}
            class="text-red-500 hover:cursor-pointer rounded-full p-2 deletebtn"
          >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
          </svg>
          
          </div>
        </div>
      </div>`;
  });

  completebtns = document.querySelectorAll(".completebtn");
  completebtns.forEach((completebtn) => {
    completebtn.addEventListener("click", () => {
      var index = Number(completebtn.getAttribute("data-index"));
      todos[index].completed = !todos[index].completed;
      renderTodos();
    });
  });

  deletebtns = document.querySelectorAll(".deletebtn");
  deletebtns.forEach((deletebtn) => {
    deletebtn.addEventListener("click", () => {
      deleteTodo(Number(deletebtn.getAttribute("data-index")));
    });
  });
};

var addTodo = (e, form) => {
  e.preventDefault();
  if (form.todo.value) {
    var date = new Date();
    var time = `${date.getHours()}:${date.getMinutes()} `;
    todos.push({ title: form.todo.value, time, completed: false });
    form.todo.value = "";

    renderTodos();
    checkTodos();
  }
};

var deleteTodo = (index) => {
  todos.splice(index, 1);

  renderTodos();
  checkTodos();
};

form1.addEventListener("submit", (e) => addTodo(e, form1));
form2.addEventListener("submit", (e) => addTodo(e, form2));

checkTodos();
