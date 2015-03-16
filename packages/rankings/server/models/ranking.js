'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema   = mongoose.Schema;

/**
 * Ranking Schema
 */
var RankingSchema = new Schema({
  created: {
    type: Date,
    default: Date.now
  },
  title: {
    type: String,
    required: true,
    trim: true
  },
  items: {
    type: Array
  },
  user: {
    type: Schema.ObjectId,
    ref: 'User'
  }
});

/**
 * Validations
 */
RankingSchema.path('title').validate(function(title) {
  return !!title;
}, 'Title cannot be blank');

/**
 * Statics
 */
RankingSchema.statics.load = function(id, cb) {
  this.findOne({
    _id: id
  }).populate('user', 'name username').exec(cb);
};

mongoose.model('Ranking', RankingSchema);
