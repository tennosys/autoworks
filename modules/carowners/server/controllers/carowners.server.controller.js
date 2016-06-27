'use strict';

/**
 * Module dependencies
 */
var path = require('path'),
  mongoose = require('mongoose'),
  Carowner = mongoose.model('Carowner'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));

/**
 * Create an carowner
 */
exports.create = function (req, res) {
  var carowner = new Carowner(req.body);
  carowner.user = req.user;

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
 * Show the current carowner
 */
exports.read = function (req, res) {
  // convert mongoose document to JSON
  var carowner = req.carowner ? req.carowner.toJSON() : {};

  // Add a custom field to the Carowner, for determining if the current User is the "owner".
  // NOTE: This field is NOT persisted to the database, since it doesn't exist in the Carowner model.
  carowner.isCurrentUserOwner = !!(req.user && carowner.user && carowner.user._id.toString() === req.user._id.toString());

  res.json(carowner);
};

/**
 * Update an carowner
 */
exports.update = function (req, res) {
  var carowner = req.carowner;

  carowner.title = req.body.title;
  carowner.content = req.body.content;

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
exports.list = function (req, res) {
  Carowner.find().sort('-created').populate('user', 'displayName').exec(function (err, carowners) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(carowners);
    }
  });
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

  Carowner.findById(id).populate('user', 'displayName').exec(function (err, carowner) {
    if (err) {
      return next(err);
    } else if (!carowner) {
      return res.status(404).send({
        message: 'No carowner with that identifier has been found'
      });
    }
    req.carowner = carowner;
    next();
  });
};
