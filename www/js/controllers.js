angular.module('starter.controllers', [])
.factory('xmlParser', function () {
  var x2js = new X2JS();
  return {
    xml2json: x2js.xml2json,
    xml_str2json_withOutBind : x2js.xml_str2json,
    xml_str2json: function (args) {
      return angular.bind(x2js, x2js.xml_str2json, args)();
    },
    json2xml: x2js.json2xml_str
  }
})
.filter('trusted', ['$sce', function ($sce) {
    return function(url) {
        return $sce.trustAsResourceUrl(url);
    };
}])
.directive('repeatDone', function () {
   return function (scope, element, attrs) {
     if (scope.$last) {
       scope.$eval(attrs.repeatDone);
     }
   }
})
.controller('AppCtrl', function($scope,$ionicModal,$timeout,$ionicLoading,$http,$localStorage,xmlParser) {
  $scope.refreshData = function(){


  }
  $scope.$on('$ionicView.enter', function(e) {
      $ionicLoading.show({
          content: 'Fetching Data',
          animation: 'fade-in',
          showBackdrop: true,
          maxWidth: 200,
          showDelay: 0
      });
      if($localStorage.jsonData == undefined || $localStorage.jsonData == null || $localStorage.jsonData ==""){
        $timeout(function () {
          $scope.refreshData();
        }, 500);
      }
  });
})

.controller('PlaylistsCtrl', function($scope,$http,$state,$ionicNavBarDelegate,$window,$localStorage,$timeout,$ionicLoading,$ionicHistory,$ionicSlideBoxDelegate) {
    document.addEventListener("deviceready", onDeviceReady, false);
    function onDeviceReady(){screen.lockOrientation('portrait');}
    $scope.loadContent = function(){
      $http.get("http://www.seriesubthai.co/category/usa-series/feed/").success(function (data) {
          var x2js = new X2JS();
          var jsonData = x2js.xml_str2json(data);
          sources = jsonData;
          $localStorage.jsonData_en = jsonData;
          $scope.playlists = sources.rss.channel.item;
          $scope.getImgPath = function(index){
            $scope.encoded = $scope.playlists[index].encoded.__cdata;
            $scope.headParam = $scope.encoded.search("uploads/");
            $scope.TailParam = $scope.encoded.search('" alt');
            $scope.middleParams = "http://www.seriesubthai.co/wp-content/"+$scope.encoded.substring($scope.headParam, $scope.TailParam);
            return $scope.middleParams;
          }
          $scope.getLength = function(){
            $scope.row = $scope.playlists.length;
            getRowCount = $scope.playlists.length;
            $scope.newwidth = $scope.row*168;
            return $scope.newwidth;
          }
      });
      $http.get("http://www.seriesubthai.co/category/korea-series/feed/").success(function (datakorea) {
          var x2js = new X2JS();
          var jsonDatakorea = x2js.xml_str2json(datakorea);
          korea = jsonDatakorea;
          $scope.playlistskorea = korea.rss.channel.item;
          $localStorage.jsonDatakorea = jsonDatakorea;
          $scope.getImgPathkorea = function(index){
            $scope.encoded = $scope.playlistskorea[index].encoded.__cdata;
            $scope.headParam = $scope.encoded.search("uploads/");
            $scope.TailParam = $scope.encoded.search('" alt');
            $scope.middleParams = "http://www.seriesubthai.co/wp-content/"+$scope.encoded.substring($scope.headParam, $scope.TailParam);
            return $scope.middleParams;
          }
          $scope.getLengthkorea = function(){
            $scope.row = $scope.playlistskorea.length;
            getRowCount = $scope.playlistskorea.length;
            $scope.newwidth = $scope.row*168;
            return $scope.newwidth;
          }
      });
      $http.get("http://www.seriesubthai.co/category/japan-series/feed/").success(function (datajapan) {
          var x2js = new X2JS();
          var jsonDatajapan = x2js.xml_str2json(datajapan);
          japan = jsonDatajapan;
          $scope.playlistsjapan = japan.rss.channel.item;
          $localStorage.jsonDatajapan = jsonDatajapan;
          $scope.getImgPathjapan = function(index){
            $scope.encoded = $scope.playlistsjapan[index].encoded.__cdata;
            $scope.headParam = $scope.encoded.search("uploads/");
            $scope.TailParam = $scope.encoded.search('" alt');
            $scope.middleParams = "http://www.seriesubthai.co/wp-content/"+$scope.encoded.substring($scope.headParam, $scope.TailParam);
            return $scope.middleParams;
          }
          $scope.getLengthjapan = function(){
            $scope.row = $scope.playlistsjapan.length;
            getRowCount = $scope.playlistsjapan.length;
            $scope.newwidth = $scope.row*168;
            return $scope.newwidth;
          }
      });
      $http.get("http://www.seriesubthai.co/category/chinese-series/feed/").success(function (datachina) {
          var x2js = new X2JS();
          var jsondatachina = x2js.xml_str2json(datachina);
          china = jsondatachina;
          $localStorage.jsonDatachina = jsondatachina;
          $scope.playlistschina = china.rss.channel.item;
          $scope.getImgPathchina = function(index){
            $scope.encoded = $scope.playlistschina[index].encoded.__cdata;
            $scope.headParam = $scope.encoded.search("uploads/");
            $scope.TailParam = $scope.encoded.search('" alt');
            $scope.middleParams = "http://www.seriesubthai.co/wp-content/"+$scope.encoded.substring($scope.headParam, $scope.TailParam);
            return $scope.middleParams;
          }
          $scope.getLengthchina = function(){
            $scope.row = $scope.playlistschina.length;
            getRowCount = $scope.playlistschina.length;
            $scope.newwidth = $scope.row*168;
            return $scope.newwidth;
          }
          $ionicLoading.hide();
      });

    };
    $scope.options = {loop: true };
    $scope.repeatDone = function() {  $ionicSlideBoxDelegate.update(); };
    $scope.$on('$ionicView.enter', function(e) {
        $ionicNavBarDelegate.showBar(true);
        $ionicLoading.show({
            content: 'Fetching Data',
            animation: 'fade-in',
            showBackdrop: true,
            maxWidth: 200,
            showDelay: 0
        });
    });
    $scope.$on('$ionicView.afterEnter', function(){
      setTimeout( function() {
            $ionicLoading.hide();
      }, 1000);
    });
    $scope.loadContent();
})

.controller('ContentCtrl', function($scope,$stateParams,$http,$sce,$stateParams,$state,$localStorage,$ionicHistory,$timeout,$ionicLoading,$ionicNavBarDelegate) {

  $scope.$on('$ionicView.enter', function(e) {
      $ionicNavBarDelegate.showBar(true);
      $ionicLoading.show({
          content: 'Fetching Data',
          animation: 'fade-in',
          showBackdrop: true,
          maxWidth: 200,
          showDelay: 0
      });
  });
  $scope.$on('$ionicView.afterEnter', function(){
    $scope.cate_id = $stateParams.cate_id;
    $scope.index_id = $stateParams.index;
    $scope.cuts = $stateParams.cuts;
    if($scope.cate_id == 1){
      $scope.uri = "http://www.seriesubthai.co/category/usa-series/feed/";
    }else if($scope.cate_id == 2){
      $scope.uri = "http://www.seriesubthai.co/category/korea-series/feed/";
    }else if($scope.cate_id == 3){
      $scope.uri = "http://www.seriesubthai.co/category/japanese-series/feed/";
    }else{
      $scope.uri = "http://www.seriesubthai.co/category/chinese-series/feed/";
    }
    $http.get($scope.uri).success(function (datajapan) {
      $ionicLoading.hide();
        var x2js = new X2JS();
        var jsonDatajapan = x2js.xml_str2json(datajapan);
        japan = jsonDatajapan;
        console.log(JSON.stringify(jsonDatajapan));
        $scope.playlistsjapan = jsonDatajapan.rss.channel.item;
        $scope.contentdata = jsonDatajapan.rss.channel.item;
        $scope.enclosure_list = $scope.contentdata[$scope.index_id].enclosure;
        $scope.enclosure_list_length = $scope.contentdata[$scope.index_id].enclosure.length;
        $scope.title = $scope.contentdata[$scope.index_id].title;
        $scope.MediaFiles = $scope.contentdata[$scope.index_id].enclosure[$scope.cuts]._url;
        $scope.mediaType = $scope.contentdata[$scope.index_id].enclosure[$scope.cuts]._type;
        console.log($scope.MediaFiles);
        $scope.getImgPathcontent = function(index){
          $scope.encoded = $scope.contentdata[$scope.index_id].encoded.__cdata;
          $scope.headParam = $scope.encoded.search("uploads/");
          $scope.TailParam = $scope.encoded.search('" alt');
          $scope.middleParams = "http://www.seriesubthai.co/wp-content/"+$scope.encoded.substring($scope.headParam, $scope.TailParam);
          return $scope.middleParams;
        }

    });
  });

});
