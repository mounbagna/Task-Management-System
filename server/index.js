const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const User = require('./model/User');
const Token = require('./model/token')
const sendEmail = require('./sendEmail')
const crypto = require('crypto')
require('dotenv').config()

const app = express();
app.use(express.json());
app.use(cors());

mongoose
  .connect('mongodb://127.0.0.1:27017/userDB')
  .then(() => {console.log('UserDB connected successfully');})
  .catch((err) => {console.error(err);});

app.listen(8000, () => {console.log('Listening on port 8000');});

//USER ROUTES

//the purpose of this middleware is to get the token send to the user then authenticate the user
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
      return res.sendStatus(401);
  }
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
      if (err) {
          return res.sendStatus(403);
      }
      req.user = user;
      next();
  });
}

// Route to get all authentified users
app.get('/', authenticateToken, async (req, res) => {
  try {
      const users = await User.find();
      res.json(users.filter(user => user.name === req.user.name));
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
});

// User login route
app.post('/login', async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const passwordMatch = await bcrypt.compare(req.body.password, user.password);

    if (passwordMatch) {
      const accessToken = jwt.sign({ id: user._id, name: user.name }, process.env.ACCESS_TOKEN_SECRET);
      res.status(200).json({ message: 'Logged in successfully', accessToken: accessToken });
    } else {
      res.status(401).json({ message: 'Incorrect password' });
      if(!user.verified){
        let token = await Token.findOne({userId: user._id})
        if(!token){
          token = await new Token({
            userId:user._id,
            token:crypto.randomBytes(32).toString("hex")
          }).save();
          const url = `${process.env.BASE_URL}users/${user._id}/verify/${token.token}`;
          await sendEmail(user.email,"verify Email",url)
          res.status(201).json({message:"Verify your email"});
        }
        return res.status(400).send({message:"An email send to your account please check"})
      }
    }
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});


// User registration route
app.post('/register', async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    const user = new User({
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
    });

    let users = await User.findOne({email:req.body.email});
    if(users)
      return res.status(409).send({message: "User with given email already exist"})


    const newUser = await user.save();
    const token = await new Token({
      userId:user._id,
      token:crypto.randomBytes(32).toString("hex")
    }).save();
    const url = `${process.env.BASE_URL}users/${user._id}/verify/${token.token}`;
    await sendEmail(user.email,"verify Email",url)
    res.status(201).json({message:"Verify your email"});
  } 
  catch (error) {res.status(400).json({ message: error.message });}
});

app.get("/:id/verify/:token",async(res,req)=>{
  try{
    const user = await User.findOne({_id: req.params.id})
    if(!user) return res.status(400).send({message: "invalid link"})

    const token = await Token.findOne({
      userId: user._id,
      token: req.params.token
    });
    if(!token) return res.status(400).send({message: "invalid link"})


    await User.updateOne({_id:user._id,verified:true})
    await token.remove()
    res.status(200).send({message:"email verified"})
  }
  catch(error){
    res.status(500).send({message: "internal server error"})
  }
})

//TASKS MANAGEMENT

const Todo = require('./model/Todo');

//get all tasks
app.get('/todos', async (req, res) => {
  const todos = await Todo.find();
  res.json(todos);
});

//create new task
app.post('/todo/new', (req, res) => {
  const todo = new Todo({
    title: req.body.title,
    description:req.body.description,
    priority:req.body.priority,
    dueDate:req.body.dueDate });
  todo.save();
  res.json(todo);
});

//delete task
app.delete('/todo/delete/:id', async (req, res) => {
	const result = await Todo.findByIdAndDelete(req.params.id);
  res.json({ result });
});



//complete a task
app.get('/todo/complete/:id', async (req, res) => {
    const todo = await Todo.findById(req.params.id);
	todo.complete = !todo.complete;
	todo.save();
	res.json(todo);
});

// Update a task
app.put('/todo/update/:title', async (req, res) => {
  try {
    const todo = await Todo.findOne({ title: req.params.title });

    if (!todo) {
      return res.status(404).json({ error: 'Task not found' });
    }

    todo.title = req.body.title;
    todo.description = req.body.description;
    todo.priority = req.body.priority;
    todo.dueDate = req.body.dueDate;

    await todo.save();

    res.json(todo);
  } catch (error) {
    console.error("Error updating todo:", error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

//ADMIN ROUTES

const Admin = require('./model/Admin')

//Admin login route
app.post('/adminlogin', async (req, res) => {
  try {
    const admin = await Admin.findOne({ email: req.body.email });

    if (!admin) {
      return res.status(404).json({ message: 'Admin not found' });
    }
    const passwordMatch = await bcrypt.compare(req.body.password, admin.password);
    if (passwordMatch) {
      res.status(200).json({ message: 'Logged in successfully' });
    } else {
      res.status(401).json({ message: 'Incorrect password' });
    }
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Admin registration route
app.post('/adminregister', async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    const admin = new Admin({
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
    });

    const newAdmin = await admin.save();
    res.status(201).json(newAdmin);
  } 
  catch (error) {res.status(400).json({ message: error.message });}
});