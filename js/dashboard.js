// =====================================================
// DONEE - DASHBOARD
// =====================================================


/* ================================================= */
/* PROTEGER PÁGINA */
/* ================================================= */

protegerPagina();


/* ================================================= */
/* ELEMENTOS */
/* ================================================= */

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


/* ================================================= */
/* USUÁRIO */
/* ================================================= */

function carregarUsuarioDashboard() {

    const usuario =
        obterUsuarioLogado();


    if (!usuario) {

        return;

    }


    const titulo =
        document.querySelector(
            ".dashboard-header h1"
        );


    if (titulo) {

        titulo.textContent =
            `Olá, ${usuario.nome}!`;

    }


    const nomesSidebar =
        document.querySelectorAll(
            ".profile-info strong"
        );


    nomesSidebar.forEach(
        function (elemento) {

            elemento.textContent =
                usuario.nome;

        }
    );

}


/* ================================================= */
/* PEGAR TAREFAS */
/* ================================================= */

function getTasks() {

    return obterTarefasUsuario();

}


/* ================================================= */
/* ESTATÍSTICAS */
/* ================================================= */

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
                (completed / total) *
                100
            );

    }


    /* ================================================= */
    /* NÚMEROS */
    /* ================================================= */

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


    /* ================================================= */
    /* PORCENTAGEM */
    /* ================================================= */

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


    /* ================================================= */
    /* MENSAGEM */
    /* ================================================= */

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


/* ================================================= */
/* MOSTRAR TAREFAS */
/* ================================================= */

function renderDashboardTasks() {

    if (!dashboardTasks) {

        return;

    }


    const tasks =
        getTasks();


    dashboardTasks.innerHTML =
        "";


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


        if (
            typeof lucide !==
            "undefined"
        ) {

            lucide.createIcons();

        }


        return;

    }


    const visibleTasks =
        tasks.slice(0, 4);


    visibleTasks.forEach(
        function (task) {

            const taskElement =
                document.createElement(
                    "div"
                );


            taskElement.className =
                "dashboard-task";


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
                            ${escaparHTML(task.title)}
                        </h3>

                        <span>
                            ${escaparHTML(task.category)}
                        </span>

                    </div>

                </div>


                <span class="task-time">
                    ${task.time}
                </span>

            `;


            dashboardTasks.appendChild(
                taskElement
            );

        }
    );


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
/* DATA ATUAL */
/* ================================================= */

function updateDate() {

    if (!currentDate) {

        return;

    }


    const today =
        new Date();


    const options = {

        day: "numeric",

        month: "long",

        year: "numeric"

    };


    currentDate.textContent =
        today.toLocaleDateString(
            "pt-BR",
            options
        );

}


/* ================================================= */
/* DASHBOARD */
/* ================================================= */

function updateDashboard() {

    carregarUsuarioDashboard();

    updateStatistics();

    renderDashboardTasks();

    updateDate();

}


/* ================================================= */
/* INICIALIZAÇÃO */
/* ================================================= */

updateDashboard();


if (
    typeof lucide !==
    "undefined"
) {

    lucide.createIcons();

}