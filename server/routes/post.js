const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const requireLogin = require('../middleware/requireLogin')
const Event = mongoose.model("Event")

router.get('/all', async (req, res) => {
  try {
    const now = new Date()
    const events = await Event.find({date: {$gte:now }})
      .populate("author", "_id name")
      .sort({ date: 1 }); 
    res.json({ events });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Server error" });
  }
});

router.post('/new', requireLogin, (req, res)=>{
    const { title, description, date, photo } = req.body
    if(!title || !description || !date ){
        res.status(422).json({error: "Missing title, description or date. These elements are required. "})
        return
    }
    req.user.password = undefined
    const event = new Event({
        title, 
        description, 
        author: req.user,
        date,
        photo
    })

    event.save().then(result=>{
        res.json({event: result})
    })
    .catch(err=>{
        console.log(err)
    })
})

router.get('/history', requireLogin, (req, res)=>{
    Event.find({author: req.user._id })
    .populate("author", "_id name")
    .then(history=>{
        res.json({history})
    })
    .catch(err=>{
        console.log(err)
    })
})

router.put('/like', requireLogin, async (req, res)=>{
  try {
    const result = await Event.findByIdAndUpdate(
      req.body.postId,
      { $push: { likes: req.user._id } },
      { new: true }
    );
    res.json(result);
  } catch (err) {
    res.status(422).json({ error: err.message });
  }
});

router.put('/dislike', requireLogin, async (req, res)=>{
  try {
    const result = await Event.findByIdAndUpdate(
      req.body.postId,
      { $pull: { likes: req.user._id } },
      { new: true }
    );
    res.json(result);
  } catch (err) {
    res.status(422).json({ error: err.message });
  }
});

router.delete('/delete/:eventId', requireLogin, async (req, res) => {
  try {
    const event = await Event.findById(req.params.eventId).populate("author", "_id");

    if (!event) {
      return res.status(404).json({ error: "Event not found" });
    }

    if (event.author._id.toString() !== req.user._id.toString()) {
      return res.status(403).json({ error: "Unauthorized" });
    }

    const result = await event.deleteOne(); // `remove()` is deprecated
    return res.json(result);

  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: err.message });
  }
});


module.exports = router