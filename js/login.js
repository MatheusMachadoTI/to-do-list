/* ================================================= */
/* LOGIN.JS - DONEE */
/* ================================================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {


        /* ================================================= */
        /* ELEMENTOS */
        /* ================================================= */

        const loginForm =
            document.getElementById(
                "loginForm"
            );


        const emailInput =
            document.getElementById(
                "email"
            );


        const senhaInput =
            document.getElementById(
                "senha"
            );


        const mensagem =
            document.getElementById(
                "mensagem"
            );


        /* ================================================= */
        /* VERIFICA ELEMENTOS */
        /* ================================================= */

        if (!loginForm) {

            console.error(
                "Erro: #loginForm não encontrado."
            );

            return;

        }


        if (!emailInput) {

            console.error(
                "Erro: #email não encontrado."
            );

            return;

        }


        if (!senhaInput) {

            console.error(
                "Erro: #senha não encontrado."
            );

            return;

        }


        /* ================================================= */
        /* LOGIN */
        /* ================================================= */

        loginForm.addEventListener(
            "submit",
            function (event) {

                event.preventDefault();


                const email =
                    emailInput.value.trim();


                const senha =
                    senhaInput.value;


                /* ========================================= */
                /* VALIDAÇÃO */
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


                if (senha === "") {

                    mostrarMensagem(
                        "Digite sua senha.",
                        "error"
                    );

                    senhaInput.focus();

                    return;

                }


                /* ========================================= */
                /* LOGIN */
                /* ========================================= */

                const resultado =
                    fazerLogin(
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

                    senhaInput.value = "";

                    senhaInput.focus();

                    return;

                }


                /* ========================================= */
                /* SUCESSO */
                /* ========================================= */

                mostrarMensagem(
                    "Login realizado com sucesso!",
                    "success"
                );


                /* ========================================= */
                /* REDIRECIONAMENTO */
                /* ========================================= */

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
        /* VALIDAR EMAIL */
        /* ================================================= */

        function validarEmail(email) {

            const regex =
                /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


            return regex.test(email);

        }


    }
);