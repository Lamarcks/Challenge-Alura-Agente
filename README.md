# LAMARCKS IA

Assistente inteligente de **Inteligência Artificial, Engenharia de Software, Dados e Cloud**, desenvolvido para o Desafio Final da Alura.

O **LAMARCKS IA** combina conhecimento geral de tecnologia com uma base corporativa privada da **Pegasus**, utilizando arquitetura RAG para responder perguntas contextualizadas sem expor documentos internos.

> O LAMARCKS IA não funciona apenas como um chatbot baseado em documentos. Ele identifica quando uma pergunta pode ser respondida com conhecimento geral e quando precisa consultar a base corporativa privada da Pegasus.

---

## Sobre a Pegasus

A **Pegasus** é uma empresa de tecnologia especializada no desenvolvimento de software escalável sob arquitetura de microsserviços e soluções de Inteligência Artificial (RAG).

Destaca-se por seus rigorosos padrões técnicos em engenharia back-end e front-end, garantindo excelência operacional e segurança em infraestruturas de nuvem, incluindo **Oracle Cloud Infrastructure (OCI)**.

---

🌐 Aplicação Online

A aplicação está hospedada na Oracle Cloud Infrastructure (OCI) e pode ser testada diretamente pelo navegador:

http://163.176.27.55:8000

Não é necessário instalar nada para testar a versão online.

---

## O que o LAMARCKS IA faz

* 🧠 **Assistente de IA:** responde dúvidas gerais sobre Inteligência Artificial, Machine Learning, IA Generativa, RAG e modelos de linguagem.
* 💻 **Engenharia de Software:** responde questões sobre back-end, front-end, APIs, arquitetura e boas práticas de desenvolvimento.
* 📊 **Engenharia de Dados:** auxilia com conceitos de ETL, pipelines, bancos de dados, processamento e arquitetura de dados.
* ☁️ **Cloud e DevOps:** responde perguntas sobre Docker, microsserviços, infraestrutura, OCI e conceitos relacionados.
* 📚 **RAG Corporativo:** consulta uma base privada de documentos da Pegasus para responder perguntas específicas sobre padrões e processos internos.
* 🔀 **Roteamento Inteligente:** identifica automaticamente se a pergunta deve utilizar conhecimento geral ou a base RAG.
* 🛡️ **Proteção da Base Interna:** utiliza os documentos como contexto, sem disponibilizar PDFs completos, caminhos internos ou conteúdo bruto.
* 📄 **Referência de Fonte:** quando a resposta utiliza RAG, informa de forma simplificada qual base corporativa foi consultada.
* 💡 **Sugestões de Perguntas:** disponibiliza exemplos de perguntas para facilitar a utilização do sistema.
* 📱 **Interface Responsiva:** desenvolvida para funcionar em computadores, tablets e dispositivos móveis.

---

## Funcionamento híbrido

O LAMARCKS IA trabalha com duas formas principais de resposta.

### Conhecimento Geral

Perguntas como:

```text
O que é RAG?
```

```text
Como funciona uma API REST?
```

```text
O que faz um engenheiro de dados?
```

```text
Quais são as vantagens de microsserviços?
```

são respondidas utilizando o conhecimento geral do modelo de linguagem.

### Base Corporativa

Perguntas como:

```text
Como funciona o onboarding da Pegasus?
```

```text
Quais padrões de back-end são utilizados pela Pegasus?
```

```text
Como a Pegasus organiza sua arquitetura de microsserviços?
```

fazem o sistema consultar a base vetorial utilizando RAG.

---

## Arquitetura

```text
                         Usuário
                            │
                            ▼
                     Interface Web
                            │
                            ▼
                       FastAPI
                            │
                            ▼
                  Roteador de Perguntas
                    │               │
                    │               │
              Pergunta Geral    Pergunta Corporativa
                    │               │
                    ▼               ▼
                 Groq LLM        ChromaDB
                    │               │
                    │         Busca Semântica
                    │               │
                    │               ▼
                    │        Contexto Recuperado
                    │               │
                    └───────┬───────┘
                            ▼
                         Groq LLM
                            │
                            ▼
                         Resposta
```

---

## Base de conhecimento corporativa

A base RAG está organizada em diferentes áreas:

```text
documentos/
├── arquitetura/
├── backend/
├── frontend/
├── incidentes/
└── onboarding/
```

Esses documentos são utilizados internamente pelo sistema para geração de contexto.

A aplicação não disponibiliza os arquivos diretamente ao usuário.

---

## Segurança da informação

O projeto foi desenvolvido considerando que a documentação corporativa pode conter informações privadas.

Por isso, o LAMARCKS IA:

* não fornece documentos completos;
* não disponibiliza links diretos para os PDFs internos;
* não revela caminhos de arquivos;
* não apresenta chunks ou embeddings;
* não expõe o conteúdo bruto do ChromaDB;
* não inventa informações corporativas quando a base não possui a resposta.

Quando uma informação interna não é encontrada, o sistema pode fornecer uma explicação geral sobre o assunto, deixando claro que aquela informação não foi localizada na base corporativa.

---

## Tecnologias utilizadas

| Camada                   | Tecnologia                     |
| ------------------------ | ------------------------------ |
| Front-end                | HTML, CSS e JavaScript         |
| Backend                  | Python                         |
| API                      | FastAPI                        |
| Servidor                 | Uvicorn                        |
| LLM                      | Groq API                       |
| RAG                      | Retrieval-Augmented Generation |
| Banco Vetorial           | ChromaDB                       |
| Embeddings               | Sentence Transformers          |
| Documentos               | PDF                            |
| Configuração             | python-dotenv                  |
| Infraestrutura planejada | Oracle Cloud Infrastructure    |

---

## Estrutura do projeto

```text
ALURA-AGENTE-IA/
│
├── TECNOLOGIA IA/
│   │
│   ├── chroma_db/
│   │
│   ├── documentos/
│   │   ├── arquitetura/
│   │   ├── backend/
│   │   ├── frontend/
│   │   ├── incidentes/
│   │   └── onboarding/
│   │
│   ├── static/
│   │   ├── style.css
│   │   └── script.js
│   │
│   ├── templates/
│   │   └── index.html
│   │
│   ├── .env
│   ├── .env.example
│   ├── .gitignore
│   ├── app.py
│   ├── config.py
│   ├── ingest.py
│   ├── rag.py
│   ├── requirements.txt
│   └── README.md
│
└── .venv/
```

---

## Como executar localmente

Clone o repositório:

```bash
git clone URL_DO_SEU_REPOSITORIO
```

Entre na pasta:

```bash
cd ALURA-AGENTE-IA
```

Crie o ambiente virtual:

```bash
python -m venv .venv
```

No Windows:

```powershell
.venv\Scripts\Activate
```

Entre na aplicação:

```powershell
cd "TECNOLOGIA IA"
```

Instale as dependências:

```powershell
python -m pip install -r requirements.txt
```

Crie o arquivo `.env` a partir do exemplo:

```text
.env.example
```

e informe sua chave da API Groq.

---

## Indexando os documentos

Para criar ou atualizar a base vetorial:

```powershell
python ingest.py
```

Esse processo:

1. lê os documentos;
2. divide o conteúdo em trechos;
3. gera embeddings;
4. adiciona metadados;
5. armazena os vetores no ChromaDB.

---

## Iniciando a aplicação

Execute:

```powershell
python -m uvicorn app:app --reload
```

Ou utilizando outra porta:

```powershell
python -m uvicorn app:app --reload --port 8020
```

Abra no navegador:

```text
http://127.0.0.1:8000
```

ou:

```text
http://127.0.0.1:8020
```

---

## Exemplos de perguntas

### Inteligência Artificial

```text
Como funciona um sistema RAG?
```

### Engenharia de Software

```text
Qual a diferença entre uma API REST e GraphQL?
```

### Engenharia de Dados

```text
O que faz um engenheiro de dados?
```

### Arquitetura

```text
Quais são as vantagens e desvantagens de microsserviços?
```

### Base Corporativa

```text
Como funciona o onboarding de desenvolvedores da Pegasus?
```

```text
Quais padrões de engenharia back-end são adotados pela Pegasus?
```

---

## Autor

**Ihago**

Projeto desenvolvido como parte do desafio de **Inteligência Artificial e RAG da Alura / Oracle Next Education**.

Áreas trabalhadas no projeto:

* Inteligência Artificial;
* Engenharia de Prompt;
* RAG;
* Python;
* FastAPI;
* Engenharia de Software;
* ChromaDB;
* APIs de LLM;
* Cloud Computing.
