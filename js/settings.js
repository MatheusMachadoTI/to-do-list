/* ================================================= */
/* SETTINGS.JS - DONEE */
/* ================================================= */

document.addEventListener("DOMContentLoaded", function () {


    /* ================================================= */
    /* ELEMENTOS */
    /* ================================================= */

    const languageSelect =
        document.getElementById("languageSelect");

    const themeSelect =
        document.getElementById("themeSelect");

    const notificationsToggle =
        document.getElementById("notificationsToggle");

    const remindersToggle =
        document.getElementById("remindersToggle");

    const achievementsToggle =
        document.getElementById("achievementsToggle");

    const editProfileButton =
        document.getElementById("editProfileButton");

    const changePasswordButton =
        document.getElementById("changePasswordButton");

    const deleteAccountButton =
        document.getElementById("deleteAccountButton");


    /* ================================================= */
    /* CARREGAR CONFIGURAÇÕES */
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

                aplicarTema(tema);

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
            function () {

                abrirAlteracaoSenha();

            }
        );

    }


    /* ================================================= */
    /* EXCLUIR CONTA */
    /* ================================================= */

    if (deleteAccountButton) {

        deleteAccountButton.addEventListener(
            "click",
            function () {

                const confirmar =
                    confirm(
                        "Tem certeza que deseja excluir sua conta?"
                    );


                if (!confirmar) {

                    return;

                }


                const confirmarNovamente =
                    confirm(
                        "Essa ação não poderá ser desfeita. Deseja realmente continuar?"
                    );


                if (!confirmarNovamente) {

                    return;

                }


                mostrarMensagem(
                    "A exclusão da conta será realizada quando o sistema estiver conectado ao banco de dados."
                );

            }
        );

    }


    /* ================================================= */
    /* CARREGAR CONFIGURAÇÕES */
    /* ================================================= */

    function carregarConfiguracoes() {


        /* ================================================= */
        /* IDIOMA */
        /* ================================================= */

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


        /* ================================================= */
        /* TEMA */
        /* ================================================= */

        const tema =
            localStorage.getItem(
                "donee_theme"
            ) || "light";


        if (themeSelect) {

            themeSelect.value =
                tema;

        }


        aplicarTema(tema);


        /* ================================================= */
        /* NOTIFICAÇÕES */
        /* ================================================= */

        const notificacoes =
            localStorage.getItem(
                "donee_notifications"
            );


        if (
            notificacoes !== null &&
            notificationsToggle
        ) {

            notificationsToggle.checked =
                notificacoes === "true";

        }


        /* ================================================= */
        /* LEMBRETES */
        /* ================================================= */

        const lembretes =
            localStorage.getItem(
                "donee_reminders"
            );


        if (
            lembretes !== null &&
            remindersToggle
        ) {

            remindersToggle.checked =
                lembretes === "true";

        }


        /* ================================================= */
        /* CONQUISTAS */
        /* ================================================= */

        const conquistas =
            localStorage.getItem(
                "donee_achievements"
            );


        if (
            conquistas !== null &&
            achievementsToggle
        ) {

            achievementsToggle.checked =
                conquistas === "true";

        }

    }


    /* ================================================= */
    /* APLICAR TEMA */
    /* ================================================= */

    function aplicarTema(tema) {

        if (tema === "dark") {

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
    /* ALTERAÇÃO DE SENHA */
    /* ================================================= */

    function abrirAlteracaoSenha() {


        const senhaAtual =
            prompt(
                "Digite sua senha atual:"
            );


        if (senhaAtual === null) {

            return;

        }


        if (senhaAtual.trim() === "") {

            alert(
                "Digite sua senha atual."
            );

            return;

        }


        const novaSenha =
            prompt(
                "Digite sua nova senha:"
            );


        if (novaSenha === null) {

            return;

        }


        if (novaSenha.length < 6) {

            alert(
                "A nova senha deve ter pelo menos 6 caracteres."
            );

            return;

        }


        const confirmarSenha =
            prompt(
                "Digite novamente sua nova senha:"
            );


        if (confirmarSenha === null) {

            return;

        }


        if (novaSenha !== confirmarSenha) {

            alert(
                "As senhas não são iguais."
            );

            return;

        }


        mostrarMensagem(
            "Senha alterada com sucesso!"
        );

    }


    /* ================================================= */
    /* MENSAGEM */
    /* ================================================= */

    function mostrarMensagem(texto) {


        const mensagemAntiga =
            document.querySelector(
                ".settings-message"
            );


        if (mensagemAntiga) {

            mensagemAntiga.remove();

        }


        const mensagem =
            document.createElement("div");


        mensagem.className =
            "settings-message";


        mensagem.textContent =
            texto;


        document.body.appendChild(
            mensagem
        );


        setTimeout(
            function () {

                if (mensagem) {

                    mensagem.remove();

                }

            },
            2500
        );

    }


});