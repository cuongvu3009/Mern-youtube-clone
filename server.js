const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');

// extra security packages
const helmet = require('helmet');
const cors = require('cors');
const xss = require('xss-clean');
const rateLimiter = require('express-rate-limit');

const app = express();
dotenv.config();
require('express-async-errors');

//routes
const authRouter = require('./routes/auth');
const commentRouter = require('./routes/comments');
const userRouter = require('./routes/users');
const videoRouter = require('./routes/videos');

//middlewares
app.use(cookieParser(process.env.JWT_SECRET));
app.use(express.json());
app.set('trust proxy', 1);
app.use(
  rateLimiter({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
  })
);
app.use(helmet());
app.use(cors());
app.use(xss());

app.get('/', (req, res) => {
  res.send('<h1>Youtube-clone API</h1>');
});

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

const connectDB = async () => {
  await mongoose.connect(process.env.MONGO_URI);
  console.log('DB is connected!');
};

connectDB();

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => console.log(`Server is listening on ${PORT}`));
