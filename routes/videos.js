const express = require('express');
const router = express.Router();

const {
  getByTag,
  getVideo,
  addVideo,
  updateVideo,
  deleteVideo,
  addView,
  random,
  trend,
  sub,
  search,
  uploadVideo,
  uploadImg,
} = require('../controllers/video');
const verifyToken = require('../utils/verifyToken');

//	upload video
router.post('/upload', verifyToken, uploadVideo);

//upload img
router.post('/uploadimg', verifyToken, uploadImg);

//create a video, need token
router.post('/', verifyToken, addVideo);

//update a video, need token
router.put('/:id', verifyToken, updateVideo);

//delete a video, need token
router.delete('/:id', verifyToken, deleteVideo);

//get video
router.get('/find/:id', getVideo);

//add view
router.put('/view/:id', addView);

//get trend
router.get('/trend', trend);

//get random
router.get('/random', random);

//create a video, need token
router.get('/sub', verifyToken, sub);

//get by tag
router.get('/tags', getByTag);

//get by search
router.get('/search', search);

module.exports = router;
