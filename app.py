import logging
from pathlib import Path

from fastapi import FastAPI, HTTPException
from fastapi.responses import HTMLResponse
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel, Field

from config import MAX_QUESTION_LENGTH
from rag import gerar_resposta, obter_status


BASE_DIR = Path(__file__).resolve().parent
logger = logging.getLogger(__name__)

app = FastAPI(
    title="Assistente Corporativo Rede Vida+",
    description="Base de conhecimento conversacional para colaboradores.",
    version="1.1.0",
)
app.mount("/static", StaticFiles(directory=BASE_DIR / "static"), name="static")


class PerguntaRequest(BaseModel):
    pergunta: str = Field(min_length=1, max_length=MAX_QUESTION_LENGTH)


@app.get("/", response_class=HTMLResponse)
async def pagina_inicial():
    return (BASE_DIR / "templates" / "index.html").read_text(encoding="utf-8")


@app.post("/api/perguntar")
async def perguntar(dados: PerguntaRequest):
    pergunta = dados.pergunta.strip()
    if not pergunta:
        raise HTTPException(status_code=400, detail="Digite uma pergunta.")
    try:
        resultado = gerar_resposta(pergunta)
        return {"sucesso": True, "pergunta": pergunta, **resultado}
    except RuntimeError as erro:
        logger.warning("Serviço RAG indisponível: %s", erro)
        raise HTTPException(status_code=503, detail=str(erro)) from erro
    except Exception as erro:
        logger.exception("Erro ao processar pergunta")
        raise HTTPException(status_code=500, detail="Não foi possível processar a pergunta neste momento.") from erro


@app.get("/api/status")
async def status():
    dados = obter_status()
    dados.update({
        "status": "online" if dados["groq_configurada"] and dados["base_disponivel"] else "configuracao_pendente",
        "agente": "Assistente Corporativo Rede Vida+",
        "banco_vetorial": "ChromaDB",
        "llm": "Groq",
    })
    return dados
