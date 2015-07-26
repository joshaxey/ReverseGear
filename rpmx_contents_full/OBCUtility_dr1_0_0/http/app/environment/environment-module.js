(function() {
  'use strict';

  angular.module('app.environment', []);


  /* Screen Controller
   -------------------------------------------------*/
  angular.module('app.environment').controller('screenCtrl', ['apiService', 'navFactory', '$routeParams', '$location', '$filter', 'logger',
    function(apiService, navFactory, $routeParams, $location, $filter, logger)
    {
      var vm = this;
      var navPath = "environment/screen";

      vm.subNavSelected = {};
      vm.subNavList     = [];
      vm.data           = {};

      activate();


      /////////////////////

      function activate() {
        var manifestID = $routeParams.manifestID;
        var retVal = {};

        if(!routeValid(navPath, manifestID, retVal)) {
          $location.path(retVal.redirectTo);
          return;
        }

        vm.subNavSelected = navFactory.getSubNav(manifestID);
        vm.subNavList = navFactory.getSubNavList(navPath);

        vm.data = apiService.getData('api/' + vm.subNavSelected.url).then(function (data) {
          vm.data = data;
        });
      }

      vm.saveData = function() {
        apiService.saveData('api/' + vm.subNavSelected.url, vm.data);
        logger.json('saveData(api/' + vm.subNavSelected.url + ')', vm.data);
      };


      //-- View Helpers --
      function routeValid(navPath, manifestID, retVal) {
        if((typeof manifestID != 'undefined') && navFactory.isInSubNavList(navPath, manifestID)) {
          return(true);
        }

        if((typeof manifestID == 'undefined') && navFactory.getFirstSubNav(navPath)) {
          retVal.redirectTo = navPath + "/" + navFactory.getFirstSubNav(navPath);
          return(false);
        }

        retVal.redirectTo = "/";
        return(false);
      }

      vm.actions = [
        {value: "pulse",     text: "Pulsed"   },
        {value: "latch",     text: "Latching" },
        {value: "timed",     text: "Timed"    },
        {value: "momentary", text: "Momentary"}
      ];

      vm.showActions = function(relayAction) {
        var selected = $filter('filter')(vm.actions, {value: relayAction});
        return (relayAction && selected.length) ? selected[0].text : 'Not set';
      };
    }
  ]);


  /* Lift Controller
   -------------------------------------------------*/
  angular.module('app.environment').controller('liftCtrl', ['apiService', 'navFactory', '$routeParams', '$location', '$filter', 'logger',
    function(apiService, navFactory, $routeParams, $location, $filter, logger)
    {
      var vm = this;
      var navPath = "environment/lift";

      vm.subNavSelected = {};
      vm.subNavList     = [];
      vm.data           = {};

      activate();


      /////////////////////

      function activate() {
        var manifestID = $routeParams.manifestID;
        var retVal = {};

        if(!routeValid(navPath, manifestID, retVal)) {
          $location.path(retVal.redirectTo);
          return;
        }

        vm.subNavSelected = navFactory.getSubNav(manifestID);
        vm.subNavList = navFactory.getSubNavList(navPath);

        vm.data = apiService.getData('api/' + vm.subNavSelected.url).then(function (data) {
          vm.data = data;
        });
      }

      vm.saveData = function() {
        apiService.saveData('api/' + vm.subNavSelected.url, vm.data);
        logger.json('saveData(api/' + vm.subNavSelected.url + ')', vm.data);
      };


      //-- View Helpers --
      function routeValid(navPath, manifestID, retVal) {
        if((typeof manifestID != 'undefined') && navFactory.isInSubNavList(navPath, manifestID)) {
          return(true);
        }

        if((typeof manifestID == 'undefined') && navFactory.getFirstSubNav(navPath)) {
          retVal.redirectTo = navPath + "/" + navFactory.getFirstSubNav(navPath);
          return(false);
        }

        retVal.redirectTo = "/";
        return(false);
      }

      vm.actions = [
        {value: "pulse",     text: "Pulsed"   },
        {value: "latch",     text: "Latching" },
        {value: "timed",     text: "Timed"    },
        {value: "momentary", text: "Momentary"}
      ];

      vm.showActions = function(relayAction) {
        var selected = $filter('filter')(vm.actions, {value: relayAction});
        return (relayAction && selected.length) ? selected[0].text : 'Not set';
      };
    }
  ]);


  /* Shade Controller
   -------------------------------------------------*/
  angular.module('app.environment').controller('shadeCtrl', ['apiService', 'navFactory', '$routeParams', '$location', '$filter', 'logger',
    function(apiService, navFactory, $routeParams, $location, $filter, logger)
    {
      var vm = this;
      var navPath = "environment/shade";

      vm.subNavSelected = {};
      vm.subNavList     = [];
      vm.data           = {};

      activate();


      /////////////////////

      function activate() {
        var manifestID = $routeParams.manifestID;
        var retVal = {};

        if(!routeValid(navPath, manifestID, retVal)) {
          $location.path(retVal.redirectTo);
          return;
        }

        vm.subNavSelected = navFactory.getSubNav(manifestID);
        vm.subNavList = navFactory.getSubNavList(navPath);

        vm.data = apiService.getData('api/' + vm.subNavSelected.url).then(function (data) {
          vm.data = data;
        });
      }

      vm.saveData = function() {
        apiService.saveData('api/' + vm.subNavSelected.url, vm.data);
        logger.json('saveData(api/' + vm.subNavSelected.url + ')', vm.data);
      };


      //-- View Helpers --
      function routeValid(navPath, manifestID, retVal) {
        if((typeof manifestID != 'undefined') && navFactory.isInSubNavList(navPath, manifestID)) {
          return(true);
        }

        if((typeof manifestID == 'undefined') && navFactory.getFirstSubNav(navPath)) {
          retVal.redirectTo = navPath + "/" + navFactory.getFirstSubNav(navPath);
          return(false);
        }

        retVal.redirectTo = "/";
        return(false);
      }

      vm.actions = [
        {value: "pulse",     text: "Pulsed"   },
        {value: "latch",     text: "Latching" },
        {value: "timed",     text: "Timed"    },
        {value: "momentary", text: "Momentary"}
      ];

      vm.showActions = function(relayAction) {
        var selected = $filter('filter')(vm.actions, {value: relayAction});
        return (relayAction && selected.length) ? selected[0].text : 'Not set';
      };
    }
  ]);


  /* Lights Controller
   -------------------------------------------------*/
  angular.module('app.environment').controller('ltsCtrl', ['apiService', 'navFactory', '$routeParams', '$location', '$filter', 'logger',
    function(apiService, navFactory, $routeParams, $location, $filter, logger)
    {
      var vm = this;
      var navPath = "environment/lighting";

      vm.subNavSelected = {};
      vm.subNavList     = [];
      vm.data           = {};

      activate();


      /////////////////////

      function activate() {
        var manifestID = $routeParams.manifestID;
        var retVal = {};

        if(!routeValid(navPath, manifestID, retVal)) {
          $location.path(retVal.redirectTo);
          return;
        }

        vm.subNavSelected = navFactory.getSubNav(manifestID);
        vm.subNavList = navFactory.getSubNavList(navPath);

        vm.data = apiService.getData('api/' + vm.subNavSelected.url).then(function (data) {
          vm.data = data;
        });
      }

      vm.saveData = function() {
        apiService.saveData('api/' + vm.subNavSelected.url, vm.data);
        logger.json('saveData(api/' + vm.subNavSelected.url + ')', vm.data);
      };


      //-- View Helpers --
      function routeValid(navPath, manifestID, retVal) {
        if((typeof manifestID != 'undefined') && navFactory.isInSubNavList(navPath, manifestID)) {
          return(true);
        }

        if((typeof manifestID == 'undefined') && navFactory.getFirstSubNav(navPath)) {
          retVal.redirectTo = navPath + "/" + navFactory.getFirstSubNav(navPath);
          return(false);
        }

        retVal.redirectTo = "/";
        return(false);
      }

      vm.actions = [
        {value: "pulse",     text: "Pulsed"   },
        {value: "latch",     text: "Latching" },
        {value: "timed",     text: "Timed"    },
        {value: "momentary", text: "Momentary"}
      ];

      vm.showActions = function(relayAction) {
        var selected = $filter('filter')(vm.actions, {value: relayAction});
        return (relayAction && selected.length) ? selected[0].text : 'Not set';
      };
    }
  ]);
}());