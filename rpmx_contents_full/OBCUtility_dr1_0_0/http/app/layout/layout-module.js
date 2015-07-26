(function() {
  'use strict';

  angular.module('app.layout', []);


/* Layout Controller
 --------------------------------------------------*/
  angular.module('app.layout').controller('layoutCtrl', ['apiService','manifestFactory','$rootScope','$timeout', 'appConfig', 'logger', '$location',
    function(apiService, manifestFactory, $rootScope, $timeout, appConfig, logger, $location)
    {
      var vm = this;

      vm.title = appConfig.appTitle;
      vm.version = appConfig.version;

      vm.showSplash = true;

      $rootScope.$on('LOADING'   , function(){
        vm.isLoading = true;
        vm.loadingError = false;
      });
      $rootScope.$on('LOADED'    , function(){
        vm.isLoading = false;
        vm.loadingError = false;
      });
      $rootScope.$on('LOAD_ERROR', function(){
        vm.showSplash = false;
        vm.isLoading  = false;
        vm.loadingError = true;
      });

      activate();


      /////////////////////

      function activate() {
        vm.manifest = apiService.getData('api/manifest').then(function (data) {
          manifestFactory.set(data);

          logger.success(appConfig.appTitle + ' loaded!', null);
          showDefault();
          hideSplash();
        });
      }

      function showDefault() {
        $location.path('/');
      }

      function hideSplash() {
        //Force a 2 second delay so we can see the splash.
        $timeout(function () {
          vm.showSplash = false;
        }, 2000);
      }
    }
  ]);



/* Navigation Controller
 --------------------------------------------------*/
  angular.module('app.layout').controller('navCtrl', ['navFactory', '$location',
    function(navFactory, $location)
    {
      var vm = this;

      activate();

      vm.hasNavChildren = function(navTop) {
        return(navFactory.getNavTopHasChildren(navTop));
      };

      vm.hasNavItems = function(navPath) {
        var navItem = navFactory.getNavByPath(navPath);
        return(navFactory.anyOnManifest(navItem));
      };

      vm.isInPath = function(navPath){
        return($location.path().indexOf(navPath) > -1);
      };

      vm.isActive = function(navPath) {
        if ($location.path().substr(0, navPath.length) == navPath) {
          if (navPath == "/" && $location.path() == "/") {
            return true;
          }
          else if (navPath == "/") {
            return false;
          }
          return true;
        }
        else {
          return false;
        }
      };


      /////////////////////

      function activate() {
      }
    }
  ]);
}());