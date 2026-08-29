/* ================================================= */
/* CADASTRO.JS - DONEE */
/* ================================================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {


        /* ================================================= */
        /* ELEMENTOS */
        /* ================================================= */

        const cadastroForm =
            document.getElementById(
                "cadastroForm"
            );


        const nomeInput =
            document.getElementById(
                "nome"
            );


        const emailInput =
            document.getElementById(
                "email"
            );


        const senhaInput =
            document.getElementById(
                "senha"
            );


        const confirmarSenhaInput =
            document.getElementById(
                "confirmarSenha"
            );


        const mensagem =
            document.getElementById(
                "mensagem"
            );


        /* ================================================= */
        /* VERIFICA FORMULÁRIO */
        /* ================================================= */

        if (!cadastroForm) {

            console.error(
                "Erro: #cadastroForm não encontrado."
            );

            return;

        }


        /* ================================================= */
        /* CADASTRO */
        /* ================================================= */

        cadastroForm.addEventListener(
            "submit",
            function (event) {

                event.preventDefault();


                /* ========================================= */
                /* VALORES */
                /* ========================================= */

                const nome =
                    nomeInput.value.trim();


                const email =
                    emailInput.value.trim();


                const senha =
                    senhaInput.value;


                const confirmarSenha =
                    confirmarSenhaInput.value;


                /* ========================================= */
                /* NOME */
                /* ========================================= */

                if (nome === "") {

                    mostrarMensagem(
                        "Digite seu nome.",
                        "error"
                    );

                    nomeInput.focus();

                    return;

                }


                if (nome.length < 2) {

                    mostrarMensagem(
                        "Digite um nome válido.",
                        "error"
                    );

                    nomeInput.focus();

                    return;

                }


                /* ========================================= */
                /* EMAIL */
                /* ========================================= */

                if (email === "") {

                    mostrarMensagem(
                        "Digite seu e-mail.",
                        "error"
                    );

                    emailInput.focus();

                    return;

                }


                if (!validarEmail(email)) {

                    mostrarMensagem(
                        "Digite um e-mail válido.",
                        "error"
                    );

                    emailInput.focus();

                    return;

                }


                /* ========================================= */
                /* SENHA */
                /* ========================================= */

                if (senha === "") {

                    mostrarMensagem(
                        "Digite uma senha.",
                        "error"
                    );

                    senhaInput.focus();

                    return;

                }


                if (senha.length < 6) {

                    mostrarMensagem(
                        "A senha deve ter pelo menos 6 caracteres.",
                        "error"
                    );

                    senhaInput.focus();

                    return;

                }


                /* ========================================= */
                /* CONFIRMAÇÃO */
                /* ========================================= */

                if (confirmarSenha === "") {

                    mostrarMensagem(
                        "Confirme sua senha.",
                        "error"
                    );

                    confirmarSenhaInput.focus();

                    return;

                }


                if (senha !== confirmarSenha) {

                    mostrarMensagem(
                        "As senhas não coincidem.",
                        "error"
                    );

                    confirmarSenhaInput.focus();

                    return;

                }


                /* ========================================= */
                /* CRIAR CONTA */
                /* ========================================= */

                const resultado =
                    criarConta(
                        nome,
                        email,
                        senha
                    );


                /* ========================================= */
                /* ERRO */
                /* ========================================= */

                if (!resultado.sucesso) {

                    mostrarMensagem(
                        resultado.mensagem,
                        "error"
                    );

                    return;

                }


                /* ========================================= */
                /* SUCESSO */
                /* ========================================= */

                mostrarMensagem(
                    "Conta criada com sucesso!",
                    "success"
                );


                /* ========================================= */
                /* REDIRECIONA */
                /* ========================================= */

                setTimeout(
                    function () {

                        window.location.href =
                            "dashboard.html";

                    },
                    1000
                );

            }
        );


        /* ================================================= */
        /* MENSAGEM */
        /* ================================================= */

        function mostrarMensagem(
            texto,
            tipo
        ) {

            if (!mensagem) {

                alert(texto);

                return;

            }


            mensagem.textContent =
                texto;


            mensagem.className =
                "auth-message " + tipo;


            mensagem.style.display =
                "block";

        }


        /* ================================================= */
        /* VALIDAR EMAIL */
        /* ================================================= */

        function validarEmail(email) {

            const regex =
                /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


            return regex.test(email);

        }


    }
);