/* ================================================= */
/* AUTH.JS - DONEE */
/* ================================================= */


/* ================================================= */
/* OBTER USUÁRIOS */
/* ================================================= */

function obterUsuarios() {

    try {

        const dados =
            localStorage.getItem("donee_usuarios");

        if (!dados) {
            return [];
        }

        const usuarios =
            JSON.parse(dados);

        if (!Array.isArray(usuarios)) {
            return [];
        }

        return usuarios;

    } catch (erro) {

        console.error(
            "Erro ao carregar usuários:",
            erro
        );

        return [];

    }

}


/* ================================================= */
/* SALVAR USUÁRIOS */
/* ================================================= */

function salvarUsuarios(usuarios) {

    localStorage.setItem(
        "donee_usuarios",
        JSON.stringify(usuarios)
    );

}


/* ================================================= */
/* CRIAR CONTA */
/* ================================================= */

function criarConta(nome, email, senha) {

    const usuarios =
        obterUsuarios();

    const emailNormalizado =
        email.trim().toLowerCase();


    const usuarioExistente =
        usuarios.find(function (usuario) {

            return (
                usuario.email &&
                usuario.email.toLowerCase() ===
                emailNormalizado
            );

        });


    if (usuarioExistente) {

        return {

            sucesso: false,

            mensagem:
                "Este e-mail já está cadastrado."

        };

    }


    const novoUsuario = {

        id: Date.now(),

        nome: nome.trim(),

        email: emailNormalizado,

        senha: senha,

        telefone: "",

        criadoEm:
            new Date().toISOString(),

        tarefas: [],

        xp: 0,

        nivel: 1

    };


    usuarios.push(novoUsuario);

    salvarUsuarios(usuarios);


    return {

        sucesso: true,

        usuario: novoUsuario

    };

}


/* ================================================= */
/* FAZER LOGIN */
/* ================================================= */

function fazerLogin(email, senha) {

    const usuarios =
        obterUsuarios();

    const emailNormalizado =
        email.trim().toLowerCase();


    const usuario =
        usuarios.find(function (usuario) {

            return (
                usuario.email &&
                usuario.email.toLowerCase() ===
                emailNormalizado &&
                usuario.senha === senha
            );

        });


    if (!usuario) {

        return {

            sucesso: false,

            mensagem:
                "E-mail ou senha incorretos."

        };

    }


    localStorage.setItem(
        "donee_usuario_logado",
        JSON.stringify(usuario)
    );


    return {

        sucesso: true,

        usuario: usuario

    };

}


/* ================================================= */
/* OBTER USUÁRIO LOGADO */
/* ================================================= */

function obterUsuarioLogado() {

    try {

        const dados =
            localStorage.getItem(
                "donee_usuario_logado"
            );


        if (!dados) {

            return null;

        }


        return JSON.parse(dados);

    } catch (erro) {

        console.error(
            "Erro ao carregar sessão:",
            erro
        );

        return null;

    }

}


/* ================================================= */
/* ATUALIZAR SESSÃO */
/* ================================================= */

function atualizarSessao(usuario) {

    localStorage.setItem(
        "donee_usuario_logado",
        JSON.stringify(usuario)
    );

}


/* ================================================= */
/* ATUALIZAR USUÁRIO */
/* ================================================= */

function atualizarUsuario(usuarioAtualizado) {

    const usuarios =
        obterUsuarios();


    const indice =
        usuarios.findIndex(function (usuario) {

            return usuario.id === usuarioAtualizado.id;

        });


    if (indice === -1) {

        return false;

    }


    usuarios[indice] =
        usuarioAtualizado;


    salvarUsuarios(usuarios);

    atualizarSessao(
        usuarioAtualizado
    );


    return true;

}


/* ================================================= */
/* OBTER TAREFAS DO USUÁRIO */
/* ================================================= */

function obterTarefasUsuario() {

    const usuario =
        obterUsuarioLogado();


    if (!usuario) {

        return [];

    }


    /*
        Se a conta já possui tarefas,
        usamos as tarefas da própria conta.
    */

    if (Array.isArray(usuario.tarefas)) {

        return usuario.tarefas;

    }


    return [];

}


/* ================================================= */
/* SALVAR TAREFAS DO USUÁRIO */
/* ================================================= */

function salvarTarefasUsuario(tarefas) {

    const usuario =
        obterUsuarioLogado();


    if (!usuario) {

        return false;

    }


    usuario.tarefas =
        tarefas;


    atualizarUsuario(usuario);


    return true;

}


function formatarDataTarefa(data) {

    const ano =
        data.getFullYear();

    const mes =
        String(data.getMonth() + 1).padStart(2, "0");

    const dia =
        String(data.getDate()).padStart(2, "0");

    return `${ano}-${mes}-${dia}`;

}


function expandirTarefaSemanal(tarefa, inicio, fim) {

    if (
        !tarefa.repeatWeekly ||
        !Array.isArray(tarefa.repeatDays) ||
        !tarefa.repeatDays.some(dia => Number.isInteger(dia) && dia >= 0 && dia <= 6) ||
        !tarefa.date
    ) {

        return [];

    }

    const [anoTarefa, mesTarefa, diaTarefa] =
        tarefa.date.split("-").map(Number);

    if (
        formatarDataTarefa(
            new Date(anoTarefa, mesTarefa - 1, diaTarefa)
        ) !== tarefa.date
    ) {

        return [];

    }

    const dataInicio =
        inicio > tarefa.date
            ? inicio
            : tarefa.date;

    const dataFim =
        tarefa.repeatUntil && tarefa.repeatUntil < fim
            ? tarefa.repeatUntil
            : fim;

    if (dataInicio > dataFim) {

        return [];

    }

    const [ano, mes, dia] =
        dataInicio.split("-").map(Number);

    const cursor =
        new Date(ano, mes - 1, dia);

    const concluidas =
        Array.isArray(tarefa.completedDates)
            ? tarefa.completedDates
            : [];

    const ocorrencias = [];

    while (formatarDataTarefa(cursor) <= dataFim) {

        const dataOcorrencia =
            formatarDataTarefa(cursor);

        if (tarefa.repeatDays.includes(cursor.getDay())) {

            ocorrencias.push({
                ...tarefa,
                date: dataOcorrencia,
                occurrenceDate: dataOcorrencia,
                completed: concluidas.includes(dataOcorrencia)
            });

        }

        cursor.setDate(
            cursor.getDate() + 1
        );

    }

    return ocorrencias;

}


function proximaOcorrenciaSemanal(tarefa, aPartirDe) {

    if (
        !tarefa.repeatWeekly ||
        !Array.isArray(tarefa.repeatDays) ||
        !tarefa.repeatDays.some(dia => Number.isInteger(dia) && dia >= 0 && dia <= 6) ||
        !tarefa.date
    ) {

        return null;

    }

    const [anoTarefa, mesTarefa, diaTarefa] =
        tarefa.date.split("-").map(Number);

    if (
        formatarDataTarefa(
            new Date(anoTarefa, mesTarefa - 1, diaTarefa)
        ) !== tarefa.date
    ) {

        return null;

    }

    const dataInicio =
        aPartirDe > tarefa.date
            ? aPartirDe
            : tarefa.date;

    const [ano, mes, dia] =
        dataInicio.split("-").map(Number);

    const cursor =
        new Date(ano, mes - 1, dia);

    const concluidas =
        Array.isArray(tarefa.completedDates)
            ? tarefa.completedDates
            : [];

    while (
        !tarefa.repeatUntil ||
        formatarDataTarefa(cursor) <= tarefa.repeatUntil
    ) {

        const dataOcorrencia =
            formatarDataTarefa(cursor);

        if (
            tarefa.repeatDays.includes(cursor.getDay()) &&
            !concluidas.includes(dataOcorrencia)
        ) {

            return {
                ...tarefa,
                date: dataOcorrencia,
                occurrenceDate: dataOcorrencia,
                completed: false
            };

        }

        cursor.setDate(
            cursor.getDate() + 1
        );

    }

    return null;

}


/* ================================================= */
/* USUÁRIO ESTÁ LOGADO? */
/* ================================================= */

function usuarioEstaLogado() {

    return (
        obterUsuarioLogado() !== null
    );

}


/* ================================================= */
/* PROTEGER PÁGINA */
/* ================================================= */

function protegerPagina() {

    if (!usuarioEstaLogado()) {

        window.location.href =
            "login.html";

    }

}


/* ================================================= */
/* REDIRECIONAR SE JÁ ESTIVER LOGADO */
/* ================================================= */

function redirecionarSeLogado() {

    if (usuarioEstaLogado()) {

        window.location.href =
            "dashboard.html";

    }

}


/* ================================================= */
/* LOGOUT */
/* ================================================= */

function fazerLogout() {

    localStorage.removeItem(
        "donee_usuario_logado"
    );


    window.location.href =
        "login.html";

}


/* ================================================= */
/* EXCLUIR CONTA */
/* ================================================= */

function excluirConta() {

    const usuario =
        obterUsuarioLogado();


    if (!usuario) {

        return false;

    }


    const usuarios =
        obterUsuarios();


    const novosUsuarios =
        usuarios.filter(function (item) {

            return item.id !== usuario.id;

        });


    salvarUsuarios(
        novosUsuarios
    );


    localStorage.removeItem(
        "donee_usuario_logado"
    );


    return true;

}


/* ================================================= */
/* GAMIFICAÇÃO - XP */
/* ================================================= */


/*
    Retorna a quantidade de XP
    do usuário atualmente logado.
*/

function obterXPUsuario() {

    const usuario =
        obterUsuarioLogado();


    if (!usuario) {

        return 0;

    }


    return Number(usuario.xp) || 0;

}


/*
    Calcula o nível com base no XP.

    0 até 99 XP   = Nível 1
    100 até 199   = Nível 2
    200 até 299   = Nível 3
    etc.
*/

function calcularNivel(xp) {

    const experiencia =
        Math.max(
            0,
            Number(xp) || 0
        );


    return (
        Math.floor(
            experiencia / 100
        ) + 1
    );

}


/*
    Retorna o nível atual
    do usuário logado.
*/

function obterNivelUsuario() {

    return calcularNivel(
        obterXPUsuario()
    );

}


/*
    Adiciona ou remove XP.

    Exemplo:

    adicionarXP(10)
    -> adiciona 10 XP

    adicionarXP(-10)
    -> remove 10 XP
*/

function adicionarXP(valor) {

    const usuario =
        obterUsuarioLogado();


    if (!usuario) {

        return false;

    }


    const xpAtual =
        Number(usuario.xp) || 0;


    usuario.xp =
        Math.max(
            0,
            xpAtual +
            Number(valor || 0)
        );


    usuario.nivel =
        calcularNivel(
            usuario.xp
        );


    return atualizarUsuario(
        usuario
    );

}