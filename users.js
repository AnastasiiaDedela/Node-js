import express from 'express';

const app = express()

//middleware
app.use((req,res,next)=>{
    console.log(`recieved request:  ${req.method} ${req.url}`)
    next()
})

app.use(express.json())


//marshutizatory
const userRouter = express.Router();

//controllers

const getAllUsers = (req, res) => {
    const users = [
      { id: 1, name: 'Alice' },
      { id: 2, name: 'Bob' },
      { id: 3, name: 'Charlie' },
    ];
    res.json(users);
  };


const createUser = (req, res) => {
    const { name } = req.body;
    if (!name) {
      return res.status(400).send('Имя пользователя обязательно');
    }
    res.status(201).send(`Пользователь ${name} создан`);
  };

//connect marshrutors
userRouter.get('/', getAllUsers);
userRouter.post('/', createUser);

//marshrutors
app.use('/users', userRouter);

const PORT = 3040;
app.listen(PORT, () => {
  console.log(`Server launched: http://localhost:${PORT}`);
});