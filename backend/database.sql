USE VerdNovo
GO

-- Usuários
CREATE TABLE Usuario
( 
   id            INT			IDENTITY,
   nome          VARCHAR(100)	NOT NULL,
   email         VARCHAR(100)	UNIQUE NOT NULL,
   senha         VARCHAR(100)	NOT NULL,
   nivelAcesso   VARCHAR(10)    NULL, -- ADMIN ou USER ou VENDEDOR
   foto			 VARBINARY(MAX) NULL,
   dataCadastro	 DATETIME	NOT NULL,
   statusUsuario VARCHAR(20)    NOT NULL, -- ATIVO ou INATIVO ou TROCAR_SENHA
 
   PRIMARY KEY (id)
)
 
CREATE TABLE Categoria 
( 
	id					INT				IDENTITY,
	nome				VARCHAR(50)		NOT NULL,
	descricao			VARCHAR(200)	NOT NULL,
	statusCategoria		VARCHAR(20)		NOT NULL, -- ATIVO ou INATIVO
 
	PRIMARY KEY (id)
)
 
CREATE TABLE Ponto -- de acordo com nível de acesso da tabela Usuario
( 
	id					INT				IDENTITY,
	nome				VARCHAR(50)		NOT NULL,
	cep					CHAR(8)			NOT NULL,
	numero				VARCHAR(10)		NOT NULL,
	complemento			VARCHAR(50)			NULL,
	telefone			VARCHAR(20)			NULL,
	email				VARCHAR(50)			NULL,
	horaFuncionamento	VARCHAR(200)	NOT NULL,
	material			VARCHAR(400)	NOT NULL,
	categoria_id		INT				NOT NULL,
	usuario_id			INT				NOT NULL,
	dataCadastro		DATETIME	NOT NULL,
	statusPonto			VARCHAR(20)		NOT NULL, -- ATIVO ou INATIVO
 
	PRIMARY KEY (id),
	FOREIGN KEY (categoria_id) REFERENCES Categoria (id),
	FOREIGN KEY (usuario_id) REFERENCES Usuario (id)
)

-- Inserir dados iniciais
INSERT INTO Categoria (nome, descricao, statusCategoria) VALUES 
('Reciclagem', 'Pontos de coleta para materiais recicláveis', 'ATIVO'),
('Eletrônicos', 'Pontos de coleta para lixo eletrônico', 'ATIVO'),
('Orgânicos', 'Pontos de coleta para resíduos orgânicos', 'ATIVO')

-- Usuário admin padrão (senha: admin123)
-- Hash BCrypt para 'admin123': $2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi
INSERT INTO Usuario (nome, email, senha, nivelAcesso, dataCadastro, statusUsuario) VALUES 
('Administrador VerDenovo', 'admin@verdenovo.com', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'ADMIN', GETDATE(), 'ATIVO')