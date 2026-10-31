/* ================================================= */
/* PROFILE.JS - DONEE */
/* ================================================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {


        /* ================================================= */
        /* PROTEGER PÁGINA */
        /* ================================================= */

        protegerPagina();


        /* ================================================= */
        /* USUÁRIO */
        /* ================================================= */

        const usuario =
            obterUsuarioLogado();


        if (!usuario) {

            return;

        }


        /* ================================================= */
        /* ELEMENTOS */
        /* ================================================= */

        const editButton =
            document.querySelector(
                ".edit-profile-btn"
            );

        const saveButton =
            document.querySelector(
                ".save-btn"
            );

        const cancelButton =
            document.querySelector(
                ".cancel-btn"
            );

        const changePasswordButton =
            document.querySelector(
                ".security-btn"
            );

        const nameInput =
            document.getElementById(
                "nome"
            );

        const emailInput =
            document.getElementById(
                "email"
            );

        const phoneInput =
            document.getElementById(
                "telefone"
            );

        const profilePhotoInput =
            document.getElementById(
                "profilePhotoInput"
            );

        const profileName =
            document.querySelector(
                ".profile-main-info h2"
            );

        const profileEmail =
            document.querySelector(
                ".profile-main-info p"
            );

        const sidebarNames =
            document.querySelectorAll(
                ".profile-info strong"
            );


        /* ================================================= */
        /* CARREGAR DADOS */
        /* ================================================= */

        if (nameInput) {

            nameInput.value =
                usuario.nome || "";

        }


        if (emailInput) {

            emailInput.value =
                usuario.email || "";

            emailInput.readOnly =
                true;

        }


        if (phoneInput) {

            phoneInput.value =
                usuario.telefone || "";

        }


        if (profileName) {

            profileName.textContent =
                usuario.nome;

        }


        if (profileEmail) {

            profileEmail.textContent =
                usuario.email;

        }


        sidebarNames.forEach(
            function (elemento) {

                elemento.textContent =
                    usuario.nome;

            }
        );

        if (typeof window.atualizarFotoPerfil === "function") {

            window.atualizarFotoPerfil(usuario.fotoPerfil || "");

        }


        /* ================================================= */
        /* DADOS ORIGINAIS */
        /* ================================================= */

        let dadosOriginais = {

            nome:
                usuario.nome || "",

            email:
                usuario.email || "",

            telefone:
                usuario.telefone || ""

        };


        /* ================================================= */
        /* BLOQUEAR CAMPOS */
        /* ================================================= */

        bloquearCampos();


        /* ================================================= */
        /* BOTÕES */
        /* ================================================= */

        if (saveButton) {

            saveButton.style.display =
                "none";

        }


        if (cancelButton) {

            cancelButton.style.display =
                "none";

        }


        /* ================================================= */
        /* EDITAR */
        /* ================================================= */

        if (editButton) {

            editButton.addEventListener(
                "click",
                function () {

                    desbloquearCampos();

                    editButton.style.display =
                        "none";

                    if (saveButton) {

                        saveButton.style.display =
                            "flex";

                    }

                    if (cancelButton) {

                        cancelButton.style.display =
                            "block";

                    }

                    if (nameInput) {

                        nameInput.focus();

                    }

                }
            );

        }


        /* ================================================= */
        /* CANCELAR */
        /* ================================================= */

        if (cancelButton) {

            cancelButton.addEventListener(
                "click",
                function () {

                    nameInput.value =
                        dadosOriginais.nome;

                    phoneInput.value =
                        dadosOriginais.telefone;

                    bloquearCampos();

                    restaurarBotoes();

                }
            );

        }


        /* ================================================= */
        /* SALVAR */
        /* ================================================= */

        if (saveButton) {

            saveButton.addEventListener(
                "click",
                function () {

                    const nome =
                        nameInput.value.trim();

                    const telefone =
                        phoneInput.value.trim();


                    if (nome.length < 2) {

                        mostrarMensagem(
                            "Digite um nome válido.",
                            "erro"
                        );

                        nameInput.focus();

                        return;

                    }


                    /* ================================================= */
                    /* ATUALIZAR USUÁRIO */
                    /* ================================================= */

                    usuario.nome =
                        nome;

                    usuario.telefone =
                        telefone;


                    const atualizado =
                        atualizarUsuario(
                            usuario
                        );


                    if (!atualizado) {

                        mostrarMensagem(
                            "Não foi possível atualizar o perfil.",
                            "erro"
                        );

                        return;

                    }


                    /* ================================================= */
                    /* ATUALIZAR INTERFACE */
                    /* ================================================= */

                    if (profileName) {

                        profileName.textContent =
                            usuario.nome;

                    }


                    sidebarNames.forEach(
                        function (elemento) {

                            elemento.textContent =
                                usuario.nome;

                        }
                    );


                    dadosOriginais = {

                        nome:
                            usuario.nome,

                        email:
                            usuario.email,

                        telefone:
                            usuario.telefone

                    };


                    bloquearCampos();

                    restaurarBotoes();


                    mostrarMensagem(
                        "Perfil atualizado com sucesso!",
                        "sucesso"
                    );

                }
            );

        }


        /* ================================================= */
        /* TELEFONE */
        /* ================================================= */

        if (phoneInput) {

            phoneInput.addEventListener(
                "input",
                function () {

                    let valor =
                        phoneInput.value
                            .replace(/\D/g, "")
                            .substring(0, 11);


                    if (valor.length <= 2) {

                        valor =
                            valor.replace(
                                /^(\d{0,2})/,
                                "($1"
                            );

                    }

                    else if (
                        valor.length <= 7
                    ) {

                        valor =
                            valor.replace(
                                /^(\d{2})(\d{0,5})/,
                                "($1) $2"
                            );

                    }

                    else {

                        valor =
                            valor.replace(
                                /^(\d{2})(\d{5})(\d{0,4})/,
                                "($1) $2-$3"
                            );

                    }


                    phoneInput.value =
                        valor;

                }
            );

        }

        if (profilePhotoInput) {

            profilePhotoInput.addEventListener(
                "change",
                function () {

                    const file =
                        profilePhotoInput.files &&
                        profilePhotoInput.files[0];

                    if (!file) {

                        return;

                    }

                    if (!file.type.startsWith("image/")) {

                        mostrarMensagem(
                            "Selecione um arquivo de imagem.",
                            "erro"
                        );

                        profilePhotoInput.value = "";

                        return;

                    }

                    if (file.size > 8 * 1024 * 1024) {

                        mostrarMensagem(
                            "A imagem deve ter no máximo 8 MB.",
                            "erro"
                        );

                        profilePhotoInput.value = "";

                        return;

                    }

                    const reader =
                        new FileReader();

                    reader.addEventListener(
                        "load",
                        function () {

                            const image =
                                new Image();

                            image.addEventListener(
                                "load",
                                function () {

                                    const maxDimension = 512;
                                    const scale = Math.min(
                                        1,
                                        maxDimension / Math.max(image.width, image.height)
                                    );
                                    const canvas =
                                        document.createElement("canvas");

                                    canvas.width =
                                        Math.max(1, Math.round(image.width * scale));

                                    canvas.height =
                                        Math.max(1, Math.round(image.height * scale));

                                    const context =
                                        canvas.getContext("2d");

                                    if (!context) {

                                        mostrarMensagem(
                                            "Não foi possível processar a imagem.",
                                            "erro"
                                        );

                                        return;

                                    }

                                    context.drawImage(
                                        image,
                                        0,
                                        0,
                                        canvas.width,
                                        canvas.height
                                    );

                                    try {

                                        usuario.fotoPerfil =
                                            canvas.toDataURL("image/jpeg", 0.82);

                                        if (!atualizarUsuario(usuario)) {

                                            mostrarMensagem(
                                                "Não foi possível salvar a foto do perfil.",
                                                "erro"
                                            );

                                            return;

                                        }

                                    } catch (erro) {

                                        console.error(
                                            "Erro ao salvar a foto do perfil:",
                                            erro
                                        );

                                        mostrarMensagem(
                                            "Não foi possível salvar a foto do perfil.",
                                            "erro"
                                        );

                                        return;

                                    }

                                    if (typeof window.atualizarFotoPerfil === "function") {

                                        window.atualizarFotoPerfil(usuario.fotoPerfil);

                                    }

                                    mostrarMensagem(
                                        "Foto de perfil atualizada.",
                                        "sucesso"
                                    );

                                }
                            );

                            image.addEventListener(
                                "error",
                                function () {

                                    mostrarMensagem(
                                        "Não foi possível abrir esta imagem.",
                                        "erro"
                                    );

                                }
                            );

                            image.src =
                                reader.result;

                        }
                    );

                    reader.addEventListener(
                        "error",
                        function () {

                            mostrarMensagem(
                                "Não foi possível carregar esta imagem.",
                                "erro"
                            );

                        }
                    );

                    reader.readAsDataURL(file);

                }
            );

        }


        /* ================================================= */
        /* ALTERAR SENHA */
        /* ================================================= */

        if (changePasswordButton) {

            changePasswordButton.addEventListener(
                "click",
                abrirModalSenha
            );

        }


        /* ================================================= */
        /* BLOQUEAR */
        /* ================================================= */

        function bloquearCampos() {

            nameInput.disabled =
                true;

            emailInput.readOnly =
                true;

            phoneInput.disabled =
                true;

        }


        /* ================================================= */
        /* DESBLOQUEAR */
        /* ================================================= */

        function desbloquearCampos() {

            nameInput.disabled =
                false;

            emailInput.readOnly =
                true;

            phoneInput.disabled =
                false;

        }


        /* ================================================= */
        /* RESTAURAR BOTÕES */
        /* ================================================= */

        function restaurarBotoes() {

            if (editButton) {

                editButton.style.display =
                    "flex";

            }


            if (saveButton) {

                saveButton.style.display =
                    "none";

            }


            if (cancelButton) {

                cancelButton.style.display =
                    "none";

            }

        }


        /* ================================================= */
        /* MENSAGEM */
        /* ================================================= */

        function mostrarMensagem(
            texto,
            tipo
        ) {

            const antiga =
                document.querySelector(
                    ".profile-message"
                );


            if (antiga) {

                antiga.remove();

            }


            const mensagem =
                document.createElement(
                    "div"
                );


            mensagem.className =
                "profile-message";


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

            mensagem.style.fontSize =
                "14px";

            mensagem.style.fontWeight =
                "600";

            mensagem.style.zIndex =
                "9999";

            mensagem.style.boxShadow =
                "0 10px 30px rgba(0,0,0,0.12)";


            if (
                tipo ===
                "sucesso"
            ) {

                mensagem.style.background =
                    "#1EDE48";

            } else {

                mensagem.style.background =
                    "#ff5757";

            }


            mensagem.style.color =
                "#ffffff";


            document.body.appendChild(
                mensagem
            );


            setTimeout(
                function () {

                    mensagem.remove();

                },
                3000
            );

        }


        /* ================================================= */
        /* MODAL DE SENHA */
        /* ================================================= */

        function abrirModalSenha() {

            const modal =
                document.createElement(
                    "div"
                );


            modal.style.position =
                "fixed";

            modal.style.inset =
                "0";

            modal.style.background =
                "rgba(20, 18, 40, 0.45)";

            modal.style.display =
                "flex";

            modal.style.alignItems =
                "center";

            modal.style.justifyContent =
                "center";

            modal.style.zIndex =
                "9999";

            modal.style.padding =
                "20px";


            const card =
                document.createElement(
                    "div"
                );


            card.style.width =
                "100%";

            card.style.maxWidth =
                "420px";

            card.style.background =
                "#ffffff";

            card.style.borderRadius =
                "22px";

            card.style.padding =
                "30px";

            card.style.boxShadow =
                "0 20px 60px rgba(0,0,0,0.18)";


            const titulo =
                document.createElement(
                    "h2"
                );


            titulo.textContent =
                "Alterar senha";


            titulo.style.margin =
                "0 0 20px";


            titulo.style.fontSize =
                "22px";


            card.appendChild(
                titulo
            );


            const atual =
                criarCampoSenha(
                    "Senha atual"
                );


            const nova =
                criarCampoSenha(
                    "Nova senha"
                );


            const confirmacao =
                criarCampoSenha(
                    "Confirmar nova senha"
                );


            card.appendChild(
                atual.container
            );

            card.appendChild(
                nova.container
            );

            card.appendChild(
                confirmacao.container
            );


            const actions =
                document.createElement(
                    "div"
                );


            actions.style.display =
                "flex";

            actions.style.justifyContent =
                "flex-end";

            actions.style.gap =
                "10px";

            actions.style.marginTop =
                "25px";


            const cancelar =
                document.createElement(
                    "button"
                );


            cancelar.type =
                "button";

            cancelar.textContent =
                "Cancelar";


            cancelar.style.padding =
                "11px 18px";

            cancelar.style.border =
                "1px solid #ddd";

            cancelar.style.background =
                "#ffffff";

            cancelar.style.borderRadius =
                "10px";

            cancelar.style.cursor =
                "pointer";


            const salvar =
                document.createElement(
                    "button"
                );


            salvar.type =
                "button";

            salvar.textContent =
                "Alterar senha";


            salvar.style.padding =
                "11px 18px";

            salvar.style.border =
                "none";

            salvar.style.background =
                "#7C5CFC";

            salvar.style.color =
                "#ffffff";

            salvar.style.borderRadius =
                "10px";

            salvar.style.cursor =
                "pointer";


            actions.appendChild(
                cancelar
            );

            actions.appendChild(
                salvar
            );


            card.appendChild(
                actions
            );


            modal.appendChild(
                card
            );


            document.body.appendChild(
                modal
            );


            cancelar.addEventListener(
                "click",
                function () {

                    modal.remove();

                }
            );


            salvar.addEventListener(
                "click",
                function () {

                    const senhaAtual =
                        atual.input.value;

                    const novaSenha =
                        nova.input.value;

                    const senhaConfirmada =
                        confirmacao.input.value;


                    if (
                        senhaAtual === ""
                    ) {

                        alert(
                            "Digite sua senha atual."
                        );

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


                    if (
                        novaSenha.length <
                        6
                    ) {

                        alert(
                            "A nova senha deve ter pelo menos 6 caracteres."
                        );

                        return;

                    }


                    if (
                        novaSenha !==
                        senhaConfirmada
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


                    modal.remove();


                    mostrarMensagem(
                        "Senha alterada com sucesso!",
                        "sucesso"
                    );

                }
            );

        }


        /* ================================================= */
        /* CAMPO DE SENHA */
        /* ================================================= */

        function criarCampoSenha(
            labelTexto
        ) {

            const container =
                document.createElement(
                    "div"
                );


            container.style.marginBottom =
                "14px";


            const label =
                document.createElement(
                    "label"
                );


            label.textContent =
                labelTexto;


            label.style.display =
                "block";

            label.style.marginBottom =
                "7px";

            label.style.fontSize =
                "13px";

            label.style.fontWeight =
                "500";


            const input =
                document.createElement(
                    "input"
                );


            input.type =
                "password";

            input.placeholder =
                "Digite sua senha";


            input.style.width =
                "100%";

            input.style.height =
                "46px";

            input.style.padding =
                "0 13px";

            input.style.border =
                "1px solid #e1e2e9";

            input.style.borderRadius =
                "11px";

            input.style.boxSizing =
                "border-box";

            input.style.outline =
                "none";

            input.style.fontFamily =
                "Inter, Arial, sans-serif";


            container.appendChild(
                label
            );

            container.appendChild(
                input
            );


            return {

                container:
                    container,

                input:
                    input

            };

        }

    }
);