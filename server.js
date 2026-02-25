require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname)));

const authRoutes = require("./routes/auth");
const usuariosRoutes = require("./routes/usuarios");

// rotas públicas
app.use("/auth", authRoutes);

// rotas privadas
app.use("/usuarios", usuariosRoutes);

app.use("/auth", require("./routes/auth"));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor na porta ${PORT}`));





/* 
// Carrega variáveis de ambiente
require("dotenv").config();

// Importa Express
const express = require("express");
const app = express();
const path = require("path");

// Importa driver Neon
const { neon } = require("@neondatabase/serverless");

// Cria a conexão com o banco
const sql = neon(process.env.DATABASE_URL);

// Porta do servidor
const PORT = process.env.PORT || 3000;


// Serve arquivos estáticos (HTML, CSS, JS, imagens) a partir do diretório do projeto
app.use(express.static(path.join(__dirname)));

// Rota principal: envia index.html
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

// Rotas simples para páginas HTML (sem extensão na URL)
const pages = [
  "biologia",
  "discursiva",
  "informatica",
  "legislacao",
  "letras",
  "pedagogico",
  "portugues_geral",
  "recuperar",
  "resetar_senha",
  "login",
  "index",
  "signup",
];

pages.forEach((p) => {
  app.get(`/${p}`, (req, res) => {
    res.sendFile(path.join(__dirname, `${p}.html`));
  });
});

// Rota de exemplo para testar consulta ao banco
app.get("/test-db", async (req, res) => {
  try {
    // Exemplo de query simples (PostgreSQL)
    const [result] = await sql`SELECT NOW() AS now`;
    res.json({ databaseTime: result.now });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro ao consultar o banco" });
  }
});

// Inicia o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});


// Rota de autenticação: login
app.post('/login', async (req, res) => {
  const { email, password } = req.body || {};
  if (!email || !password) {
    return res.status(400).json({ message: 'Email e senha são obrigatórios' });
  }

  try {
    const users = await sql`SELECT id, nome, email, senha FROM usuarios WHERE email = ${email}`;
    const user = users && users[0];
    if (!user) return res.status(401).json({ message: 'Credenciais inválidas' });

    const match = await bcrypt.compare(password, user.senha);
    if (!match) return res.status(401).json({ message: 'Credenciais inválidas' });

    const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET || 'dev-secret', { expiresIn: '1h' });

    res.json({ token, user: { id: user.id, nome: user.nome, email: user.email } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erro no servidor' });
  }
});
 */