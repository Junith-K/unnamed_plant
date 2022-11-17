const express = require("express");
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

app.get("/jun", async (req,res)=>{
    res.status(200).send("hello")
})