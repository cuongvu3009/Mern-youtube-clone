const createError = require('../error');
const Video = require('../models/Video');
const User = require('../models/User');

const addVideo = async (req, res) => {
  const newVideo = new Video({ userId: req.user.id, ...req.body });
  try {
    const savedVideo = await newVideo.save();
    res.status(200).json(savedVideo);
  } catch (err) {
    next(err);
  }
};

const updateVideo = async (req, res, next) => {
  const video = await Video.findById(req.params.id);
  if (!video) {
    return next(createError(404, `No video with ${req.params.id} found!`));
  }
  if (req.user.id === video.userId) {
    const updatedVideo = await Video.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedVideo);
  } else {
    return next(createError(403, `You can only update your video!`));
  }
};

const deleteVideo = async (req, res) => {
  const video = await Video.findById(req.params.id);
  if (!video)
    return next(createError(404, `No video with ${req.params.id} found!`));
  if (req.user.id === video.userId) {
    const deletedVideo = await Video.findByIdAndDelete(req.params.id);
    res.status(200).json(deletedVideo);
  } else {
    return next(createError(403, `You can only delete your video!`));
  }
};

const getVideo = async (req, res) => {
  const video = await Video.findById(req.params.id);
  res.status(200).json(video);
};

const addView = async (req, res) => {
  const video = await Video.findById(req.params.id);
  if (!video)
    return next(createError(404, `No video with ${req.params.id} found!`));
  await Video.findByIdAndUpdate(req.params.id, { $inc: { views: 1 } });
  res.send('addView');
};

const random = async (req, res) => {
  const videos = await Video.find();
  res.status(200).json(videos);
};

const trend = async (req, res) => {
  //	If views: 1 (then it will return lowest views videos), if view: -1 then it will return highest views videos
  const trendVideos = await Video.find().sort({ views: -1 });
  res.status(200).json(trendVideos);
};

const sub = async (req, res) => {
  const user = await User.findById(req.user.id);
  const subcribedChannels = await user.subscribedUsers;

  const list = await Promise.all(
    subcribedChannels.map((channelId) => {
      return Video.find({ userId: channelId });
    })
  );
  //	add .flat() to remove 1 layer array bracket
  res.status(200).json(list.flat().sort((a, b) => b.createdAt - a.createdAt));
};

const getByTag = async (req, res) => {
  const tags = req.query.tags.split(',');
  //loop inside tags, and search inside ($in) of tags to see if tags exist
  const videos = await Video.find({ tags: { $in: tags } }).litmit(50);
  res.status(200).json(videos);
};

const search = async (req, res) => {
  const query = req.query.query;
  const videos = await Video.find({
    title: { $regex: query, $options: 'i' },
  });
  res.status(200).json(videos);
};

module.exports = {
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
};
