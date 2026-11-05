# Donee — Gerenciador de Tarefas

Um gerenciador de tarefas moderno, intuitivo e responsivo, desenvolvido para ajudar na organização da rotina, no acompanhamento de atividades e na construção de hábitos de produtividade.

O **Donee** reúne ferramentas para planejar tarefas, acompanhar o progresso diário e visualizar a evolução pessoal por meio de um sistema de XP e níveis.

---

## Sobre o projeto

O Donee é um projeto de desenvolvimento web criado com o objetivo de aplicar conhecimentos de desenvolvimento Front-end, organização de código, manipulação do DOM, armazenamento local e experiência do usuário.

A aplicação foi desenvolvida utilizando HTML5, CSS3 e JavaScript, com foco em uma interface simples, funcional e agradável.

O projeto conta com páginas independentes para cadastro, autenticação, gerenciamento de tarefas, acompanhamento de atividades, edição de perfil e configurações.

A aplicação utiliza o `localStorage` do navegador para armazenar os dados dos usuários, tarefas e preferências, dispensando a necessidade de um servidor ou banco de dados nesta versão.

O Donee também faz parte do meu portfólio de desenvolvimento web.

---

## Funcionalidades

### Autenticação e gerenciamento de conta

- Cadastro de novos usuários.
- Validação dos dados informados.
- Verificação de e-mails já cadastrados.
- Login com e-mail e senha.
- Manutenção da sessão do usuário.
- Logout.
- Proteção de páginas que exigem autenticação.
- Alteração de informações da conta.
- Alteração de senha.
- Exclusão de conta.

### Dashboard

O painel principal apresenta informações importantes sobre a atividade do usuário.

- Resumo das tarefas.
- Quantidade de tarefas concluídas.
- Quantidade de tarefas pendentes.
- Indicadores de progresso.
- Exibição de tarefas recentes.
- Acompanhamento de XP acumulado.
- Exibição do nível atual.
- Barra de progresso para o próximo nível.

### Gerenciamento de tarefas

A página de tarefas permite organizar as atividades de maneira prática.

- Criar novas tarefas.
- Editar tarefas existentes.
- Excluir tarefas.
- Marcar tarefas como concluídas.
- Reabrir tarefas concluídas.
- Definir categorias.
- Definir prioridades.
- Adicionar datas e horários.
- Pesquisar tarefas por título ou categoria.
- Ordenar tarefas.
- Filtrar tarefas por situação.

Os filtros permitem visualizar:

- Todas as tarefas.
- Tarefas pendentes.
- Tarefas concluídas.
- Tarefas do dia.
- Tarefas atrasadas.

### Sistema de gamificação

O Donee possui um sistema de gamificação que incentiva a conclusão das atividades.

- Ganho de 10 XP ao concluir uma tarefa.
- Retirada dos XP concedidos quando uma tarefa é reaberta.
- Retirada dos XP concedidos quando uma tarefa concluída é excluída.
- Evolução de nível conforme a quantidade de XP acumulada.
- Indicador visual de progresso para o próximo nível.

**Sistema de níveis:**

A cada 100 XP acumulados, o usuário avança um nível.

### Perfil do usuário

- Visualização dos dados pessoais.
- Edição do nome.
- Edição do e-mail.
- Edição do telefone, quando disponível.
- Validação dos campos.
- Salvamento das alterações.

### Configurações

A página de configurações reúne as preferências da aplicação.

- Alternância entre tema claro e escuro.
- Preferência de idioma.
- Preferências de notificações.
- Preferências de lembretes.
- Configurações relacionadas à conta.
- Alteração de senha.
- Exclusão da conta.

Algumas preferências são armazenadas localmente e não representam integrações com serviços externos.

---

## Design e experiência do usuário

O Donee foi desenvolvido com uma proposta visual moderna, minimalista e intuitiva.

A interface busca proporcionar uma experiência agradável, priorizando a organização das informações, a facilidade de navegação e a clareza dos componentes.

### Características visuais

- Design clean e minimalista.
- Sidebar roxa com ícones e textos brancos.
- Cartões com cantos arredondados.
- Tipografia Inter.
- Hierarquia visual organizada.
- Espaçamentos consistentes.
- Efeitos de interação e animações suaves.
- Interface adaptável a diferentes dispositivos.
- Temas claro e escuro.

### Inspirações

O desenvolvimento visual teve como referência interfaces de ferramentas de produtividade como:

- Todoist
- TickTick
- Microsoft To Do
- Notion

### Paleta de cores

| Elemento | Cor |
|---|---|
| Cor primária | `#7C5CFC` |
| Cor primária (hover) | `#6948F5` |
| Fundo principal | `#FFFFFF` |
| Fundo secundário | `#FAFBFC` |
| Texto principal | `#1E1E2F` |
| Tarefas concluídas | `#1EDE48` |
| Prioridade baixa | `#4DABF7` |
| Prioridade média | `#FFA940` |
| Prioridade alta | `#FF5C5C` |

---

## Responsividade

A aplicação foi desenvolvida para oferecer uma experiência consistente em diferentes tamanhos de tela.

A responsividade contempla:

- Computadores e desktops.
- Notebooks.
- Tablets.
- Smartphones.
- Dispositivos com telas menores.

Os layouts, cartões, formulários, menus, modais e demais componentes foram revisados para se adaptarem aos diferentes dispositivos.

Também foram realizadas verificações gerais de navegação, organização dos elementos e possíveis problemas de exibição em telas menores.

---

## Tecnologias utilizadas

### Front-end

| Tecnologia | Utilização |
|---|---|
| HTML5 | Estruturação das páginas |
| CSS3 | Estilização, layouts e responsividade |
| JavaScript | Lógica, interações e funcionalidades |
| localStorage | Armazenamento local dos dados |
| Lucide | Biblioteca de ícones |
| Google Fonts — Inter | Tipografia da aplicação |

### Ferramentas de desenvolvimento

- Visual Studio Code
- Git
- GitHub
- GitHub Desktop

---

## Inteligência Artificial no desenvolvimento

Durante o desenvolvimento do Donee, foram utilizadas ferramentas de Inteligência Artificial como apoio ao processo de criação, implementação e aprimoramento da aplicação.

### Ferramentas utilizadas

**ChatGPT**
- Apoio no planejamento e organização do projeto.
- Esclarecimento de conceitos de programação.
- Sugestões de implementação.
- Análise de código e identificação de possíveis problemas.
- Auxílio na documentação.

**GitHub Copilot**
- Assistência na escrita e edição de código.
- Implementação de funcionalidades.
- Identificação e correção de problemas.
- Sugestões de melhorias na estrutura e responsividade.

**Claude Code**
- Análise da estrutura do projeto.
- Auxílio na implementação de melhorias.
- Revisão de funcionalidades.
- Aprimoramento de partes do código.

A Inteligência Artificial foi utilizada como ferramenta de apoio ao desenvolvimento, contribuindo para a resolução de problemas, otimização do processo de trabalho e aprimoramento da aplicação.

As sugestões e alterações geradas pelas ferramentas foram utilizadas como apoio, permanecendo sob responsabilidade do desenvolvedor a revisão, validação e decisão sobre sua aplicação.

---

## Armazenamento de dados

Nesta versão, o Donee utiliza o `localStorage` para armazenar informações diretamente no navegador.

Os dados armazenados incluem:

- Informações dos usuários.
- Sessão do usuário autenticado.
- Tarefas cadastradas.
- XP e nível.
- Preferências da aplicação.

O armazenamento local permite que as informações permaneçam disponíveis após fechar e abrir o navegador, desde que os dados do site não sejam apagados.

**Importante:** como não existe backend ou banco de dados, as informações ficam vinculadas ao navegador e dispositivo utilizados. Não há sincronização automática entre diferentes dispositivos.

O sistema de autenticação é demonstrativo e voltado para fins de estudo e portfólio, não sendo adequado para utilização com dados sensíveis em um ambiente de produção.

---

## Estrutura do projeto

```text
Donee/
│
├── assets/
│   ├── images/
│   │   ├── logo-Donee.png
│   │   └── Mockup-Donee.png
│   │
│   └── icons/
│
├── css/
│   ├── style.css
│   ├── components.css
│   ├── landing.css
│   ├── login.css
│   ├── dashboard.css
│   ├── tasks.css
│   ├── profile.css
│   ├── settings.css
│   └── responsive.css
│
├── js/
│   ├── app.js
│   ├── auth.js
│   ├── cadastro.js
│   ├── login.js
│   ├── dashboard.js
│   ├── tasks.js
│   ├── profile.js
│   └── settings.js
│
├── pages/
│   ├── cadastro.html
│   ├── login.html
│   ├── dashboard.html
│   ├── tasks.html
│   ├── profile.html
│   ├── settings.html
│   └── ui-playground.html
│
├── index.html
├── README.md
└── LICENSE
```

---

## Como executar o projeto

Como o Donee é uma aplicação Front-end, não é necessário instalar PHP, MySQL ou configurar um servidor backend.

### 1. Clonar o repositório

```bash
git clone URL_DO_REPOSITORIO
```

### 2. Entrar na pasta do projeto

```bash
cd Donee
```

### 3. Abrir o projeto

Abra a pasta no Visual Studio Code.

Você pode utilizar a extensão **Live Server** para executar a aplicação localmente.

1. Instale a extensão Live Server no VS Code.
2. Abra o arquivo `index.html`.
3. Clique em **Open with Live Server**.
4. A aplicação será aberta no navegador.

---

## Verificação e qualidade

O projeto passou por uma etapa de revisão geral e acabamento, contemplando:

- Verificação das páginas e da navegação.
- Revisão das funcionalidades existentes.
- Verificação da integração entre HTML, CSS e JavaScript.
- Revisão do armazenamento local.
- Verificação do sistema de tarefas e gamificação.
- Revisão dos componentes visuais.
- Ajustes de responsividade.
- Verificação de layouts em diferentes tamanhos de tela.
- Correção de problemas identificados durante a revisão.

O objetivo dessa etapa foi preservar as funcionalidades existentes e melhorar a estabilidade, a organização e a experiência de utilização da aplicação.

---

## Melhorias futuras

O Donee foi desenvolvido com possibilidade de expansão. Algumas melhorias que podem ser implementadas em versões futuras incluem:

- Calendário mensal com histórico de atividades.
- Acompanhamento de consistência e sequência de dias (*streak*).
- Estatísticas de produtividade ao longo do tempo.
- Histórico de tarefas concluídas.
- Sistema de conquistas.
- Backend e banco de dados.
- Autenticação segura.
- Sincronização de dados entre dispositivos.
- Notificações e lembretes integrados.

Essas funcionalidades não fazem parte da versão atual quando ainda não implementadas.

---

## Autor

**Matheus Machado**

Desenvolvedor Web em formação.

- GitHub: [@MatheusMachadoTI](https://github.com/MatheusMachadoTI)
- LinkedIn: [matheus-freitas-machado](https://www.linkedin.com/in/matheus-freitas-machado/)

Projeto desenvolvido para estudo, prática de desenvolvimento web e construção de portfólio.

---

## Licença

Este projeto está disponibilizado sob a licença definida no arquivo [LICENSE](LICENSE).

---

**Donee — Organize sua rotina, acompanhe seu progresso e mantenha suas tarefas em dia.**
