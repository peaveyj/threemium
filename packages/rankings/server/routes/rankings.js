'use strict';

var rankings = require('../controllers/rankings');

// Ranking authorization helpers
var hasAuthorization = function(req, res, next) {
  if (!req.user.isAdmin && req.ranking.user.id !== req.user.id) {
    return res.status(401).send('User is not authorized');
  }
  next();
};

module.exports = function(Rankings, app, auth) {

  app.route('/rankings')
    .get(rankings.all)
    .post(auth.requiresLogin, rankings.create);
  app.route('/rankings/:rankingId')
    .get(auth.isMongoId, rankings.show)
    .put(auth.isMongoId, auth.requiresLogin, hasAuthorization, rankings.update)
    .delete(auth.isMongoId, auth.requiresLogin, hasAuthorization, rankings.destroy);

  // Finish with setting up the rankingId param
  app.param('rankingId', rankings.ranking);
};
