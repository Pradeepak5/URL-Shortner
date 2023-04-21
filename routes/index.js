var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const shortUrl = require('../models/shortUrl');
const {dbURL} = require('../common/dbConfig');
mongoose.connect(dbURL);


/* GET home page. */
router.get('/', async(req, res)=> {
  const shortUrls = await shortUrl.find();
  res.render('index',{shortUrls:shortUrls});
});

router.post('/shorturls', async(req,res)=>{
  await shortUrl.create({full:req.body.fullUrl})
  res.redirect('/')
})

router.get('/:shorturl',async(req,res)=>{
  const ShortUrl = await shortUrl.findOne({short: req.params.shorturl})
  if(ShortUrl == null) return res.sendStatus(404);

  ShortUrl.clicks++
  ShortUrl.save();

  res.redirect(ShortUrl.full)
})

module.exports = router;
