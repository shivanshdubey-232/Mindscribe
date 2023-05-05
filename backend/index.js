const express = require('express')
const connectToMongo = require('./db');
const app = express()
const port = 5000;
const cors = require('cors');
app.use(cors());
app.use(express.json());

connectToMongo();

app.use('/api/auth', require('./routes/auth'));
app.use('/api/notes', require('./routes/notes'));

app.get('/', (req, res) => {  
  res.send('Hello World!')
})


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})