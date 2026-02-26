const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const router = express.Router();

const { neon } = require("@neondatabase/serverless");
const sql = neon(process.env.DATABASE_URL);

router.post("/register", async (req, res) => {
  const { nome, email, senha } = req.body;

  const hashed = await bcrypt.hash(senha, 10);

  try {
    await sql`
      INSERT INTO usuarios (nome, email, senha)
      VALUES (${nome}, ${email}, ${hashed})
    `;
    res.json({ message: "Usuário criado" });
  } catch (err) {
    res.status(400).json({ error: "Erro ao cadastrar" });
  }
});

router.post("/login", async (req, res) => {
  const { email, senha } = req.body;
  const result = await sql`
     SELECT * FROM usuarios WHERE email = ${email}
  `;

  const user = result[0];
  if (!user) return res.status(400).json({ error: "Usuário não encontrado" });

  const match = await bcrypt.compare(senha, user.senha);
  //const match = senha === user.senha;
  if (!match) 
    return res.status(401).json({ error: "Senha incorreta"  });

  // cria o token JWT
  const token = jwt.sign(
    { id: user.id, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );
  res.cookie("token", token, { httpOnly: true });
  res.json({ token });
});

router.post("/logout", (req, res) => {

  res.clearCookie("token");
  res.json({ message: "Logout bem-sucedido" });
});

module.exports = router;