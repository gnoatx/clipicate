const express = require('express');
const bodyParser = require('body-parser');
const authRoutes = require('./auth');

const app = express();
app.use(bodyParser.json());
app.use('/api', authRoutes);

const PORT = process.env.PORT || 8081;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});