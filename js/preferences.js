/* ================================================= */
/* PREFERENCES - DONEE */
/* ================================================= */

(function () {

    const translations = {
        en: {
            "Donee - Organize sua rotina": "Donee - Organize your routine",
            "Benefícios": "Benefits",
            "Como funciona": "How it works",
            "Organize sua vida de forma simples": "Organize your life simply",
            "Organize sua rotina com": "Organize your routine with",
            "O jeito mais simples de controlar tarefas, criar hábitos e alcançar seus objetivos.": "The easiest way to manage tasks, build habits, and reach your goals.",
            "Ver Demonstração": "View demo",
            "Tudo o que você precisa para organizar seu dia.": "Everything you need to organize your day.",
            "Ferramentas simples para organizar tarefas, planejar sua rotina e aumentar sua produtividade.": "Simple tools to organize tasks, plan your routine, and boost productivity.",
            "Organize tarefas": "Organize tasks",
            "Crie, edite e conclua tarefas de forma simples e rápida.": "Create, edit, and complete tasks easily.",
            "Defina prioridades": "Set priorities",
            "Foque primeiro no que realmente importa.": "Focus on what matters most.",
            "Planeje sua rotina": "Plan your routine",
            "Organize tarefas por data e horário.": "Organize tasks by date and time.",
            "Acompanhe seu progresso": "Track your progress",
            "Veja facilmente quantas tarefas você concluiu.": "Easily see how many tasks you've completed.",
            "Organize sua rotina em apenas três passos.": "Organize your routine in just three steps.",
            "Crie sua conta": "Create your account",
            "Faça seu cadastro gratuitamente.": "Sign up for free.",
            "Adicione tarefas": "Add tasks",
            "Organize tudo o que precisa fazer.": "Organize everything you need to do.",
            "Conclua objetivos": "Reach your goals",
            "Marque suas tarefas como concluídas.": "Mark your tasks as complete.",
            "Conheça o Donee": "Meet Donee",
            "Um ambiente moderno para organizar tarefas, acompanhar sua rotina e aumentar sua produtividade.": "A modern space to organize tasks, track your routine, and boost productivity.",
            "Comece hoje mesmo.": "Get started today.",
            "Organize sua rotina com uma ferramenta simples, bonita e eficiente.": "Organize your routine with a simple, beautiful, and effective tool.",
            "Organize sua rotina de forma simples.": "Organize your routine simply.",
            "Início": "Home",
            "Cadastrar": "Sign up",
            "Criar Conta | Donee": "Create Account | Donee",
            "Crie sua conta": "Create your account",
            "Comece agora a organizar sua rotina com o Donee.": "Start organizing your routine with Donee.",
            "Nome": "Name",
            "Digite seu nome": "Enter your name",
            "E-mail": "Email",
            "Digite seu e-mail": "Enter your email",
            "Senha": "Password",
            "Digite sua senha": "Enter your password",
            "Confirmar senha": "Confirm password",
            "Digite sua senha novamente": "Re-enter your password",
            "Criar conta": "Create account",
            "Já possui uma conta?": "Already have an account?",
            "Entrar": "Log in",
            "Entrar | Donee": "Log in | Donee",
            "Bem-vindo de volta!": "Welcome back!",
            "Entre na sua conta para continuar.": "Log in to your account to continue.",
            "Email": "Email",
            "Digite seu email": "Enter your email",
            "Não possui uma conta?": "Don't have an account?",
            "Dashboard | Donee": "Dashboard | Donee",
            "Dashboard": "Dashboard",
            "Tarefas": "Tasks",
            "Calendário": "Calendar",
            "Calendário | Donee": "Calendar | Donee",
            "Perfil": "Profile",
            "Configurações": "Settings",
            "Meu perfil": "My profile",
            "AGENDA": "SCHEDULE",
            "Veja suas tarefas distribuídas por dia e horário.": "See your tasks organized by day and time.",
            "Mês": "Month",
            "Semana": "Week",
            "Dia": "Day",
            "Anterior": "Previous",
            "Hoje": "Today",
            "Próximo": "Next",
            "BEM-VINDO DE VOLTA": "WELCOME BACK",
            "Olá, ": "Hello, ",
            "Organize seu dia e mantenha o foco nos seus objetivos.": "Organize your day and stay focused on your goals.",
            "Carregando...": "Loading...",
            "Tarefas concluídas": "Completed tasks",
            "no total": "in total",
            "Tarefas pendentes": "Pending tasks",
            "para concluir": "to complete",
            "Total de tarefas": "Total tasks",
            "cadastradas": "created",
            "ORGANIZAÇÃO": "ORGANIZATION",
            "Suas tarefas": "Your tasks",
            "Ver todas": "View all",
            "DESEMPENHO": "PERFORMANCE",
            "Seu progresso": "Your progress",
            "tarefas concluídas": "tasks completed",
            "Comece concluindo uma tarefa!": "Start by completing a task!",
            "Continue assim!": "Keep it up!",
            "Cada tarefa concluída é mais um passo em direção aos seus objetivos.": "Every completed task is another step toward your goals.",
            "Tarefas | Donee": "Tasks | Donee",
            "Minhas tarefas": "My tasks",
            "Organize suas atividades e acompanhe seu progresso.": "Organize your activities and track your progress.",
            "Nova tarefa": "New task",
            "Pesquisar tarefas...": "Search tasks...",
            "Ordenar:": "Sort:",
            "Data mais próxima": "Earliest date",
            "Data mais distante": "Latest date",
            "Prioridade": "Priority",
            "Horário": "Time",
            "Mais recentes": "Most recent",
            "Todas": "All",
            "Pendentes": "Pending",
            "Concluídas": "Completed",
            "Atrasadas": "Overdue",
            "0 tarefas encontradas": "0 tasks found",
            "Dica": "Tip",
            "Divida tarefas grandes em pequenas etapas para tornar seus objetivos mais fáceis de alcançar.": "Break large tasks into smaller steps to make your goals easier to reach.",
            "NOVA TAREFA": "NEW TASK",
            "Criar tarefa": "Create task",
            "Fechar": "Close",
            "Título": "Title",
            "Ex: Estudar JavaScript": "E.g. Study JavaScript",
            "Categoria": "Category",
            "Ex: Estudos": "E.g. Studies",
            "Data": "Date",
            "Escolha o dia da tarefa.": "Choose the task date.",
            "Defina a hora para realizar.": "Set a time to complete it.",
            "Repetir semanalmente": "Repeat weekly",
            "Crie uma tarefa para cada dia selecionado.": "Create a task for each selected day.",
            "Repetir nestes dias": "Repeat on these days",
            "Seg": "Mon",
            "Ter": "Tue",
            "Qua": "Wed",
            "Qui": "Thu",
            "Sex": "Fri",
            "Sáb": "Sat",
            "Dom": "Sun",
            "Fim da repetição": "End repetition",
            "Até uma data": "Until a date",
            "Para sempre": "Forever",
            "Repetir até": "Repeat until",
            "A última ocorrência pode ser nesta data.": "The last occurrence can be on this date.",
            "Baixa": "Low",
            "Média": "Medium",
            "Alta": "High",
            "Cancelar": "Cancel",
            "Perfil | Donee": "Profile | Donee",
            "CONTA": "ACCOUNT",
            "Gerencie suas informações pessoais.": "Manage your personal information.",
            "Alterar foto": "Change photo",
            "Membro do Donee": "Donee member",
            "Editar perfil": "Edit profile",
            "INFORMAÇÕES PESSOAIS": "PERSONAL INFORMATION",
            "Seus dados": "Your details",
            "Telefone": "Phone",
            "(00) 00000-0000": "(00) 00000-0000",
            "Salvar alterações": "Save changes",
            "SEGURANÇA": "SECURITY",
            "Senha e segurança": "Password and security",
            "Altere sua senha para manter sua conta protegida.": "Change your password to keep your account secure.",
            "Alterar senha": "Change password",
            "Configurações | Donee": "Settings | Donee",
            "PREFERÊNCIAS": "PREFERENCES",
            "Personalize sua experiência no Donee.": "Personalize your Donee experience.",
            "Preferências": "Preferences",
            "Configure como o Donee funciona para você.": "Choose how Donee works for you.",
            "Idioma": "Language",
            "Escolha o idioma utilizado na plataforma.": "Choose the language used across the platform.",
            "Português": "Portuguese",
            "English": "English",
            "Español": "Spanish",
            "Tema": "Theme",
            "Escolha o modo de aparência da plataforma.": "Choose the platform's appearance.",
            "Claro": "Light",
            "Escuro": "Dark",
            "Notificações": "Notifications",
            "Escolha quais notificações deseja receber.": "Choose which notifications you want to receive.",
            "Receba avisos importantes sobre suas tarefas.": "Receive important task updates.",
            "Lembretes de tarefas": "Task reminders",
            "Receba lembretes quando uma tarefa estiver próxima.": "Get reminders when a task is coming up.",
            "Conquistas": "Achievements",
            "Receba notificações quando desbloquear uma conquista.": "Get notified when you unlock an achievement.",
            "Conta": "Account",
            "Gerencie as configurações da sua conta.": "Manage your account settings.",
            "Informações do perfil": "Profile information",
            "Altere seu nome, e-mail e outras informações pessoais.": "Change your name, email, and other personal information.",
            "Altere seu nome, telefone e outras informações pessoais.": "Change your name, phone number, and other personal information.",
            "Altere sua senha para manter sua conta segura.": "Change your password to keep your account secure.",
            "Zona de perigo": "Danger zone",
            "Ações que podem afetar permanentemente sua conta.": "Actions that can permanently affect your account.",
            "Excluir conta": "Delete account",
            "Esta ação não poderá ser desfeita.": "This action cannot be undone.",
            "Nenhuma tarefa neste dia.": "No tasks on this day.",
            "Gerenciar em Tarefas →": "Manage in Tasks →",
            "Nenhuma tarefa cadastrada": "No tasks yet",
            "Crie uma tarefa para começar.": "Create a task to get started.",
            "Comece criando uma tarefa!": "Start by creating a task!",
            "Você está começando. Continue!": "You're getting started. Keep going!",
            "Muito bem! Continue mantendo o ritmo.": "Great job! Keep up the pace.",
            "Parabéns! Todas as tarefas concluídas!": "Congratulations! All tasks are complete!",
            "Nenhuma tarefa encontrada": "No tasks found",
            "Não há tarefas nesta categoria.": "There are no tasks in this category.",
            "Você ainda não tem tarefas": "You don't have any tasks yet",
            "Clique em \"Nova tarefa\" para começar.": "Click \"New task\" to get started.",
            "Tente pesquisar por outro termo.": "Try searching for something else.",
            "Sem data": "No date",
            "Repetição semanal": "Weekly repeat",
            "Atrasada": "Overdue",
            "Reabrir": "Reopen",
            "Concluir": "Complete",
            "Editar tarefa": "Edit task",
            "Desmarcar tarefa": "Unmark task",
            "Marcar tarefa como concluída": "Mark task as complete",
            "Excluir tarefa": "Delete task",
            "Preencha todos os campos obrigatórios.": "Fill in all required fields.",
            "Digite um título válido.": "Enter a valid title.",
            "Digite uma categoria válida.": "Enter a valid category.",
            "Escolha a data inicial da repetição.": "Choose the recurrence start date.",
            "Escolha a data inicial e a data final da repetição.": "Choose the recurrence start and end dates.",
            "A data final da repetição deve ser igual ou posterior à data inicial.": "The recurrence end date must be on or after the start date.",
            "O intervalo escolhido não contém nenhum dos dias da semana selecionados.": "The selected date range contains none of the chosen weekdays.",
            "Digite um nome válido.": "Enter a valid name.",
            "Digite um e-mail válido.": "Enter a valid email address.",
            "As senhas não coincidem.": "The passwords do not match.",
            "Este e-mail já está cadastrado.": "This email is already registered.",
            "E-mail ou senha incorretos.": "Incorrect email or password.",
            "Não foi possível atualizar o perfil.": "Could not update the profile.",
            "A imagem deve ter no máximo 8 MB.": "The image must be no larger than 8 MB.",
            "Não foi possível processar a imagem.": "Could not process the image.",
            "Não foi possível salvar a foto do perfil.": "Could not save the profile photo.",
            "Não foi possível abrir esta imagem.": "Could not open this image.",
            "Não foi possível carregar esta imagem.": "Could not load this image.",
            "Foto de perfil atualizada.": "Profile photo updated.",
            "Prioridade Alta": "High priority",
            "Prioridade Média": "Medium priority",
            "Prioridade Baixa": "Low priority",
            "Idioma atualizado!": "Language updated!",
            "Tema atualizado!": "Theme updated!",
            "Notificações ativadas!": "Notifications enabled!",
            "Notificações desativadas!": "Notifications disabled!",
            "Lembretes ativados!": "Reminders enabled!",
            "Lembretes desativados!": "Reminders disabled!",
            "Notificações de conquistas ativadas!": "Achievement notifications enabled!",
            "Notificações de conquistas desativadas!": "Achievement notifications disabled!",
            "completa": "complete",
            "completas": "complete",
            "atrasada": "overdue",
            "atrasadas": "overdue",
            "pendente": "pending",
            "pendentes": "pending"
        },
        es: {
            "Donee - Organize sua rotina": "Donee - Organiza tu rutina",
            "Benefícios": "Beneficios",
            "Como funciona": "Cómo funciona",
            "Organize sua vida de forma simples": "Organiza tu vida fácilmente",
            "Organize sua rotina com": "Organiza tu rutina con",
            "O jeito mais simples de controlar tarefas, criar hábitos e alcançar seus objetivos.": "La forma más sencilla de gestionar tareas, crear hábitos y alcanzar tus objetivos.",
            "Ver Demonstração": "Ver demostración",
            "Tudo o que você precisa para organizar seu dia.": "Todo lo que necesitas para organizar tu día.",
            "Ferramentas simples para organizar tarefas, planejar sua rotina e aumentar sua produtividade.": "Herramientas sencillas para organizar tareas, planificar tu rutina y aumentar tu productividad.",
            "Organize tarefas": "Organiza tareas",
            "Crie, edite e conclua tarefas de forma simples e rápida.": "Crea, edita y completa tareas de forma sencilla y rápida.",
            "Defina prioridades": "Establece prioridades",
            "Foque primeiro no que realmente importa.": "Concéntrate primero en lo que realmente importa.",
            "Planeje sua rotina": "Planifica tu rutina",
            "Organize tarefas por data e horário.": "Organiza las tareas por fecha y hora.",
            "Acompanhe seu progresso": "Sigue tu progreso",
            "Veja facilmente quantas tarefas você concluiu.": "Consulta fácilmente cuántas tareas has completado.",
            "Organize sua rotina em apenas três passos.": "Organiza tu rutina en solo tres pasos.",
            "Crie sua conta": "Crea tu cuenta",
            "Faça seu cadastro gratuitamente.": "Regístrate gratis.",
            "Adicione tarefas": "Añade tareas",
            "Organize tudo o que precisa fazer.": "Organiza todo lo que tienes que hacer.",
            "Conclua objetivos": "Alcanza tus objetivos",
            "Marque suas tarefas como concluídas.": "Marca tus tareas como completadas.",
            "Conheça o Donee": "Conoce Donee",
            "Um ambiente moderno para organizar tarefas, acompanhar sua rotina e aumentar sua produtividade.": "Un espacio moderno para organizar tareas, seguir tu rutina y aumentar tu productividad.",
            "Comece hoje mesmo.": "Empieza hoy mismo.",
            "Organize sua rotina com uma ferramenta simples, bonita e eficiente.": "Organiza tu rutina con una herramienta sencilla, bonita y eficaz.",
            "Organize sua rotina de forma simples.": "Organiza tu rutina fácilmente.",
            "Início": "Inicio",
            "Cadastrar": "Registrarse",
            "Criar Conta | Donee": "Crear cuenta | Donee",
            "Crie sua conta": "Crea tu cuenta",
            "Comece agora a organizar sua rotina com o Donee.": "Empieza a organizar tu rutina con Donee.",
            "Nome": "Nombre",
            "Digite seu nome": "Escribe tu nombre",
            "E-mail": "Correo electrónico",
            "Digite seu e-mail": "Escribe tu correo electrónico",
            "Senha": "Contraseña",
            "Digite sua senha": "Escribe tu contraseña",
            "Confirmar senha": "Confirmar contraseña",
            "Digite sua senha novamente": "Vuelve a escribir tu contraseña",
            "Criar conta": "Crear cuenta",
            "Já possui uma conta?": "¿Ya tienes una cuenta?",
            "Entrar": "Iniciar sesión",
            "Entrar | Donee": "Iniciar sesión | Donee",
            "Bem-vindo de volta!": "¡Bienvenido de nuevo!",
            "Entre na sua conta para continuar.": "Inicia sesión para continuar.",
            "Email": "Correo electrónico",
            "Digite seu email": "Escribe tu correo electrónico",
            "Não possui uma conta?": "¿No tienes una cuenta?",
            "Dashboard | Donee": "Panel | Donee",
            "Dashboard": "Panel",
            "Tarefas": "Tareas",
            "Calendário": "Calendario",
            "Calendário | Donee": "Calendario | Donee",
            "Perfil": "Perfil",
            "Configurações": "Configuración",
            "Meu perfil": "Mi perfil",
            "AGENDA": "AGENDA",
            "Veja suas tarefas distribuídas por dia e horário.": "Consulta tus tareas organizadas por día y hora.",
            "Mês": "Mes",
            "Semana": "Semana",
            "Dia": "Día",
            "Anterior": "Anterior",
            "Hoje": "Hoy",
            "Próximo": "Siguiente",
            "BEM-VINDO DE VOLTA": "BIENVENIDO DE NUEVO",
            "Olá, ": "Hola, ",
            "Organize seu dia e mantenha o foco nos seus objetivos.": "Organiza tu día y mantén el enfoque en tus objetivos.",
            "Carregando...": "Cargando...",
            "Tarefas concluídas": "Tareas completadas",
            "no total": "en total",
            "Tarefas pendentes": "Tareas pendientes",
            "para concluir": "por completar",
            "Total de tarefas": "Total de tareas",
            "cadastradas": "creadas",
            "ORGANIZAÇÃO": "ORGANIZACIÓN",
            "Suas tarefas": "Tus tareas",
            "Ver todas": "Ver todas",
            "DESEMPENHO": "RENDIMIENTO",
            "Seu progresso": "Tu progreso",
            "tarefas concluídas": "tareas completadas",
            "Comece concluindo uma tarefa!": "¡Empieza completando una tarea!",
            "Continue assim!": "¡Sigue así!",
            "Cada tarefa concluída é mais um passo em direção aos seus objetivos.": "Cada tarea completada es un paso más hacia tus objetivos.",
            "Tarefas | Donee": "Tareas | Donee",
            "Minhas tarefas": "Mis tareas",
            "Organize suas atividades e acompanhe seu progresso.": "Organiza tus actividades y sigue tu progreso.",
            "Nova tarefa": "Nueva tarea",
            "Pesquisar tarefas...": "Buscar tareas...",
            "Ordenar:": "Ordenar:",
            "Data mais próxima": "Fecha más próxima",
            "Data mais distante": "Fecha más lejana",
            "Prioridade": "Prioridad",
            "Horário": "Hora",
            "Mais recentes": "Más recientes",
            "Todas": "Todas",
            "Pendentes": "Pendientes",
            "Concluídas": "Completadas",
            "Atrasadas": "Atrasadas",
            "0 tarefas encontradas": "0 tareas encontradas",
            "Dica": "Consejo",
            "Divida tarefas grandes em pequenas etapas para tornar seus objetivos mais fáceis de alcançar.": "Divide las tareas grandes en pasos pequeños para alcanzar tus objetivos más fácilmente.",
            "NOVA TAREFA": "NUEVA TAREA",
            "Criar tarefa": "Crear tarea",
            "Fechar": "Cerrar",
            "Título": "Título",
            "Ex: Estudar JavaScript": "Ej.: Estudiar JavaScript",
            "Categoria": "Categoría",
            "Ex: Estudos": "Ej.: Estudios",
            "Data": "Fecha",
            "Escolha o dia da tarefa.": "Elige la fecha de la tarea.",
            "Defina a hora para realizar.": "Elige la hora para realizarla.",
            "Repetir semanalmente": "Repetir semanalmente",
            "Crie uma tarefa para cada dia selecionado.": "Crea una tarea para cada día seleccionado.",
            "Repetir nestes dias": "Repetir estos días",
            "Seg": "Lun",
            "Ter": "Mar",
            "Qua": "Mié",
            "Qui": "Jue",
            "Sex": "Vie",
            "Sáb": "Sáb",
            "Dom": "Dom",
            "Fim da repetição": "Fin de la repetición",
            "Até uma data": "Hasta una fecha",
            "Para sempre": "Para siempre",
            "Repetir até": "Repetir hasta",
            "A última ocorrência pode ser nesta data.": "La última repetición puede ser en esta fecha.",
            "Baixa": "Baja",
            "Média": "Media",
            "Alta": "Alta",
            "Cancelar": "Cancelar",
            "Perfil | Donee": "Perfil | Donee",
            "CONTA": "CUENTA",
            "Gerencie suas informações pessoais.": "Gestiona tu información personal.",
            "Alterar foto": "Cambiar foto",
            "Membro do Donee": "Miembro de Donee",
            "Editar perfil": "Editar perfil",
            "INFORMAÇÕES PESSOAIS": "INFORMACIÓN PERSONAL",
            "Seus dados": "Tus datos",
            "Telefone": "Teléfono",
            "(00) 00000-0000": "(00) 00000-0000",
            "Salvar alterações": "Guardar cambios",
            "SEGURANÇA": "SEGURIDAD",
            "Senha e segurança": "Contraseña y seguridad",
            "Altere sua senha para manter sua conta protegida.": "Cambia tu contraseña para mantener segura tu cuenta.",
            "Alterar senha": "Cambiar contraseña",
            "Configurações | Donee": "Configuración | Donee",
            "PREFERÊNCIAS": "PREFERENCIAS",
            "Personalize sua experiência no Donee.": "Personaliza tu experiencia en Donee.",
            "Preferências": "Preferencias",
            "Configure como o Donee funciona para você.": "Configura cómo funciona Donee para ti.",
            "Idioma": "Idioma",
            "Escolha o idioma utilizado na plataforma.": "Elige el idioma de la plataforma.",
            "Português": "Portugués",
            "English": "Inglés",
            "Español": "Español",
            "Tema": "Tema",
            "Escolha o modo de aparência da plataforma.": "Elige el aspecto de la plataforma.",
            "Claro": "Claro",
            "Escuro": "Oscuro",
            "Notificações": "Notificaciones",
            "Escolha quais notificações deseja receber.": "Elige qué notificaciones quieres recibir.",
            "Receba avisos importantes sobre suas tarefas.": "Recibe avisos importantes sobre tus tareas.",
            "Lembretes de tarefas": "Recordatorios de tareas",
            "Receba lembretes quando uma tarefa estiver próxima.": "Recibe recordatorios cuando se acerque una tarea.",
            "Conquistas": "Logros",
            "Receba notificações quando desbloquear uma conquista.": "Recibe notificaciones cuando desbloquees un logro.",
            "Conta": "Cuenta",
            "Gerencie as configurações da sua conta.": "Gestiona la configuración de tu cuenta.",
            "Informações do perfil": "Información del perfil",
            "Altere seu nome, e-mail e outras informações pessoais.": "Cambia tu nombre, correo electrónico y otros datos personales.",
            "Altere seu nome, telefone e outras informações pessoais.": "Cambia tu nombre, teléfono y otros datos personales.",
            "Altere sua senha para manter sua conta segura.": "Cambia tu contraseña para mantener segura tu cuenta.",
            "Zona de perigo": "Zona de peligro",
            "Ações que podem afetar permanentemente sua conta.": "Acciones que pueden afectar permanentemente tu cuenta.",
            "Excluir conta": "Eliminar cuenta",
            "Esta ação não poderá ser desfeita.": "Esta acción no se puede deshacer.",
            "Nenhuma tarefa neste dia.": "No hay tareas para este día.",
            "Gerenciar em Tarefas →": "Gestionar en Tareas →",
            "Nenhuma tarefa cadastrada": "Aún no hay tareas",
            "Crie uma tarefa para começar.": "Crea una tarea para empezar.",
            "Comece criando uma tarefa!": "¡Empieza creando una tarea!",
            "Você está começando. Continue!": "Estás empezando. ¡Sigue así!",
            "Muito bem! Continue mantendo o ritmo.": "¡Muy bien! Mantén el ritmo.",
            "Parabéns! Todas as tarefas concluídas!": "¡Felicidades! Has completado todas las tareas.",
            "Nenhuma tarefa encontrada": "No se encontraron tareas",
            "Não há tarefas nesta categoria.": "No hay tareas en esta categoría.",
            "Você ainda não tem tarefas": "Aún no tienes tareas",
            "Clique em \"Nova tarefa\" para começar.": "Haz clic en \"Nueva tarea\" para empezar.",
            "Tente pesquisar por outro termo.": "Prueba a buscar otro término.",
            "Sem data": "Sin fecha",
            "Repetição semanal": "Repetición semanal",
            "Atrasada": "Atrasada",
            "Reabrir": "Reabrir",
            "Concluir": "Completar",
            "Editar tarefa": "Editar tarea",
            "Desmarcar tarefa": "Desmarcar tarea",
            "Marcar tarefa como concluída": "Marcar tarea como completada",
            "Excluir tarefa": "Eliminar tarea",
            "Preencha todos os campos obrigatórios.": "Completa todos los campos obligatorios.",
            "Digite um título válido.": "Escribe un título válido.",
            "Digite uma categoria válida.": "Escribe una categoría válida.",
            "Escolha a data inicial da repetição.": "Elige la fecha inicial de la repetición.",
            "Escolha a data inicial e a data final da repetição.": "Elige las fechas inicial y final de la repetición.",
            "A data final da repetição deve ser igual ou posterior à data inicial.": "La fecha final debe ser igual o posterior a la fecha inicial.",
            "O intervalo escolhido não contém nenhum dos dias da semana selecionados.": "El intervalo no incluye ninguno de los días de la semana seleccionados.",
            "Digite um nome válido.": "Escribe un nombre válido.",
            "Digite um e-mail válido.": "Escribe un correo electrónico válido.",
            "As senhas não coincidem.": "Las contraseñas no coinciden.",
            "Este e-mail já está cadastrado.": "Este correo electrónico ya está registrado.",
            "E-mail ou senha incorretos.": "Correo electrónico o contraseña incorrectos.",
            "Não foi possível atualizar o perfil.": "No se pudo actualizar el perfil.",
            "A imagem deve ter no máximo 8 MB.": "La imagen debe tener un máximo de 8 MB.",
            "Não foi possível processar a imagem.": "No se pudo procesar la imagen.",
            "Não foi possível salvar a foto do perfil.": "No se pudo guardar la foto de perfil.",
            "Não foi possível abrir esta imagem.": "No se pudo abrir esta imagen.",
            "Não foi possível carregar esta imagem.": "No se pudo cargar esta imagen.",
            "Foto de perfil atualizada.": "Foto de perfil actualizada.",
            "Prioridade Alta": "Prioridad alta",
            "Prioridade Média": "Prioridad media",
            "Prioridade Baixa": "Prioridad baja",
            "Idioma atualizado!": "¡Idioma actualizado!",
            "Tema atualizado!": "¡Tema actualizado!",
            "Notificações ativadas!": "¡Notificaciones activadas!",
            "Notificações desativadas!": "¡Notificaciones desactivadas!",
            "Lembretes ativados!": "¡Recordatorios activados!",
            "Lembretes desativados!": "¡Recordatorios desactivados!",
            "Notificações de conquistas ativadas!": "¡Notificaciones de logros activadas!",
            "Notificações de conquistas desativadas!": "¡Notificaciones de logros desactivadas!",
            "completa": "completada",
            "completas": "completadas",
            "atrasada": "atrasada",
            "atrasadas": "atrasadas",
            "pendente": "pendiente",
            "pendentes": "pendientes"
        }
    };

    const languageCodes = {
        "pt-BR": "pt-BR",
        en: "en",
        es: "es"
    };

    let currentLanguage = "pt-BR";

    function originalText(value) {

        if (/^(Hello|Hola), .+!$/.test(value)) {
            return value.replace(/^(Hello|Hola), /, "Olá, ");
        }

        for (const dictionary of Object.values(translations)) {

            for (const [source, translated] of Object.entries(dictionary)) {

                if (translated === value) {
                    return source;
                }

            }

        }

        return value;

    }

    function translatedText(value, language) {

        if (/^(Olá|Hello|Hola), .+!$/.test(value)) {
            const name = value.slice(value.indexOf(", ") + 2, -1);
            const greeting = language === "en" ? "Hello" : language === "es" ? "Hola" : "Olá";
            return `${greeting}, ${name}!`;
        }

        const taskCount = value.match(/^(\d+) tarefas? encontradas?$/);

        if (taskCount && language === "en") {
            const count = Number(taskCount[1]);
            return `${count} ${count === 1 ? "task" : "tasks"} found`;
        }

        if (taskCount && language === "es") {
            const count = Number(taskCount[1]);
            return `${count} ${count === 1 ? "tarea encontrada" : "tareas encontradas"}`;
        }

        const calendarSummary = value.match(/^(\d+) concluída\(s\) · (\d+) pendente\(s\) · (\d+) atrasada\(s\)$/);

        if (calendarSummary && language === "en") {
            return `${calendarSummary[1]} completed · ${calendarSummary[2]} pending · ${calendarSummary[3]} overdue`;
        }

        if (calendarSummary && language === "es") {
            return `${calendarSummary[1]} completadas · ${calendarSummary[2]} pendientes · ${calendarSummary[3]} atrasadas`;
        }

        const source = originalText(value);

        if (language === "pt-BR") {
            return source;
        }

        return translations[language][source] || source;

    }

    function translateNode(node, language) {

        if (node.nodeType === Node.TEXT_NODE) {

            const trimmed = node.nodeValue.trim().replace(/\s+/g, " ");

            if (!trimmed) {
                return;
            }

            const leading = node.nodeValue.match(/^\s*/)[0];
            const trailing = node.nodeValue.match(/\s*$/)[0];
            node.nodeValue = leading + translatedText(trimmed, language) + trailing;
            return;

        }

        if (node.nodeType !== Node.ELEMENT_NODE) {
            return;
        }

        if (node.matches("script, style, noscript")) {
            return;
        }

        for (const attribute of ["placeholder", "title", "aria-label", "alt"]) {

            if (node.hasAttribute(attribute)) {

                node.setAttribute(
                    attribute,
                    translatedText(node.getAttribute(attribute), language)
                );

            }

        }

        for (const child of node.childNodes) {
            translateNode(child, language);
        }

    }

    function applyLanguage(language) {

        const selectedLanguage = translations[language] ? language : "pt-BR";
        currentLanguage = selectedLanguage;
        document.documentElement.lang = languageCodes[selectedLanguage];
        document.title = translatedText(document.title, selectedLanguage);
        translateNode(document.body, selectedLanguage);

    }

    window.aplicarIdioma = applyLanguage;
    window.aplicarTemaDonee = function (theme) {

        document.body.classList.toggle("dark-mode", theme === "dark");

    };

    window.doneeLocale = function () {

        return {
            "pt-BR": "pt-BR",
            en: "en-US",
            es: "es-ES"
        }[localStorage.getItem("donee_language")] || "pt-BR";

    };

    window.atualizarFotoPerfil = function (source) {

        document.querySelectorAll(".profile-avatar, .profile-main-avatar").forEach(function (avatar) {

            let image = avatar.querySelector(".profile-avatar-image");

            if (!source) {

                avatar.classList.remove("has-profile-photo");

                if (image) {
                    image.remove();
                }

                avatar.querySelectorAll("i, svg").forEach(function (icon) {
                    icon.style.display = "";
                });

                return;

            }

            if (!image) {

                image = document.createElement("img");
                image.className = "profile-avatar-image";
                image.alt = "";
                avatar.appendChild(image);

            }

            avatar.classList.add("has-profile-photo");
            image.src = source;

            avatar.querySelectorAll("i, svg").forEach(function (icon) {
                icon.style.display = "none";
            });

        });

    };

    document.addEventListener("DOMContentLoaded", function () {

        let language = localStorage.getItem("donee_language") || "pt-BR";
        applyLanguage(language);
        window.aplicarTemaDonee(localStorage.getItem("donee_theme") || "light");

        const user = typeof window.obterUsuarioLogado === "function"
            ? window.obterUsuarioLogado()
            : null;

        if (user) {

            document.querySelectorAll(".profile-info strong, #sidebarUserName").forEach(function (name) {
                name.textContent = user.nome || "";
            });

            if (user.fotoPerfil) {
                window.atualizarFotoPerfil(user.fotoPerfil);
            }

        }

        const observer = new MutationObserver(function (records) {

            for (const record of records) {

                for (const node of record.addedNodes) {
                    translateNode(node, currentLanguage);
                }

            }

        });

        observer.observe(document.body, {
            childList: true,
            subtree: true
        });

    });

})();
