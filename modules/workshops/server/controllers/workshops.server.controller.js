'use strict';

/**
 * Module dependencies
 */
var path = require('path'),
  mongoose = require('mongoose'),
  Workshop = mongoose.model('Workshop'),
  User = mongoose.model('User'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));

/**
 * Create an workshop
 */
exports.create = function (req, res) {
  var workshop = new Workshop(req.body);
  workshop.user = req.user;

  workshop.save(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(workshop);
    }
  });
};

/**
 * Show the current workshop
 */
exports.read = function (req, res) {
  // convert mongoose document to JSON
  var workshop = req.workshop ? req.workshop.toJSON() : {};

  // Add a custom field to the Workshop, for determining if the current User is the "owner".
  // NOTE: This field is NOT persisted to the database, since it doesn't exist in the Workshop model.
  workshop.isCurrentUserOwner = !!(req.user && workshop.user && workshop.user._id.toString() === req.user._id.toString());

  res.json(workshop);
};

/**
 * Update an workshop
 */
exports.update = function (req, res) {
  var workshop = req.workshop;

  workshop.companyName = req.body.companyName;
  workshop.address = req.body.address;
  workshop.phoneNo = req.body.phoneNo;
  workshop.description = req.body.description;
  workshop.openingHours = req.body.openingHours;

  workshop.save(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(workshop);
    }
  });
};

/**
 * Delete an workshop
 */
exports.delete = function (req, res) {
  var workshop = req.workshop;

  workshop.remove(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(workshop);
    }
  });
};

/**
 * List of Workshops
 */
exports.list = function (req, res) {
  Workshop.find().sort('-created').populate('user', 'displayName').exec(function (err, workshops) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(workshops);
    }
  });
};

/**
 * Workshop middleware
 */
exports.workshopByID = function (req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Workshop is invalid'
    });
  }

  Workshop.findById(id).populate('user', 'displayName').exec(function (err, workshop) {
    if (err) {
      return next(err);
    } else if (!workshop) {
      return res.status(404).send({
        message: 'No workshop with that identifier has been found'
      });
    }
    req.workshop = workshop;
    next();
  });
};

exports.listByUser = function (req, res, next) {
  User.findOne({
    username: req.params.username.toLowerCase()
  }, function (err, user) {
    if (err) {
      return next(err);
    }
    Workshop.findOne({
      'user': user
    })
    .populate('user', 'displayName')
    .exec(function(err, workshop) {
      if (err) {
        return next(err);
      }
      workshop = workshop ? workshop.toJSON() : {};
      workshop.isCurrentUserOwner = true;

      res.json(workshop);
    });
  });
};
