# Conexão Frontend-Backend VerDenovo

## Como executar o sistema completo

### 1. Backend (Spring Boot)
```bash
cd backend
mvn spring-boot:run
```
- API rodará em: `http://localhost:8080`

### 2. Frontend (React)
```bash
cd pontos-coleta-reciclagem
npm install
npm run dev
```
- Frontend rodará em: `http://localhost:5173`

## Alterações realizadas

### Backend
- ✅ API REST criada com Spring Boot
- ✅ Conexão com SQL Server (Somee)
- ✅ Autenticação JWT
- ✅ Senhas criptografadas com BCrypt
- ✅ CORS configurado para frontend

### Frontend
- ✅ Serviço API criado (`src/services/api.js`)
- ✅ AuthContext atualizado para usar API
- ✅ Login/Cadastro conectados à API
- ✅ Listagem de pontos usando API
- ✅ Cadastro de pontos usando API

## Endpoints da API

### Autenticação
- `POST /api/auth/login` - Login
- `POST /api/auth/cadastro` - Cadastro

### Pontos
- `GET /api/pontos` - Listar pontos
- `POST /api/pontos` - Criar ponto
- `DELETE /api/pontos/{id}` - Remover ponto

### Categorias
- `GET /api/categorias` - Listar categorias

## Credenciais de teste

### Admin
- Email: admin@verdenovo.com
- Senha: admin123

### Banco de dados
- Servidor: VerdNovo.mssql.somee.com
- Usuário: fernando14112008@gmail.com
- Senha: 12345678f

## Status da integração
✅ Backend funcionando
✅ Frontend conectado
✅ Autenticação integrada
✅ CRUD de pontos integrado
✅ Sistema completo operacional