const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors()); // Use CORS middleware

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

// New route to fetch all texts
app.get('/get-texts', async (req, res) => {
  try {
    const texts = await Text.find({});
    res.status(200).json(texts);
  } catch (error) {
    res.status(500).send('Error fetching texts: ' + error.message);
  }
});

app.listen(5000, () => {
  console.log('Server is running on port 5000');
});
