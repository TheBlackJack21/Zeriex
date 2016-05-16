var sources,korea,china,japan;
angular.module('starter', ['ionic', 'starter.controllers', 'ngCordova','ngStorage', 'ngCordovaOauth','ImgCache','ngSanitize'])
.run(function($ionicPlatform,ImgCache) {
  $ionicPlatform.ready(function() {
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if (window.StatusBar) {
      StatusBar.styleDefault();
    }
    $ionicPlatform.ready(function() {
        ImgCache.$init();
    });
  });
})

.config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider) {
  $ionicConfigProvider.scrolling.jsScrolling(false);
  $stateProvider
  .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'AppCtrl'
  })
  .state('app.playlists', {
      url: '/playlists',
      views: {
        'menuContent': {
          templateUrl: 'templates/playlists.html',
          controller: 'PlaylistsCtrl'
        }
      }
    })
  .state('app.single', {
    url: '/playlists/{cate_id:int}/{index:int}/{cuts:int}',
    views: {
      'menuContent': {
        templateUrl: 'templates/playlist.html',
        controller: 'ContentCtrl'
      }
    }
  });
  $urlRouterProvider.otherwise('/app/playlists');
});
