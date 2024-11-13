const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { Pool } = require('pg');
const router = express.Router();
require('dotenv').config();

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASS,
    port: process.env.DB_PORT,
});

router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const result = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
    const user = result.rows[0];

    if (user && await bcrypt.compare(password, user.password)) {
      const token = jwt.sign({ id: user.id, username: user.username }, 'seu_segredo_jwt', { expiresIn: '1h' });
      res.json({ success: true, token });
    } else {
      res.status(401).json({ success: false, message: 'Usuário ou senha incorretos' });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: 'Erro no servidor' });
  }
});

module.exports = router;
