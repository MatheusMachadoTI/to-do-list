// =====================================================
// DONEE - DASHBOARD
// =====================================================


// =====================================================
// PROTEGER PÁGINA
// =====================================================

protegerPagina();


// =====================================================
// ELEMENTOS
// =====================================================

const completedCount =
    document.getElementById(
        "completedCount"
    );

const pendingCount =
    document.getElementById(
        "pendingCount"
    );

const totalCount =
    document.getElementById(
        "totalCount"
    );

const dashboardTasks =
    document.getElementById(
        "dashboardTasks"
    );

const progressPercentage =
    document.getElementById(
        "progressPercentage"
    );

const progressCircleText =
    document.getElementById(
        "progressCircleText"
    );

const progressFill =
    document.getElementById(
        "progressFill"
    );

const progressMessage =
    document.getElementById(
        "progressMessage"
    );

const currentDate =
    document.getElementById(
        "currentDate"
    );


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

function getTasks() {

    return obterTarefasUsuario();

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


// =====================================================
// VERIFICAR ATRASADA
// =====================================================

function isTaskOverdue(task) {

    if (
        task.completed ||
        !task.date
    ) {

        return false;

    }


    return (
        task.date <
        getTodayString()
    );

}


// =====================================================
// DATA FORMATADA
// =====================================================

function formatDate(dateString) {

    if (!dateString) {

        return "";

    }


    const partes =
        dateString.split("-");


    if (
        partes.length !==
        3
    ) {

        return "";

    }


    return `${partes[2]}/${partes[1]}`;

}


// =====================================================
// CARREGAR NOME
// =====================================================

function carregarNomeUsuario() {

    if (!usuario) {

        return;

    }


    const nome =
        usuario.nome ||
        "Usuário";


    // ---------------------------------------------
    // TÍTULO
    // ---------------------------------------------

    const titulo =
        document.querySelector(
            ".dashboard-header h1"
        );


    if (titulo) {

        titulo.textContent =
            `Olá, ${nome}!`;

    }


    // ---------------------------------------------
    // SIDEBAR
    // ---------------------------------------------

    const nomes =
        document.querySelectorAll(
            ".profile-info strong"
        );


    nomes.forEach(
        function (elemento) {

            elemento.textContent =
                nome;

        }
    );

}


// =====================================================
// ATUALIZAR ESTATÍSTICAS
// =====================================================

function updateStatistics() {

    const tasks =
        getTasks();


    const total =
        tasks.length;


    const completed =
        tasks.filter(
            function (task) {

                return task.completed;

            }
        ).length;


    const pending =
        total -
        completed;


    let percentage =
        0;


    if (total > 0) {

        percentage =
            Math.round(
                (
                    completed /
                    total
                ) * 100
            );

    }


    // ---------------------------------------------
    // NÚMEROS
    // ---------------------------------------------

    if (totalCount) {

        totalCount.textContent =
            total;

    }


    if (completedCount) {

        completedCount.textContent =
            completed;

    }


    if (pendingCount) {

        pendingCount.textContent =
            pending;

    }


    // ---------------------------------------------
    // PROGRESSO
    // ---------------------------------------------

    if (progressPercentage) {

        progressPercentage.textContent =
            `${percentage}%`;

    }


    if (progressCircleText) {

        progressCircleText.textContent =
            `${percentage}%`;

    }


    if (progressFill) {

        progressFill.style.width =
            `${percentage}%`;

    }


    // ---------------------------------------------
    // MENSAGEM
    // ---------------------------------------------

    if (!progressMessage) {

        return;

    }


    if (total === 0) {

        progressMessage.textContent =
            "Comece criando uma tarefa!";

    }

    else if (percentage === 0) {

        progressMessage.textContent =
            "Comece concluindo uma tarefa!";

    }

    else if (percentage < 50) {

        progressMessage.textContent =
            "Você está começando. Continue!";

    }

    else if (percentage < 100) {

        progressMessage.textContent =
            "Muito bem! Continue mantendo o ritmo.";

    }

    else {

        progressMessage.textContent =
            "Parabéns! Todas as tarefas concluídas!";

    }

}


// =====================================================
// RENDERIZAR TAREFAS
// =====================================================

function renderDashboardTasks() {

    if (!dashboardTasks) {

        return;

    }


    const today =
        getTodayString();


    const tasks =
        getTasks().flatMap(
            function (task) {

                if (!task.repeatWeekly) {

                    return [task];

                }


                const occurrence =
                    proximaOcorrenciaSemanal(
                        task,
                        today
                    );


                return occurrence
                    ? [occurrence]
                    : [];

            }
        );


    dashboardTasks.innerHTML =
        "";


    // ---------------------------------------------
    // NENHUMA TAREFA
    // ---------------------------------------------

    if (tasks.length === 0) {

        dashboardTasks.innerHTML = `

            <div class="empty-dashboard-tasks">

                <i data-lucide="clipboard-list"></i>

                <h3>
                    Nenhuma tarefa cadastrada
                </h3>

                <p>
                    Crie uma tarefa para começar.
                </p>

            </div>

        `;


        ativarIcones();

        return;

    }


    // ---------------------------------------------
    // ORDENAÇÃO
    // ---------------------------------------------

    const tarefasOrdenadas =
        [...tasks].sort(
            function (a, b) {

                // Primeiro tarefas de hoje
                // e próximas

                if (
                    a.date &&
                    b.date &&
                    a.date !==
                    b.date
                ) {

                    return a.date.localeCompare(
                        b.date
                    );

                }


                if (
                    a.date &&
                    !b.date
                ) {

                    return -1;

                }


                if (
                    !a.date &&
                    b.date
                ) {

                    return 1;

                }


                return (
                    (a.time || "")
                    .localeCompare(
                        b.time || ""
                    )
                );

            }
        );


    // ---------------------------------------------
    // MÁXIMO 4
    // ---------------------------------------------

    const visibleTasks =
        tarefasOrdenadas.slice(
            0,
            4
        );


    visibleTasks.forEach(
        function (task) {

            const taskElement =
                document.createElement(
                    "div"
                );


            taskElement.className =
                "dashboard-task";


            if (isTaskOverdue(task)) {

                taskElement.classList.add(
                    "dashboard-task-overdue"
                );

            }


            const data =
                formatDate(
                    task.date
                );


            const dataHTML =
                data
                    ? `<span>${data}</span>`
                    : "";


            taskElement.innerHTML = `

                <div class="task-main">


                    <div
                        class="task-status ${
                            task.completed
                                ? "completed"
                                : ""
                        }"
                    >

                        ${
                            task.completed
                                ? '<i data-lucide="check"></i>'
                                : ""
                        }

                    </div>


                    <div>

                        <h3>
                            ${escaparHTML(
                                task.title
                            )}
                        </h3>


                        <span>

                            ${escaparHTML(
                                task.category
                            )}

                            ${
                                task.repeatWeekly
                                    ? " · Repete semanalmente"
                                    : ""
                            }

                            ${
                                dataHTML
                            }

                        </span>

                    </div>


                </div>


                <span class="task-time">

                    ${task.time || "--:--"}

                </span>

            `;


            dashboardTasks.appendChild(
                taskElement
            );

        }
    );


    ativarIcones();

}


// =====================================================
// ESCAPAR HTML
// =====================================================

function escaparHTML(texto) {

    const div =
        document.createElement(
            "div"
        );


    div.textContent =
        texto || "";


    return div.innerHTML;

}


// =====================================================
// LUCIDE
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
// DATA ATUAL
// =====================================================

function updateDate() {

    if (!currentDate) {

        return;

    }


    const today =
        new Date();


    const options = {

        day:
            "numeric",

        month:
            "long",

        year:
            "numeric"

    };


    currentDate.textContent =
        today.toLocaleDateString(
            "pt-BR",
            options
        );

}


// =====================================================
// ATUALIZAR DASHBOARD
// =====================================================

function updateDashboard() {

    carregarNomeUsuario();

    updateStatistics();

    renderDashboardTasks();

    updateDate();

}


// =====================================================
// INICIALIZAÇÃO
// =====================================================

updateDashboard();

ativarIcones();