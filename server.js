const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// Create Express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB Atlas
mongoose.connect('mongodb+srv://raviravi18425:ravishankar@cluster0.1aej7.mongodb.net/sentenceDb?retryWrites=true&w=majority&appName=Cluster0', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Define a schema for sentences
const sentenceSchema = new mongoose.Schema({
  text: String,
});

// Create a model from the schema
const Sentence = mongoose.model('Sentence', sentenceSchema);

// POST route to add a new sentence
app.post('/api/sentences', async (req, res) => {
  const newSentence = new Sentence({
    text: req.body.text,
  });
  await newSentence.save();
  res.send(newSentence);
});

// GET route to retrieve all sentences
app.get('/api/sentences', async (req, res) => {
  const sentences = await Sentence.find();
  res.send(sentences);
});

// Start the server
app.listen(5000, () => {
  console.log('Server is running on port 5000');
});
