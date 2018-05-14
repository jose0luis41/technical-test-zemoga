'use strict';

/**
 * @ngdoc overview
 * @name votesAppApp
 * @description
 * # votesAppApp
 *
 * Main module of the application.
 */
angular
  .module('votesAppApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'ngMaterial',
  ])
  .run(function($rootScope){
    
  })
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl',
        controllerAs: 'about'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
