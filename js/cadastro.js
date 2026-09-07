/* ================================================= */
/* CADASTRO.JS - DONEE */
/* ================================================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {


        /* ================================================= */
        /* FORMULÁRIO */
        /* ================================================= */

        let cadastroForm =
            document.getElementById(
                "cadastroForm"
            );


        /*
            Caso o formulário ainda não tenha
            id="cadastroForm", procuramos pelo
            formulário da página.
        */

        if (!cadastroForm) {

            cadastroForm =
                document.querySelector(
                    ".login-form"
                );
        }


        if (!cadastroForm) {

            console.error(
                "Erro: formulário de cadastro não encontrado."
            );

            return;
        }


        /* ================================================= */
        /* INPUTS */
        /* ================================================= */

        let nomeInput =
            document.getElementById("nome");


        let emailInput =
            document.getElementById("email");


        let senhaInput =
            document.getElementById("senha");


        let confirmarSenhaInput =
            document.getElementById(
                "confirmarSenha"
            );


        /*
            Compatibilidade com o HTML antigo.

            Se os inputs não tiverem IDs,
            buscamos os inputs pela posição.
        */

        const inputs =
            cadastroForm.querySelectorAll(
                "input"
            );


        if (!nomeInput && inputs[0]) {

            nomeInput =
                inputs[0];
        }


        if (!emailInput && inputs[1]) {

            emailInput =
                inputs[1];
        }


        if (!senhaInput && inputs[2]) {

            senhaInput =
                inputs[2];
        }


        if (
            !confirmarSenhaInput &&
            inputs[3]
        ) {

            confirmarSenhaInput =
                inputs[3];
        }


        /* ================================================= */
        /* MENSAGEM */
        /* ================================================= */

        let mensagem =
            document.getElementById(
                "mensagem"
            );


        /* ================================================= */
        /* SUBMIT */
        /* ================================================= */

        cadastroForm.addEventListener(
            "submit",
            function (event) {

                event.preventDefault();


                /* ========================================= */
                /* VERIFICAR INPUTS */
                /* ========================================= */

                if (
                    !nomeInput ||
                    !emailInput ||
                    !senhaInput ||
                    !confirmarSenhaInput
                ) {

                    console.error(
                        "Erro: não foi possível encontrar todos os campos do cadastro."
                    );

                    mostrarMensagem(
                        "Erro no formulário. Verifique os campos.",
                        "error"
                    );

                    return;
                }


                /* ========================================= */
                /* PEGAR VALORES */
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
                /* VALIDAR NOME */
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
                /* VALIDAR E-MAIL */
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
                /* VALIDAR SENHA */
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
                /* CONFIRMAR SENHA */
                /* ========================================= */

                if (
                    confirmarSenha === ""
                ) {

                    mostrarMensagem(
                        "Confirme sua senha.",
                        "error"
                    );

                    confirmarSenhaInput.focus();

                    return;
                }


                if (
                    senha !==
                    confirmarSenha
                ) {

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
                    "Conta criada com sucesso! Redirecionando para o login...",
                    "success"
                );


                /*
                    IMPORTANTE:

                    A conta foi criada, mas o usuário
                    ainda NÃO está logado.

                    Agora ele vai para a tela de login.
                */

                setTimeout(
                    function () {

                        window.location.href =
                            "login.html";

                    },
                    1200
                );

            }
        );


        /* ================================================= */
        /* MOSTRAR MENSAGEM */
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
        /* VALIDAR E-MAIL */
        /* ================================================= */

        function validarEmail(email) {

            const regex =
                /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


            return regex.test(email);
        }

    }
);