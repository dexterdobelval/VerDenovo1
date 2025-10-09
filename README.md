# Sistema de Pontos de Coleta de Reciclagem

Sistema desenvolvido em ReactJS com Vite para gerenciar pontos de coleta de materiais recicláveis.

## Tecnologias Utilizadas

### Frontend
- **ReactJS** - Biblioteca para construção da interface
- **Vite** - Build tool e servidor de desenvolvimento
- **React Router Dom** - Roteamento entre páginas
- **Bootstrap** - Framework CSS para estilização
- **React Hook Form** - Gerenciamento de formulários

### Backend
- **Spring Boot** - Framework Java para API REST
- **Spring Security** - Autenticação e autorização
- **JWT** - Tokens de autenticação
- **JPA/Hibernate** - ORM para banco de dados
- **SQL Server** - Banco de dados (Somee Cloud)
- **BCrypt** - Criptografia de senhas

## Funcionalidades

- ✅ Listagem de pontos de coleta
- ✅ Cadastro de novos pontos
- ✅ Formulário com validação
- ✅ Interface responsiva com Bootstrap
- ✅ Navegação entre páginas

## Como Executar

### Backend (Spring Boot)
1. Entrar na pasta do backend:
```bash
cd backend
```

2. Executar o backend:
```bash
.\run.bat
```

3. Backend estará rodando em: http://localhost:3000

### Frontend (React)
1. Entrar na pasta do frontend:
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

4. Acessar: http://localhost:5173

## Estrutura do Projeto

```
src/
├── components/     # Componentes reutilizáveis
├── pages/         # Páginas da aplicação
├── services/      # Serviços de API
├── App.jsx        # Componente principal
└── main.jsx       # Ponto de entrada
```

## Banco de Dados

O projeto utiliza SQL Server hospedado na Somee Cloud:
- **Servidor**: VerdNovo.mssql.somee.com
- **Banco**: VerdNovo
- **Tabelas**: Usuario, Categoria, Ponto
- **Autenticação**: JWT com BCrypt