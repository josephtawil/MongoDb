const express = require('express');
const router = express.Router();
const {getNotes,getNote, addNote, updateText, addTag, addTags, removeTags,removeTag, deleteNote} = require("../controllers/mongo-controller");
router.get('/notes',getNotes);
router.get('/notes/single/:completed',getNote);
router.post("/addnote", addNote);
router.patch("/updateText",updateText);
router.put("/updateTag",addTag);
router.put("/manyTags/",addTags);
router.delete("/removesingleTag", removeTag);
router.delete("/removeTags", removeTags);
router.delete("/deleteNote",deleteNote);

module.exports = router;