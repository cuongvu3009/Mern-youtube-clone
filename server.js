const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./db/connectDB');
const cookieParser = require('cookie-parser');

const app = express();
dotenv.config();
require('express-async-errors');

//routes
const authRouter = require('./routes/auth');
const commentRouter = require('./routes/comments');
const userRouter = require('./routes/users');
const videoRouter = require('./routes/videos');

//middlewares
app.use(express.json());
app.use(cookieParser());
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/comments', commentRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/videos', videoRouter);

//error handler
app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || 'Something went wrong!';
  return res.status(status).json({
    success: false,
    status,
    message,
  });
});

const PORT = process.env.PORT || 8000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    await app.listen(PORT, () => console.log(`Server is listening on ${PORT}`));
  } catch (error) {
    console.log(error);
  }
};

start();
