// =====================================================
// DONEE - SISTEMA DE TAREFAS
// =====================================================


/* ================================================= */
/* PROTEGER PÁGINA */
/* ================================================= */

protegerPagina();


/* ================================================= */
/* ELEMENTOS */
/* ================================================= */

const tasksList =
    document.getElementById("tasksList");

const taskCounter =
    document.getElementById("taskCounter");

const newTaskBtn =
    document.getElementById("newTaskBtn");

const taskModal =
    document.getElementById("taskModal");

const closeModalBtn =
    document.getElementById("closeModalBtn");

const cancelTaskBtn =
    document.getElementById("cancelTaskBtn");

const taskForm =
    document.getElementById("taskForm");

const taskTitle =
    document.getElementById("taskTitle");

const taskCategory =
    document.getElementById("taskCategory");

const taskTime =
    document.getElementById("taskTime");

const filterButtons =
    document.querySelectorAll(".filter-btn");


/* ================================================= */
/* TAREFAS */
/* ================================================= */

let tasks =
    obterTarefasUsuario();


/* ================================================= */
/* FILTRO ATUAL */
/* ================================================= */

let currentFilter =
    "all";


/* ================================================= */
/* SALVAR TAREFAS */
/* ================================================= */

function saveTasks() {

    salvarTarefasUsuario(
        tasks
    );

}


/* ================================================= */
/* RENDERIZAR TAREFAS */
/* ================================================= */

function renderTasks() {

    if (!tasksList) {

        return;

    }


    tasksList.innerHTML =
        "";


    let filteredTasks =
        tasks;


    /* ================================================= */
    /* FILTRO PENDENTES */
    /* ================================================= */

    if (
        currentFilter ===
        "pending"
    ) {

        filteredTasks =
            tasks.filter(function (task) {

                return !task.completed;

            });

    }


    /* ================================================= */
    /* FILTRO CONCLUÍDAS */
    /* ================================================= */

    if (
        currentFilter ===
        "completed"
    ) {

        filteredTasks =
            tasks.filter(function (task) {

                return task.completed;

            });

    }


    /* ================================================= */
    /* CONTADOR */
    /* ================================================= */

    if (
        filteredTasks.length ===
        1
    ) {

        taskCounter.textContent =
            "1 tarefa encontrada";

    } else {

        taskCounter.textContent =
            `${filteredTasks.length} tarefas encontradas`;

    }


    /* ================================================= */
    /* NENHUMA TAREFA */
    /* ================================================= */

    if (
        filteredTasks.length ===
        0
    ) {

        tasksList.innerHTML = `

            <div class="empty-tasks">

                <i data-lucide="clipboard-check"></i>

                <h3>
                    Nenhuma tarefa encontrada
                </h3>

                <p>
                    Não há tarefas nesta categoria.
                </p>

            </div>

        `;


        if (
            typeof lucide !==
            "undefined"
        ) {

            lucide.createIcons();

        }


        return;

    }


    /* ================================================= */
    /* CRIAR CARDS */
    /* ================================================= */

    filteredTasks.forEach(function (task) {

        const taskCard =
            document.createElement("div");


        taskCard.className =
            "task-card";


        taskCard.innerHTML = `

            <div class="task-border"></div>


            <div class="task-left">

                <div class="task-content">

                    <h3>
                        ${escaparHTML(task.title)}
                    </h3>

                    <p>
                        ${escaparHTML(task.category)}
                    </p>

                </div>

            </div>


            <div class="task-right">

                <span class="task-time">
                    ${task.time}
                </span>


                <button
                    class="task-status ${
                        task.completed
                            ? "completed"
                            : ""
                    }"
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
                            : ""
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


        tasksList.appendChild(
            taskCard
        );

    });


    if (
        typeof lucide !==
        "undefined"
    ) {

        lucide.createIcons();

    }

}


/* ================================================= */
/* ESCAPAR HTML */
/* ================================================= */

function escaparHTML(texto) {

    const div =
        document.createElement("div");


    div.textContent =
        texto;


    return div.innerHTML;

}


/* ================================================= */
/* CONCLUIR TAREFA */
/* ================================================= */

function toggleTask(taskId) {

    tasks =
        tasks.map(function (task) {

            if (
                task.id ===
                taskId
            ) {

                return {

                    ...task,

                    completed:
                        !task.completed

                };

            }


            return task;

        });


    saveTasks();

    renderTasks();

}


/* ================================================= */
/* EXCLUIR TAREFA */
/* ================================================= */

function deleteTask(taskId) {

    const confirmar =
        confirm(
            "Deseja realmente excluir esta tarefa?"
        );


    if (!confirmar) {

        return;

    }


    tasks =
        tasks.filter(function (task) {

            return task.id !==
                taskId;

        });


    saveTasks();

    renderTasks();

}


/* ================================================= */
/* ABRIR MODAL */
/* ================================================= */

function openModal() {

    if (!taskModal) {

        return;

    }


    taskModal.classList.add(
        "show"
    );


    if (taskTitle) {

        taskTitle.focus();

    }

}


/* ================================================= */
/* FECHAR MODAL */
/* ================================================= */

function closeModal() {

    if (!taskModal) {

        return;

    }


    taskModal.classList.remove(
        "show"
    );


    if (taskForm) {

        taskForm.reset();

    }

}


/* ================================================= */
/* CRIAR TAREFA */
/* ================================================= */

function createTask(event) {

    event.preventDefault();


    const title =
        taskTitle.value.trim();


    const category =
        taskCategory.value.trim();


    const time =
        taskTime.value;


    if (
        !title ||
        !category ||
        !time
    ) {

        return;

    }


    const newTask = {

        id: Date.now(),

        title: title,

        category: category,

        time: time,

        completed: false

    };


    tasks.push(
        newTask
    );


    saveTasks();

    renderTasks();

    closeModal();

}


/* ================================================= */
/* EVENTOS DA LISTA */
/* ================================================= */

if (tasksList) {

    tasksList.addEventListener(
        "click",
        function (event) {

            const statusButton =
                event.target.closest(
                    ".task-status"
                );


            const deleteButton =
                event.target.closest(
                    ".delete-task-btn"
                );


            if (statusButton) {

                const taskId =
                    Number(
                        statusButton.dataset.id
                    );


                toggleTask(
                    taskId
                );


                return;

            }


            if (deleteButton) {

                const taskId =
                    Number(
                        deleteButton.dataset.delete
                    );


                deleteTask(
                    taskId
                );

            }

        }
    );

}


/* ================================================= */
/* FILTROS */
/* ================================================= */

filterButtons.forEach(
    function (button) {

        button.addEventListener(
            "click",
            function () {

                filterButtons.forEach(
                    function (btn) {

                        btn.classList.remove(
                            "active"
                        );

                    }
                );


                this.classList.add(
                    "active"
                );


                currentFilter =
                    this.dataset.filter;


                renderTasks();

            }
        );

    }
);


/* ================================================= */
/* NOVA TAREFA */
/* ================================================= */

if (newTaskBtn) {

    newTaskBtn.addEventListener(
        "click",
        openModal
    );

}


/* ================================================= */
/* FECHAR MODAL */
/* ================================================= */

if (closeModalBtn) {

    closeModalBtn.addEventListener(
        "click",
        closeModal
    );

}


if (cancelTaskBtn) {

    cancelTaskBtn.addEventListener(
        "click",
        closeModal
    );

}


/* ================================================= */
/* FORMULÁRIO */
/* ================================================= */

if (taskForm) {

    taskForm.addEventListener(
        "submit",
        createTask
    );

}


/* ================================================= */
/* CLICAR FORA DO MODAL */
/* ================================================= */

if (taskModal) {

    taskModal.addEventListener(
        "click",
        function (event) {

            if (
                event.target ===
                taskModal
            ) {

                closeModal();

            }

        }
    );

}


/* ================================================= */
/* INICIALIZAÇÃO */
/* ================================================= */

renderTasks();


if (
    typeof lucide !==
    "undefined"
) {

    lucide.createIcons();

}