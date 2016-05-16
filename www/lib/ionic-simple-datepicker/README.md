# ionic-simple-datepicker

Simple Datepicker for [Ionic](http://ionicframework.com/) / [AngularJS](https://angularjs.org/) (does also work without Ionic).

## Features

* simple
* backed by [momentJS](http://momentjs.com/), including all l18n / i10n features
* watchable configuration (it can change whenever you want it to change)
* from-to timeframe
* deactivate custom days
* flexible styling, custom button labels
* datepicker directive (can be used without Ionic)
* nice popover datepicker service (for Ionic)

## Install

+ Add this line to your *bower.json* dependencies and run *bower install* afterwards.

>
``` JavaScript
"ionic-simple-datepicker": "~0.1.2"
```

+ Include the required source file (this path or similar)

>
``` html
<script src="bower_components/ionic-simple-datepicker/dist/ionic-simple-datepicker.js"></script>
<link href="bower_components/ionic-simple-datepicker/dist/ionic-simple-datepicker.css" rel="stylesheet">
```

+ Dont forget to include other needed dependencies like Angular, momentJS and maybe Ionic

+ Depending on if you want to use Ionic or not, inject the `ionic-simple-datepicker` or `simple-datepicker` module into your app.

>
``` JavaScript
angular.module('app', [ 'ionic-simple-datepicker' ]);
// .. or for usage without ionic
angular.module('app', [ 'simple-datepicker' ]);
```

## Usage

You can check the `example` folder for working examples with this datepicker.

There is two ways to use this datepicker, whether as a directive (to be directly embedded in your html, you dont need ionic for this) or as a service which will put the datepicker inside an [ionic popover](http://ionicframework.com/docs/api/service/$ionicPopover/).

### Directive

>
``` html
<simple-datepicker
  from="'YYYY-MM-DD'"
  to="'YYYY-MM-DD'"
  initial="'YYYY-MM-DD'"
  active-days="[ 'YYYY-MM-DD', ...]"
  on-selected="selected(current)"
  on-close="selected(current)"
  labels="{ 'closeButton': 'OK', prevButton: '<', nextButton: '>' }">
</simple-datepicker>
```

### Service

Inject `simpleDatepickerPopover` into your controller.

>
``` JavaScript
simpleDatepickerPopover.show($event, { initial: '2015-11-10' }).then(function(dDate) {
  console.log('Closed Popover', dDate);
});
```

**Methods**:

+ **show($event, [options])** - open the popover (attached to target element from $event) with datepicker. It returns a promise which resolves after hiding the popover.

Possible options:

```
animation: 'slide-in-up'

scope: create a new from $rootScope by default

focusFirstInput: false
backdropClickToClose: true
hardwareBackButtonClose: true

initial: 'YYYY-MM-DD' format (default: today)

format: return value format (default: 'YYYY-MM-DD')
weekdayFormat: format of weekday header (default: 'dd')

from: 'YYYY-MM-DD' format (default: infinity)
to: 'YYYY-MM-DD' format (default: infinity)

activeDays: [ 'YYYY-MM-DD', 'YYYY-MM-DD', .. ] (default: empty, all days are selectable)

onSelected: function callback
onClose: function callback

labels: { 'closeButton': 'OK', prevButton: '<', nextButton: '>' }
```

+ **hide()** - hide and remove popover from DOM

+ **isShown()** - returns a boolean value if popover is visible or not

Read more about ionic popovers here: http://ionicframework.com/docs/api/service/$ionicPopover/

### Styles

Check `ionic-simple-datepicker.css` for further styling of your datepicker.

### I18n and i10n

Check the [momentJS](http://momentjs.com/) documentation for more information on this topic. The datepicker will for example change the starting weekday based on the momentJS configuration.

## Development

Fetch repository and set up environment

    git clone git@github.com:marmorkuchen-net/ionic-simple-datepicker.git
    npm install && bower install

Start a server on localhost:9000 which is checking your js syntax and running the tests in background after every save. You can also open a browser and check the examples here.

    grunt serve

To build the source (in dist folder) just run

    grunt
