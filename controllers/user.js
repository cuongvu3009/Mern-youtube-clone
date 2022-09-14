const User = require('../models/User');
const Video = require('../models/Video');

const update = async (req, res) => {
  const { id } = req.params;
  if (id === req.user.id) {
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedUser);
  } else {
    res.send('You can only update your account');
  }
};

const deleteUser = async (req, res) => {
  const { id } = req.params;
  if (id === req.user.id) {
    const deletedUser = await User.findByIdAndDelete(id);
    res.status(200).json(deletedUser);
  } else {
    res.send('You can only delete your account');
  }
};

const getUser = async (req, res) => {
  const user = await User.findById(req.params.id);
  res.status(200).json(user);
};

const subscribe = async (req, res) => {
  await User.findByIdAndUpdate(req.user.id, {
    $push: { subscribedUsers: req.params.id },
  });
  await User.findByIdAndUpdate(req.params.id, {
    $push: { subscribers: req.user.id },
  });

  res.status(200).json('Subcribed!');
};

const unsubscribe = async (req, res) => {
  await User.findByIdAndUpdate(req.user.id, {
    $pull: { subscribedUsers: req.params.id },
  });
  await User.findByIdAndUpdate(req.params.id, {
    $pull: { subscribers: req.user.id },
  });

  res.status(200).json('Unsubcribed!');
};

const like = async (req, res) => {
  const userId = await req.user.id;
  const videoId = await req.params.videoId;
  await Video.findByIdAndUpdate(videoId, {
    $addToSet: { likes: userId },
    $pull: { dislikes: userId },
  });
  res.status(201).json('liked!');
};

const dislike = async (req, res) => {
  const userId = await req.user.id;
  const videoId = await req.params.videoId;
  await Video.findByIdAndUpdate(videoId, {
    $addToSet: { dislikes: userId },
    $pull: { likes: userId },
  });
  res.status(201).json('disliked!');
};

module.exports = {
  update,
  deleteUser,
  getUser,
  subscribe,
  unsubscribe,
  like,
  dislike,
};
