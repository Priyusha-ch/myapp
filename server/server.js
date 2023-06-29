const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken'); 
const cookieParser = require('cookie-parser');
const {AuthenticateToken} = require('./JwtAuth.js')

const app = express();
app.use(cookieParser());
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://127.0.0.1:27017/contactdb', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const contactSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
  });

const userSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String,
  });

const Contact = mongoose.model('Contact', contactSchema);
const User = mongoose.model('User', userSchema);

app.post('/api/contacts', async (req, res) => {
    try {
      const { name, email, password } = req.body;
      const contact = new Contact({ name, email, password });
      await contact.save();
      res.status(201).json(contact);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to add contact' });
    }
});


app.post('/api/signup', async (req, res) => {
    try {
      const { username, email, password } = req.body;
      console.log(req);
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ error: 'Email already registered' });
      }
  
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = new User({ username, email, password: hashedPassword });
      await user.save();
  
      res.status(201).json({ message: 'Registration successful' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to register user' });
    }
});
  
  


app.post('/api/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
  if (!user) {
    return res.status(401).json({ error: 'Invalid email or password' });
  }
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return res.status(401).json({ error: 'Invalid email or password' });
  }
  const token = jwt.sign({ userId: user._id }, 'your-secret-key');
  res.cookie("Authentication", token,{
      httpOnly: true
  });
  res.status(200).json({ message: 'Login successful', token });
} catch (error) {
  console.error(error);
  res.status(500).json({ error: 'Failed to perform login' });
  }
});

app.delete('/api/contacts/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await collection.deleteOne({ id: id  });
    res.json(result.deletedCount);
  } catch (error) {
    console.error('Failed to delete contact:', error);
    res.status(500).json({ error: 'Failed to delete contact' });
  }
});


// app.post('/api/add', AuthenticateToken, sync(req, res)=> {
//  const id =re.body;
//  const {name,email,password} = req.body;
//  await user.save();
// })


app.listen(3006, () => {
    console.log('Server is running on port 3006');
  });