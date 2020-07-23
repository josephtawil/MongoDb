
const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

// const db = mongojs(test_db, [collections]);

// db.myCollection.find(function(err, docs){

// });
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const apiRoutes = require("./routes/test-routes");
const mongoRoutes = require("./routes/mongo-routes");
app.use(apiRoutes, mongoRoutes);

app.listen(PORT,()=>console.log(`Listening on http://localhost:${PORT}`));