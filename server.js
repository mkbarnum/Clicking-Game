const express = require('express');
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

app.use(express.static('public'));

app.post('/api/items', async (req, res) => {
  const item = new Scores({
    first: req.body.first,
    second: req.body.second,
    third: req.body.third,
    fourth: req.body.fourth,
    fifth: req.body.fifth
  });
  await item.save();
  res.send(item);
});

app.get('/api/items', async (req, res) => {
  let items = await Scores.find();
  res.send(items);
});

app.put('/api/items', async (req, res) => {
  let items = await Scores.find();
  let item = items[0];
  item.first = req.body.first;
  item.second = req.body.second;
  item.third = req.body.third;
  item.fourth = req.body.fourth;
  item.fifth = req.body.fifth;
  await item.save();
  res.send(item);
});

const mongoose = require('mongoose');

// connect to the database
mongoose.connect('mongodb://localhost:27017/scores', {
  useNewUrlParser: true,
});

const scoresSchema = new mongoose.Schema({
  first: String,
  second: String,
  third: String,
  fourth: String,
  fifth: String
});

scoresSchema.set('toJSON', {
  virtuals: true
});

const Scores = mongoose.model('Scores', scoresSchema);


app.listen(3000, () => console.log('Server listening on port 3000!'));