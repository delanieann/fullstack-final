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

router.post('/new', requireLogin, async (req, res)=>{
    const { title, description, date, time, photo } = req.body

    if(!title || !description || !date || !time ){
        return res.status(422).json({error: "Missing title, description or date."})
    }
    try{ 
        req.user.password = undefined

        const event = new Event({
            title, 
            description, 
            author: req.user,
            date,
            time,
            photo
        })

    const result = await event.save()
    res.json({event: result})
    } catch (er) {
        res.status(500).json({error: "Failed to post. "})
    }
})

router.get('/history', requireLogin, async (req, res)=>{
    try {
        const data = await Event.find({author: req.user._id })
        .populate("author", "_id name")
        .sort({ date: 1 });
        res.json({ data })
    } catch(err) {
        res.status(500).json({error: "Failed to get history. "})
    }
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

    const result = await event.deleteOne();
    return res.json(result);

  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: err.message });
  }
});

module.exports = router