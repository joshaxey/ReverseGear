(function() {

/* Routes
 -------------------------------------------------*/
  angular.module('app').config(['$routeProvider',
    function($routeProvider) {
      $routeProvider.
        when('/', {
          title: 'RPM - Home',
          templateUrl: 'app/dashboard/home.html',
          controller: 'homeCtrl'
        }).
        when('/settings/room', {
          title: 'RPM - Settings Room',
          templateUrl: 'app/settings/room.html',
          controller: 'roomCtrl'
        }).
        when('/settings/room/:manifestID', {
          title: 'RPM - Settings Room',
          templateUrl: 'app/settings/room.html',
          controller: 'roomCtrl'
        }).
        when('/settings/help', {
          title: 'RPM - Settings Help',
          templateUrl: 'app/settings/help.html',
          controller: 'helpCtrl'
        }).
        when('/settings/ir', {
          title: 'RPM - IR Settings',
          templateUrl: 'app/settings/ir.html',
          controller: 'irCtrl'
        }).
        when('/settings/ir/:manifestID', {
          title: 'RPM - IR Settings',
          templateUrl: 'app/settings/ir.html',
          controller: 'irCtrl'
        }).
        when('/environment/screen', {
          title: 'RPM - Environment Screen',
          templateUrl: 'app/environment/screen.html',
          controller: 'screenCtrl'
        }).
        when('/environment/screen/:manifestID', {
          title: 'RPM - Environment Screen',
          templateUrl: 'app/environment/screen.html',
          controller: 'screenCtrl'
        }).
        when('/environment/lift', {
          title: 'RPM - Environment Lift',
          templateUrl: 'app/environment/lift.html',
          controller: 'liftCtrl'
        }).
        when('/environment/lift/:manifestID', {
          title: 'RPM - Environment Lift',
          templateUrl: 'app/environment/lift.html',
          controller: 'liftCtrl'
        }).
        when('/environment/shade', {
          title: 'RPM - Environment Shade',
          templateUrl: 'app/environment/shade.html',
          controller: 'shadeCtrl'
        }).
        when('/environment/shade/:manifestID', {
          title: 'RPM - Environment Shade',
          templateUrl: 'app/environment/shade.html',
          controller: 'shadeCtrl'
        }).
        when('/environment/lighting', {
          title: 'RPM - Environment Lighting',
          templateUrl: 'app/environment/lts.html',
          controller: 'ltsCtrl'
        }).
        when('/environment/lighting/:manifestID', {
          title: 'RPM - Environment Lighting',
          templateUrl: 'app/environment/lts.html',
          controller: 'ltsCtrl'
        }).
        otherwise({
          redirectTo: '/'
        });
    }]);


  /* App Title
   --------------------------------------------------*/
  angular.module('app').run(['$location', '$rootScope',
    function($location, $rootScope) {
      $rootScope.$on('$routeChangeSuccess', function (event, current, previous) {
        $rootScope.title = current.title;
      });
    }]);
}());
