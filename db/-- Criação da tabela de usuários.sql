-- Criação da tabela de usuários
CREATE TABLE usuarios (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    senha VARCHAR(255) NOT NULL,
    data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Criação da tabela de progresso
CREATE TABLE progresso (
    id SERIAL PRIMARY KEY,
    usuario_id INT REFERENCES usuarios(id) ON DELETE CASCADE,
    disciplina VARCHAR(100) NOT NULL,
    progresso DECIMAL(5, 2) NOT NULL CHECK (progresso >= 0 AND progresso <= 100),
    data_atualizacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);