(function() {
    'use strict';

  angular.module('app.dashboard', []);


/* Home Controller
 -------------------------------------------------*/
  angular.module('app.dashboard').controller('homeCtrl', ['apiService', 'appConfig',
    function(apiService, appConfig)
    {
      var vm = this;
      vm.data = {};

      activate();


      /////////////////////

      function activate() {
        vm.data = apiService.getData('api/versions').then(function (data) {
          vm.data = data;
          vm.data.obc = appConfig.version;
        });
      }
    }
  ]);
}());