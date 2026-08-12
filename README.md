# Assistente Corporativo — Rede Vida+

Aplicação de inteligência artificial generativa que transforma documentos internos da Rede Vida+ em uma base de conhecimento conversacional para colaboradores. A solução usa RAG (*Retrieval-Augmented Generation*): antes de responder, recupera os trechos mais relevantes dos documentos indexados e gera uma resposta fundamentada exclusivamente neles.

> O projeto é um MVP educacional. As respostas são informativas e não substituem os canais oficiais da organização.

## Funcionalidades

- Perguntas em linguagem natural por uma interface web aberta, sem autenticação individual.
- Busca semântica nos documentos internos com ChromaDB.
- Respostas geradas pela Groq com modelo Llama.
- Respostas com referência ao arquivo, à área e à página/linha de origem quando disponível.
- Recusa segura quando não há evidência suficiente nos documentos.
- Ingestão inicial de **PDF, Markdown, TXT, CSV e JSON**. A arquitetura de carregadores permite incluir Word, Excel, PowerPoint e HTML posteriormente.

## Arquitetura

```text
Colaborador → Interface web (HTML/CSS/JS) → FastAPI
                                              ↓
                                 Recuperação semântica (ChromaDB)
                                              ↓
                              Trechos dos documentos + pergunta → Groq LLM
                                              ↓
                             Resposta fundamentada + fontes exibidas no chat
```

Os documentos devem ser colocados em `documentos/`. Para identificar a área, use subpastas, por exemplo: `documentos/recursos_humanos/`, `documentos/operacional/`, `documentos/compliance/` e `documentos/financeiro/`. O repositório inclui documentos Markdown fictícios nessas quatro áreas para permitir a demonstração imediata do MVP; substitua-os apenas por documentos autorizados antes de um uso real.

## Tecnologias

- Python e FastAPI
- ChromaDB (banco vetorial local)
- Sentence Transformers (`all-MiniLM-L6-v2`) para embeddings
- Groq API + Llama 3.1 para geração de respostas
- HTML, CSS e JavaScript
- Docker para empacotamento e Oracle Cloud Infrastructure (OCI) para deploy

## Como executar localmente

Pré-requisitos: Python 3.11 ou 3.12, uma chave da [Groq](https://console.groq.com/keys) e `pip`.

```bash
git clone <URL_DO_SEU_REPOSITORIO>
cd ALURA-AGENTE-CLINICA
python -m venv .venv
```

Ative o ambiente virtual, instale as dependências e configure a chave:

```bash
pip install -r requirements.txt
copy .env.example .env
```

Edite `.env` e preencha `GROQ_API_KEY`. Depois, adicione documentos em `documentos/` e execute a indexação:

```bash
python ingest.py
uvicorn app:app --reload
```

Abra `http://127.0.0.1:8000`. O status técnico pode ser consultado em `http://127.0.0.1:8000/api/status`.

## Perguntas de exemplo

As perguntas devem refletir o conteúdo dos documentos adicionados. Exemplos:

- “Como funciona o reembolso de despesas?”
- “Quais benefícios são oferecidos aos colaboradores?”
- “Qual é o procedimento para remarcar uma consulta?”
- “Quais orientações de privacidade de dados devo seguir?”

Quando o assunto não estiver nos documentos, o agente informa que não encontrou evidência suficiente, em vez de inventar uma resposta.

## Deploy na Oracle Cloud Infrastructure

O deploy previsto utiliza uma **instância OCI Compute** (serviço Oracle) com Docker. Antes do deploy, substitua os documentos de exemplo pelos documentos corporativos permitidos para demonstração e execute `python ingest.py` para gerar a base local.

```bash
docker build -t rede-vida-assistente .
docker run -d --name rede-vida-assistente -p 8000:8000 --env-file .env rede-vida-assistente
```

Na instância OCI, libere a porta 8000 na regra de entrada da VCN e no firewall da máquina. A demonstração ficará disponível em `http://<IP_PUBLICO_DA_INSTANCIA>:8000`.

Para a entrega final, inclua abaixo o link público e uma captura de tela ou vídeo da aplicação implantada:

- Demonstração: `ADICIONAR_URL_DO_DEPLOY`
- Evidência visual: adicionar imagem ou vídeo na pasta `docs/` e referenciá-lo aqui.

## Próximas evoluções

- Suporte a Word, Excel, PowerPoint e HTML.
- OCR para PDFs digitalizados ou sem camada de texto.
- Integração com OCI Object Storage para armazenar os documentos.
- Painel de reindexação e métricas de uso.
- Testes automatizados e avaliação de qualidade das respostas.
