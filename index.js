const express = require('express')
const app = express()
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const port = process.env.PORT || 5000

// Midleware 
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!')
})

// Database

require('dotenv').config()

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.PASSWORD}@cluster0.k4gmzpi.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run () {
  try {
    const serviceCollection = client.db("CarService").collection("Service");
    const orderCollection = client.db('CarService').collection('orders');

    // Display data to the client side
    app.get('/services', async(req, res) => {
      const query = { };
      const cursor = serviceCollection.find(query);
      const result = await cursor.toArray();
      res.send(result);
    })

    // Find One data
    app.get('/services/:id', async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id)}
      const service = await serviceCollection.findOne(query);
      res.send(service);
    })

    // Send order to the db
    app.post('/orders', async(req, res) => {
      const body = req.body;
      const result = await orderCollection.insertOne(body); 
      res.send(result);
    })

  }
  finally {

  }
}
run().catch(err => console.error(err));





app.listen(port, () => {
  console.log(`The server run with: ${port}`)
})