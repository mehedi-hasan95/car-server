const express = require('express')
const app = express()
const cors = require('cors');
const port = process.env.PORT || 5000

// Midleware 
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`The server run with: ${port}`)
})