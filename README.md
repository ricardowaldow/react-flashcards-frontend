# 🎴 Flashcards App - Frontend

Aplicação web para criação e estudo de flashcards, desenvolvida com React e Bootstrap.

![React](https://img.shields.io/badge/React-18.x-blue)
![Bootstrap](https://img.shields.io/badge/Bootstrap-5.x-purple)
![License](https://img.shields.io/badge/license-MIT-green)

## 📋 Sobre o Projeto

Este é o frontend de um sistema de flashcards que permite criar decks de estudo personalizados, adicionar cards com frente e verso, e estudar utilizando um sistema de repetição espaçada simples.

### ✨ Funcionalidades

- ✅ Criar e gerenciar múltiplos decks de estudo
- ✅ Adicionar, editar e excluir cards
- ✅ Modo de estudo com cards interativos (flip animation)
- ✅ Sistema de marcação "Sei/Não Sei"
- ✅ Barra de progresso durante o estudo
- ✅ Interface responsiva e moderna
- ✅ Design intuitivo e acessível

## 🚀 Começando

### Pré-requisitos

Antes de começar, certifique-se de ter instalado:

- [Node.js](https://nodejs.org/) (versão 14 ou superior)
- [npm](https://www.npmjs.com/) ou [yarn](https://yarnpkg.com/)

### 📦 Instalação

1. Instale as dependências:
```bash
npm install
# ou
yarn install
```

2. Configure a URL da API:

Edite o arquivo `src/services/api.js` e ajuste a URL da API se necessário:
```javascript
const API_URL = 'http://localhost:8000/api';
```

3. Inicie o servidor de desenvolvimento:
```bash
npm start
# ou
yarn start
```

4. Abra [http://localhost:3000](http://localhost:3000) no seu navegador.

## 🏗️ Estrutura do Projeto

```
src/
├── components/
│   ├── DecksView.jsx          # Lista de decks
│   ├── DeckCard.jsx           # Card de deck individual
│   ├── EditDeckView.jsx       # Edição de deck
│   ├── CardItem.jsx           # Item de card na edição
│   ├── StudyView.jsx          # Modo de estudo
│   ├── FlipCard.jsx           # Card com animação flip
│   └── CompletionView.jsx     # Tela de conclusão
├── services/
│   └── api.js                 # Serviço de comunicação com API
├── App.jsx                    # Componente principal
└── index.js                   # Ponto de entrada
```

## 🔌 Integração com Backend

Este frontend requer uma API REST em funcionamento. A API pode ser encontrada em: https://github.com/ricardowaldow/django-flashcards-api

