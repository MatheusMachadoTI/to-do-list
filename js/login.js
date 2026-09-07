/* ================================================= */
/* LOGIN.JS - DONEE */
/* ================================================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {


        /* ================================================= */
        /* FORMULÁRIO */
        /* ================================================= */

        let loginForm =
            document.getElementById(
                "loginForm"
            );


        /*
            Compatibilidade com o HTML atual.

            Se não existir id="loginForm",
            procuramos pelo formulário da página.
        */

        if (!loginForm) {

            loginForm =
                document.querySelector(
                    ".login-form"
                );
        }


        if (!loginForm) {

            console.error(
                "Erro: formulário de login não encontrado."
            );

            return;
        }


        /* ================================================= */
        /* INPUTS */
        /* ================================================= */

        let emailInput =
            document.getElementById(
                "email"
            );


        let senhaInput =
            document.getElementById(
                "senha"
            );


        /*
            Compatibilidade com o HTML antigo.

            Se os inputs não tiverem IDs,
            usamos a posição deles.
        */

        const inputs =
            loginForm.querySelectorAll(
                "input"
            );


        if (!emailInput && inputs[0]) {

            emailInput =
                inputs[0];
        }


        if (!senhaInput && inputs[1]) {

            senhaInput =
                inputs[1];
        }


        if (
            !emailInput ||
            !senhaInput
        ) {

            console.error(
                "Erro: campos de login não encontrados."
            );

            return;
        }


        /* ================================================= */
        /* MENSAGEM */
        /* ================================================= */

        const mensagem =
            document.getElementById(
                "mensagem"
            );


        /* ================================================= */
        /* SUBMIT */
        /* ================================================= */

        loginForm.addEventListener(
            "submit",
            function (event) {

                event.preventDefault();


                /* ========================================= */
                /* PEGAR VALORES */
                /* ========================================= */

                const email =
                    emailInput.value.trim();


                const senha =
                    senhaInput.value;


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
                        "Digite sua senha.",
                        "error"
                    );

                    senhaInput.focus();

                    return;
                }


                /* ========================================= */
                /* FAZER LOGIN */
                /* ========================================= */

                const resultado =
                    fazerLogin(
                        email,
                        senha
                    );


                /* ========================================= */
                /* LOGIN INCORRETO */
                /* ========================================= */

                if (!resultado.sucesso) {

                    mostrarMensagem(
                        resultado.mensagem,
                        "error"
                    );


                    senhaInput.value = "";


                    senhaInput.focus();


                    return;
                }


                /* ========================================= */
                /* LOGIN CORRETO */
                /* ========================================= */

                mostrarMensagem(
                    "Login realizado com sucesso!",
                    "success"
                );


                /*
                    Pequeno atraso apenas para
                    o usuário conseguir visualizar
                    a mensagem de sucesso.
                */

                setTimeout(
                    function () {

                        window.location.href =
                            "dashboard.html";

                    },
                    700
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