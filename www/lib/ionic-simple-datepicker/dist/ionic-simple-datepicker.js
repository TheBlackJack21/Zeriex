/*! ionic-simple-datepicker.js v0.1.3 28-01-2016 */
(function(window, angular, moment, undefined) {
  "use strict";
  var NOOP = function() {};
  var simpleDatepicker, ionicSimpleDatepicker;
  // simple datepicker (without ionic dependency)
  simpleDatepicker = angular.module("simple-datepicker", []);
  simpleDatepicker.directive("simpleDatepicker", [ function() {
    var DEFAULT_MOMENT_FORMAT = "YYYY-MM-DD";
    var DEFAULT_CURRENT_MONTH_FORMAT = "MMMM YY";
    var DEFAULT_WEEKDAY_HEADER_FORMAT = "dd";
    var DAYS_PER_WEEK = 7;
    var DEFAULT_PREV_LABEL = "<";
    var DEFAULT_NEXT_LABEL = ">";
    var DEFAULT_CLOSE_LABEL = "X";
    return {
      restrict: "E",
      template: '<div class="simple-datepicker"><div class="simple-datepicker__month-picker"><div class="button-bar"><button class="button" ng-click="goToPreviousMonth()" ng-disabled="! hasPrevMonth()" ng-bind="prevButtonLabel"></button><button class="button" ng-click="goToNextMonth()" ng-disabled="! hasNextMonth()" ng-bind="nextButtonLabel"></button></div></div><div class="simple-datepicker__month"><h1 ng-bind="getCurrentMonth()"></h1></div><div class="simple-datepicker__calendar"><div class="simple-datepicker__calendar__date-header" ng-bind="weekday" ng-repeat="weekday in weekdays track by $index"></div><div class="simple-datepicker__calendar__date" ng-repeat="day in days track by $index" ng-class="{ \'simple-datepicker__calendar__date--not-current-month\': ! day.isInCurrentMonth, \'simple-datepicker__calendar__date--not-in-timeframe\': ! day.isInTimeframe, \'simple-datepicker__calendar__date--selected\': day.date == current, \'simple-datepicker__calendar__date--not-active\': ! day.active }" ng-bind="day.label" ng-click="setSelectedDay(day)"></div></div><div class="simple-datepicker__footer"><button class="button button-full simple-datepicker__footer__close" ng-bind="closeButtonLabel" ng-click="close()"></button></div></div>',
      scope: {
        initial: "=?",
        from: "=?",
        to: "=?",
        format: "=?",
        weekdayFormat: "=?",
        labels: "=?",
        activeDays: "=?",
        onSelected: "&",
        onClose: "&"
      },
      link: function($scope) {
        var i;
        // private
        function _generateWeekdays(eFormat) {
          var format = eFormat || DEFAULT_WEEKDAY_HEADER_FORMAT;
          $scope.weekdays = [];
          for (i = 0; i < DAYS_PER_WEEK; i++) {
            $scope.weekdays.push(moment().weekday(i).format(format));
          }
        }
        // public
        $scope.days = [];
        $scope.weekdays = [];
        $scope.prevButtonLabel = DEFAULT_PREV_LABEL;
        $scope.nextButtonLabel = DEFAULT_NEXT_LABEL;
        $scope.closeButtonLabel = DEFAULT_CLOSE_LABEL;
        $scope.setSelectedDay = function(eDay) {
          if (eDay.active) {
            $scope.current = eDay.date;
            $scope.onSelected({
              current: moment($scope.current).format()
            });
          }
        };
        $scope.goToPreviousMonth = function() {
          $scope.focus = moment($scope.focus).subtract(1, "month").format();
        };
        $scope.goToNextMonth = function() {
          $scope.focus = moment($scope.focus).add(1, "month").format();
        };
        $scope.hasPrevMonth = function() {
          return $scope.from ? moment($scope.focus).startOf("month").isAfter($scope.from) : true;
        };
        $scope.hasNextMonth = function() {
          return $scope.to ? moment($scope.focus).endOf("month").isBefore($scope.to) : true;
        };
        $scope.getCurrentMonth = function() {
          return moment($scope.focus).format(DEFAULT_CURRENT_MONTH_FORMAT);
        };
        $scope.close = function() {
          $scope.onClose({
            current: moment($scope.current).format()
          });
        };
        // watchers
        $scope.$watch("labels", function(dLabels) {
          if (dLabels) {
            $scope.prevButtonLabel = dLabels.prevButton || DEFAULT_PREV_LABEL;
            $scope.nextButtonLabel = dLabels.nextButton || DEFAULT_NEXT_LABEL;
            $scope.closeButtonLabel = dLabels.closeButton || DEFAULT_CLOSE_LABEL;
          }
        });
        $scope.$watch("weekdayFormat", function(eFormat) {
          _generateWeekdays(eFormat);
        });
        $scope.$watch("format", function(dFormat) {
          if (!dFormat) {
            $scope.format = DEFAULT_MOMENT_FORMAT;
          }
        });
        $scope.$watch("initial", function(dInitial) {
          if (!dInitial || dInitial && !moment(dInitial).isValid()) {
            $scope.current = moment().format(DEFAULT_MOMENT_FORMAT);
          } else {
            $scope.current = moment(dInitial, $scope.format).format(DEFAULT_MOMENT_FORMAT);
          }
          $scope.focus = $scope.current;
        });
        $scope.$watch("activeDays", function(dActiveDays) {
          if (!dActiveDays) {
            $scope.activeDays = null;
          } else {
            $scope.activeDays = dActiveDays;
          }
        });
        $scope.$watch("focus", function(dFocus) {
          var data, isAfter, isBefore, days, day;
          var formatted, splitted, currentMonth;
          days = [];
          day = moment(dFocus).startOf("month").weekday(0);
          currentMonth = moment(dFocus).format("MM");
          i = 0;
          while (moment(day).isBefore(moment(dFocus).endOf("month"))) {
            day = moment(dFocus).startOf("month").weekday(i);
            formatted = day.format(DEFAULT_MOMENT_FORMAT);
            splitted = formatted.split("-");
            isAfter = $scope.from ? day.isAfter($scope.from) || day.isSame($scope.from) : true;
            isBefore = $scope.to ? day.isBefore($scope.to) || day.isSame($scope.to) : true;
            data = {
              date: formatted,
              label: splitted[2],
              isInCurrentMonth: splitted[1] === currentMonth,
              active: (!$scope.activeDays || $scope.activeDays.indexOf(formatted) > -1) && (isAfter && isBefore)
            };
            data.isInTimeframe = isAfter && isBefore;
            days.push(data);
            i++;
          }
          $scope.days = days;
        });
      }
    };
  } ]);
  // ionic popover service
  ionicSimpleDatepicker = angular.module("ionic-simple-datepicker", [ "ionic", "simple-datepicker" ]);
  ionicSimpleDatepicker.factory("simpleDatepickerPopover", [ "$rootScope", "$q", "$timeout", "$ionicPopover", function($rootScope, $q, $timeout, $ionicPopover) {
    var DEFAULT_POPOVER_ANIMATION = "slide-in-up";
    var simpleDatepickerPopover;
    // private
    var _popover;
    function _isPopoverShown() {
      return angular.isDefined(_popover) && _popover.isShown();
    }
    // public
    simpleDatepickerPopover = {
      show: function($event, dOptions) {
        var selectedDate, onSelectCallback, deferred, userOptions, options;
        onSelectCallback = NOOP;
        deferred = $q.defer();
        // prepare options
        userOptions = dOptions || {};
        options = {
          animation: DEFAULT_POPOVER_ANIMATION,
          focusFirstInput: false,
          backdropClickToClose: true,
          hardwareBackButtonClose: true
        };
        angular.extend(options, userOptions);
        options.scope = dOptions && dOptions.scope && dOptions.scope.$new() || $rootScope.$new(true);
        // prepare popover
        _popover = $ionicPopover.fromTemplate('<ion-popover-view class="simple-datepicker-popover"><ion-content scroll="false"><simple-datepicker from="from" to="to" initial="initial" active-days="activeDays" on-selected="_onSelected(current)" on-close="_onClose(current)" labels="labels" weekday-format="weekdayFormat"></simple-datepicker></ion-content></ion-popover-view>', options);
        // event callbacks
        _popover.scope.$on("$destroy", function() {
          _popover.remove();
        });
        _popover.scope.$on("popover.hidden", function() {
          deferred.resolve({
            current: selectedDate
          });
          $timeout(function() {
            _popover.remove();
          });
        });
        // pass options to scope
        if (dOptions) {
          if (dOptions.initial && moment(dOptions.initial).isValid()) {
            _popover.scope.initial = dOptions.initial;
            selectedDate = moment(dOptions.initial).format();
          }
          if (dOptions.format && angular.isString(dOptions.format)) {
            _popover.scope.format = dOptions.format;
          }
          if (dOptions.weekdayFormat && angular.isString(dOptions.weekdayFormat)) {
            _popover.scope.weekdayFormat = dOptions.weekdayFormat;
          }
          if (dOptions.from && moment(dOptions.from).isValid()) {
            _popover.scope.from = dOptions.from;
          }
          if (dOptions.to && moment(dOptions.to).isValid()) {
            _popover.scope.to = dOptions.to;
          }
          if (dOptions.onSelected && angular.isFunction(dOptions.onSelected)) {
            onSelectCallback = dOptions.onSelected;
          }
          if (dOptions.activeDays && angular.isArray(dOptions.activeDays) && dOptions.activeDays.length > 0) {
            _popover.scope.activeDays = dOptions.activeDays;
          }
          if (dOptions.labels && angular.isObject(dOptions.labels)) {
            _popover.scope.labels = dOptions.labels;
          }
        }
        // internal callbacks
        _popover.scope._onSelected = function(dNewSelection) {
          onSelectCallback({
            current: dNewSelection
          });
          selectedDate = dNewSelection;
        };
        _popover.scope._onClose = function(dNewSelection) {
          selectedDate = dNewSelection;
          _popover.hide();
        };
        // show it
        _popover.show($event);
        return deferred.promise;
      },
      hide: function() {
        if (_isPopoverShown()) {
          _popover.hide();
          return true;
        }
        return false;
      },
      isShown: function() {
        return _isPopoverShown();
      }
    };
    return simpleDatepickerPopover;
  } ]);
})(window, window.angular, window.moment);