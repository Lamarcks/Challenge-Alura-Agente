"""Ingere os documentos internos e cria a base vetorial do agente."""

import csv
import json
from dataclasses import dataclass
from pathlib import Path

import chromadb
from pypdf import PdfReader
from sentence_transformers import SentenceTransformer

from config import (
    CHROMA_PATH,
    CHUNK_OVERLAP,
    CHUNK_SIZE,
    COLLECTION_NAME,
    DOCUMENTS_PATH,
    EMBEDDING_MODEL,
    SUPPORTED_EXTENSIONS,
)


@dataclass
class DocumentoCarregado:
    texto: str
    fonte: str
    area: str
    pagina: int | None = None


def identificar_area(caminho: Path) -> str:
    """Usa a primeira subpasta como área corporativa do documento."""
    relativo = caminho.relative_to(DOCUMENTS_PATH)
    return relativo.parts[0].replace("_", " ").title() if len(relativo.parts) > 1 else "Geral"


def carregar_pdf(caminho: Path) -> list[DocumentoCarregado]:
    documentos = []
    for numero, pagina in enumerate(PdfReader(str(caminho)).pages, start=1):
        texto = (pagina.extract_text() or "").strip()
        if texto:
            documentos.append(DocumentoCarregado(texto, caminho.name, identificar_area(caminho), numero))
    return documentos


def carregar_texto(caminho: Path) -> list[DocumentoCarregado]:
    texto = caminho.read_text(encoding="utf-8").strip()
    return [DocumentoCarregado(texto, caminho.name, identificar_area(caminho))] if texto else []


def carregar_csv(caminho: Path) -> list[DocumentoCarregado]:
    documentos = []
    with caminho.open(encoding="utf-8-sig", newline="") as arquivo:
        for linha, dados in enumerate(csv.DictReader(arquivo), start=2):
            texto = "\n".join(f"{campo}: {valor}" for campo, valor in dados.items() if valor)
            if texto:
                documentos.append(DocumentoCarregado(texto, caminho.name, identificar_area(caminho), linha))
    return documentos


def carregar_json(caminho: Path) -> list[DocumentoCarregado]:
    dados = json.loads(caminho.read_text(encoding="utf-8"))
    itens = dados if isinstance(dados, list) else [dados]
    return [
        DocumentoCarregado(
            json.dumps(item, ensure_ascii=False, indent=2),
            caminho.name,
            identificar_area(caminho),
            indice,
        )
        for indice, item in enumerate(itens, start=1)
    ]


def carregar_documento(caminho: Path) -> list[DocumentoCarregado]:
    extensao = caminho.suffix.lower()
    if extensao == ".pdf":
        return carregar_pdf(caminho)
    if extensao in {".md", ".txt"}:
        return carregar_texto(caminho)
    if extensao == ".csv":
        return carregar_csv(caminho)
    if extensao == ".json":
        return carregar_json(caminho)
    return []


def criar_chunks(texto: str) -> list[str]:
    """Divide o texto por palavras para não cortar palavras no meio."""
    palavras = texto.split()
    if not palavras:
        return []

    chunks, atual, tamanho_atual = [], [], 0
    for palavra in palavras:
        tamanho_palavra = len(palavra) + 1
        if atual and tamanho_atual + tamanho_palavra > CHUNK_SIZE:
            chunks.append(" ".join(atual))
            sobreposicao, tamanho_sobreposicao = [], 0
            for item in reversed(atual):
                tamanho_sobreposicao += len(item) + 1
                if tamanho_sobreposicao > CHUNK_OVERLAP:
                    break
                sobreposicao.insert(0, item)
            atual = sobreposicao
            tamanho_atual = sum(len(item) + 1 for item in atual)
        atual.append(palavra)
        tamanho_atual += tamanho_palavra
    if atual:
        chunks.append(" ".join(atual))
    return chunks


def obter_documentos() -> list[DocumentoCarregado]:
    if not DOCUMENTS_PATH.exists():
        raise FileNotFoundError(f"Pasta de documentos não encontrada: {DOCUMENTS_PATH}")

    arquivos = sorted(
        caminho for caminho in DOCUMENTS_PATH.rglob("*")
        if caminho.is_file() and caminho.suffix.lower() in SUPPORTED_EXTENSIONS
    )
    if not arquivos:
        formatos = ", ".join(sorted(SUPPORTED_EXTENSIONS))
        raise ValueError(f"Nenhum documento suportado encontrado. Formatos aceitos: {formatos}")

    documentos = []
    for arquivo in arquivos:
        print(f"Lendo: {arquivo.relative_to(DOCUMENTS_PATH)}")
        documentos_arquivo = carregar_documento(arquivo)
        if not documentos_arquivo:
            print(f"Aviso: não foi possível extrair texto de {arquivo.name}; o arquivo será ignorado.")
        documentos.extend(documentos_arquivo)
    return documentos


def criar_banco_vetorial():
    documentos = obter_documentos()
    chunks, metadados = [], []
    for documento in documentos:
        for indice, chunk in enumerate(criar_chunks(documento.texto)):
            metadata = {"fonte": documento.fonte, "area": documento.area, "chunk": indice}
            if documento.pagina is not None:
                metadata["pagina"] = documento.pagina
            chunks.append(chunk)
            metadados.append(metadata)

    if not chunks:
        raise ValueError("Os documentos encontrados não possuem texto que possa ser indexado.")

    print(f"Gerando embeddings para {len(chunks)} trechos...")
    modelo = SentenceTransformer(EMBEDDING_MODEL)
    embeddings = modelo.encode(chunks, normalize_embeddings=True, show_progress_bar=True).tolist()

    client = chromadb.PersistentClient(path=CHROMA_PATH)
    try:
        client.delete_collection(COLLECTION_NAME)
    except Exception:
        pass
    collection = client.create_collection(COLLECTION_NAME, metadata={"hnsw:space": "cosine"})
    collection.add(
        ids=[f"chunk_{indice}" for indice in range(len(chunks))],
        documents=chunks,
        embeddings=embeddings,
        metadatas=metadados,
    )
    print(f"Base criada com sucesso: {collection.count()} trechos indexados.")


if __name__ == "__main__":
    criar_banco_vetorial()
