import express from 'express';
import fs from 'fs';
import path from 'path';
const app = express();
import { fileURLToPath } from 'url';

app.use(express.json());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dataFilePath = path.join(__dirname, 'users.json');

if (!fs.existsSync(dataFilePath)) {
    fs.writeFileSync(dataFilePath, '[]');
}

const readUsersFromFile = () => {
    const data = fs.readFileSync(dataFilePath, 'utf-8');
    return JSON.parse(data);
};

const writeUsersToFile = (users) => {
    fs.writeFileSync(dataFilePath, JSON.stringify(users, null, 2));
}

app.get('/users', (req, res) => {
    const users = readUsersFromFile();
    res.json(users);
  });
  
app.post('/users', (req, res) => {
    const { name } = req.body;
    if (!name) {
      return res.status(400).send('Имя пользователя обязательно');
    }
  
    const users = readUsersFromFile();
    const newUser = { id: users.length ? users[users.length - 1].id + 1 : 1, name };
    users.push(newUser);
    writeUsersToFile(users);
  
    res.status(201).send(`Пользователь ${name} создан`);
  });


  const PORT = 3000;
  app.listen(PORT, () => {
    console.log(`Сервер запущен на http://localhost:${PORT}`);
  });