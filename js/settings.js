/* ================================================= */
/* SETTINGS.JS - DONEE */
/* ================================================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {


        /* ================================================= */
        /* PROTEGER PÁGINA */
        /* ================================================= */

        protegerPagina();


        /* ================================================= */
        /* ELEMENTOS */
        /* ================================================= */

        const languageSelect =
            document.getElementById(
                "languageSelect"
            );

        const themeSelect =
            document.getElementById(
                "themeSelect"
            );

        const notificationsToggle =
            document.getElementById(
                "notificationsToggle"
            );

        const remindersToggle =
            document.getElementById(
                "remindersToggle"
            );

        const achievementsToggle =
            document.getElementById(
                "achievementsToggle"
            );

        const editProfileButton =
            document.getElementById(
                "editProfileButton"
            );

        const changePasswordButton =
            document.getElementById(
                "changePasswordButton"
            );

        const deleteAccountButton =
            document.getElementById(
                "deleteAccountButton"
            );


        /* ================================================= */
        /* CARREGAR */
        /* ================================================= */

        carregarConfiguracoes();


        /* ================================================= */
        /* IDIOMA */
        /* ================================================= */

        if (languageSelect) {

            languageSelect.addEventListener(
                "change",
                function () {

                    localStorage.setItem(
                        "donee_language",
                        this.value
                    );


                    mostrarMensagem(
                        "Idioma atualizado!"
                    );

                }
            );

        }


        /* ================================================= */
        /* TEMA */
        /* ================================================= */

        if (themeSelect) {

            themeSelect.addEventListener(
                "change",
                function () {

                    const tema =
                        this.value;


                    localStorage.setItem(
                        "donee_theme",
                        tema
                    );


                    aplicarTema(
                        tema
                    );


                    mostrarMensagem(
                        "Tema atualizado!"
                    );

                }
            );

        }


        /* ================================================= */
        /* NOTIFICAÇÕES */
        /* ================================================= */

        if (notificationsToggle) {

            notificationsToggle.addEventListener(
                "change",
                function () {

                    localStorage.setItem(
                        "donee_notifications",
                        this.checked
                    );


                    mostrarMensagem(
                        this.checked
                            ? "Notificações ativadas!"
                            : "Notificações desativadas!"
                    );

                }
            );

        }


        /* ================================================= */
        /* LEMBRETES */
        /* ================================================= */

        if (remindersToggle) {

            remindersToggle.addEventListener(
                "change",
                function () {

                    localStorage.setItem(
                        "donee_reminders",
                        this.checked
                    );


                    mostrarMensagem(
                        this.checked
                            ? "Lembretes ativados!"
                            : "Lembretes desativados!"
                    );

                }
            );

        }


        /* ================================================= */
        /* CONQUISTAS */
        /* ================================================= */

        if (achievementsToggle) {

            achievementsToggle.addEventListener(
                "change",
                function () {

                    localStorage.setItem(
                        "donee_achievements",
                        this.checked
                    );


                    mostrarMensagem(
                        this.checked
                            ? "Notificações de conquistas ativadas!"
                            : "Notificações de conquistas desativadas!"
                    );

                }
            );

        }


        /* ================================================= */
        /* EDITAR PERFIL */
        /* ================================================= */

        if (editProfileButton) {

            editProfileButton.addEventListener(
                "click",
                function () {

                    window.location.href =
                        "profile.html";

                }
            );

        }


        /* ================================================= */
        /* ALTERAR SENHA */
        /* ================================================= */

        if (changePasswordButton) {

            changePasswordButton.addEventListener(
                "click",
                abrirAlteracaoSenha
            );

        }


        /* ================================================= */
        /* EXCLUIR CONTA */
        /* ================================================= */

        if (deleteAccountButton) {

            deleteAccountButton.addEventListener(
                "click",
                function () {

                    const primeiraConfirmacao =
                        confirm(
                            "Tem certeza que deseja excluir sua conta?"
                        );


                    if (!primeiraConfirmacao) {

                        return;

                    }


                    const segundaConfirmacao =
                        confirm(
                            "Essa ação apagará sua conta e suas tarefas. Deseja realmente continuar?"
                        );


                    if (!segundaConfirmacao) {

                        return;

                    }


                    const sucesso =
                        excluirConta();


                    if (!sucesso) {

                        mostrarMensagem(
                            "Não foi possível excluir sua conta."
                        );

                        return;

                    }


                    alert(
                        "Sua conta foi excluída com sucesso."
                    );


                    window.location.href =
                        "login.html";

                }
            );

        }


        /* ================================================= */
        /* CONFIGURAÇÕES */
        /* ================================================= */

        function carregarConfiguracoes() {


            const idioma =
                localStorage.getItem(
                    "donee_language"
                );


            if (
                idioma &&
                languageSelect
            ) {

                languageSelect.value =
                    idioma;

            }


            const tema =
                localStorage.getItem(
                    "donee_theme"
                ) || "light";


            if (themeSelect) {

                themeSelect.value =
                    tema;

            }


            aplicarTema(
                tema
            );


            const notificacoes =
                localStorage.getItem(
                    "donee_notifications"
                );


            if (
                notificacoes !== null &&
                notificationsToggle
            ) {

                notificationsToggle.checked =
                    notificacoes ===
                    "true";

            }


            const lembretes =
                localStorage.getItem(
                    "donee_reminders"
                );


            if (
                lembretes !== null &&
                remindersToggle
            ) {

                remindersToggle.checked =
                    lembretes ===
                    "true";

            }


            const conquistas =
                localStorage.getItem(
                    "donee_achievements"
                );


            if (
                conquistas !== null &&
                achievementsToggle
            ) {

                achievementsToggle.checked =
                    conquistas ===
                    "true";

            }

        }


        /* ================================================= */
        /* TEMA */
        /* ================================================= */

        function aplicarTema(
            tema
        ) {

            if (
                tema ===
                "dark"
            ) {

                document.body.classList.add(
                    "dark-mode"
                );

            } else {

                document.body.classList.remove(
                    "dark-mode"
                );

            }

        }


        /* ================================================= */
        /* ALTERAR SENHA */
        /* ================================================= */

        function abrirAlteracaoSenha() {

            const usuario =
                obterUsuarioLogado();


            if (!usuario) {

                return;

            }


            const senhaAtual =
                prompt(
                    "Digite sua senha atual:"
                );


            if (
                senhaAtual ===
                null
            ) {

                return;

            }


            if (
                senhaAtual !==
                usuario.senha
            ) {

                alert(
                    "A senha atual está incorreta."
                );

                return;

            }


            const novaSenha =
                prompt(
                    "Digite sua nova senha:"
                );


            if (
                novaSenha ===
                null
            ) {

                return;

            }


            if (
                novaSenha.length <
                6
            ) {

                alert(
                    "A nova senha deve ter pelo menos 6 caracteres."
                );

                return;

            }


            const confirmarSenha =
                prompt(
                    "Digite novamente sua nova senha:"
                );


            if (
                confirmarSenha ===
                null
            ) {

                return;

            }


            if (
                novaSenha !==
                confirmarSenha
            ) {

                alert(
                    "As senhas não coincidem."
                );

                return;

            }


            usuario.senha =
                novaSenha;


            atualizarUsuario(
                usuario
            );


            mostrarMensagem(
                "Senha alterada com sucesso!"
            );

        }


        /* ================================================= */
        /* MENSAGEM */
        /* ================================================= */

        function mostrarMensagem(
            texto
        ) {

            const antiga =
                document.querySelector(
                    ".settings-message"
                );


            if (antiga) {

                antiga.remove();

            }


            const mensagem =
                document.createElement(
                    "div"
                );


            mensagem.className =
                "settings-message";


            mensagem.textContent =
                texto;


            mensagem.style.position =
                "fixed";

            mensagem.style.top =
                "25px";

            mensagem.style.right =
                "25px";

            mensagem.style.padding =
                "14px 20px";

            mensagem.style.borderRadius =
                "12px";

            mensagem.style.background =
                "#7C5CFC";

            mensagem.style.color =
                "#ffffff";

            mensagem.style.fontSize =
                "14px";

            mensagem.style.fontWeight =
                "600";

            mensagem.style.zIndex =
                "9999";

            mensagem.style.boxShadow =
                "0 10px 30px rgba(0,0,0,0.12)";


            document.body.appendChild(
                mensagem
            );


            setTimeout(
                function () {

                    mensagem.remove();

                },
                2500
            );

        }

    }
);