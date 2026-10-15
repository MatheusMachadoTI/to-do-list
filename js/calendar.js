// =====================================================
// DONEE - CALENDÁRIO
// =====================================================

protegerPagina();

const usuario = obterUsuarioLogado();
if (!usuario) { window.location.href = "login.html"; }

const sidebarUserName = document.getElementById("sidebarUserName");
if (usuario && sidebarUserName) { sidebarUserName.textContent = usuario.nome; }

const calBody = document.getElementById("calBody");
const calTitle = document.getElementById("calTitle");
const calStats = document.getElementById("calStats");
const calModal = document.getElementById("calModal");
const calModalContent = document.getElementById("calModalContent");

let tasks = obterTarefasUsuario();
let view = "week";
let current = new Date();
current.setHours(0, 0, 0, 0);

const HOURS = Array.from({ length: 18 }, (_, i) => i + 6); // 06h - 23h
const DOW = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];

// ---------- utilidades ----------
const pad = n => String(n).padStart(2, "0");
const iso = d => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
const parse = s => { const [y, m, d] = s.split("-").map(Number); return new Date(y, m - 1, d); };
const addDays = (d, n) => { const x = new Date(d); x.setDate(x.getDate() + n); return x; };
const todayISO = () => iso(new Date());
const esc = t => { const d = document.createElement("div"); d.textContent = t == null ? "" : t; return d.innerHTML; };
const hourOf = t => (t ? parseInt(t.split(":")[0], 10) : 0);
const prioClass = p => (p === "high" || p === "alta" ? "high" : p === "low" || p === "baixa" ? "low" : "medium");
const prioText = c => ({ high: "Alta", medium: "Média", low: "Baixa" }[c]);

function tasksOf(dateStr) {
    return tasks
        .filter(t => t.date === dateStr)
        .sort((a, b) => (a.time || "").localeCompare(b.time || ""));
}
function counts(list) {
    const done = list.filter(t => t.completed).length;
    return { done, pend: list.length - done };
}
function weekStart(d) { return addDays(d, -d.getDay()); }

// ---------- persistência / XP (mesma regra da página de tarefas) ----------
function toggleTask(id) {
    tasks = tasks.map(task => {
        if (Number(task.id) !== Number(id)) return task;
        const concluida = !task.completed;
        if (concluida && !task.xpConcedido) { adicionarXP(10); return { ...task, completed: true, xpConcedido: true }; }
        if (!concluida && task.xpConcedido) { adicionarXP(-10); return { ...task, completed: false, xpConcedido: false }; }
        return { ...task, completed: concluida };
    });
    salvarTarefasUsuario(tasks);
    render();
}

// ---------- componentes ----------
function taskCard(t) {
    const cls = t.completed ? "done" : prioClass(t.priority);
    return `<button type="button" class="cal-task ${cls}" data-open="${t.id}">
        <span class="cal-task-time">${esc(t.time || "")}${t.completed ? " ✓" : ""}</span>
        <span class="cal-task-title">${esc(t.title)}</span></button>`;
}

function renderStats() {
    const total = tasks.length;
    const { done, pend } = counts(tasks);
    const hoje = todayISO();
    const late = tasks.filter(t => !t.completed && t.date && t.date < hoje).length;
    const box = (c, n, l) => `<div class="cal-stat ${c}"><strong>${n}</strong><span>${l}</span></div>`;
    calStats.innerHTML = box("s1", total, "Total de tarefas") + box("s2", done, "Concluídas") +
        box("s3", pend, "Pendentes") + box("s4", late, "Atrasadas");
}

function renderMonth() {
    const first = new Date(current.getFullYear(), current.getMonth(), 1);
    const start = addDays(first, -first.getDay());
    calTitle.textContent = current.toLocaleDateString("pt-BR", { month: "long", year: "numeric" });
    let html = `<div class="cal-month">` + DOW.map(d => `<div class="cal-dow">${d}</div>`).join("");
    for (let i = 0; i < 42; i++) {
        const d = addDays(start, i), s = iso(d), list = tasksOf(s), c = counts(list);
        html += `<button type="button" class="cal-day ${d.getMonth() !== current.getMonth() ? "other" : ""} ${s === todayISO() ? "today" : ""}" data-day="${s}">
            <span class="cal-day-num">${d.getDate()}</span>
            ${c.done ? `<span class="cal-badge done">${c.done} ${c.done === 1 ? "completa" : "completas"}</span>` : ""}
            ${c.pend ? `<span class="cal-badge pend">${c.pend} ${c.pend === 1 ? "pendente" : "pendentes"}</span>` : ""}
        </button>`;
    }
    calBody.innerHTML = html + `</div>`;
}

function renderTimeGrid(days) {
    const isDay = days.length === 1;
    const a = days[0], b = days[days.length - 1];
    calTitle.textContent = isDay
        ? a.toLocaleDateString("pt-BR", { weekday: "long", day: "numeric", month: "long", year: "numeric" })
        : `${a.toLocaleDateString("pt-BR", { day: "numeric", month: "short" })} – ${b.toLocaleDateString("pt-BR", { day: "numeric", month: "short", year: "numeric" })}`;

    let html = `<div class="cal-scroll"><div class="cal-grid ${isDay ? "day" : ""}" style="grid-template-columns:56px repeat(${days.length},1fr)"><div></div>`;
    days.forEach(d => {
        const c = counts(tasksOf(iso(d)));
        html += `<div class="cal-head ${iso(d) === todayISO() ? "today" : ""}">${DOW[d.getDay()]}<b>${pad(d.getDate())}/${pad(d.getMonth() + 1)}</b><small>${c.done} ✓ · ${c.pend} pend.</small></div>`;
    });
    HOURS.forEach(h => {
        html += `<div class="cal-hour">${pad(h)}:00</div>`;
        days.forEach(d => {
            const s = iso(d);
            const list = tasksOf(s).filter(t => Math.min(Math.max(hourOf(t.time), 6), 23) === h);
            html += `<div class="cal-cell ${s === todayISO() ? "today" : ""}">${list.map(taskCard).join("")}</div>`;
        });
    });
    calBody.innerHTML = html + `</div></div>`;
}

function render() {
    renderStats();
    if (view === "month") renderMonth();
    else if (view === "week") { const s = weekStart(current); renderTimeGrid(Array.from({ length: 7 }, (_, i) => addDays(s, i))); }
    else renderTimeGrid([current]);
    document.querySelectorAll(".cal-view-btn").forEach(b => b.classList.toggle("active", b.dataset.view === view));
    if (window.lucide) lucide.createIcons();
}

// ---------- modal ----------
let modalDay = null;
function openDay(dateStr) {
    modalDay = dateStr;
    const list = tasksOf(dateStr), c = counts(list);
    const d = parse(dateStr);
    calModalContent.innerHTML = `
        <div class="cal-modal-head">
            <div><h3>${d.toLocaleDateString("pt-BR", { weekday: "long", day: "numeric", month: "long" })}</h3>
            <p>${c.done} concluída(s) · ${c.pend} pendente(s)</p></div>
            <button type="button" class="cal-close" data-close aria-label="Fechar">✕</button>
        </div>
        ${list.length ? list.map(t => `
            <div class="cal-item ${t.completed ? "done" : ""}" id="item-${t.id}">
                <span class="cal-dot ${prioClass(t.priority)}"></span>
                <div class="info"><strong>${esc(t.title)}</strong>
                <small>${esc(t.time || "--:--")} · ${esc(t.category)} · Prioridade ${prioText(prioClass(t.priority))}</small></div>
                <button type="button" class="cal-check ${t.completed ? "undo" : ""}" data-toggle="${t.id}">${t.completed ? "Reabrir" : "Concluir"}</button>
            </div>`).join("") : `<p class="cal-empty">Nenhuma tarefa neste dia.</p>`}
        <a class="cal-go" href="tasks.html">Gerenciar em Tarefas →</a>`;
    calModal.classList.add("show");
}
function closeModal() { calModal.classList.remove("show"); modalDay = null; }

// ---------- eventos ----------
document.getElementById("calViews").addEventListener("click", e => {
    const b = e.target.closest("[data-view]"); if (!b) return;
    view = b.dataset.view; render();
});
function shift(dir) {
    if (view === "month") current = new Date(current.getFullYear(), current.getMonth() + dir, 1);
    else current = addDays(current, dir * (view === "week" ? 7 : 1));
    render();
}
document.getElementById("calPrev").onclick = () => shift(-1);
document.getElementById("calNext").onclick = () => shift(1);
document.getElementById("calToday").onclick = () => { current = new Date(); current.setHours(0, 0, 0, 0); render(); };

calBody.addEventListener("click", e => {
    const t = e.target.closest("[data-open]");
    if (t) { const task = tasks.find(x => Number(x.id) === Number(t.dataset.open)); if (task) openDay(task.date); return; }
    const d = e.target.closest("[data-day]");
    if (d) openDay(d.dataset.day);
});
calModal.addEventListener("click", e => {
    if (e.target === calModal || e.target.closest("[data-close]")) return closeModal();
    const tg = e.target.closest("[data-toggle]");
    if (tg) { toggleTask(tg.dataset.toggle); openDay(modalDay); }
});
document.addEventListener("keydown", e => { if (e.key === "Escape") closeModal(); });
window.addEventListener("storage", () => { tasks = obterTarefasUsuario(); render(); });

render();