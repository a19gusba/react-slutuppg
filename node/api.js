const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors");
const app = express()

mongoose.connect("mongodb://localhost:27017/projektuppgift", { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
    console.log("connected to database")
})

app.use(cors(), express.json())
app.get("/", function (req, res) {
    res.send("Connected to server")
})

app.listen(5000, function () {

})

// Database
const db = mongoose.connection

app.get("/heroes", function (req, res) {
    var collection = db.collection("heroes");
    var query = {}

    collection.find(query).toArray(function (err, result) {
        if (err) {
            throw err
        }
        else {
            res.type("application/json")
            res.status(200).send(result)
        }
    });
})

app.get("/favourites", function (req, res) {
    var collection = db.collection("favourites");
    var query = {}

    collection.find(query).toArray(function (err, result) {
        if (err) {
            throw err
        }
        else {
            res.type("application/json")
            res.status(200).send(result)
        }
    });
})

var favouriteSchema = mongoose.Schema({
    name: String,
    id: Number,
    comment: String,
    date: String,
    last_updated: String
});
var favourite_model = mongoose.model('favourite_model', favouriteSchema, 'favourites');

app.get("/addFavourite/:heroid/:heroname", async function (req, res) {
    var collection = db.collection("favourites");

    var query = { id: parseInt(req.params.heroid) }
    await collection.countDocuments(query).then(function (count) {
        if (count > 0) {
            collection.deleteOne(query)
            res.status(200).send("Removed hero from favourites")
        }
        else {
            var date_ob = new Date().toLocaleString()
            var new_favourite = new favourite_model({ name: req.params.heroname, id: req.params.heroid, comment: "", date: date_ob, last_updated: "-" });

            // save model to database
            new_favourite.save(function (err, result) {
                if (err) res.status(400).send(err)
                res.status(200).send("Added hero from favourites")
            });
        }
    })
})

app.get("/patchFavourite/:collection/:heroid/:field/:value", async function (req, res) {
    var collection = db.collection(req.params.collection);
    var value;
    if (req.params.field == "isFavourite" && !(req.params.value == "true" || req.params.value == "false")) {
        res.status(400).send("Incorrect boolean")
        return
    }
    // Convert string to boolean
    else if (req.params.field == "isFavourite")
        value = (req.params.value == "true") ? true : false;
    else
        value = req.params.value

    var query = { id: parseInt(req.params.heroid) }
    var field = {}
    field[req.params.field] = value
    var patch = { $set: field }
    var opts = { new: true };

    await collection.updateOne(query, patch, opts).then(updatedRows => {
        res.status(200).send("Updated")
    }).catch(err => {
        res.status(400).send(err)
    })
})