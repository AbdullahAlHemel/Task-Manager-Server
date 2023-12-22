const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config()
const port = process.env.PORT || 5000;
//middleware


//TaskManager
//UHRnZUus8bFxkEcK
app.use(cors());
app.use(express.json())




const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://TaskManager:UHRnZUus8bFxkEcK@cluster0.waw16py.mongodb.net/?retryWrites=true&w=majority";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
    try {
    const ToDoCollection = client.db('TaskManager').collection('ToDo');
    app.get('/todo' ,async(req, res) => {
        console.log(req.headers);
        const result = await ToDoCollection.find().toArray();
        res.send(result);
      });


    // Connect the client to the server	(optional starting in v4.7)
    // await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);




app.get('/', (req, res) => {
    res.send('Task Manager Server is running')
})

app.listen(port, () => {
    console.log(`Task Manager is Sitting on port ${port}`);
})