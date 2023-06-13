const express = require('express')
const connectToMongo = require('./db');
const app = express()
const port = 5000;
const cors = require('cors');
const path = require('path');

app.use(cors());
app.use(express.json());


connectToMongo();

app.use('/api/auth', require('./routes/auth'));
app.use('/api/notes', require('./routes/notes'));

app.get('/', (req, res) => {  
  res.send('Hello World!')
})
//Static files
app.use(express.static(path.join(__dirname, '/../build')));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/../build/index.html'));
});

app.listen(port, () => {
  console.log(`Mindcribe is listening on port ${port}`)
})