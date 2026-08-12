// ELEMENTOS DA PÁGINA

const form = document.getElementById("chat-form");
const input = document.getElementById("pergunta");
const chat = document.getElementById("chat");
const typing = document.getElementById("typing");
const sendButton = document.getElementById("send-button");

const sidebar = document.getElementById("sidebar");
const sidebarBackdrop = document.getElementById("sidebar-backdrop");
const menuToggle = document.getElementById("menu-toggle");
const sidebarClose = document.getElementById("sidebar-close");

const navOverview = document.getElementById("nav-overview");
const clearButton = document.getElementById("clear-button");

const helpButton = document.getElementById("help-button");
const helpPanel = document.getElementById("help-panel");

let primeiraPergunta = true;
let processandoPergunta = false;

// Guarda o HTML original da tela inicial para permitir "limpar conversa".
const WELCOME_HTML = chat.innerHTML;


// MENU LATERAL (MOBILE)

function abrirMenu() {
    sidebar.classList.add("open");
    sidebarBackdrop.classList.add("visible");
    menuToggle.setAttribute("aria-expanded", "true");
}

function fecharMenu() {
    sidebar.classList.remove("open");
    sidebarBackdrop.classList.remove("visible");
    menuToggle.setAttribute("aria-expanded", "false");
}

if (menuToggle) {
    menuToggle.addEventListener("click", abrirMenu);
}

if (sidebarClose) {
    sidebarClose.addEventListener("click", fecharMenu);
}

if (sidebarBackdrop) {
    sidebarBackdrop.addEventListener("click", fecharMenu);
}

if (sidebar) {
    sidebar.addEventListener("click", function (event) {
        if (event.target.closest(".nav-item")) {
            fecharMenu();
        }
    });
}


// PAINEL DE AJUDA

if (helpButton && helpPanel) {
    helpButton.addEventListener("click", function (event) {
        event.stopPropagation();

        const aberto = !helpPanel.hidden;

        helpPanel.hidden = aberto;
        helpButton.setAttribute("aria-expanded", String(!aberto));
    });

    document.addEventListener("click", function (event) {
        if (
            !helpPanel.hidden &&
            !event.target.closest(".help-wrapper")
        ) {
            helpPanel.hidden = true;
            helpButton.setAttribute("aria-expanded", "false");
        }
    });

    document.addEventListener("keydown", function (event) {
        if (event.key === "Escape" && !helpPanel.hidden) {
            helpPanel.hidden = true;
            helpButton.setAttribute("aria-expanded", "false");
        }
    });
}


// ÁREAS DA SIDEBAR

function setNavAtiva(botao) {
    document.querySelectorAll(".nav-item").forEach(function (item) {
        item.classList.remove("active");
    });

    if (botao) {
        botao.classList.add("active");
    }
}

async function selecionarArea(botao, valor) {
    if (processandoPergunta) {
        return;
    }

    setNavAtiva(botao);

    if (valor === "overview") {
        limparConversa();
        return;
    }

    await usarSugestao(valor);
}


// LIMPAR CONVERSA

function limparConversa() {
    if (processandoPergunta) {
        return;
    }

    chat.innerHTML = WELCOME_HTML;
    primeiraPergunta = true;

    input.value = "";
    input.focus();
}

if (clearButton) {
    clearButton.addEventListener("click", function () {
        setNavAtiva(navOverview);
        limparConversa();
    });
}


// ENVIO PELO FORMULÁRIO

form.addEventListener("submit", async function (event) {
    event.preventDefault();

    const pergunta = input.value.trim();

    if (!pergunta || processandoPergunta) {
        return;
    }

    await enviarPergunta(pergunta);
});


// BOTÕES DE SUGESTÕES

async function usarSugestao(pergunta) {
    if (processandoPergunta) {
        return;
    }

    input.value = pergunta;

    await enviarPergunta(pergunta);
}


// ENVIO DA PERGUNTA PARA A API

async function enviarPergunta(pergunta) {
    if (processandoPergunta) {
        return;
    }

    processandoPergunta = true;

    removerTelaInicial();

    adicionarMensagem(
        pergunta,
        "user"
    );

    input.value = "";
    input.disabled = true;
    sendButton.disabled = true;

    typing.classList.add("visible");

    rolarChat();

    try {
        const response = await fetch(
            "/api/perguntar",
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    pergunta: pergunta
                })
            }
        );

        let data;

        try {
            data = await response.json();
        } catch {
            throw new Error(
                "O servidor retornou uma resposta inválida."
            );
        }

        if (!response.ok) {
            throw new Error(
                data.detail ||
                "Erro ao consultar o assistente."
            );
        }

        if (!data.resposta) {
            throw new Error(
                "O assistente não retornou uma resposta."
            );
        }

        adicionarMensagem(
            data.resposta,
            "bot",
            data.fontes || []
        );

    } catch (erro) {
        console.error(
            "Erro ao enviar pergunta:",
            erro
        );

        adicionarMensagem(
            "Não consegui processar sua pergunta neste momento. " +
            "Verifique se o servidor está funcionando e tente novamente.",
            "bot"
        );

    } finally {
        typing.classList.remove("visible");

        input.disabled = false;
        sendButton.disabled = false;

        processandoPergunta = false;

        input.focus();

        rolarChat();
    }
}


// REMOVE A APRESENTAÇÃO INICIAL

function removerTelaInicial() {
    if (!primeiraPergunta) {
        return;
    }

    const welcome = document.querySelector(
        ".welcome"
    );

    if (welcome) {
        welcome.remove();
    }

    primeiraPergunta = false;
}


// ADICIONA UMA MENSAGEM AO CHAT

function adicionarMensagem(
    texto,
    tipo,
    fontes = []
) {
    const mensagem = document.createElement(
        "div"
    );

    mensagem.classList.add(
        "message",
        tipo === "user"
            ? "message-user"
            : "message-bot"
    );

    if (tipo === "bot") {
        const avatar = document.createElement("div");
        avatar.classList.add("message-avatar");
        avatar.setAttribute("aria-hidden", "true");
        avatar.innerHTML = '<svg width="14" height="14"><use href="#ai-mark"></use></svg>';
        mensagem.appendChild(avatar);
    }

    const bolha = document.createElement(
        "div"
    );

    bolha.classList.add(
        "message-bubble"
    );

    const conteudo = document.createElement(
        "div"
    );

    conteudo.classList.add("message-text");
    conteudo.textContent = texto;

    bolha.appendChild(conteudo);

    if (
        tipo === "bot" &&
        Array.isArray(fontes) &&
        fontes.length > 0
    ) {
        bolha.appendChild(
            criarFontes(fontes)
        );
    }

    mensagem.appendChild(bolha);
    chat.appendChild(mensagem);

    rolarChat();
}


// MONTA O BLOCO DE FONTES CONSULTADAS

function criarFontes(fontes) {
    const wrapper = document.createElement("div");
    wrapper.classList.add("sources");

    const label = document.createElement("span");
    label.classList.add("sources-label");
    label.textContent = "Fonte interna consultada";
    wrapper.appendChild(label);

    const lista = document.createElement("div");
    lista.classList.add("sources-list");

    const nomesUnicos = [...new Set(fontes.map(extrairNomeFonte))];

    nomesUnicos.forEach(function (nome) {
        const chip = document.createElement("span");
        chip.classList.add("source-chip");
        chip.textContent = nome;
        lista.appendChild(chip);
    });

    wrapper.appendChild(lista);
    return wrapper;
}

function extrairNomeFonte(fonte) {
    if (typeof fonte === "object" && fonte !== null) {
        return fonte.documento || fonte.arquivo || fonte.source || fonte.nome || "Documento interno";
    }
    return String(fonte);
}


// LEVA A ROLAGEM PARA A ÚLTIMA MENSAGEM

function rolarChat() {
    chat.scrollTo({
        top: chat.scrollHeight,
        behavior: "smooth"
    });
}


// POSICIONA O CURSOR NO CAMPO AO ABRIR A PÁGINA

window.addEventListener(
    "load",
    function () {
        input.focus();
    }
);
