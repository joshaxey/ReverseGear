/*------------------------------------------------
  NavBar
--------------------------------------------------*/
angular.module('app').controller('NavbarCtrl', function ($scope, $location, navbarData) {

  $scope.navItems = navbarData.getNavbar();
  $scope.navItems.then(function(data) { $scope.navItems = data;});

  $scope.isItemActive = function (path) {
    if ($location.path().substr(0, path.length) == path) {
      if (path == "/" && $location.path() == "/") {
        return true;
      }
      else if (path == "/") {
        return false;
      }
      return true;
    }
    else {
      return false;
    }
  }

  $scope.hasItemType = function (parent, type) {
    for (var i = 0; i < $scope.navItems.length; i++) {
      if (($scope.navItems[i].parent === parent) && $scope.navItems[i].type === type) {
        return true;
      }
    }
    return false;
  }

  $scope.hasList = function () {
    for (var i = 0; i < $scope.navItems.length; i++) {
      if (($scope.navItems[i].parent === 'list') && (($scope.navItems[i].type === 'spd') || ($scope.navItems[i].type === 'fav'))) {
        return true;
      }
    }
    return false;
  }
});


/*------------------------------------------------
 Configuration
 -------------------------------------------------*/
angular.module('app').controller('ConfigureSourceCtrl', function ($scope, $routeParams) {
  $scope.parent = $routeParams.parentId;
  $scope.type = $routeParams.typeId;
});


/*------------------------------------------------
 Diagnostics
 -------------------------------------------------*/
angular.module('app').controller('DiagnosticsCtrl', function ($scope, $routeParams) {
});


/*------------------------------------------------
 Lists
 -------------------------------------------------*/
angular.module('app').controller('ListCtrl', function ($scope, $routeParams) {
  $scope.parent = $routeParams.parentId;
  $scope.list = $routeParams.listId;
});


