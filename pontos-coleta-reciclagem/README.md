# Sistema de Pontos de Coleta de Reciclagem

Sistema desenvolvido em ReactJS com Vite para gerenciar pontos de coleta de materiais recicláveis.

## Tecnologias Utilizadas

- **ReactJS** - Biblioteca para construção da interface
- **Vite** - Build tool e servidor de desenvolvimento
- **React Router Dom** - Roteamento entre páginas
- **Bootstrap** - Framework CSS para estilização
- **React Hook Form** - Gerenciamento de formulários
- **Axios** - Cliente HTTP para requisições à API

## Funcionalidades

- ✅ Listagem de pontos de coleta
- ✅ Cadastro de novos pontos
- ✅ Formulário com validação
- ✅ Interface responsiva com Bootstrap
- ✅ Navegação entre páginas

## Como Executar

1. Entrar na pasta:
```bash
cd pontos-coleta-reciclagem
```


2. Instalar dependências:
```bash
npm install
```
3. Executar em modo desenvolvimento:
```bash
npm run dev
```

3. Acessar: http://localhost:5173

## Estrutura do Projeto

```
src/
├── components/     # Componentes reutilizáveis
├── pages/         # Páginas da aplicação
├── services/      # Serviços de API
├── App.jsx        # Componente principal
└── main.jsx       # Ponto de entrada
```

## API Backend

O projeto está configurado para consumir uma API REST em `http://localhost:3001/api`.
Endpoints esperados:
- GET /pontos - Listar pontos
- POST /pontos - Criar ponto
- PUT /pontos/:id - Atualizar ponto
- DELETE /pontos/:id - Deletar ponto