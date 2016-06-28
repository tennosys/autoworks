'use strict';

/**
 * Module dependencies
 */
var path = require('path'),
  mongoose = require('mongoose'),
  Carowner = mongoose.model('Carowner'),
  Workshop = mongoose.model('Workshop'),
  User = mongoose.model('User'),
  async = require('async'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));

/**
 * Create an carowner
 */
exports.create = function (req, res, next) {
  delete req.body.user.roles;

  var carowner = new Carowner(req.body.carowner);
  carowner.userWorkshop = req.user;

  var user = new User(req.body.user);
  user.provider = 'local';
  user.displayName = user.firstName + ' ' + user.lastName;
  user.roles = ['carowner'];


  async.waterfall([
    function (done) {
      user.save(function (err, user) {
        if (err) {
          return res.status(400).send({
            message: errorHandler.getErrorMessage(err)
          });
        } else {
          done(err, user);
        }
      });
    },
    function (user, done) {
      Workshop.findOne({
        'user': req.user
      })
      .populate('user', 'displayName')
      .exec(function(err, workshop) {
        if (err) {
          return next(err);
        }
        done(err, user, workshop);
      });
    },
    function (user, workshop, done) {
      carowner.user = user;
      carowner.workshop = workshop;
      carowner.save(function (err) {
        if (err) {
          return res.status(400).send({
            message: errorHandler.getErrorMessage(err)
          });
        } else {
          delete carowner.user;
          delete carowner.workshop;
          delete carowner.userWorkshop;
          res.json(carowner);
        }
        done(err);
      });
    }
  ], function (err) {
    if (err) {
      return next(err);
    }
  });
};

/**
 * Show the current carowner
 */
exports.read = function (req, res) {
  // convert mongoose document to JSON
  var carowner = req.carowner ? req.carowner.toJSON() : {};

  // Add a custom field to the Carowner, for determining if the current User is the "owner".
  // NOTE: This field is NOT persisted to the database, since it doesn't exist in the Carowner model.
  carowner.isCurrentUserOwner = !!((req.carowner && req.user && req.carowner.user && req.carowner.user.id === req.user.id)
  || (req.carowner && req.user && req.carowner.userWorkshop && req.carowner.userWorkshop.id === req.user.id));

  res.json(carowner);
};

/**
 * Update an carowner
 */
exports.update = function (req, res) {
  var carowner = req.carowner;

  carowner.dateOfBirth = req.body.dateOfBirth;
  carowner.placeOfBirth = req.body.placeOfBirth;
  carowner.gender = req.body.gender;
  carowner.address = req.body.address;
  carowner.policeNo = req.body.policeNo;
  carowner.stnkName = req.body.stnkName;
  carowner.brand = req.body.brand;
  carowner.materialNo = req.body.materialNo;
  carowner.manufactureYear = req.body.manufactureYear;

  carowner.save(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(carowner);
    }
  });
};

/**
 * Delete an carowner
 */
exports.delete = function (req, res) {
  var carowner = req.carowner;

  carowner.remove(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(carowner);
    }
  });
};

/**
 * List of Carowners
 */
exports.list = function (req, res, next) {
  if (req.user.roles === 'admin') {
    Carowner.find().sort('-created')
    .populate('user', 'displayName')
    .populate('workshop', 'companyName')
    .populate('brand', 'brand')
    .exec(function (err, carowners) {
      if (err) {
        return res.status(400).send({
          message: errorHandler.getErrorMessage(err)
        });
      } else {
        res.json(carowners);
      }
    });
  } else {
    Carowner.find({
      'userWorkshop': req.user
    })
    .populate('user', 'displayName')
    .populate('workshop', 'companyName')
    .populate('brand', 'brand')
    .exec(function(err, carowner) {
      if (err) {
        return res.status(400).send({
          message: errorHandler.getErrorMessage(err)
        });
      }
      res.json(carowner);
    });
  }
};

/**
 * Carowner middleware
 */
exports.carownerByID = function (req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Carowner is invalid'
    });
  }

  Carowner.findById(id)
    .populate('user', 'displayName')
    .populate('workshop', 'companyName')
    .populate('brand')
    .populate('userWorkshop', 'displayName')
    .exec(function (err, carowner) {
      if (err) {
        return res.status(400).send({
          message: errorHandler.getErrorMessage(err)
        });
      } else if (!carowner) {
        return res.status(404).send({
          message: 'No carowner with that identifier has been found'
        });
      }
      req.carowner = carowner;
      next();
    });
};

exports.readByUser = function (req, res, next) {
  Carowner.findOne({
    'user': req.user
  })
  .populate('user', 'displayName')
  .populate('workshop', 'companyName')
  .exec(function(err, carowner) {
    if (err) {
      return next(err);
    }
    carowner = carowner ? carowner.toJSON() : {};
    carowner.isCurrentUserOwner = true;

    res.json(carowner);
  });
};

exports.listByWorkshop = function (req, res, next) {
  Carowner.findOne({
    'userWorkshop': req.user
  })
  .populate('user', 'displayName')
  .populate('workshop', 'companyName')
  .exec(function(err, carowner) {
    if (err) {
      return next(err);
    }
    carowner = carowner ? carowner.toJSON() : {};
    carowner.isCurrentUserOwner = true;

    res.json(carowner);
  });
};
