'use strict';

/**
 * Module dependencies
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Workshop Schema
 */
var WorkshopSchema = new Schema({
  created: {
    type: Date,
    default: Date.now
  },
  companyName: {
    type: String,
    default: '',
    trim: true,
    required: 'Company name cannot be blank'
  },
  address: {
    type: String,
    default: '',
    required: 'Address cannot be blank'
  },
  phoneNo: {
    type: String,
    default: '',
    required: 'Phone no cannot be blank',
    match: [/^08[0-9]{9,}$/, 'Phone no is valid']
  },
  description: {
    type: String,
    default: ''
  },
  openingHours: {
    type: String,
    default: ''
  },
  user: {
    type: Schema.ObjectId,
    ref: 'User'
  }
});

mongoose.model('Workshop', WorkshopSchema);
