'use strict';

/*
 * Defining the Package
 */
var Module = require('meanio').Module;

var Rankings = new Module('rankings');

/*
 * All MEAN packages require registration
 * Dependency injection is used to define required modules
 */
Rankings.register(function(app, auth, database) {

  //We enable routing. By default the Package Object is passed to the routes
  Rankings.routes(app, auth, database);

  //We are adding a link to the main menu for all authenticated users
  Rankings.menus.add({
    'roles': ['authenticated'],
    'title': 'All Top 3s',
    'link': 'all rankings'
  });
  Rankings.menus.add({
    'roles': ['authenticated'],
    'title': 'Create New Top 3',
    'link': 'create ranking'
  });

  //Rankings.aggregateAsset('js','/packages/system/public/services/menus.js', {group:'footer', absolute:true, weight:-9999});
  //Rankings.aggregateAsset('js', 'test.js', {group: 'footer', weight: -1});

  /*
    //Uncomment to use. Requires meanio@0.3.7 or above
    // Save settings with callback
    // Use this for saving data from administration pages
    Rankings.settings({'someSetting':'some value'},function (err, settings) {
      //you now have the settings object
    });

    // Another save settings example this time with no callback
    // This writes over the last settings.
    Rankings.settings({'anotherSettings':'some value'});

    // Get settings. Retrieves latest saved settings
    Rankings.settings(function (err, settings) {
      //you now have the settings object
    });
    */
  Rankings.aggregateAsset('css', 'rankings.css');

  return Rankings;
});
