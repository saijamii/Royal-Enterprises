const express = require("express");
const { MongoClient, ServerApiVersion } = require("mongodb");

const uri = `mongodb+srv://saijami:EcUpT3Et6dpojJz3@atlascluster.iotmmxp.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});
const dataBase = client.db("royal");
const collection = dataBase.collection("products");

const app = express();

app.get("/", (req, res) => {
  res.send(`API is Running on port ${PORT}`);
});

app.get("/inventoryProducts", async (req, res) => {
  const products = await getInventory();
  res.status(200).json(products);
});

const getInventory = async () => {
  try {
    const result = await collection.find().toArray();
    return result.slice(0, 100);
  } catch (error) {
    console.log(`ERROR : ${error}`);
  }
};

app.post("/addInventory", (req, res) => {
  console.log(req.body);
  let dataJson = JSON.parse(JSON.stringify(req.body));
  console.log(dataJson, "dataJson");
  addProducts(dataJson);
  res.status(200).json(dataJson);
});

const addProducts = async (dataJson) => {
  try {
    const result = await collection.insertOne(dataJson);
    console.log(`Saved response with ID: ${result.insertedId}`);
  } catch (error) {
    console.error(`Error : ${error}`);
  }
};

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
