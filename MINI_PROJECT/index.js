const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/signup', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connected to MongoDB successfully');
}).catch(err => {
  console.error('Error connecting to MongoDB:', err.message);
});

// Define mongoose schema and model
const Schema = mongoose.Schema;

const signupSchema = new Schema({
  username: { type: String, required: true },
  password: { type: String, required: true }
});

const Signup = mongoose.model('Signup', signupSchema);

// Route to handle form submission
app.post('/signup', (req, res) => {
  const newSignup = new Signup({
    username: req.body.username,
    password: req.body.password
  });

  newSignup.save()
    .then(savedSignup => {
      console.log('Signup data saved successfully:', savedSignup);
      res.send('Signup successful!');
    })
    .catch(err => {
      console.error('Error saving signup data:', err.message);
      res.status(500).send('Error saving signup data');
    });
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
