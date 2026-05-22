# 🧬 BioQuizAI

<p align="center">
	<b>Projeto criado com foco em aprendizado de Angular + Spring Boot + Integração com IA</b>
</p>

<p align="center">
	<img src="https://img.shields.io/badge/Angular-20.x-dd0031?logo=angular" alt="Angular" />
	<img src="https://img.shields.io/badge/Spring%20Boot-3.x-6db33f?logo=springboot" alt="Spring Boot" />
	<img src="https://img.shields.io/badge/Java-21-orange?logo=openjdk" alt="Java" />
	<img src="https://img.shields.io/badge/Tailwind%20CSS-4.x-38bdf8?logo=tailwindcss" alt="Tailwind CSS" />
	<img src="https://img.shields.io/badge/TypeScript-5.x-3178c6?logo=typescript" alt="TypeScript" />
	<img src="https://img.shields.io/badge/Groq%20API-LLM-black" alt="Groq API" />
</p>

---

# 📚 Visão Geral

O **BioQuizAI** é um projeto full stack criado com o objetivo principal de aprender, na prática:

- desenvolvimento frontend com Angular;
- desenvolvimento backend com Spring Boot;
- comunicação HTTP entre frontend e backend;
- arquitetura básica full stack;
- consumo de APIs externas;
- integração com modelos de IA (LLMs);
- conceitos modernos de UX e aplicações reativas.

O projeto consiste em um quiz de biologia com:

- perguntas e respostas;
- timer por questão;
- pontuação;
- categorias;
- dificuldade;
- integração com IA para geração dinâmica de perguntas.

---

# 🎯 Objetivo do Projeto

Este projeto foi desenvolvido exclusivamente como ambiente de aprendizado e experimentação técnica.

Os principais objetivos foram:

- aprender arquitetura frontend moderna com Angular;
- entender o funcionamento de componentes standalone;
- praticar TypeScript;
- aprender fundamentos de Spring Boot;
- compreender o conceito de controllers, services e models;
- entender requisições HTTP REST;
- aprender integração entre frontend e backend;
- experimentar integração com APIs de IA generativa.

---

# 🧠 Conceitos Aprendidos

Durante o desenvolvimento do projeto foram estudados diversos conceitos importantes:

## Frontend

- Componentes standalone do Angular;
- Property Binding;
- Event Binding;
- Two-way Data Binding (`ngModel`);
- Diretivas modernas (`@if`, `@for`);
- RxJS;
- Estados reativos;
- Loading states;
- Timers;
- Comunicação HTTP com backend;
- Tailwind CSS;
- Responsividade básica.

---

## Backend

- Controllers REST;
- Services;
- Models;
- Injeção de dependência;
- Streams Java;
- Filtros com query params;
- Organização de arquitetura;
- Consumo de APIs externas;
- Configuração de variáveis de ambiente;
- Serialização JSON;
- Endpoints RESTful.

---

## IA / LLMs

- Conceito de LLM;
- Prompt Engineering;
- Integração com APIs de IA;
- Geração dinâmica de conteúdo;
- Estruturação de prompts;
- Consumo de respostas JSON geradas por IA.

---

# 🏗️ Arquitetura do Projeto

```text
bioQuizAI/
├── frontend/                  # Angular
│   └── src/app/
│       ├── quiz/              # componente principal do quiz
│       ├── models/            # interfaces TypeScript
│       └── services/          # comunicação HTTP
│
├── backend/                   # Spring Boot
│   └── src/main/java/
│       └── com/bioquiz/
│           ├── controller/    # endpoints REST
│           ├── model/         # models Java
│           └── service/       # integração IA
```

---

# 🚀 Etapas de Desenvolvimento

## 1) Criação do Frontend Angular

O projeto frontend foi iniciado utilizando Angular CLI com Tailwind CSS.

Comando utilizado:

```bash
ng new bioQuizAI
```

Durante a criação do projeto foram escolhidas as seguintes tecnologias:

- Tailwind CSS;
- Componentes standalone;
- Sem SSR.

---

## 2) Criação do Primeiro Componente

Foi criado o componente principal do quiz:

```bash
ng g c quiz
```

Neste momento foram aprendidos:

- estrutura de componentes Angular;
- decorator `@Component`;
- imports de componentes standalone;
- template HTML;
- arquivos CSS do componente.

---

## 3) Implementação do Quiz Base

A primeira versão do quiz possuía:

- perguntas fixas;
- múltiplas opções;
- validação de resposta;
- pontuação.

Conceitos estudados:

- arrays;
- renderização dinâmica;
- diretiva `@for`;
- event binding (`(click)`).

---

## 4) Implementação de Timer

Foi implementado um timer para limitar o tempo de resposta das perguntas.

Conceitos aprendidos:

- `setInterval`;
- gerenciamento de estado;
- atualização reativa da interface;
- ciclo de vida do Angular (`OnInit`).

---

## 5) Tema Dark com Tailwind CSS

A aplicação recebeu um visual dark mode utilizando Tailwind CSS.

Conceitos aprendidos:

- utility classes;
- estilização reativa;
- responsividade;
- layout flexbox.

---

## 6) Criação do Backend Spring Boot

O backend foi iniciado utilizando Spring Initializr.

Tecnologias escolhidas:

- Spring Web;
- Maven;
- Java 21;
- Packaging JAR.

---

## 7) Estruturação da Arquitetura Backend

O backend foi organizado em:

- `controller`;
- `model`;
- `service`.

Conceitos aprendidos:

- separação de responsabilidades;
- arquitetura em camadas;
- organização enterprise básica.

---

## 8) Criação do Primeiro Endpoint REST

Foi criado um endpoint para retornar perguntas:

```text
GET /questions
```

Conceitos aprendidos:

- `@RestController`;
- `@GetMapping`;
- serialização JSON;
- respostas HTTP.

---

## 9) Integração Frontend ↔ Backend

O Angular passou a consumir perguntas vindas do backend.

Conceitos aprendidos:

- HttpClient;
- observables;
- subscribe;
- comunicação full stack.

---

# 🔥 Exemplo de Fluxo

```text
Angular
   ↓ HTTP
Spring Boot
   ↓ JSON
Angular renderiza perguntas
```

---

## 10) Filtros por Categoria e Dificuldade

Foi implementado suporte para:

- categoria;
- dificuldade.

Exemplo:

```text
/questions?category=Genética&difficulty=Fácil
```

Conceitos aprendidos:

- `@RequestParam`;
- filtros dinâmicos;
- query params;
- streams Java.

---

## 11) Implementação de Loading State

Foi implementado um spinner animado durante carregamento das perguntas.

Conceitos aprendidos:

- estados assíncronos;
- loading UX;
- conditional rendering;
- `finalize()` do RxJS.

---

## 12) Integração com IA

Foi iniciada integração com modelos LLM para geração dinâmica de perguntas.

Arquitetura:

```text
Angular
   ↓
Spring Boot
   ↓
LLM API
```

Conceitos aprendidos:

- APIs externas;
- Bearer Token;
- Prompt Engineering;
- geração dinâmica de conteúdo.

---

# 🧬 Exemplo de Pergunta Gerada

```json
{
  "question": "Qual organela é responsável pela produção de ATP?",
  "options": ["Lisossomo", "Mitocôndria", "Ribossomo", "Complexo de Golgi"],
  "correctAnswer": "Mitocôndria"
}
```

---

# ⚙️ Instalação

## Pré-requisitos

- Node.js;
- Angular CLI;
- Java 21+;
- Maven.

---

# 🚀 Frontend

```bash
cd frontend

npm install

ng serve
```

Aplicação disponível em:

```text
http://localhost:4200
```

---

# 🚀 Backend

```bash
cd backend

./mvnw spring-boot:run
```

API disponível em:

```text
http://localhost:8080
```

---

# 🔐 Variáveis de Ambiente

Exemplo:

```properties
groq.api.key=SUA_API_KEY
```

---

# 🧠 Principais Aprendizados

Este projeto permitiu aprender:

- desenvolvimento full stack;
- Angular moderno;
- Spring Boot;
- arquitetura backend;
- APIs REST;
- integração com IA;
- consumo de APIs externas;
- organização de código;
- estados assíncronos;
- UX moderna;
- aplicações reativas.

---

# 🚀 Próximas Evoluções

Possíveis melhorias futuras:

- banco de dados;
- autenticação;
- ranking online;
- histórico de partidas;
- perguntas geradas 100% por IA;
- multiplayer;
- deploy cloud;
- Docker;
- CI/CD;
- cache de perguntas;
- sistema de usuários.

---

# 📌 Observação

Este projeto foi desenvolvido com foco educacional e de aprendizado prático de tecnologias modernas frontend e backend.
