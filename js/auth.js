/* ================================================= */
/* AUTH.JS - DONEE */
/* ================================================= */


/* ================================================= */
/* PEGAR USUÁRIOS */
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


    /* Verifica e-mail existente */

    const usuarioExistente =
        usuarios.find(
            function (usuario) {

                return (
                    usuario.email.toLowerCase() ===
                    emailNormalizado
                );

            }
        );


    if (usuarioExistente) {

        return {

            sucesso: false,

            mensagem:
                "Este e-mail já está cadastrado."

        };

    }


    /* Novo usuário */

    const novoUsuario = {

        id: Date.now(),

        nome: nome.trim(),

        email: emailNormalizado,

        senha: senha,

        criadoEm:
            new Date().toISOString(),

        tarefas: [],

        xp: 0,

        nivel: 1

    };


    usuarios.push(
        novoUsuario
    );


    salvarUsuarios(
        usuarios
    );


    /* Login automático */

    localStorage.setItem(
        "donee_usuario_logado",
        JSON.stringify(novoUsuario)
    );


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
        usuarios.find(
            function (usuario) {

                return (
                    usuario.email.toLowerCase() ===
                    emailNormalizado &&
                    usuario.senha === senha
                );

            }
        );


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
/* USUÁRIO LOGADO */
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
/* VERIFICAR LOGIN */
/* ================================================= */

function usuarioEstaLogado() {

    return (
        obterUsuarioLogado() !== null
    );

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