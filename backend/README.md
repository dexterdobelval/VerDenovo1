# VerDenovo Backend - Spring Boot

Backend da aplicação VerDenovo desenvolvido em Spring Boot com SQL Server.

## Configuração

1. Execute o script `database.sql` no banco SQL Server (Somee)
2. Configure as credenciais no `application.properties` (já configurado)
3. Execute: `mvn spring-boot:run`

## Endpoints

### Autenticação
- POST `/api/auth/login` - Login
- POST `/api/auth/cadastro` - Cadastro

### Pontos de Coleta
- GET `/api/pontos` - Listar pontos
- POST `/api/pontos` - Criar ponto
- DELETE `/api/pontos/{id}` - Remover ponto

### Categorias
- GET `/api/categorias` - Listar categorias

## Banco de Dados
- Servidor: VerdNovo.mssql.somee.com
- Usuário: fernando14112008@gmail.com
- Senha: 12345678f

## Usuário Admin Padrão
- Email: admin@verdenovo.com
- Senha: admin123