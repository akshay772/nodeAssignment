const express = require('express');
const morgan = require('morgan');

const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');
const userRouter = require('./routes/userRoutes');
const userTourRouter = require('./routes/userTourRoutes');

const app = express();

// 1) MIDDLEWARES
// Include middleware
// Only applied to Post or some routes
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(express.json());
// How to include static files on browser
app.use(express.static(`${__dirname}/public`));

// Add another middleware to middleware stack
// more simpler middleware function, applies to all routes
app.use((req, res, next) => {
  console.log('Hello from the middleware');
  next();
});

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

// 3) ROUTES
// Middlewares since express.Router is a middleware
app.use('/api/v1/users', userRouter);
app.use('/api/v1/usertours', userTourRouter);

// Executed last as the middlewares are executed in the order it is in the code
app.all('*', (req, res, next) => {
  // res.status(404).json({
  //   status: 'fail',
  //   message: `Can't find ${req.originalUrl} on this server`,
  // });
  // const err = new Error(`Can't find ${req.originalUrl} on this server`);
  // err.status = 'fail';
  // err.statusCode = 404;

  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
