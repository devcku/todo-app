const container = document.querySelector("#container");
const form1 = document.getElementById("form1");
const form2 = document.getElementById("form2");
let deletebtns = document.querySelectorAll(".deletebtn");
let completebtns = document.querySelectorAll(".completebtn");

let todos = [];

checkTodos = () => {
  if (todos.length == 0) {
    container.innerHTML = `<div class="text-zinc-400 dark:text-zinc-500 text-center py-7 fade-in bg-zinc-100 dark:bg-zinc-800">Nothing to do...</div>`;
  } else {
    renderTodos();
  }
};
const compare = (a, b) => {
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
    style='animation-delay:${i}00ms;'
        class="w-full ${
          !todos[i].completed ? `bg-zinc-100 dark:bg-zinc-800` : `bg-green-100 dark:bg-green-900/75`
        } py-4 fade-in px-6 flex rounded justify-between items-center shadow-sm"
      >
        <div>
          <h3 class="text-sm">
            <span class="text-zinc-500 dark:text-zinc-400">${todo.time}</span>
          </h3>
          <h2 class="text-lg text-zinc-600 dark:text-zinc-300 font-normal">
          ~${todo.title}
          </h2>
          </div>
          <div class="flex gap-4 items-center">
          <div
          class=" hover:cursor-pointer rounded-full bg-zinc-50 dark:bg-zinc-900 p-2 h-max completebtn"
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
            class="text-red-500  hover:cursor-pointer rounded-full p-2 deletebtn"
          >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
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

const addTodo = (e, form) => {
  e.preventDefault();
  if (form.todo.value) {
    let date = new Date();
    let time = `${date.getHours()}:${date.getMinutes()} `;
    todos.unshift({ title: form.todo.value, time, completed: false });

    form.todo.value = "";

    renderTodos();
    checkTodos();
  }
};

const deleteTodo = (index) => {
  todos.splice(index, 1);

  renderTodos();
  checkTodos();
};

form1.addEventListener("submit", (e) => addTodo(e, form1));
form2.addEventListener("submit", (e) => addTodo(e, form2));

checkTodos();
