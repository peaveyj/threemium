'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Ranking = mongoose.model('Ranking'),
  _ = require('lodash');


/**
 * Find ranking by id
 */
exports.ranking = function(req, res, next, id) {
  Ranking.load(id, function(err, ranking) {
    if (err) return next(err);
    if (!ranking) return next(new Error('Failed to load ranking ' + id));
    req.ranking = ranking;
    next();
  });
};

/**
 * Create an ranking
 */
exports.create = function(req, res) {
  var ranking = new Ranking(req.body);
  ranking.user = req.user;

  ranking.save(function(err) {
    if (err) {
      return res.status(500).json({
        error: 'Cannot save the ranking'
      });
    }
    res.json(ranking);

  });
};

/**
 * Update an ranking
 */
exports.update = function(req, res) {
  var ranking = req.ranking;

  ranking = _.extend(ranking, req.body);

  ranking.save(function(err) {
    if (err) {
      return res.status(500).json({
        error: 'Cannot update the ranking'
      });
    }
    res.json(ranking);

  });
};

/**
 * Delete an ranking
 */
exports.destroy = function(req, res) {
  var ranking = req.ranking;

  ranking.remove(function(err) {
    if (err) {
      return res.status(500).json({
        error: 'Cannot delete the ranking'
      });
    }
    res.json(ranking);

  });
};

/**
 * Show an ranking
 */
exports.show = function(req, res) {
  res.json(req.ranking);
};

/**
 * List of Rankings
 */
exports.all = function(req, res) {
  Ranking.find().sort('-created').populate('user', 'name username').exec(function(err, rankings) {
    if (err) {
      return res.status(500).json({
        error: 'Cannot list the rankings'
      });
    }
    res.json(rankings);

  });
};
