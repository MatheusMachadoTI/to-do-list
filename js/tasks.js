// =====================================================
// DONEE - SISTEMA DE TAREFAS
// =====================================================


// =====================================================
// PROTEGER PÁGINA
// =====================================================

protegerPagina();


// =====================================================
// ELEMENTOS
// =====================================================

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

const taskDate =
    document.getElementById("taskDate");

const taskTime =
    document.getElementById("taskTime");

const repeatPanel =
    document.getElementById("repeatPanel");

const repeatWeekly =
    document.getElementById("repeatWeekly");

const repeatOptions =
    document.getElementById("repeatOptions");

const repeatUntil =
    document.getElementById("repeatUntil");

const repeatEndMode =
    document.getElementById("repeatEndMode");

const repeatEndDateField =
    document.getElementById("repeatEndDateField");

const taskPriority =
    document.getElementById("taskPriority");

const taskSearch =
    document.getElementById("taskSearch");

const taskSort =
    document.getElementById("taskSort");

const modalTitle =
    document.getElementById("modalTitle");

const modalLabel =
    document.getElementById("modalLabel");

const saveTaskBtn =
    document.getElementById("saveTaskBtn");

const sidebarUserName =
    document.getElementById("sidebarUserName");

const filterButtons =
    document.querySelectorAll(".filter-btn");


// =====================================================
// USUÁRIO
// =====================================================

const usuario =
    obterUsuarioLogado();


if (!usuario) {

    window.location.href =
        "login.html";

}


// =====================================================
// TAREFAS
// =====================================================

let tasks =
    obterTarefasUsuario();


// =====================================================
// FILTRO
// =====================================================

let currentFilter =
    "all";


// =====================================================
// TAREFA SENDO EDITADA
// =====================================================

let editingTaskId =
    null;

let editingRecurringTask =
    false;


// =====================================================
// INFORMAÇÃO DO USUÁRIO
// =====================================================

if (usuario && sidebarUserName) {

    sidebarUserName.textContent =
        usuario.nome;

}


// =====================================================
// SALVAR TAREFAS
// =====================================================

function saveTasks() {

    salvarTarefasUsuario(
        tasks
    );

}


// =====================================================
// DATA DE HOJE
// =====================================================

function getTodayString() {

    const hoje =
        new Date();


    const ano =
        hoje.getFullYear();


    const mes =
        String(
            hoje.getMonth() + 1
        ).padStart(2, "0");


    const dia =
        String(
            hoje.getDate()
        ).padStart(2, "0");


    return `${ano}-${mes}-${dia}`;

}


function formatDateInput(date) {
    return formatarDataTarefa(date);

}


function resetRepeatControls() {

    if (repeatPanel) {

        repeatPanel.hidden = false;

    }

    if (repeatWeekly) {

        repeatWeekly.checked = false;

    }

    if (repeatOptions) {

        repeatOptions.hidden = true;

    }

    if (repeatUntil) {

        repeatUntil.value = "";
        repeatUntil.min = taskDate ? taskDate.value : "";

    }

    if (repeatEndMode) {

        repeatEndMode.value = "date";

    }

    if (repeatEndDateField) {

        repeatEndDateField.hidden = false;

    }

    if (repeatWeekly) {

        repeatWeekly.disabled = false;

    }

    if (repeatEndMode) {

        repeatEndMode.disabled = false;

    }

    document.querySelectorAll(
        'input[name="repeatDay"]'
    ).forEach(function (day) {

        day.checked = false;

    });

}


function updateRepeatDateRange() {

    if (!taskDate || !repeatUntil) {

        return;

    }

    const startDate =
        taskDate.value;

    repeatUntil.min =
        startDate;

    if (
        startDate &&
        repeatUntil.value &&
        repeatUntil.value < startDate
    ) {

        repeatUntil.value =
            startDate;

    }

}


function updateRepeatEndMode() {

    if (!repeatEndMode || !repeatEndDateField) {

        return;

    }

    repeatEndDateField.hidden =
        repeatEndMode.value === "forever";

}


// =====================================================
// VERIFICAR SE TAREFA ESTÁ ATRASADA
// =====================================================

function isTaskOverdue(task) {

    if (
        task.completed ||
        !task.date
    ) {

        return false;

    }


    const hoje =
        getTodayString();


    return task.date <
        hoje;

}


// =====================================================
// VERIFICAR SE É HOJE
// =====================================================

function isTaskToday(task) {

    if (!task.date) {

        return false;

    }


    return task.date ===
        getTodayString();

}


// =====================================================
// PRIORIDADE NUMÉRICA
// =====================================================

function getPriorityValue(
    priority
) {

    if (
        priority ===
        "high"
    ) {

        return 3;

    }


    if (
        priority ===
        "medium"
    ) {

        return 2;

    }


    return 1;

}


// =====================================================
// TEXTO DA PRIORIDADE
// =====================================================

function getPriorityText(
    priority
) {

    if (
        priority ===
        "high"
    ) {

        return "Alta";

    }


    if (
        priority ===
        "medium"
    ) {

        return "Média";

    }


    return "Baixa";

}


// =====================================================
// CLASSE DA PRIORIDADE
// =====================================================

function getPriorityClass(
    priority
) {

    if (
        priority ===
        "high"
    ) {

        return "priority-high";

    }


    if (
        priority ===
        "medium"
    ) {

        return "priority-medium";

    }


    return "priority-low";

}


// =====================================================
// FORMATAR DATA
// =====================================================

function formatDate(dateString) {

    if (!dateString) {

        return "Sem data";

    }


    const partes =
        dateString.split("-");


    if (
        partes.length !==
        3
    ) {

        return "Sem data";

    }


    return `${partes[2]}/${partes[1]}/${partes[0]}`;

}


// =====================================================
// ESCAPAR HTML
// =====================================================

function escaparHTML(texto) {

    const div =
        document.createElement("div");


    div.textContent =
        texto || "";


    return div.innerHTML;

}


// =====================================================
// ORDENAR TAREFAS
// =====================================================

function sortTasks(lista) {

    const sorted =
        [...lista];


    const criterio =
        taskSort
            ? taskSort.value
            : "date-asc";


    if (
        criterio ===
        "date-asc"
    ) {

        sorted.sort(
            function (a, b) {

                if (!a.date && !b.date) {

                    return compareTime(
                        a,
                        b
                    );

                }


                if (!a.date) {

                    return 1;

                }


                if (!b.date) {

                    return -1;

                }


                if (
                    a.date !==
                    b.date
                ) {

                    return a.date.localeCompare(
                        b.date
                    );

                }


                return compareTime(
                    a,
                    b
                );

            }
        );

    }


    if (
        criterio ===
        "date-desc"
    ) {

        sorted.sort(
            function (a, b) {

                if (!a.date && !b.date) {

                    return compareTime(
                        b,
                        a
                    );

                }


                if (!a.date) {

                    return 1;

                }


                if (!b.date) {

                    return -1;

                }


                if (
                    a.date !==
                    b.date
                ) {

                    return b.date.localeCompare(
                        a.date
                    );

                }


                return compareTime(
                    b,
                    a
                );

            }
        );

    }


    if (
        criterio ===
        "priority"
    ) {

        sorted.sort(
            function (a, b) {

                return (
                    getPriorityValue(
                        b.priority
                    ) -
                    getPriorityValue(
                        a.priority
                    )
                );

            }
        );

    }


    if (
        criterio ===
        "time"
    ) {

        sorted.sort(
            function (a, b) {

                return compareTime(
                    a,
                    b
                );

            }
        );

    }


    if (
        criterio ===
        "created"
    ) {

        sorted.sort(
            function (a, b) {

                return (
                    Number(b.id) -
                    Number(a.id)
                );

            }
        );

    }


    return sorted;

}


// =====================================================
// COMPARAR HORÁRIOS
// =====================================================

function compareTime(a, b) {

    const timeA =
        a.time || "99:99";

    const timeB =
        b.time || "99:99";


    return timeA.localeCompare(
        timeB
    );

}


// =====================================================
// PEGAR TAREFAS FILTRADAS
// =====================================================

function getFilteredTasks() {

    const pesquisa =
        taskSearch
            ? taskSearch.value
                .trim()
                .toLowerCase()
            : "";


    const hoje =
        getTodayString();


    let filtered =
        tasks.flatMap(
            function (task) {

                if (!task.repeatWeekly) {

                    return [task];

                }


                const occurrence =
                    proximaOcorrenciaSemanal(
                        task,
                        hoje
                    );


                return occurrence
                    ? [occurrence]
                    : [];

            }
        );


    // -------------------------------------------------
    // FILTRO
    // -------------------------------------------------

    if (
        currentFilter ===
        "pending"
    ) {

        filtered =
            filtered.filter(
                function (task) {

                    return !task.completed;

                }
            );

    }


    if (
        currentFilter ===
        "completed"
    ) {

        filtered =
            filtered.filter(
                function (task) {

                    return task.completed;

                }
            );

    }


    if (
        currentFilter ===
        "today"
    ) {

        filtered =
            filtered.filter(
                function (task) {

                    return isTaskToday(
                        task
                    );

                }
            );

    }


    if (
        currentFilter ===
        "overdue"
    ) {

        filtered =
            filtered.filter(
                function (task) {

                    return isTaskOverdue(
                        task
                    );

                }
            );

    }


    // -------------------------------------------------
    // PESQUISA
    // -------------------------------------------------

    if (pesquisa !== "") {

        filtered =
            filtered.filter(
                function (task) {

                    const titulo =
                        (
                            task.title ||
                            ""
                        ).toLowerCase();


                    const categoria =
                        (
                            task.category ||
                            ""
                        ).toLowerCase();


                    return (
                        titulo.includes(
                            pesquisa
                        ) ||
                        categoria.includes(
                            pesquisa
                        )
                    );

                }
            );

    }


    // -------------------------------------------------
    // ORDENAR
    // -------------------------------------------------

    return sortTasks(
        filtered
    );

}


// =====================================================
// RENDERIZAR TAREFAS
// =====================================================

function renderTasks() {

    if (!tasksList) {

        return;

    }


    tasksList.innerHTML =
        "";


    const filteredTasks =
        getFilteredTasks();


    // -------------------------------------------------
    // CONTADOR
    // -------------------------------------------------

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


    // -------------------------------------------------
    // NENHUMA TAREFA
    // -------------------------------------------------

    if (
        filteredTasks.length ===
        0
    ) {

        let titulo =
            "Nenhuma tarefa encontrada";


        let texto =
            "Não há tarefas nesta categoria.";


        if (
            tasks.length ===
            0
        ) {

            titulo =
                "Você ainda não tem tarefas";

            texto =
                "Clique em \"Nova tarefa\" para começar.";

        }


        if (
            taskSearch &&
            taskSearch.value.trim() !== ""
        ) {

            titulo =
                "Nenhuma tarefa encontrada";

            texto =
                "Tente pesquisar por outro termo.";

        }


        tasksList.innerHTML = `

            <div class="empty-tasks">

                <i data-lucide="clipboard-check"></i>

                <h3>
                    ${titulo}
                </h3>

                <p>
                    ${texto}
                </p>

            </div>

        `;


        ativarIcones();

        return;

    }


    // -------------------------------------------------
    // CRIAR CARDS
    // -------------------------------------------------

    filteredTasks.forEach(
        function (task) {

            const taskCard =
                document.createElement(
                    "div"
                );


            const atrasada =
                isTaskOverdue(
                    task
                );


            const prioridade =
                task.priority ||
                "medium";


            taskCard.className =
                "task-card";


            if (task.completed) {

                taskCard.classList.add(
                    "task-completed"
                );

            }


            if (atrasada) {

                taskCard.classList.add(
                    "task-overdue"
                );

            }


            const dataHTML =
                task.date
                    ? `
                        <span class="task-date">
                            <i data-lucide="calendar"></i>
                            ${formatDate(task.date)}
                        </span>
                    `
                    : `
                        <span class="task-date no-date">
                            <i data-lucide="calendar-off"></i>
                            Sem data
                        </span>
                    `;

            const recurrenceHTML =
                task.repeatWeekly
                    ? `
                        <span class="task-repeat-label">
                            <i data-lucide="repeat-2"></i>
                            Repetição semanal
                        </span>
                    `
                    : "";


            const statusHTML =
                task.completed
                    ? `
                        <i data-lucide="check"></i>
                    `
                    : "";


            const prioridadeHTML = `

                <span
                    class="task-priority ${getPriorityClass(
                        prioridade
                    )}"
                >

                    <span class="priority-dot"></span>

                    ${getPriorityText(
                        prioridade
                    )}

                </span>

            `;


            let atrasoHTML =
                "";


            if (atrasada) {

                atrasoHTML = `

                    <span class="overdue-label">

                        <i data-lucide="triangle-alert"></i>

                        Atrasada

                    </span>

                `;

            }


            taskCard.innerHTML = `

                <div class="task-border"></div>


                <div class="task-left">


                    <div class="task-content">


                        <div class="task-title-row">

                            <h3>
                                ${escaparHTML(
                                    task.title
                                )}
                            </h3>

                            ${prioridadeHTML}

                        </div>


                        <div class="task-meta">

                            <span class="task-category">
                                ${escaparHTML(
                                    task.category
                                )}
                            </span>

                            ${dataHTML}

                            ${recurrenceHTML}

                            ${atrasoHTML}

                        </div>


                    </div>


                </div>


                <div class="task-right">


                    <span class="task-time">
                        ${task.time || "--:--"}
                    </span>


                    <button
                        class="edit-task-btn"
                        data-edit="${task.id}"
                        type="button"
                        aria-label="Editar tarefa"
                    >

                        <i data-lucide="pencil"></i>

                    </button>


                    <button
                        class="task-status ${
                            task.completed
                                ? "completed"
                                : ""
                        }"
                        data-id="${task.id}"
                        data-occurrence-date="${task.occurrenceDate || ""}"
                        type="button"
                        aria-label="${
                            task.completed
                                ? "Desmarcar tarefa"
                                : "Marcar tarefa como concluída"
                        }"
                    >

                        ${statusHTML}

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

        }
    );


    ativarIcones();

}


// =====================================================
// ATIVAR LUCIDE
// =====================================================

function ativarIcones() {

    if (
        typeof lucide !==
        "undefined"
    ) {

        lucide.createIcons();

    }

}


// =====================================================
// CONCLUIR / DESCONCLUIR
// =====================================================

function toggleTask(taskId, occurrenceDate) {

    tasks =
        tasks.map(
            function (task) {

                if (
                    Number(task.id) ===
                    Number(taskId)
                ) {

                    if (task.repeatWeekly) {

                        const dataOcorrencia =
                            occurrenceDate || task.date;

                        const concluidas =
                            Array.isArray(task.completedDates)
                                ? task.completedDates
                                : [];

                        const jaConcluida =
                            concluidas.includes(dataOcorrencia);

                        if (jaConcluida) {

                            adicionarXP(-10);

                        } else {

                            adicionarXP(10);

                        }

                        return {
                            ...task,
                            completedDates: jaConcluida
                                ? concluidas.filter(function (date) {
                                    return date !== dataOcorrencia;
                                })
                                : [...concluidas, dataOcorrencia]
                        };

                    }

                    return {

                        ...task,

                        completed:
                            !task.completed

                    };

                }


                return task;

            }
        );


    saveTasks();

    renderTasks();

}


// =====================================================
// EXCLUIR
// =====================================================

function deleteTask(taskId) {

    const confirmar =
        confirm(
            "Deseja realmente excluir esta tarefa?"
        );


    if (!confirmar) {

        return;

    }


    tasks =
        tasks.filter(
            function (task) {

                return (
                    Number(task.id) !==
                    Number(taskId)
                );

            }
        );


    saveTasks();

    renderTasks();

}


// =====================================================
// ABRIR MODAL PARA NOVA TAREFA
// =====================================================

function openNewTaskModal() {

    editingTaskId =
        null;

    editingRecurringTask =
        false;

    if (taskForm) {

        taskForm.reset();

    }


    if (modalLabel) {

        modalLabel.textContent =
            "NOVA TAREFA";

    }


    if (modalTitle) {

        modalTitle.textContent =
            "Criar tarefa";

    }


    if (saveTaskBtn) {

        saveTaskBtn.textContent =
            "Criar tarefa";

    }


    if (taskPriority) {

        taskPriority.value =
            "medium";

    }

    if (repeatEndMode) {

        repeatEndMode.addEventListener(
            "change",
            updateRepeatEndMode
        );

    }


    if (taskDate) {

        taskDate.value =
            getTodayString();

    }

    resetRepeatControls();


    openModal();

}


// =====================================================
// ABRIR MODAL
// =====================================================

function openModal() {

    if (!taskModal) {

        return;

    }


    taskModal.classList.add(
        "show"
    );


    document.body.classList.add(
        "modal-open"
    );


    setTimeout(
        function () {

            if (taskTitle) {

                taskTitle.focus();

            }

        },
        100
    );

}


// =====================================================
// ABRIR MODAL DE EDIÇÃO
// =====================================================

function editTask(taskId) {

    const task =
        tasks.find(
            function (item) {

                return (
                    Number(item.id) ===
                    Number(taskId)
                );

            }
        );


    if (!task) {

        return;

    }

    resetRepeatControls();

    editingRecurringTask =
        Boolean(task.repeatWeekly);

    if (repeatPanel) {

        repeatPanel.hidden =
            !editingRecurringTask;

    }


    editingTaskId =
        Number(task.id);


    if (modalLabel) {

        modalLabel.textContent =
            "EDITAR TAREFA";

    }


    if (modalTitle) {

        modalTitle.textContent =
            "Editar tarefa";

    }


    if (saveTaskBtn) {

        saveTaskBtn.textContent =
            "Salvar alterações";

    }


    if (taskTitle) {

        taskTitle.value =
            task.title || "";

    }


    if (taskCategory) {

        taskCategory.value =
            task.category || "";

    }


    if (taskDate) {

        taskDate.value =
            task.date || "";

    }

    if (editingRecurringTask) {

        repeatWeekly.checked = true;
        repeatWeekly.disabled = true;
        repeatOptions.hidden = false;
        repeatEndMode.value = "forever";
        repeatEndMode.disabled = true;
        updateRepeatEndMode();

        document.querySelectorAll(
            'input[name="repeatDay"]'
        ).forEach(function (day) {

            day.checked =
                (task.repeatDays || []).includes(Number(day.value));

        });

    }


    if (taskTime) {

        taskTime.value =
            task.time || "";

    }

    updateRepeatDateRange();


    if (taskPriority) {

        taskPriority.value =
            task.priority ||
            "medium";

    }


    openModal();

}


// =====================================================
// FECHAR MODAL
// =====================================================

function closeModal() {

    if (!taskModal) {

        return;

    }


    taskModal.classList.remove(
        "show"
    );


    document.body.classList.remove(
        "modal-open"
    );


    editingTaskId =
        null;

    editingRecurringTask =
        false;

    resetRepeatControls();


    if (taskForm) {

        taskForm.reset();

    }


    if (modalLabel) {

        modalLabel.textContent =
            "NOVA TAREFA";

    }


    if (modalTitle) {

        modalTitle.textContent =
            "Criar tarefa";

    }


    if (saveTaskBtn) {

        saveTaskBtn.textContent =
            "Criar tarefa";

    }

}


// =====================================================
// SALVAR FORMULÁRIO
// =====================================================

function saveTask(event) {

    event.preventDefault();


    const title =
        taskTitle.value.trim();


    const category =
        taskCategory.value.trim();


    const date =
        taskDate.value;


    const time =
        taskTime.value;


    const priority =
        taskPriority.value;

    const repeatEnabled =
        Boolean(repeatWeekly && repeatWeekly.checked);

    const repeatEndDate =
        repeatUntil ? repeatUntil.value : "";

    const repeatForever =
        Boolean(repeatEndMode && repeatEndMode.value === "forever");

    const repeatDays = Array.from(
        document.querySelectorAll('input[name="repeatDay"]:checked')
    ).map(function (day) {

        return Number(day.value);

    });


    // -------------------------------------------------
    // VALIDAÇÕES
    // -------------------------------------------------

    if (
        title === "" ||
        category === "" ||
        time === ""
    ) {

        alert(
            "Preencha todos os campos obrigatórios."
        );

        return;

    }


    if (
        title.length <
        2
    ) {

        alert(
            "Digite um título válido."
        );

        taskTitle.focus();

        return;

    }


    if (
        category.length <
        2
    ) {

        alert(
            "Digite uma categoria válida."
        );

        taskCategory.focus();

        return;

    }

    let occurrenceDates = [date];

    if (repeatEnabled) {

        if (!date || (!repeatForever && !repeatEndDate)) {

            alert(
                repeatForever
                    ? "Escolha a data inicial da repetição."
                    : "Escolha a data inicial e a data final da repetição."
            );

            if (!date) {

                taskDate.focus();

            } else {

                repeatUntil.focus();

            }

            return;

        }

        if (!repeatForever && repeatEndDate < date) {

            alert(
                "A data final da repetição deve ser igual ou posterior à data inicial."
            );

            repeatUntil.focus();

            return;

        }

        if (repeatDays.length === 0) {

            alert(
                "Selecione pelo menos um dia da semana para repetir a tarefa."
            );

            document.querySelector(
                'input[name="repeatDay"]'
            ).focus();

            return;

        }

        if (!repeatForever) {

            occurrenceDates = [];

            const [year, month, day] =
                date.split("-").map(Number);

            const cursor =
                new Date(year, month - 1, day);

            while (formatDateInput(cursor) <= repeatEndDate) {

                if (repeatDays.includes(cursor.getDay())) {

                    occurrenceDates.push(
                        formatDateInput(cursor)
                    );

                }

                cursor.setDate(
                    cursor.getDate() + 1
                );

            }

            if (occurrenceDates.length === 0) {

                alert(
                    "O intervalo escolhido não contém nenhum dos dias da semana selecionados."
                );

                repeatUntil.focus();

                return;

            }

        }

    }


    // -------------------------------------------------
    // EDITAR
    // -------------------------------------------------

    if (
        editingTaskId !==
        null
    ) {

        tasks =
            tasks.map(
                function (task) {

                    if (
                        Number(task.id) ===
                        Number(editingTaskId)
                    ) {

                        return {

                            ...task,

                            title:
                                title,

                            category:
                                category,

                            date:
                                date,

                            time:
                                time,

                            priority:
                                priority,

                            ...(editingRecurringTask
                                ? {
                                    repeatWeekly: true,
                                    repeatDays: repeatDays,
                                    repeatUntil: null
                                }
                                : {})

                        };

                    }


                    return task;

                }
            );


        saveTasks();

        renderTasks();

        closeModal();


        mostrarMensagem(
            "Tarefa atualizada com sucesso!"
        );


        return;

    }

    if (repeatEnabled && repeatForever) {

        let nextTaskId =
            Date.now();

        while (tasks.some(function (task) {

            return Number(task.id) === nextTaskId;

        })) {

            nextTaskId++;

        }

        tasks.push({
            id: nextTaskId,
            title: title,
            category: category,
            date: date,
            time: time,
            priority: priority,
            completed: false,
            repeatWeekly: true,
            repeatDays: repeatDays,
            repeatUntil: null,
            completedDates: []
        });

        saveTasks();
        renderTasks();
        closeModal();

        mostrarMensagem(
            "Tarefa semanal criada para repetir para sempre!"
        );

        return;

    }


    // -------------------------------------------------
    // NOVA TAREFA
    // -------------------------------------------------

    let nextTaskId =
        Date.now();

    tasks.push(
        ...occurrenceDates.map(function (occurrenceDate) {

            while (tasks.some(function (task) {

                return Number(task.id) === nextTaskId;

            })) {

                nextTaskId++;

            }

            const newTask = {

                id: nextTaskId++,

                title: title,

                category: category,

                date: occurrenceDate,

                time: time,

                priority: priority,

                completed: false

            };

            return newTask;

        })
    );


    saveTasks();

    renderTasks();

    closeModal();


    mostrarMensagem(
        occurrenceDates.length > 1
            ? `Tarefa criada em ${occurrenceDates.length} ocorrências!`
            : "Tarefa criada com sucesso!"
    );

}


// =====================================================
// MENSAGEM
// =====================================================

function mostrarMensagem(
    texto
) {

    const antiga =
        document.querySelector(
            ".task-toast"
        );


    if (antiga) {

        antiga.remove();

    }


    const toast =
        document.createElement(
            "div"
        );


    toast.className =
        "task-toast";


    toast.innerHTML = `

        <i data-lucide="circle-check"></i>

        <span>
            ${texto}
        </span>

    `;


    document.body.appendChild(
        toast
    );


    ativarIcones();


    setTimeout(
        function () {

            toast.classList.add(
                "hide"
            );


            setTimeout(
                function () {

                    toast.remove();

                },
                250
            );

        },
        2500
    );

}


// =====================================================
// EVENTOS DA LISTA
// =====================================================

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


            const editButton =
                event.target.closest(
                    ".edit-task-btn"
                );


            if (statusButton) {

                const taskId =
                    Number(
                        statusButton.dataset.id
                    );


                toggleTask(
                    taskId,
                    statusButton.dataset.occurrenceDate
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


                return;

            }


            if (editButton) {

                const taskId =
                    Number(
                        editButton.dataset.edit
                    );


                editTask(
                    taskId
                );

            }

        }
    );

}


// =====================================================
// FILTROS
// =====================================================

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


// =====================================================
// PESQUISA
// =====================================================

if (taskSearch) {

    taskSearch.addEventListener(
        "input",
        function () {

            renderTasks();

        }
    );

}


// =====================================================
// ORDENAÇÃO
// =====================================================

if (taskSort) {

    taskSort.addEventListener(
        "change",
        function () {

            renderTasks();

        }
    );

}


// =====================================================
// NOVA TAREFA
// =====================================================

if (repeatWeekly && repeatOptions) {

    repeatWeekly.addEventListener(
        "change",
        function () {

            repeatOptions.hidden =
                !repeatWeekly.checked;
            updateRepeatEndMode();

            if (repeatWeekly.checked) {

                updateRepeatDateRange();

                if (
                    taskDate &&
                    taskDate.value &&
                    repeatUntil &&
                    (
                        !repeatUntil.value ||
                        repeatUntil.value < taskDate.value
                    )
                ) {

                    const [year, month, day] =
                        taskDate.value.split("-").map(Number);

                    const endDate =
                        new Date(year, month - 1, day);

                    endDate.setDate(
                        endDate.getDate() + 28
                    );

                    repeatUntil.value =
                        formatDateInput(endDate);

                }

            }

        }
    );

}


if (repeatEndMode) {

    repeatEndMode.addEventListener(
        "change",
        updateRepeatEndMode
    );

}


if (taskDate) {

    taskDate.addEventListener(
        "change",
        updateRepeatDateRange
    );

}


if (newTaskBtn) {

    newTaskBtn.addEventListener(
        "click",
        openNewTaskModal
    );

}


// =====================================================
// FECHAR MODAL
// =====================================================

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


// =====================================================
// FORMULÁRIO
// =====================================================

if (taskForm) {

    taskForm.addEventListener(
        "submit",
        saveTask
    );

}


// =====================================================
// CLICAR FORA
// =====================================================

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


// =====================================================
// ESC
// =====================================================

document.addEventListener(
    "keydown",
    function (event) {

        if (
            event.key ===
            "Escape"
        ) {

            if (
                taskModal &&
                taskModal.classList.contains(
                    "show"
                )
            ) {

                closeModal();

            }

        }

    }
);


// =====================================================
// INICIALIZAÇÃO
// =====================================================

renderTasks();

ativarIcones();