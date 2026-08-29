// =====================================================
// DONEE - DASHBOARD
// =====================================================


// =====================================================
// ELEMENTOS
// =====================================================

const completedCount =
    document.getElementById("completedCount");

const pendingCount =
    document.getElementById("pendingCount");

const totalCount =
    document.getElementById("totalCount");

const dashboardTasks =
    document.getElementById("dashboardTasks");

const progressPercentage =
    document.getElementById("progressPercentage");

const progressCircleText =
    document.getElementById("progressCircleText");

const progressFill =
    document.getElementById("progressFill");

const progressMessage =
    document.getElementById("progressMessage");

const currentDate =
    document.getElementById("currentDate");


// =====================================================
// PEGAR TAREFAS
// =====================================================

function getTasks() {

    const savedTasks =
        localStorage.getItem("doneeTasks");


    if (!savedTasks) {

        return [];

    }


    return JSON.parse(savedTasks);

}


// =====================================================
// ATUALIZAR ESTATÍSTICAS
// =====================================================

function updateStatistics() {


    const tasks = getTasks();


    const total =
        tasks.length;


    const completed =
        tasks.filter(
            task => task.completed
        ).length;


    const pending =
        total - completed;


    // Atualiza números

    totalCount.textContent =
        total;


    completedCount.textContent =
        completed;


    pendingCount.textContent =
        pending;


    // Calcula porcentagem

    let percentage = 0;


    if (total > 0) {

        percentage =
            Math.round(
                (completed / total) * 100
            );

    }


    // Atualiza progresso

    progressPercentage.textContent =
        `${percentage}%`;


    progressCircleText.textContent =
        `${percentage}%`;


    progressFill.style.width =
        `${percentage}%`;


    // Mensagem

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
// MOSTRAR TAREFAS
// =====================================================

function renderDashboardTasks() {


    const tasks = getTasks();


    dashboardTasks.innerHTML = "";


    // Se não tiver tarefas

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


        lucide.createIcons();

        return;

    }


    // Pega no máximo 4 tarefas

    const visibleTasks =
        tasks.slice(0, 4);


    visibleTasks.forEach(task => {


        const taskElement =
            document.createElement("div");


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
                        ${task.title}
                    </h3>

                    <span>
                        ${task.category}
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


    });


    lucide.createIcons();

}


// =====================================================
// DATA ATUAL
// =====================================================

function updateDate() {


    const today =
        new Date();


    const options = {

        day: "numeric",

        month: "long",

        year: "numeric"

    };


    const date =
        today.toLocaleDateString(
            "pt-BR",
            options
        );


    currentDate.textContent =
        date;

}


// =====================================================
// ATUALIZAR DASHBOARD
// =====================================================

function updateDashboard() {

    updateStatistics();

    renderDashboardTasks();

    updateDate();

}


// =====================================================
// INICIALIZAÇÃO
// =====================================================

updateDashboard();

lucide.createIcons();