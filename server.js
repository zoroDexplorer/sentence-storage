const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost/sentenceDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const sentenceSchema = new mongoose.Schema({
  text: String,
});

const Sentence = mongoose.model('Sentence', sentenceSchema);

app.post('/api/sentences', async (req, res) => {
  const newSentence = new Sentence({
    text: req.body.text,
  });
  await newSentence.save();
  res.send(newSentence);
});

app.get('/api/sentences', async (req, res) => {
  const sentences = await Sentence.find();
  res.send(sentences);
});

app.listen(5000, () => {
  console.log('Server is running on port 5000');
});
