const express = require("express");
const { MongoClient, ServerApiVersion } = require("mongodb");

const uri = `mongodb+srv://saijami:EcUpT3Et6dpojJz3@atlascluster.iotmmxp.mongodb.net/?retryWrites=true&w=majority`;

const app = express();

const getInventory = async () => {
  const client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    },
  });
  const dataBase = client.db("royal");
  try {
    const collection = dataBase.collection("products");
    const result = await collection.find().toArray();
    return result.slice(0, 100);
  } catch (error) {
    console.log(`ERROR : ${error}`);
  } finally {
    client.close();
  }
};

app.get("/", (req, res) => {
  res.send(`API is Running on port ${PORT}`);
});

app.get("/inventoryProducts", async (req, res) => {
  const products = await getInventory();
  res.status(200).json(products);
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
