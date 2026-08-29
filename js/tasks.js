// =====================================================
// DONEE - SISTEMA DE TAREFAS
// =====================================================


// =====================================================
// ELEMENTOS
// =====================================================

const tasksList = document.getElementById("tasksList");

const taskCounter = document.getElementById("taskCounter");

const newTaskBtn = document.getElementById("newTaskBtn");

const taskModal = document.getElementById("taskModal");

const closeModalBtn = document.getElementById("closeModalBtn");

const cancelTaskBtn = document.getElementById("cancelTaskBtn");

const taskForm = document.getElementById("taskForm");

const taskTitle = document.getElementById("taskTitle");

const taskCategory = document.getElementById("taskCategory");

const taskTime = document.getElementById("taskTime");

const filterButtons = document.querySelectorAll(".filter-btn");


// =====================================================
// TAREFAS INICIAIS
// =====================================================

let tasks = JSON.parse(localStorage.getItem("doneeTasks")) || [

    {
        id: 1,
        title: "Estudar JavaScript",
        category: "Estudos",
        time: "19:00",
        completed: true
    },

    {
        id: 2,
        title: "Treino de academia",
        category: "Saúde",
        time: "20:30",
        completed: false
    },

    {
        id: 3,
        title: "Ler um capítulo",
        category: "Leitura",
        time: "22:00",
        completed: false
    }

];


// =====================================================
// FILTRO ATUAL
// =====================================================

let currentFilter = "all";


// =====================================================
// SALVAR TAREFAS
// =====================================================

function saveTasks() {

    localStorage.setItem(
        "doneeTasks",
        JSON.stringify(tasks)
    );

}


// =====================================================
// RENDERIZAR TAREFAS
// =====================================================

function renderTasks() {


    tasksList.innerHTML = "";


    // Filtra as tarefas

    let filteredTasks = tasks;


    if (currentFilter === "pending") {

        filteredTasks = tasks.filter(
            task => !task.completed
        );

    }


    if (currentFilter === "completed") {

        filteredTasks = tasks.filter(
            task => task.completed
        );

    }


    // Atualiza contador

    if (filteredTasks.length === 1) {

        taskCounter.textContent =
            "1 tarefa encontrada";

    } else {

        taskCounter.textContent =
            `${filteredTasks.length} tarefas encontradas`;

    }


    // Nenhuma tarefa

    if (filteredTasks.length === 0) {

        tasksList.innerHTML = `

            <div class="empty-tasks">

                <i data-lucide="clipboard-check"></i>

                <h3>Nenhuma tarefa encontrada</h3>

                <p>
                    Não há tarefas nesta categoria.
                </p>

            </div>

        `;

        lucide.createIcons();

        return;

    }


    // Cria cada tarefa

    filteredTasks.forEach(task => {


        const taskCard =
            document.createElement("div");


        taskCard.className = "task-card";


        taskCard.innerHTML = `

            <div class="task-border"></div>


            <div class="task-left">

                <div class="task-content">

                    <h3>
                        ${task.title}
                    </h3>

                    <p>
                        ${task.category}
                    </p>

                </div>

            </div>


            <div class="task-right">

                <span class="task-time">
                    ${task.time}
                </span>


                <button
                    class="task-status ${task.completed ? "completed" : ""}"
                    data-id="${task.id}"
                    type="button"
                    aria-label="${
                        task.completed
                            ? "Desmarcar tarefa"
                            : "Marcar tarefa como concluída"
                    }"
                >

                    ${
                        task.completed
                            ? '<i data-lucide="check"></i>'
                            : ''
                    }

                </button>


                <button
                    class="delete-task-btn"
                    data-delete="${task.id}"
                    type="button"
                    aria-label="Excluir tarefa"
                >

                    <i data-lucide="trash-2"></i>

                </button>

            </div>

        `;


        tasksList.appendChild(taskCard);


    });


    // Ativa os ícones

    lucide.createIcons();

}


// =====================================================
// MARCAR TAREFA COMO CONCLUÍDA
// =====================================================

function toggleTask(taskId) {


    tasks = tasks.map(task => {


        if (task.id === taskId) {

            return {

                ...task,

                completed: !task.completed

            };

        }


        return task;

    });


    saveTasks();

    renderTasks();

}


// =====================================================
// EXCLUIR TAREFA
// =====================================================

function deleteTask(taskId) {


    const confirmDelete =
        confirm("Deseja realmente excluir esta tarefa?");


    if (!confirmDelete) {

        return;

    }


    tasks = tasks.filter(
        task => task.id !== taskId
    );


    saveTasks();

    renderTasks();

}


// =====================================================
// ABRIR MODAL
// =====================================================

function openModal() {

    taskModal.classList.add("show");

    taskTitle.focus();

}


// =====================================================
// FECHAR MODAL
// =====================================================

function closeModal() {

    taskModal.classList.remove("show");

    taskForm.reset();

}


// =====================================================
// CRIAR TAREFA
// =====================================================

function createTask(event) {


    event.preventDefault();


    const title =
        taskTitle.value.trim();


    const category =
        taskCategory.value.trim();


    const time =
        taskTime.value;


    if (!title || !category || !time) {

        return;

    }


    const newTask = {

        id: Date.now(),

        title: title,

        category: category,

        time: time,

        completed: false

    };


    tasks.push(newTask);


    saveTasks();

    renderTasks();

    closeModal();

}


// =====================================================
// EVENTO DA LISTA
// =====================================================

tasksList.addEventListener("click", function(event) {


    const statusButton =
        event.target.closest(".task-status");


    const deleteButton =
        event.target.closest(".delete-task-btn");


    // Concluir tarefa

    if (statusButton) {

        const taskId =
            Number(statusButton.dataset.id);

        toggleTask(taskId);

    }


    // Excluir tarefa

    if (deleteButton) {

        const taskId =
            Number(deleteButton.dataset.delete);

        deleteTask(taskId);

    }

});


// =====================================================
// FILTROS
// =====================================================

filterButtons.forEach(button => {


    button.addEventListener("click", function() {


        filterButtons.forEach(btn => {

            btn.classList.remove("active");

        });


        this.classList.add("active");


        currentFilter =
            this.dataset.filter;


        renderTasks();

    });

});


// =====================================================
// BOTÃO NOVA TAREFA
// =====================================================

newTaskBtn.addEventListener(
    "click",
    openModal
);


// =====================================================
// FECHAR MODAL
// =====================================================

closeModalBtn.addEventListener(
    "click",
    closeModal
);


cancelTaskBtn.addEventListener(
    "click",
    closeModal
);


// =====================================================
// FORMULÁRIO
// =====================================================

taskForm.addEventListener(
    "submit",
    createTask
);


// =====================================================
// FECHAR CLICANDO FORA
// =====================================================

taskModal.addEventListener(
    "click",
    function(event) {

        if (event.target === taskModal) {

            closeModal();

        }

    }
);


// =====================================================
// INICIALIZAÇÃO
// =====================================================

renderTasks();

lucide.createIcons();