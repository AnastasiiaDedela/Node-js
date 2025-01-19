import express from 'express';
import { readUsersFromFile, writeUsersToFile } from '../services/userService.js';

const router = express.Router();

router.get('/', (req, res) => {
  const users = readUsersFromFile();
  res.json(users);
});


router.post('/', (req, res) => {
  const { name } = req.body;
  if (!name) {
    return res.status(400).send('name is obligated');
  }

  const users = readUsersFromFile();
  const newUser = { id: users.length ? users[users.length - 1].id + 1 : 1, name };
  users.push(newUser);
  writeUsersToFile(users);

  res.status(201).send(`user ${name} created`);
});

export default router;
