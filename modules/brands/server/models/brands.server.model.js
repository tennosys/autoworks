'use strict';

/**
 * Module dependencies
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Brand Schema
 */
var BrandSchema = new Schema({
  created: {
    type: Date,
    default: Date.now
  },
  brand: {
    type: String,
    default: '',
    trim: true,
    required: 'Brand cannot be blank'
  },
  description: {
    type: String,
    default: '',
    trim: true
  },
  user: {
    type: Schema.ObjectId,
    ref: 'User'
  }
});

mongoose.model('Brand', BrandSchema);
