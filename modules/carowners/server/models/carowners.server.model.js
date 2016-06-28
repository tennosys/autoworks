'use strict';

/**
 * Module dependencies
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Carowner Schema
 */
var CarownerSchema = new Schema({
  created: {
    type: Date,
    default: Date.now
  },
  dateOfBirth: {
    type: Date
  },
  placeOfBirth: {
    type: String,
    default: ''
  },
  gender: {
    type: Number
  },
  address: {
    type: String,
    default: ''
  },
  policeNo: {
    type: String,
    default: ''
  },
  stnkName: {
    type: String,
    default: ''
  },
  brand: {
    type: Schema.ObjectId,
    ref: 'Brand'
  },
  materialNo: {
    type: String,
    default: ''
  },
  manufactureYear: {
    type: String,
    default: ''
  },
  user: {
    type: Schema.ObjectId,
    ref: 'User'
  },
  userWorkshop: {
    type: Schema.ObjectId,
    ref: 'User'
  },
  workshop: {
    type: Schema.ObjectId,
    ref: 'Workshop'
  }
});

mongoose.model('Carowner', CarownerSchema);
