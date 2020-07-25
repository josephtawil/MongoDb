const mongojs = require('mongojs');
const databaseUrl = "notetaker_db";
const collections = ["notes"];

const db = mongojs(databaseUrl,collections);
db.on("error",(err)=>{
    console.log({err: "error"});
})

module.exports = {
//getNotes returns all objects
    getNotes : (req,res)=> {
        db.notes.find({},(err,data)=>{
            err ? res.send(err) : res.send(data);
        });
    },
    //getNote returns one object
    getNote: (req,res)=> {
        db.notes.findOne({_id: mongojs.ObjectID( req.params.id)}, (err,data)=>{
            err ? res.send(err) : res.send(data);
        });
        // db.notes.find({completed: req.params.completed}, (err,data)=>{
        //     err ? res.send(err) : res.send(data);
        // });
    },
//MongoDB allows you to save arrays and objects to the collection
    addNote : (req,res)=> {
        db.notes.insert({text: req.body.text, completed: req.body.completed, tags: []},
            (err,data) => err ? res.send(err) : res.send(data));
    },

    //amyTime we are referencing an id you must include mongojs.ObjectID()
    updateText : (req,res) => {
        db.notes.update({_id: mongojs.ObjectID( req.body.id)},{$set: {text: req.body.text}},(err,data) => {
            err ? send(err) : res.send(data);
        });
    },

    //adding a single object to an array, we using the push method
    addTag: (req, res) => {
        db.notes.update({_id: mongojs.ObjectID(req.body.id)},{$push:{tags: req.body.tag}},(err,data)=>
        {
            err ? res.send(err) : res.send(data);
        });
    },
    //adding multiple objects to an array, we also use the push method and the each method for each tag
    addTags: (req, res) => {
        db.notes.update({_id: mongojs.ObjectID(req.body.id)},{$push:{tags: {$each: req.body.tags}}},(err,data)=>
        {
            err ? res.send(err) : res.send(data);
        });
    },

    //to pull a multiple item from an array just use $pullAll
    removeTags: (req,res) => {
        db.notes.update({_id: mongojs.ObjectID(req.body.id)},
        { $pullAll: {tags: req.body.tags}},(err,data)=>
        {
            err ? res.send(err) : res.send(data);
        });
    },

     //to pull a single item from an array just use $pull
    removeTag: (req,res) => {
        db.notes.update({_id: mongojs.ObjectID(req.body.id)},
        { $pull: {tags: req.body.tag}},(err,data)=>
        {
            err ? res.send(err) : res.send(data);
        });
    },
    // remove an object from the collection by its id,
    // any parameter such as name can be used
    deleteNote: (req,res) => {
        db.notes.remove({_id: mongojs.ObjectID(req.body.id)},(err,data)=>
        {
            err ? res.send(err) : res.send(data);
        });
    }
};