(function() {
  'use strict';

  angular.module('app.settings', []);


/* Rooms Controller
 -------------------------------------------------*/
  angular.module('app.settings').controller('roomCtrl', ['apiService', 'navFactory', '$routeParams', '$location', '$filter', 'logger',
    function(apiService, navFactory, $routeParams, $location, $filter, logger)
    {
      var vm = this;
      var navPath = "settings/room";

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

      vm.inactivityList = [
        {value: "0",     text: "Off"   },
        {value: 30,    text: "30 Min"  },
        {value: "40",    text: "40 Min"  },
        {value: "50",    text: "50 Min"  },
        {value: "60",    text: "60 Min"  },
        {value: "70",    text: "70 Min"  },
        {value: "80",    text: "80 Min"  },
        {value: "90",    text: "90 Min"  },
        {value: "100",   text: "100 Min"  },
        {value: "110",   text: "110 Min"  },
        {value: "120",   text: "120 Min"  },
        {value: "130",   text: "130 Min"  },
        {value: "140",   text: "140 Min"  },
        {value: "150",   text: "150 Min"  },
        {value: "160",   text: "160 Min"  },
        {value: "170",   text: "170 Min"  },
        {value: "180",   text: "180 Min"  }
      ];

      vm.showInactivityList = function(inactivitySel) {
        var selected = $filter('filter')(vm.inactivityList, {value: inactivitySel});
        return (inactivitySel && selected.length) ? selected[0].text : 'Not set';
      };
    }
  ]);


/* Help Controller
 -------------------------------------------------*/
  angular.module('app.settings').controller('helpCtrl', ['apiService','logger',
    function(apiService, logger)
    {
      var vm = this;
      vm.data = {};

      activate();


      /////////////////////

      function activate() {
        vm.data = apiService.getData('api/settings/help').then(function(data) {
          vm.data = data;
        });
      }

      vm.saveData = function() {
        apiService.saveData('api/settings/help', vm.data);
      };
    }
  ]);


  /* IR Controller
   -------------------------------------------------*/
  angular.module('app.settings').controller('irCtrl', ['apiService', 'navFactory', '$routeParams', '$location', 'logger',
    function(apiService, navFactory, $routeParams, $location, logger)
    {
      var vm = this;
      var navPath = "settings/ir";

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
    }
  ]);
}());