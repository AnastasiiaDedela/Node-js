import express from 'express';
import userController from './controllers/usersController.js';

const app = express();
const PORT = 3000;

app.use(express.json());

app.use('/users', userController);

app.listen(PORT, () => {
  console.log(`Server: http://localhost:${PORT}`);
});
