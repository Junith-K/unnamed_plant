const express = require("express");
const { ObjectId } = require("mongodb");
const { getDB } = require("./db");

const app = express();
app.use(express.json());
let db;
async function getDatabase() {
  db = await getDB;
}

getDatabase();
if (!db) {
  let port = process.env.PORT || 3000;
  app.listen(port, () => {
    console.log(`Listening to port ${port}`);
  });
}

app.post("/addplant", async (req,res)=>{
    let body = req.body;
    let result = await db.insertOne(body);
    res.status(200).json(result);
})

app.get("/getplants", async (req, res)=>{
    let plants = [];
    await db.find().forEach((plant) => plants.push(plant));
    res.status(200).json(plants);
})

app.get("/getplants/:id", async (req, res)=>{
    let plants = [];
    await db
      .find({ user_id: req.params.id })
      .forEach((plant) => plants.push(plant));
    if(plants.length==0){
        res.status(500).json({"err": "No document found!"})
    }
    else{
        res.status(200).json(plants);
    }
})

app.patch("/updateplant/:id", (req, res)=>{
    const updates = req.body;

    if (ObjectId.isValid(req.params.id)) {
      db.updateOne({ _id: ObjectId(req.params.id) }, { $set: updates })
        .then((result) => {
          res.status(200).json(result);
        })
        .catch((err) => {
          res.status(500).json({ err: "Could not update the document" });
        });
    } else {
      res.status(500).json({ err: "Not a valid document ID" });
    }

})