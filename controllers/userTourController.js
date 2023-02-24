const Tour = require('../models/tourModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

exports.createUserTour = catchAsync(async (req, res, next) => {
  // const newTour = new Tour({});
  // newTour.save();
  const userName = req.user.name.toString();
  const newTour = await Tour.create({
    createdBy: userName,
    ...req.body,
  });

  res.status(201).json({
    status: 'success',
    data: {
      tour: newTour,
    },
  });
});

exports.getAllUserTours = catchAsync(async (req, res, next) => {
  const tours = await Tour.find({ createdBy: req.user.name });

  res.status(200).json({
    status: 'success',
    results: tours.length,
    data: {
      tours,
    },
  });
});

exports.getUserTour = catchAsync(async (req, res, next) => {
  // Tour.findOne({ _id: req.params.id }) is same as below
  const tour = await Tour.findById(req.params.id);

  if (!(req.user.name === tour.createdBy)) {
    return next(
      new AppError(
        'Tour id either does not exist or is associated with another user',
        404
      )
    );
  }

  res.status(200).json({
    status: 'success',
    data: {
      tour,
    },
  });
});

exports.updateUserTour = catchAsync(async (req, res, next) => {
  let tour = await Tour.findById(req.params.id);

  if (!(req.user.name === tour.createdBy)) {
    return next(
      new AppError(
        'Tour id either does not exist or is associated with another user',
        404
      )
    );
  }

  // Also check if body contains createdBy field
  const requestBody = req.body;
  if (Object.prototype.hasOwnProperty.call(requestBody, 'createdBy')) {
    delete requestBody.createdBy;
  }
  tour = await Tour.findByIdAndUpdate(req.params.id, requestBody, {
    new: true,
    runValidators: true,
  });
  res.status(200).json({
    status: 'success',
    data: {
      tour,
    },
  });
});

exports.deleteUserTour = catchAsync(async (req, res, next) => {
  const tour = await Tour.findById(req.params.id);

  if (!(req.user.name === tour.createdBy)) {
    return next(
      new AppError(
        'Tour id either does not exist or is associated with another user',
        404
      )
    );
  }

  await Tour.findByIdAndDelete(req.params.id);
  res.status(204).json({
    status: 'success',
    data: null,
  });
});
