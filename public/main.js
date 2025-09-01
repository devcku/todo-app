// Add this script tag to your HTML file
// <script type="module" src="your_script_name.js"></script>

// This is where you initialize the Firebase SDK.
// Replace this with your actual Firebase project configuration.
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs, doc, deleteDoc, updateDoc } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyCW7qghL154MqX2N0ySYYIeNxJ3dd4A6Qo",
  authDomain: "sidehustle-5c279.firebaseapp.com",
  projectId: "sidehustle-5c279",
  storageBucket: "sidehustle-5c279.firebasestorage.app",
  messagingSenderId: "851444997530",
  appId: "1:851444997530:web:b552d8fc9dd2768bdc6e23",
  measurementId: "G-DSZL8NBPJN"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const todosCollection = collection(db, "todos");

const container = document.querySelector("#container");
const form1 = document.getElementById("form1");
const form2 = document.getElementById("form2");
let deletebtns = document.querySelectorAll(".deletebtn");
let completebtns = document.querySelectorAll(".completebtn");

let todos = [];

// Refactored checkTodos to get data from Firestore
const getTodos = async () => {
    const snapshot = await getDocs(todosCollection);
    todos = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

    if (todos.length === 0) {
        container.innerHTML = `<div class="text-zinc-400 rounded-sm dark:text-zinc-500 text-center py-8 fade-in bg-zinc-100 dark:bg-zinc-800">Nothing to do...</div>`;
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
        } py-4 fade-in px-6 flex rounded-sm justify-between items-center shadow-sm"
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
                data-id=${todo.id}
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
                data-id=${todo.id}
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
            const id = completebtn.getAttribute("data-id");
            toggleComplete(id);
        });
    });

    deletebtns = document.querySelectorAll(".deletebtn");
    deletebtns.forEach((deletebtn) => {
        deletebtn.addEventListener("click", () => {
            const id = deletebtn.getAttribute("data-id");
            deleteTodo(id);
        });
    });
};

// Refactored addTodo to add data to Firestore
const addTodo = async (e, form) => {
    e.preventDefault();
    if (form.todo.value) {
        let date = new Date();
        let time = `${date.getHours()}:${date.getMinutes()} `;
        const newTodo = {
            title: form.todo.value,
            time,
            completed: false
        };

        await addDoc(todosCollection, newTodo);

        form.todo.value = "";
        getTodos();
    }
};

// Refactored toggleComplete to update data in Firestore
const toggleComplete = async (id) => {
    const todoRef = doc(db, "todos", id);
    const todoToUpdate = todos.find(todo => todo.id === id);
    if (todoToUpdate) {
        const newCompletedStatus = !todoToUpdate.completed;
        await updateDoc(todoRef, { completed: newCompletedStatus });
    }
    getTodos();
};

// Refactored deleteTodo to delete data from Firestore
const deleteTodo = async (id) => {
    const todoRef = doc(db, "todos", id);
    await deleteDoc(todoRef);
    getTodos();
};

form1.addEventListener("submit", (e) => addTodo(e, form1));
form2.addEventListener("submit", (e) => addTodo(e, form2));

getTodos();
