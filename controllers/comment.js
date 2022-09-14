const createError = require('../error');
const Comment = require('../models/Comment');
const Video = require('../models/Video');

const addComment = async (req, res) => {
  const newComment = await Comment.create({
    ...req.body,
    userId: req.user.id,
  });

  res.status(201).json(newComment);
};

const deleteComment = async (req, res) => {
  const comment = await Comment.findById(req.params.id);
  const video = await Video.findById(req.params.id);
  if (req.user.id === comment.userId || req.user.id === video.userId) {
    await Comment.findByIdAndDelete(req.params.id);
    res.status(200).json('Comment has been deleted!');
  } else {
    return next(createError(403, 'You can only delete your comment'));
  }
};

const getComments = async (req, res) => {
  const comments = await Comment.find({ videoId: req.params.videoId });
  res.status(200).json(comments.sort((a, b) => b.createdAt - a.createdAt));
};

module.exports = { addComment, deleteComment, getComments };
