const express = require("express");
const app = express();
const mysql = require("mysql2");
const cors = require("cors");

const db = mysql.createPool({
    host: "127.0.0.1",
    user: "root",
    port: 3306,
    password: "",
    database: "crudealunos"
});

app.use(cors({
    origin: "http://localhost:3000"
}));

app.use(express.json());

// Listar Alunos
app.get("/listar", (req, res) => {
    const SQL = "SELECT * FROM alunos";
    db.query(SQL, (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: "Erro ao listar alunos" });
        } else {
            res.json(result);
        }
    });
});

// Cadastrar Aluno
app.post("/register", (req, res) => {
    const { nome, idade } = req.body;
    const SQL = "INSERT INTO alunos(nome, idade) VALUES (?, ?)";
    db.query(SQL, [nome, idade], (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: "Erro ao cadastrar aluno" });
        } else {
            res.status(201).json({ message: "Aluno cadastrado com sucesso", id: result.insertId });
        }
    });
});

// Editar Aluno
app.put("/editar/:id", (req, res) => {
    const alunoId = req.params.id;
    const { nome, idade } = req.body;
    const SQL = "UPDATE alunos SET nome = ?, idade = ? WHERE id = ?";
    db.query(SQL, [nome, idade, alunoId], (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: "Erro ao editar aluno" });
        } else {
            res.json({ message: "Aluno editado com sucesso" });
        }
    });
});

// Excluir Aluno
app.delete("/excluir/:id", (req, res) => {
    const alunoId = req.params.id;
    const SQL = "DELETE FROM alunos WHERE id = ?";
    db.query(SQL, [alunoId], (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: "Erro ao excluir aluno" });
        } else {
            res.json({ message: "Aluno excluído com sucesso" });
        }
    });
});

app.listen(3001, () => {
    console.log("Servidor rodando na porta 3001");
});