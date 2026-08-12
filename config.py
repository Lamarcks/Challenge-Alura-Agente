"""Configurações centralizadas da aplicação."""

import os
from pathlib import Path

from dotenv import load_dotenv


BASE_DIR = Path(__file__).resolve().parent
load_dotenv(BASE_DIR / ".env")

# LLM
GROQ_API_KEY = os.getenv("GROQ_API_KEY")
GROQ_MODEL = os.getenv("GROQ_MODEL", "llama-3.1-8b-instant")

# Documentos e banco vetorial
DOCUMENTS_PATH = BASE_DIR / "documentos"
CHROMA_PATH = str(BASE_DIR / "chroma_db")
COLLECTION_NAME = "rede_vida_conhecimento"
EMBEDDING_MODEL = "sentence-transformers/all-MiniLM-L6-v2"
SUPPORTED_EXTENSIONS = {".pdf", ".md", ".txt", ".csv", ".json"}

# RAG
CHUNK_SIZE = 900
CHUNK_OVERLAP = 150
TOP_K = 5
MAX_DISTANCE = float(os.getenv("MAX_DISTANCE", "0.45"))
MAX_QUESTION_LENGTH = 1000

# Geração de resposta (conhecimento geral x conhecimento corporativo)
GENERAL_TEMPERATURE = 0.4
GENERAL_MAX_TOKENS = 700
RAG_TEMPERATURE = 0.15
RAG_MAX_TOKENS = 550
CLASSIFIER_MAX_TOKENS = 6
