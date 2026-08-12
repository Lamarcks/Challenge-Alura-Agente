// ELEMENTOS DA PÁGINA

const form = document.getElementById("chat-form");
const input = document.getElementById("pergunta");
const chat = document.getElementById("chat");
const typing = document.getElementById("typing");
const sendButton = document.getElementById("send-button");

let primeiraPergunta = true;
let processandoPergunta = false;


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

    const bolha = document.createElement(
        "div"
    );

    bolha.classList.add(
        "message-bubble"
    );

    const conteudo = document.createElement(
        "div"
    );

    conteudo.textContent = texto;

    bolha.appendChild(conteudo);

    if (
        tipo === "bot" &&
        Array.isArray(fontes) &&
        fontes.length > 0
    ) {
        const fonte = document.createElement(
            "span"
        );

        fonte.classList.add("source");

        fonte.textContent =
            formatarFontes(fontes);

        bolha.appendChild(fonte);
    }

    mensagem.appendChild(bolha);
    chat.appendChild(mensagem);

    rolarChat();
}


// FORMATA AS FONTES DA RESPOSTA

function formatarFontes(fontes) {
    const fontesDetalhadas = fontes.map(function (fonte) {
        if (typeof fonte === "object" && fonte !== null) {
            const detalhes = [
                fonte.arquivo || fonte.source || fonte.nome || "Documento interno",
                fonte.area ? "Área: " + fonte.area : "",
                fonte.pagina !== undefined ? "Referência: " + fonte.pagina : ""
            ].filter(Boolean);
            return detalhes.join(" • ");
        }
        return String(fonte);
    });

    const fontesUnicas = [...new Set(fontesDetalhadas)];
    return (fontesUnicas.length === 1 ? "Fonte: " : "Fontes: ") + fontesUnicas.join(" | ");
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
