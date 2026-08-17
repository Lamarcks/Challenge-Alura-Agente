<div align="center">

# 🧠 LAMARCKS IA

### Assistente Inteligente com IA Generativa + RAG Corporativo

**Inteligência Artificial • Engenharia de Software • Dados • Cloud**

Projeto desenvolvido para o desafio final da **Alura + Oracle Next Education (ONE)**.

<br>

![Python](https://img.shields.io/badge/Python-3776AB?style=for-the-badge\&logo=python\&logoColor=white)
![FastAPI](https://img.shields.io/badge/FastAPI-009688?style=for-the-badge\&logo=fastapi\&logoColor=white)
![Groq](https://img.shields.io/badge/Groq-LLM-F55036?style=for-the-badge)
![ChromaDB](https://img.shields.io/badge/ChromaDB-Vector_DB-orange?style=for-the-badge)
![RAG](https://img.shields.io/badge/RAG-Generative_AI-blueviolet?style=for-the-badge)
![OCI](https://img.shields.io/badge/Oracle_Cloud-OCI-F80000?style=for-the-badge\&logo=oracle\&logoColor=white) 

![Status](https://img.shields.io/badge/STATUS-ONLINE-success?style=for-the-badge)
![Challenge](https://img.shields.io/badge/ALURA-ONE-blue?style=for-the-badge)

<br>

### 🌐 [TESTAR A APLICAÇÃO](http://163.176.27.55:8000)

<img width="1919" height="1079" alt="Captura de tela 2026-08-13 080920" src="https://github.com/user-attachments/assets/4316accc-0f97-4213-9602-04c5243ec032" />

</div>

---

# 📌 Sobre o projeto

O **LAMARCKS IA** é um assistente inteligente desenvolvido para responder perguntas relacionadas a:

* Inteligência Artificial;
* Machine Learning;
* IA Generativa;
* Engenharia de Software;
* Engenharia de Dados;
* APIs;
* arquitetura de sistemas;
* Cloud Computing;
* DevOps;
* documentação corporativa.

O projeto combina **IA Generativa** com uma arquitetura **RAG — Retrieval-Augmented Generation**, permitindo utilizar tanto o conhecimento geral de um modelo de linguagem quanto informações provenientes de uma base documental privada.

O sistema utiliza documentos da empresa fictícia **Pegasus** como base corporativa.

> 💡 O LAMARCKS IA não funciona apenas como um chatbot baseado em documentos.
>
> Ele identifica o tipo de pergunta realizada e decide se deve utilizar **conhecimento geral** ou consultar a **base corporativa RAG da Pegasus**.

---

# 🎯 O problema

Empresas produzem diariamente grandes volumes de documentação técnica:

* padrões de desenvolvimento;
* procedimentos internos;
* documentação de arquitetura;
* processos de onboarding;
* registros de incidentes;
* boas práticas de engenharia.

Encontrar uma informação específica entre diversos documentos pode consumir tempo e reduzir a produtividade das equipes.

Além disso, utilizar documentos corporativos diretamente em aplicações de IA exige cuidado para evitar a exposição desnecessária das informações internas.

---

# 💡 A solução

O **LAMARCKS IA** cria uma camada inteligente entre o usuário e essas informações.

A aplicação recebe uma pergunta e determina automaticamente qual estratégia utilizar.

### 🌎 Conhecimento geral

Perguntas relacionadas a conceitos amplos de tecnologia são respondidas diretamente pelo modelo de linguagem.

Exemplo:

```text
O que é RAG?
```

```text
Como funciona uma API REST?
```

```text
Qual a diferença entre Machine Learning e Deep Learning?
```

---

### 🔐 Conhecimento corporativo

Perguntas específicas sobre a empresa Pegasus acionam a arquitetura RAG.

Exemplo:

```text
Como funciona o onboarding da Pegasus?
```

```text
Quais padrões de back-end são utilizados pela Pegasus?
```

```text
Como a Pegasus organiza sua arquitetura de microsserviços?
```

Nesse fluxo, o sistema realiza uma **busca semântica na base vetorial**, recupera os trechos mais relevantes e utiliza essas informações como contexto para gerar a resposta.

---

# 🚀 Principais funcionalidades

### 🧠 Assistente de Inteligência Artificial

Responde perguntas sobre IA, Machine Learning, IA Generativa, LLMs, engenharia de prompt e sistemas RAG.

### 💻 Engenharia de Software

Auxilia em conceitos relacionados a back-end, front-end, APIs, arquitetura, microsserviços e boas práticas de desenvolvimento.

### 📊 Engenharia de Dados

Responde perguntas sobre ETL, pipelines, bancos de dados, processamento e arquitetura de dados.

### ☁️ Cloud e DevOps

Suporta perguntas relacionadas a infraestrutura, Docker, APIs, cloud computing, microsserviços e Oracle Cloud Infrastructure.

### 📚 RAG Corporativo

Consulta uma base privada de documentos da Pegasus por meio de busca semântica.

### 🔀 Roteamento inteligente

Analisa a pergunta do usuário e decide entre:

```text
Conhecimento Geral
        OU
Base Corporativa RAG
```

### 🔎 Busca semântica

Utiliza embeddings para encontrar trechos semanticamente relacionados à pergunta do usuário.

### 📄 Referência da base consultada

Quando uma resposta utiliza documentos corporativos, o sistema informa de forma simplificada a origem utilizada.

### 🛡️ Proteção da documentação

A aplicação utiliza os documentos como contexto sem disponibilizar diretamente arquivos internos ao usuário.

### 💡 Sugestões de perguntas

A interface apresenta exemplos de perguntas para facilitar a exploração do sistema.

### 📱 Interface responsiva

A aplicação pode ser utilizada em computadores, tablets e dispositivos móveis.

---

# 🏗️ Arquitetura da aplicação

```text
                           ┌─────────────┐
                           │   Usuário   │
                           └──────┬──────┘
                                  │
                                  ▼
                           ┌─────────────┐
                           │Interface Web│
                           └──────┬──────┘
                                  │
                                  ▼
                           ┌─────────────┐
                           │   FastAPI   │
                           └──────┬──────┘
                                  │
                                  ▼
                      ┌──────────────────────┐
                      │ Roteador de Perguntas│
                      └──────────┬───────────┘
                                 │
                    ┌────────────┴────────────┐
                    │                         │
                    ▼                         ▼
          ┌──────────────────┐       ┌──────────────────┐
          │ Conhecimento     │       │ Pergunta sobre   │
          │ Geral            │       │ Base Corporativa │
          └────────┬─────────┘       └────────┬─────────┘
                   │                          │
                   ▼                          ▼
             ┌───────────┐              ┌───────────┐
             │ Groq LLM  │              │ ChromaDB  │
             └───────────┘              └─────┬─────┘
                                              │
                                              ▼
                                      Busca Semântica
                                              │
                                              ▼
                                      Contexto Recuperado
                                              │
                                              ▼
                                         ┌───────────┐
                                         │ Groq LLM  │
                                         └─────┬─────┘
                                               │
                    ┌──────────────────────────┘
                    │
                    ▼
              ┌───────────┐
              │ Resposta  │
              └───────────┘
```

---

# 🔄 Como funciona o RAG

O fluxo de Retrieval-Augmented Generation utilizado no projeto pode ser resumido em cinco etapas:

```text
Documentos
    ↓
Divisão em trechos
    ↓
Geração de embeddings
    ↓
Armazenamento no ChromaDB
    ↓
Busca semântica
    ↓
Contexto + pergunta
    ↓
LLM
    ↓
Resposta contextualizada
```

### 1. Ingestão

Os documentos da Pegasus são carregados pelo sistema.

### 2. Chunking

O conteúdo é dividido em trechos menores para melhorar a recuperação das informações.

### 3. Embeddings

Cada trecho é transformado em uma representação vetorial.

### 4. Banco vetorial

Os embeddings são armazenados no **ChromaDB**.

### 5. Retrieval + Generation

Quando uma pergunta corporativa é realizada, os trechos semanticamente mais próximos são recuperados e enviados como contexto ao modelo de linguagem.

---

# 📚 Base de conhecimento corporativo

A documentação utilizada pelo RAG está organizada por áreas:

```text
documentos/
│
├── arquitetura/
├── backend/
├── frontend/
├── incidentes/
└── onboarding/
```

Cada diretório representa uma área de conhecimento da empresa fictícia **Pegasus**.

Os documentos são utilizados para criação do contexto necessário às respostas corporativas.

---

# 🛡️ Segurança da informação

A aplicação foi projetada considerando que bases corporativas podem possuir informações que não devem ser disponibilizadas diretamente.

Por isso, o LAMARCKS IA foi estruturado para:

* não disponibilizar documentos completos;
* não fornecer links diretos para PDFs internos;
* não revelar caminhos internos de arquivos;
* não expor embeddings;
* não disponibilizar diretamente o conteúdo bruto do ChromaDB;
* utilizar os documentos apenas como contexto para geração das respostas;
* evitar afirmar informações corporativas que não estejam presentes na base.

Quando uma resposta específica sobre a Pegasus não é encontrada, o sistema pode fornecer uma explicação geral relacionada ao tema, deixando claro que aquela informação não foi localizada na base corporativa.

> ⚠️ Este projeto é educacional e demonstra conceitos de arquitetura RAG e proteção da base documental. Em ambientes de produção, controles adicionais de autenticação, autorização, auditoria, criptografia e gestão de segredos devem ser considerados.

---

# 🛠️ Tecnologias utilizadas

| Camada                   | Tecnologia                     |
| ------------------------ | ------------------------------ |
| 🎨 Front-end             | HTML, CSS e JavaScript         |
| ⚙️ Back-end              | Python                         |
| 🚀 API                   | FastAPI                        |
| 🌐 Servidor ASGI         | Uvicorn                        |
| 🧠 Modelo de linguagem   | Groq API                       |
| 🔎 RAG                   | Retrieval-Augmented Generation |
| 🗃️ Banco vetorial       | ChromaDB                       |
| 🔢 Embeddings            | Sentence Transformers          |
| 📄 Documentos            | PDF                            |
| 🔐 Variáveis de ambiente | python-dotenv                  |
| ☁️ Cloud                 | Oracle Cloud Infrastructure    |
| 🐧 Servidor              | Ubuntu Linux                   |
| 🐳 Containerização       | Docker                         |

---

# ☁️ Deploy na Oracle Cloud

O LAMARCKS IA possui uma versão publicada na **Oracle Cloud Infrastructure — OCI**, permitindo testar o projeto diretamente pelo navegador.

```text
Internet
   │
   ▼
Oracle Cloud Infrastructure
   │
   ▼
Compute Instance
   │
   ▼
Ubuntu Linux
   │
   ▼
FastAPI + Uvicorn
   │
   ▼
LAMARCKS IA
```

### 🌐 Aplicação online

**http://163.176.27.55:8000**

Não é necessário instalar o projeto para testar a versão online.

---

# 📂 Estrutura do projeto

```text
Challenge-Alura-Agente/
│
├── chroma_db/
│
├── documentos/
│   ├── arquitetura/
│   ├── backend/
│   ├── frontend/
│   ├── incidentes/
│   └── onboarding/
│
├── static/
│   ├── style.css
│   └── script.js
│
├── templates/
│   └── index.html
│
├── .env.example
├── .gitignore
├── Dockerfile
├── README.md
├── app.py
├── config.py
├── ingest.py
├── rag.py
└── requirements.txt
```

> 🔐 O arquivo `.env` contém configurações locais e credenciais e não deve ser versionado no GitHub.

---

# ⚙️ Executando localmente

## 1. Clone o repositório

```bash
git clone https://github.com/Lamarcks/Challenge-Alura-Agente.git
```

Entre na pasta:

```bash
cd Challenge-Alura-Agente
```

---

## 2. Crie um ambiente virtual

```bash
python -m venv .venv
```

### Windows

```powershell
.venv\Scripts\Activate.ps1
```

### Linux/macOS

```bash
source .venv/bin/activate
```

---

## 3. Instale as dependências

```bash
python -m pip install -r requirements.txt
```

---

## 4. Configure as variáveis de ambiente

Crie um arquivo chamado:

```text
.env
```

utilizando o `.env.example` como referência.

Adicione sua chave da Groq:

```env
GROQ_API_KEY=sua_chave_aqui
```

> Nunca publique sua chave real no GitHub.

---

# 📥 Indexando os documentos

Para criar ou atualizar a base vetorial:

```bash
python ingest.py
```

O processo realiza:

```text
PDFs
 ↓
Extração do texto
 ↓
Divisão em chunks
 ↓
Embeddings
 ↓
ChromaDB
```

Sempre que novos documentos forem adicionados à base corporativa, a indexação poderá ser executada novamente.

---

# ▶️ Iniciando a aplicação

Execute:

```bash
python -m uvicorn app:app --reload
```

Depois abra:

```text
http://127.0.0.1:8000
```

Para utilizar outra porta:

```bash
python -m uvicorn app:app --reload --port 8020
```

E acesse:

```text
http://127.0.0.1:8020
```

---

# 🧪 Exemplos para testar

### 🧠 Inteligência Artificial

```text
Como funciona um sistema RAG?
```

### 💻 Engenharia de Software

```text
Qual a diferença entre uma API REST e GraphQL?
```

### 📊 Engenharia de Dados

```text
O que faz um engenheiro de dados?
```

### 🏗️ Arquitetura

```text
Quais são as vantagens e desvantagens de microsserviços?
```

### ☁️ Cloud

```text
Qual a função de uma máquina virtual em uma infraestrutura de cloud?
```

### 🔐 Base corporativa

```text
Como funciona o onboarding de desenvolvedores da Pegasus?
```

```text
Quais padrões de engenharia back-end são adotados pela Pegasus?
```

```text
Como a Pegasus organiza sua arquitetura de microsserviços?
```

---

# 📈 Diferenciais do projeto

O LAMARCKS IA reúne diferentes conceitos em uma única aplicação:

```text
                    LAMARCKS IA
                         │
        ┌────────────────┼────────────────┐
        │                │                │
        ▼                ▼                ▼
 Inteligência       Engenharia         Cloud
 Artificial         de Software         OCI
        │                │                │
        └────────────────┼────────────────┘
                         │
                         ▼
                        RAG
                         │
                         ▼
                    Base Vetorial
                         │
                         ▼
                     ChromaDB
```

Entre os principais diferenciais estão:

* arquitetura híbrida de respostas;
* roteamento automático de perguntas;
* IA Generativa integrada a RAG;
* recuperação semântica de documentos;
* banco de dados vetorial;
* aplicação web completa;
* API desenvolvida com FastAPI;
* integração com LLM via Groq;
* deploy em infraestrutura Oracle Cloud;
* separação entre conhecimento público e informação corporativa.

---

# 🎓 Aprendizados

Durante o desenvolvimento foram aplicados conceitos relacionados a:

* Inteligência Artificial Generativa;
* Large Language Models;
* Retrieval-Augmented Generation;
* engenharia de prompt;
* embeddings;
* bancos vetoriais;
* busca semântica;
* APIs REST;
* FastAPI;
* Python;
* arquitetura de software;
* processamento de documentos;
* segurança de informações;
* Git e GitHub;
* Linux;
* deploy em nuvem;
* Oracle Cloud Infrastructure.

---

# 🗺️ Próximas evoluções

Possíveis evoluções futuras do projeto:

* [ ] autenticação de usuários;
* [ ] diferentes níveis de acesso à documentação;
* [ ] histórico de conversas;
* [ ] suporte a novos formatos de documentos;
* [ ] painel administrativo;
* [ ] observabilidade e monitoramento;
* [ ] sistema de feedback das respostas;
* [ ] cache de consultas frequentes;
* [ ] HTTPS e domínio personalizado;
* [ ] pipeline de CI/CD.

---

# 👨‍💻 Autor

## Ihago Lamarcks

Projeto desenvolvido como parte do desafio de **Inteligência Artificial e RAG da Alura + Oracle Next Education**.

O projeto integra conhecimentos de **IA, desenvolvimento de software, RAG, APIs, bancos vetoriais e computação em nuvem** em uma aplicação funcional e publicada na Oracle Cloud.
 
<p align="left">

[![LinkedIn](https://img.shields.io/badge/LinkedIn-Ihago_Lamarcks-0A66C2?style=for-the-badge\&logo=linkedin\&logoColor=white)](https://www.linkedin.com/in/ihago-lamarcks1/)

</p>

---

<div align="center">

### ⭐ Se este projeto foi útil ou interessante, considere deixar uma estrela no repositório.

**Desenvolvido com Python, FastAPI, RAG, ChromaDB, Groq e Oracle Cloud Infrastructure.**

</div>
