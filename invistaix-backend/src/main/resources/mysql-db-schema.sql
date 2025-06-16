-- Criação da tabela ADMINISTRADORES
CREATE TABLE IF NOT EXISTS ADMINISTRADORES (
    administrador_id INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    senha VARCHAR(60) NOT NULL
);

-- Criação da tabela GESTORES
CREATE TABLE IF NOT EXISTS GESTORES (
    gestor_id INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    telefone VARCHAR(11) NOT NULL UNIQUE,
    CPF VARCHAR(11) NOT NULL UNIQUE,
    senha VARCHAR(60) NOT NULL
);

-- Criação da tabela PROPRIETARIOS
CREATE TABLE IF NOT EXISTS PROPRIETARIOS (
    proprietario_id INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    telefone VARCHAR(11) NOT NULL UNIQUE,
    documento VARCHAR(14) NOT NULL UNIQUE, -- CPF (11 dígitos) ou CNPJ (14 dígitos)
    tipo_documento ENUM('CPF', 'CNPJ') NOT NULL,
    senha VARCHAR(60) NOT NULL

    -- Constraint para garantir que o tamanho do documento bate com o tipo
    CONSTRAINT chk_documento_valido CHECK (
        (tipo_documento = 'CPF' AND LENGTH(documento) = 11) OR
        (tipo_documento = 'CNPJ' AND LENGTH(documento) = 14)
    )
);

-- Criação da tabela ENDERECOS
CREATE TABLE IF NOT EXISTS ENDERECOS (
    endereco_id INT PRIMARY KEY AUTO_INCREMENT,
    rua VARCHAR(50) NOT NULL,
    numero VARCHAR(10) NOT NULL,
    bairro VARCHAR(50) NOT NULL,
    cidade VARCHAR(50) NOT NULL,
    estado VARCHAR(50) NOT NULL,
    CEP VARCHAR(8) NOT NULL,
    latitude DECIMAL(10, 8), -- Para integração com API de mapas
    longitude DECIMAL(11, 8) -- Para integração com API de mapas
);

-- Criação da tabela IMOVEIS
CREATE TABLE IF NOT EXISTS IMOVEIS (
    imovel_id INT PRIMARY KEY AUTO_INCREMENT,
    nome_imovel VARCHAR(100) NOT NULL, -- Nome ou identificação do imóvel
    tipo_imovel ENUM('APARTAMENTO', 'CASA', 'CASA_CONDOMINIO', 'COBERTURA', 'KITNET', 'STUDIO', 'SOBRADO', 'TERRENO', 'CHACARA', 'SITIO', 'FAZENDA', 'SALA_COMERCIAL', 'LOJA_COMERCIAL', 'GALPAO_COMERCIAL', 'PREDIO_COMERCIAL', 'GALPAO_INDUSTRIAL', 'TERRENO_INDUSTRIAL') NOT NULL,
    endereco_id INT NOT NULL,
    proprietario_id INT,
    gestor_id INT,
    -- Dados da Matricula
    valor_matricula DECIMAL(10, 2) NOT NULL, -- Valor da matrícula
    data_registro_matricula DATE NOT NULL, -- Data de registro da matrícula
    -- Valores do Imóvel
    valor_aluguel_atual DECIMAL(10, 2), -- Renomeado de valor_aluguel_estimado
    valor_venda_estimado DECIMAL(10, 2), -- Valor estimado de venda
    valor_iptu DECIMAL(10, 2), -- Valor atual do IPTU
    -- Opcional
    foto_imovel MEDIUMBLOB, -- Dados binários da foto do imóvel
    area DECIMAL(10, 2), -- Característica opcional: área
    num_quartos INT, -- Característica opcional: número de quartos
    numero_apartamentos INT, -- Opcional, para prédios

    FOREIGN KEY (endereco_id) REFERENCES ENDERECOS(endereco_id),
    FOREIGN KEY (proprietario_id) REFERENCES PROPRIETARIOS(proprietario_id),
    FOREIGN KEY (gestor_id) REFERENCES GESTORES(gestor_id) -- Nova chave estrangeira
);

-- Criação da tabela AVALIACOES para histórico de avaliações
CREATE TABLE IF NOT EXISTS AVALIACOES (
    avaliacao_id INT PRIMARY KEY AUTO_INCREMENT,
    imovel_id INT,
    valor_avaliacao DECIMAL(10, 2) NOT NULL,
    data_avaliacao DATE NOT NULL,
    FOREIGN KEY (imovel_id) REFERENCES IMOVEIS(imovel_id)
);

-- Criação da tabela RENDIMENTOS
CREATE TABLE IF NOT EXISTS RENDIMENTOS (
    rendimento_id INT PRIMARY KEY AUTO_INCREMENT,
    valor_rendimento DECIMAL(10, 2) NOT NULL,
    data_rendimento DATE NOT NULL,
    descricao VARCHAR(255)
);

-- Criação da tabela DESPESAS
CREATE TABLE IF NOT EXISTS DESPESAS (
    despesa_id INT PRIMARY KEY AUTO_INCREMENT,
    valor_despesa DECIMAL(10, 2) NOT NULL,
    data_despesa DATE NOT NULL,
    descricao VARCHAR(255)
);

-- Criação da tabela IMPOSTOS
CREATE TABLE IF NOT EXISTS IMPOSTOS (
    imposto_id INT PRIMARY KEY AUTO_INCREMENT,
    valor_imposto DECIMAL(10, 2) NOT NULL,
    data_imposto DATE NOT NULL,
    descricao VARCHAR(255)
);

-- Criação da tabela de junção IMOVEL_DESPESA
CREATE TABLE IF NOT EXISTS IMOVEL_DESPESA (
    imovel_id INT,
    despesa_id INT,
    PRIMARY KEY (imovel_id, despesa_id),
    FOREIGN KEY (imovel_id) REFERENCES IMOVEIS(imovel_id),
    FOREIGN KEY (despesa_id) REFERENCES DESPESAS(despesa_id)
);

-- Criação da tabela de junção IMOVEL_RENDIMENTO
CREATE TABLE IF NOT EXISTS IMOVEL_RENDIMENTO (
    imovel_id INT,
    rendimento_id INT,
    PRIMARY KEY (imovel_id, rendimento_id),
    FOREIGN KEY (imovel_id) REFERENCES IMOVEIS(imovel_id),
    FOREIGN KEY (rendimento_id) REFERENCES RENDIMENTOS(rendimento_id)
);

-- Criação da tabela de junção IMOVEL_IMPOSTO
CREATE TABLE IF NOT EXISTS IMOVEL_IMPOSTO (
    imovel_id INT,
    imposto_id INT,
    PRIMARY KEY (imovel_id, imposto_id),
    FOREIGN KEY (imovel_id) REFERENCES IMOVEIS(imovel_id),
    FOREIGN KEY (imposto_id) REFERENCES IMPOSTOS(imposto_id)
);