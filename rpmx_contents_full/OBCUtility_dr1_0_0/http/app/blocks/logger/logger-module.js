(function() {
  'use strict';

  angular.module('blocks.logger', []);
  angular.module('blocks.logger').factory('logger', logger);

  logger.$inject = ['$log'];

  function logger($log) {
    var service = {
      error   : error,
      info    : info,
      success : success,
      warning : warning,
      json    : json,
      log     : $log.log
    };

    return service;


    /////////////////////

    function error(message, data, title) {
      $log.error('Error: ' + message, data);
    }

    function info(message, data, title) {
      $log.info('Info: ' + message, data);
    }

    function success(message, data, title) {
      $log.info('Success: ' + message, data);
    }

    function warning(message, data, title) {
      $log.warn('Warning: ' + message, data);
    }

    function json(message, data, title) {
      $log.info(message + ": " + JSON.stringify(data));
    }
  }
}());