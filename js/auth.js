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