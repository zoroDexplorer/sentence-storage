const express = require('express');
const mongoose = require('mongoose');

const app = express();
app.use(express.json());

// Directly use the connection string (replace `<your_connection_string>` with your actual MongoDB Atlas connection string)
mongoose.connect('MONGO_URI=mongodb+srv://raviravi18425:ravishankar@cluster0.1aej7.mongodb.net/sample?retryWrites=true&w=majority&appName=Cluster0');

// Define a schema and model for the 'number1' collection
const number1Schema = new mongoose.Schema({
  content: String,
});

const Number1 = mongoose.model('Number1', number1Schema, 'number1');

// Route to add text to the 'number1' collection
app.post('/api/text', async (req, res) => {
  const { content } = req.body;
  const newText = new Number1({ content });
  await newText.save();
  res.status(201).send(newText);
});

// Route to get all text from the 'number1' collection
app.get('/api/text', async (req, res) => {
  const texts = await Number1.find();
  res.status(200).send(texts);
});

const port = 5000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
