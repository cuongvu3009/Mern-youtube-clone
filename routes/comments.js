const express = require('express');
const router = express.Router();

const {
  addComment,
  deleteComment,
  getComments,
} = require('../controllers/comment');
const verifyToken = require('../utils/verifyToken');

//token
router.post('/', verifyToken, addComment);

//token
router.delete('/:id', verifyToken, deleteComment);

router.get('/:videoId', getComments);

module.exports = router;
