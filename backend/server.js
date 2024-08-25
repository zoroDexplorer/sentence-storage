const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect('mongodb+srv://raviravi18425:ravishankar@cluster0.1aej7.mongodb.net/sample?retryWrites=true&w=majority&appName=Cluster0')
  .then(() => console.log('Connected to MongoDB Atlas'))
  .catch(err => console.error('Failed to connect to MongoDB', err));

const textSchema = new mongoose.Schema({
  content: String
}, { collection: 'number1' });

const Text = mongoose.model('text', textSchema);

app.post('/save-text', async (req, res) => {
  const { content } = req.body;

  const text = new Text({ content });

  try {
    await text.save();
    res.status(201).send('Text saved successfully!');
  } catch (error) {
    res.status(500).send('Error saving text: ' + error.message);
  }
});

app.get('/get-texts', async (req, res) => {
  try {
    const texts = await Text.find({});
    res.status(200).json(texts);
  } catch (error) {
    res.status(500).send('Error fetching texts: ' + error.message);
  }
});

// Serve static files from the Vite frontend app (dist folder)
app.use(express.static(path.join(__dirname, 'dist')));

// Serve index.html for any unknown routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(5000, () => {
  console.log('Server is running on port 5000');
});
