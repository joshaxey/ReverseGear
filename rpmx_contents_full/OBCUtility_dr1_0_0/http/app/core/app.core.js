(function() {
  'use strict';

  angular.module('app.core', [
    /*----- Angular modules -----*/
    'ngRoute',
    /*----- Reusable cross app code modules -----*/
    'blocks.logger',
    /*----- Vendor Moduless -----*/
    'xeditable'
  ]);


/* App Configuration
 --------------------------------------------------*/
  angular.module('app.core').value('appConfig',
    {
      appTitle: 'RPM Configuration Manager',
      version:  '1.0.3',
      devMode:  true
    });


/* API Service
 -------------------------------------------------*/
  angular.module('app.core').factory('apiService', ['$http', '$q', 'spinner', 'appConfig', 'logger',
    function($http, $q, spinner, appConfig, logger)
    {
      return {
        getData: function (url) {
          var deferred = $q.defer();

          spinner.loading();
          $http({method: 'GET', url: url}).
            success(function (data, status, headers, config) {
              deferred.resolve(data);
              spinner.loaded();

              if(appConfig.devMode == true)
                logger.json('getData(' + url + ')', data);
            }).
            error(function (data, status, headers, config) {
              deferred.reject(data);
              spinner.error();

              if(appConfig.devMode == true)
                logger.error('getData(' + url + ')');
            });
          return deferred.promise;
        },
        saveData: function (url, data) {
          var deferred = $q.defer();

          $http({method: 'POST', url: url, data: data}).
            success(function (data, status, headers, config) {
              deferred.resolve(data);

              if(appConfig.devMode == true)
                logger.json('saveData(' + url + ')', data);
            }).
            error(function (data, status, headers, config) {
              deferred.reject(data);

              if(appConfig.devMode == true)
                logger.error('saveData(' + url + ')');
            });
        }
      };
    }
  ]);


/* Spinner
 -------------------------------------------------*/
  angular.module('app.core').factory('spinner', ['$rootScope',
    function($rootScope)
    {
      return{
        loading: function() {
          $rootScope.$emit('LOADING');
        },
        loaded: function() {
          $rootScope.$emit('LOADED');
        },
        error: function() {
          $rootScope.$emit('LOAD_ERROR');
        }
      };
    }
  ]);



  /* Manifest Factory
   --------------------------------------------------*/
  angular.module('app.core').factory('manifestFactory', [
    function()
    {
      var manifest = [];

      function _isOnManifest(url, manifestID) {
        for(var i=0, len=manifest.length; i<len; i++) {
          if(manifest[i] == url + '/' + manifestID)
            return(true);
        }

        for(var i=0, len=manifest.length; i<len; i++) {
          if(manifest[i] == url)
            return(true);
        }

        return(false);
      }

      return{
        set: function(data) {
          manifest = data;
        },
        get: function() {
          return(manifest);
        },
        isOnManifest: _isOnManifest,
        anyOnManifest: function(navItem) {
          for(var i=0, len=navItem.manifest.length; i<len; i++) {
            if(_isOnManifest(navItem.url, navItem.manifest[i]))
              return(true);
          }
          return(false);
        }
      };
    }
  ]);



  /* Navigation Factory
   --------------------------------------------------*/
  angular.module('app.core').factory('navFactory', [ 'manifestFactory',
    function(manifestFactory)
    {
      var nav = [];

      nav.push({ url: "settings/room" ,       manifest: ['room1','room2'],
                                                 label: ['Room 1','Room 2'] });
      nav.push({ url: "settings/panel",       manifest: ['pnl1','pnl2','pnl3','pnl4'],
                                                 label: ['Panel 1','Panel 2','Panel 3','Panel 4'] });
      nav.push({ url: "settings/help",        manifest: [''],
                                                 label: [''] } );
      nav.push({ url: "settings/delay",       manifest: [''],
                                                 label: [''] } );
      nav.push({ url: "settings/ir",          manifest: ['dvd1', 'dvd2','vcr1', 'vcr2','tnr1', 'tnr2','dvr1', 'dvr2','doc1', 'doc2','cam1', 'cam2', 'cam3', 'cam4'],
                                                 label: ['DVD1', 'DVD2','VCR1', 'VCR2','TNR1', 'TNR2','DVR1', 'DVR2','DOC1', 'DOC2','CAM1', 'CAM2', 'CAM3', 'CAM4'] });

      nav.push({ url: "environment/screen",   manifest: ['screen1','screen2','screen3','screen4','screen5','screen6' ],
                                                 label: ['Screen 1','Screen 2','Screen 3','Screen 4','Screen 5','Screen 6'] });
      nav.push({ url: "environment/lift",     manifest: ['lift1','lift2','lift3','lift4','lift5','lift6' ],
                                                 label: ['Lift 1','Lift 2','Lift 3','Lift 4','Lift 5','Lift 6'] });
      nav.push({ url: "environment/shade",    manifest: ['shade1','shade2'],
                                                 label: ['Shade 1','Shade 2'] });
      nav.push({ url: "environment/lighting", manifest: ['lts1'],
                                                 label: ['Lts 1'] });

      nav.push({ url: "devices/backend",     manifest: ['dvx','swt1','pdu1' ],
                                                label: ['DVX','Switcher 1','PDU 1'] });
      nav.push({ url: "devices/source",      manifest: ['atc1','cam1','cam2','cam3','cam4','doc1','doc2','dvd1','dvd2','dvr1','dvr2','encoder1','encoder2','enzo1','enzo2','tnr1','tnr2','vcr1','vcr2','vtc1','vtc2' ],
                                                label: ['ATC 1','Camera 1','Camera 2','Camera 3','Camera 4','Doc Cam 1','Doc Cam 2','DVD 1','DVD 2','DVR 1','DVR 2','Encoder 1','Encoder 2','Enzo 1','Enzo 2','Tuner 1','Tuner 2','VCR 1','VCR 2','VTC 1','VTC 2'] });
      nav.push({ url: "devices/destination", manifest: ['disp1','disp2','disp3','disp4','disp5','disp6' ],
                                                label: ['Display 1','Display 2','Display 3','Display 4','Display 5','Display 6'] });

      nav.push({ url: "lists/atc", manifest: ['pb_atc' ], label: ['Telephone Phonebook'] });
      nav.push({ url: "lists/vtc", manifest: ['pb_vtc' ], label: ['Video Phonebook'] });
      nav.push({ url: "lists/tnr", manifest: ['fav_tnr'], label: ['Tuner Favs'] });
      nav.push({ url: "lists/dvr", manifest: ['fav_dvr'], label: ['DVR Favs'] });

      function _getNavTopHasChildren (navTop) {
        for (var i= 0, len=nav.length; i < len; i++) {
          if(nav[i].url.indexOf(navTop) > -1) {
            for (var i2= 0, len2=nav[i].manifest.length; i2 < len2; i2++) {
              if(manifestFactory.isOnManifest(nav[i].url, nav[i].manifest[i2]))
                return(true);
            }
          }
        }

        return(false);
      }

      function _getNavByPath (navPath) {
        for (var i= 0, len=nav.length; i < len; i++) {
          if(nav[i].url === navPath)
            return(nav[i]);
        }

        return(false);
      }
      
      function _getSubNav (manifestID) {
        for (var i= 0, len=nav.length; i < len; i++) {
          for (var i2= 0, len2=nav[i].manifest.length; i2 < len2; i2++) {
            if(nav[i].manifest[i2] === manifestID) {
              return{
                manifestID: manifestID,
                     label: nav[i].label[i2],
                       url: nav[i].url + "/" + manifestID
              };
            }
          }
        }

        return(false);
      }

      function _getSubNavList (navPath) {
        var navItem = _getNavByPath (navPath);
        var subNavList = [];

        if(navItem) {
          for (var i=0, len=navItem.manifest.length; i < len; i++) {
            if(manifestFactory.isOnManifest(navItem.url, navItem.manifest[i])) {
              var values = {};

              values.manifestID = navItem.manifest[i];
              values.label      = navItem.label[i];
              values.url        = navItem.url + "/" + navItem.manifest[i];

              subNavList.push(values);
            }
          }

          return(subNavList);
        }

        return(false);
      }

      function _isInSubNavList (navPath, manifestID) {
        var subNavList = _getSubNavList (navPath);
        for (var i=0, len=subNavList.length; i < len; i++) {
          if (subNavList[i].manifestID === manifestID)
            return(true);
        }

        return(false);
      }

      return{
        anyOnManifest: function(navItem) {
          return(manifestFactory.anyOnManifest(navItem));
        },
        getNavTopHasChildren: _getNavTopHasChildren,
        getNavByPath: _getNavByPath,
        getSubNav: _getSubNav,
        getSubNavList: _getSubNavList,
        isInSubNavList: _isInSubNavList,
        getFirstSubNav: function(navPath) {
          var subNavList = _getSubNavList(navPath);
          return(subNavList[0].manifestID)
        }
      };
    }
  ]);
}());