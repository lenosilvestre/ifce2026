const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");

const { neon } = require("@neondatabase/serverless");
const sql = neon(process.env.DATABASE_URL);

router.get("/", authMiddleware, async (req, res) => {
  const userId = req.user.id;
  const result = await sql`
    SELECT progresso FROM progresso WHERE usuario_id = ${userId}
  `; 
          
  res.json({ message: "Atualizado" },result);
});



module.exports = router;