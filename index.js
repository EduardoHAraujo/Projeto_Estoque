// index.js

const express = require('express');
const sqlite3 = require('sqlite3').verbose();

const app = express();
const PORT = 3000;

// Abrir conexão com o banco de dados (ou criar um novo se não existir)
const db = new sqlite3.Database('estoque.db', (err) => {
  if (err) {
    console.error(err.message);
  } else {
    console.log('Conectado ao banco de dados SQLite');
    // Criar a tabela de estoque se não existir
    db.run('CREATE TABLE IF NOT EXISTS estoque (id INTEGER PRIMARY KEY AUTOINCREMENT, nome TEXT)');
  }
});

// Middleware para o body-parser do Express
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Rota para listar os itens do estoque
app.get('/estoque', (req, res) => {
  db.all('SELECT * FROM estoque', (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(rows);
  });
});

// Rota para adicionar um item ao estoque
app.post('/estoque', (req, res) => {
  const { nome } = req.body;
  if (!nome) {
    res.status(400).json({ error: 'O nome do item é obrigatório.' });
    return;
  }
  db.run('INSERT INTO estoque (nome) VALUES (?)', [nome], function (err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({
      message: 'Item adicionado ao estoque.',
      itemId: this.lastID,
      nome: nome
    });
  });
});

// Iniciar o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:3000`);
});
