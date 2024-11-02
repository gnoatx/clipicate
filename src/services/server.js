const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { Pool } = require('pg');

const app = express();
const port = 8081;

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'gif_database',
  password: '123456',
  port: 5432,
});

app.use(cors());
app.use(bodyParser.json());

app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const result = await pool.query('SELECT * FROM users WHERE username = $1 AND password = $2', [username, password]);
    if (result.rows.length > 0) {
      res.json({ success: true });
    } else {
      res.json({ success: false, message: 'Credenciais inválidas' });
    }
  } catch (err) {
    console.error('Erro ao conectar ao banco de dados:', err);
    res.status(500).send('Server error');
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});