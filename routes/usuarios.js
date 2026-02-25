const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");

const { neon } = require("@neondatabase/serverless");
const sql = neon(process.env.DATABASE_URL);

// lista usuários (protected)
router.get("/", authMiddleware, async (req, res) => {
  const rows = await sql`SELECT id, nome, email, data_criacao FROM usuarios`;
  res.json(rows);
});

// buscar um usuário
router.get("/:id", authMiddleware, async (req, res) => {
  const { id } = req.params;
  const [row] = await sql`SELECT id, nome, email FROM usuarios WHERE id = ${id}`;
  res.json(row);
});

// atualizar usuário
router.put("/:id", authMiddleware, async (req, res) => {
  const { id } = req.params;
  const { nome, email } = req.body;
  await sql`
    UPDATE usuarios SET nome = ${nome}, email = ${email}
    WHERE id = ${id}
  `;
  res.json({ message: "Atualizado" });
});

// deletar usuário
router.delete("/:id", authMiddleware, async (req, res) => {
  const { id } = req.params;
  await sql`DELETE FROM usuarios WHERE id = ${id}`;
  res.json({ message: "Deletado" });
});

module.exports = router;