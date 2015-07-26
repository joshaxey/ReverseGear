(function() {
  angular.module('appDev', ['app','ngMockE2E']);

  /* $http E2E mock testing
   -------------------------------------------------*/
  angular.module('appDev').run(function($httpBackend, logger) {

    var duetData = {};

    /*-- manifest ------------------------------*/
    duetData.manifest = [
      //-- Settings --
      'settings/help',
      'delays',
      'settings/ir/dvd1','settings/ir/dvd2',
      'settings/ir/vcr1','settings/ir/vcr2',
      'settings/ir/tnr1','settings/ir/tnr2',
      'settings/ir/dvr1','settings/ir/dvr2',
      'settings/ir/doc1','settings/ir/doc2',
      'settings/ir/cam1','settings/ir/cam2','settings/ir/cam3','settings/ir/cam4',
      //-- Room --
      'settings/room/room1','settings/room/room2',
      //-- Panels --
      'pnl1','pnl2','pnl3','pnl4',
      //-- Environment --
      'environment/screen/screen1','environment/screen/screen2','environment/screen/screen3','environment/screen/screen4','environment/screen/screen5','environment/screen/screen6',
      'environment/lift/lift1',    'environment/lift/lift2',    'environment/lift/lift3',    'environment/lift/lift4',    'environment/lift/lift5',    'environment/lift/lift6',
      'environment/shade/shade1',  'environment/shade/shade2',
      'environment/lighting/lts1',
      //-- Backend --
      'dvx','swt1','pdu1',
      //-- Sources --
      'atc1',
      'cam1','cam2','cam3','cam4',
      'doc1','doc2',
      'dvd1','dvd2',
      'dvr1','dvr2',
      'encoder1','encoder2',
      'enzo1','enzo2',
      'tnr1','tnr2',
      'vcr1','vcr2',
      'vtc1','vtc2',
      //-- Destinations --
      'disp1','disp2','disp3','disp4','disp5','disp6',
      //-- Not Used (yet) --
      'kpd1','kpd2','kpd3','kpd4',
      'enzo1_kpd','enzo2_kpd',
      'occ1','occ2','occ3','occ4',
      'dxLink.tx1','dxLink.tx2','dxLink.tx3','dxLink.tx4','dxLink.tx5','dxLink.tx6',
      'dxLink.rx1','dxLink.rx2','dxLink.rx3','dxLink.rx4','dxLink.rx5','dxLink.rx6',
      //-- Lists --
      'pb_atc','pb_vtc','fav_tnr','fav_dvr'
    ];

    $httpBackend.whenGET('api/manifest').respond(duetData.manifest);


    /*-- api/versions ------------------------------*/
    duetData.versions = {
      obc:       "",    // config.version
      netlinx:   "obc.versions.netlinx",
      masterFW:  "obc.versions.masterFW",
      masterSN:  "obc.versions.masterSN",
      masterMAC: "obc.versions.masterMAC"
    };

    $httpBackend.whenGET('api/versions').respond(duetData.versions);


    /*-- settings/room ------------------------------*/
    duetData.rooms = [
      { name:               'room.room1.name',
        supportPhoneNumber: 'room.room1.supportPhoneNumber',
        atcPhone:           'room.atc1DialInPhoneNumber',
        vtcIP:              'room.vtc1DialInH323',
        vtcISDN:            'room.vtc1DialInH320'
      },
      { name:               'room.room2.name',
        supportPhoneNumber: 'room.room2.supportPhoneNumber',
        atcPhone:           'room.atc2DialInPhoneNumber',
        vtcIP:              'room.vtc2DialInH323',
        vtcISDN:            'room.vtc2DialInH320'
      }
    ];

    $httpBackend.whenGET('api/settings/room/room1').respond(duetData.rooms[0]);
    $httpBackend.whenGET('api/settings/room/room2').respond(duetData.rooms[1]);

    $httpBackend.whenPOST('api/settings/room/room1').respond(function(method, url, data, headers) {
      var jsonData = angular.fromJson(data);

//    duetData.rooms[0].name               = jsonData.name;   // NOT editable!
      duetData.rooms[0].supportPhoneNumber = jsonData.supportPhoneNumber;
      duetData.rooms[0].atcPhone           = jsonData.atcPhone;
      duetData.rooms[0].vtcIP              = jsonData.vtcIP;
      duetData.rooms[0].vtcISDN            = jsonData.vtcISDN;

      return [200, jsonData, {}];
    });
    $httpBackend.whenPOST('api/settings/room/room2').respond(function(method, url, data, headers) {
      var jsonData = angular.fromJson(data);

//    duetData.rooms[1].name               = jsonData.name;   // NOT editable!
      duetData.rooms[1].supportPhoneNumber = jsonData.supportPhoneNumber;
      duetData.rooms[1].atcPhone           = jsonData.atcPhone;
      duetData.rooms[1].vtcIP              = jsonData.vtcIP;
      duetData.rooms[1].vtcISDN            = jsonData.vtcISDN;

      return [200, jsonData, {}];
    });


    /*-- settings/help ------------------------------*/
    duetData.help = {
      helpDeskPhoneNumber: 'room.helpDeskPhoneNumber',
      installedBy:         'room.installedBy',
      installerPhone:      'room.installerPhoneNumber'
    };

    $httpBackend.whenGET('api/settings/help').respond(duetData.help);

    $httpBackend.whenPOST('api/settings/help').respond(function(method, url, data, headers) {
      var jsonData = angular.fromJson(data);

      duetData.help.helpDeskPhoneNumber = jsonData.helpDeskPhoneNumber;
      duetData.help.installedBy         = jsonData.installedBy;
      duetData.help.installerPhone      = jsonData.installerPhone;

      return [200, jsonData, {}];
    });


    /*-- settings/ir --------------------------------*/
    duetData.ir = {
      dvd1: { pulseTime: .5 },
      dvd2: { pulseTime: .5 }
    };

    $httpBackend.whenGET('api/settings/ir/dvd1').respond(duetData.ir.dvd1);
    $httpBackend.whenGET('api/settings/ir/dvd2').respond(duetData.ir.dvd2);

    $httpBackend.whenPOST('api/settings/ir/dvd1').respond(function(method, url, data, headers) {
      var jsonData = angular.fromJson(data);

      duetData.ir.dvd1.pulseTime = jsonData.pulseTime;

      return [200, jsonData, {}];
    });


    /*-- environment/screen -------------------------*/
    duetData.screens = [
      {
        up:   {action: "latch",     time: 0},
        down: {action: "timed",     time: 0},
        stop: {action: "momentary", time: 0}
      },
      {
        up:   {action: "latch",     time: 0},
        down: {action: "timed",     time: 0},
        stop: {action: "momentary", time: 0}
      },
      {
        up:   {action: "latch",     time: 0},
        down: {action: "timed",     time: 0},
        stop: {action: "momentary", time: 0}
      },
      {
        up:   {action: "latch",     time: 0},
        down: {action: "timed",     time: 0},
        stop: {action: "momentary", time: 0}
      },
      {
        up:   {action: "latch",     time: 0},
        down: {action: "timed",     time: 0},
        stop: {action: "momentary", time: 0}
      },
      {
        up:   {action: "latch",     time: 0},
        down: {action: "timed",     time: 0},
        stop: {action: "momentary", time: 0}
      }
    ];

    $httpBackend.whenGET('api/environment/screen/screen1').respond(duetData.screens[0]);
    $httpBackend.whenGET('api/environment/screen/screen2').respond(duetData.screens[1]);
    $httpBackend.whenGET('api/environment/screen/screen3').respond(duetData.screens[2]);
    $httpBackend.whenGET('api/environment/screen/screen4').respond(duetData.screens[3]);
    $httpBackend.whenGET('api/environment/screen/screen5').respond(duetData.screens[4]);
    $httpBackend.whenGET('api/environment/screen/screen6').respond(duetData.screens[5]);

    $httpBackend.whenPOST('api/environment/screen/screen1').respond(function(method, url, data, headers) {
      var jsonData = angular.fromJson(data);

      duetData.screens[0].up.action   = jsonData.up.action;
      duetData.screens[0].up.time     = jsonData.up.time;
      duetData.screens[0].down.action = jsonData.down.action;
      duetData.screens[0].down.time   = jsonData.down.time;
      duetData.screens[0].stop.action = jsonData.stop.action;
      duetData.screens[0].stop.time   = jsonData.stop.time;

      return [200, jsonData, {}];
    });


    /*-- environment/lift -------------------------*/
    duetData.lifts = [
      {
        up:   {action: "latch",     time: 0},
        down: {action: "timed",     time: 0},
        stop: {action: "momentary", time: 0}
      },
      {
        up:   {action: "latch",     time: 0},
        down: {action: "timed",     time: 0},
        stop: {action: "momentary", time: 0}
      },
      {
        up:   {action: "latch",     time: 0},
        down: {action: "timed",     time: 0},
        stop: {action: "momentary", time: 0}
      },
      {
        up:   {action: "latch",     time: 0},
        down: {action: "timed",     time: 0},
        stop: {action: "momentary", time: 0}
      },
      {
        up:   {action: "latch",     time: 0},
        down: {action: "timed",     time: 0},
        stop: {action: "momentary", time: 0}
      },
      {
        up:   {action: "latch",     time: 0},
        down: {action: "timed",     time: 0},
        stop: {action: "momentary", time: 0}
      }
    ];

    $httpBackend.whenGET('api/environment/lift/lift1').respond(duetData.lifts[0]);
    $httpBackend.whenGET('api/environment/lift/lift2').respond(duetData.lifts[1]);
    $httpBackend.whenGET('api/environment/lift/lift3').respond(duetData.lifts[2]);
    $httpBackend.whenGET('api/environment/lift/lift4').respond(duetData.lifts[3]);
    $httpBackend.whenGET('api/environment/lift/lift5').respond(duetData.lifts[4]);
    $httpBackend.whenGET('api/environment/lift/lift6').respond(duetData.lifts[5]);

    $httpBackend.whenPOST('api/environment/lift/lift1').respond(function(method, url, data, headers) {
      var jsonData = angular.fromJson(data);

      duetData.lifts[0].up.action   = jsonData.up.action;
      duetData.lifts[0].up.time     = jsonData.up.time;
      duetData.lifts[0].down.action = jsonData.down.action;
      duetData.lifts[0].down.time   = jsonData.down.time;
      duetData.lifts[0].stop.action = jsonData.stop.action;
      duetData.lifts[0].stop.time   = jsonData.stop.time;

      return [200, jsonData, {}];
    });


    /*-- environment/shade -------------------------*/
    duetData.shades = [
      {
        open:  {action: "latch",     time: 0},
        close: {action: "timed",     time: 0},
        stop:  {action: "momentary", time: 0}
      },
      {
        open:  {action: "latch",     time: 0},
        close: {action: "timed",     time: 0},
        stop:  {action: "momentary", time: 0}
      },
      {
        open:  {action: "latch",     time: 0},
        close: {action: "timed",     time: 0},
        stop:  {action: "momentary", time: 0}
      },
      {
        open:  {action: "latch",     time: 0},
        close: {action: "timed",     time: 0},
        stop:  {action: "momentary", time: 0}
      },
      {
        open:  {action: "latch",     time: 0},
        close: {action: "timed",     time: 0},
        stop:  {action: "momentary", time: 0}
      },
      {
        open:  {action: "latch",     time: 0},
        close: {action: "timed",     time: 0},
        stop:  {action: "momentary", time: 0}
      }
    ];

    $httpBackend.whenGET('api/environment/shade/shade1').respond(duetData.shades[0]);
    $httpBackend.whenGET('api/environment/shade/shade2').respond(duetData.shades[1]);

    $httpBackend.whenPOST('api/environment/shade/shade1').respond(function(method, url, data, headers) {
      var jsonData = angular.fromJson(data);

      duetData.shades[0].open.action  = jsonData.open.action;
      duetData.shades[0].open.time    = jsonData.open.time;
      duetData.shades[0].close.action = jsonData.close.action;
      duetData.shades[0].close.time   = jsonData.close.time;
      duetData.shades[0].stop.action  = jsonData.stop.action;
      duetData.shades[0].stop.time    = jsonData.stop.time;

      return [200, jsonData, {}];
    });


    /*-- environment/lighting ----------------------*/
    duetData.lts = [
      {
        lightSystem: "AMX_CLEAR_CONNECT",
        controllers: [
          { value: "RPM1,IP_Address,Username,Password"}
        ],
        scenes: [
          { label: "Scene 1",  value: "RPM1:1:P1" },
          { label: "Scene 2",  value: "RPM1:1:P2" },
          { label: "Scene 3",  value: "RPM1:1:P3" },
          { label: "Scene 4",  value: "RPM1:1:P4" },
          { label: "Scene 5",  value: "RPM1:1:P5" },
          { label: "Scene 6",  value: "RPM1:1:P6" },
          { label: "Scene 7",  value: "RPM1:1:P7" },
          { label: "Scene 8",  value: "RPM1:1:P8" },
          { label: "Scene 9",  value: "RPM1:1:P9" },
          { label: "Scene 10", value: "RPM1:1:P10" },
          { label: "Scene 11", value: "RPM1:1:P11" },
          { label: "Scene 12", value: "RPM1:1:P12" }
        ]
      },
      {
        lightSystem: "AMX_RADIA",
        controllers: [
          { value: "96"}
        ],
        scenes: [
          { label: "Scene 1",  value: "96:P1" },
          { label: "Scene 2",  value: "96:P2" },
          { label: "Scene 3",  value: "96:P3" },
          { label: "Scene 4",  value: "96:P4" },
          { label: "Scene 5",  value: "96:P5" },
          { label: "Scene 6",  value: "96:P6" },
          { label: "Scene 7",  value: "96:P7" },
          { label: "Scene 8",  value: "96:P8" },
          { label: "Scene 9",  value: "96:P9" },
          { label: "Scene 10", value: "96:P10" },
          { label: "Scene 11", value: "96:P11" },
          { label: "Scene 12", value: "96:P12" }
        ]
      },
      {
        lightSystem: "CLIPSAL_CBUS",
        controllers: [
          { value: "NOT USED"}
        ],
        scenes: [
          { label: "Scene 1",  value: "254:CA:01:1" },
          { label: "Scene 2",  value: "254:CA:01:2" },
          { label: "Scene 3",  value: "254:CA:01:3" },
          { label: "Scene 4",  value: "254:CA:01:4" },
          { label: "Scene 5",  value: "254:CA:01:5" },
          { label: "Scene 6",  value: "254:CA:01:6" },
          { label: "Scene 7",  value: "254:CA:01:7" },
          { label: "Scene 8",  value: "254:CA:01:8" },
          { label: "Scene 9",  value: "254:CA:01:9" },
          { label: "Scene 10", value: "254:CA:01:10" },
          { label: "Scene 11", value: "254:CA:01:11" },
          { label: "Scene 12", value: "254:CA:01:12" }
        ]
      },
      {
        lightSystem: "DYNALITE_DYNET",
        controllers: [
          { value: "NOT USED"}
        ],
        scenes: [
          { label: "Scene 1",  value: "255:1:PRE1" },
          { label: "Scene 2",  value: "255:1:PRE2" },
          { label: "Scene 3",  value: "255:1:PRE3" },
          { label: "Scene 4",  value: "255:1:PRE4" },
          { label: "Scene 5",  value: "255:1:PRE5" },
          { label: "Scene 6",  value: "255:1:PRE6" },
          { label: "Scene 7",  value: "255:1:PRE7" },
          { label: "Scene 8",  value: "255:1:PRE8" },
          { label: "Scene 9",  value: "255:1:PRE9" },
          { label: "Scene 10", value: "255:1:PRE10" },
          { label: "Scene 11", value: "255:1:PRE11" },
          { label: "Scene 12", value: "255:1:PRE12" }
        ]
      },
      {
        lightSystem: "LUTRON_GFX",
        controllers: [
          { value: "1"}
        ],
        scenes: [
          { label: "Scene 1",  value: "1:P1" },
          { label: "Scene 2",  value: "1:P2" },
          { label: "Scene 3",  value: "1:P3" },
          { label: "Scene 4",  value: "1:P4" },
          { label: "Scene 5",  value: "1:P5" },
          { label: "Scene 6",  value: "1:P6" },
          { label: "Scene 7",  value: "1:P7" },
          { label: "Scene 8",  value: "1:P8" },
          { label: "Scene 9",  value: "1:P9" },
          { label: "Scene 10", value: "1:P10" },
          { label: "Scene 11", value: "1:P11" },
          { label: "Scene 12", value: "1:P12" }
        ]
      },
      {
        lightSystem: "LUTRON_GFX_QS",
        controllers: [
          { value: "0xFFFFFFFF"}
        ],
        scenes: [
          { label: "Scene 1",  value: "0xFFFFFFFF:P1" },
          { label: "Scene 2",  value: "0xFFFFFFFF:P2" },
          { label: "Scene 3",  value: "0xFFFFFFFF:P3" },
          { label: "Scene 4",  value: "0xFFFFFFFF:P4" },
          { label: "Scene 5",  value: "0xFFFFFFFF:P5" },
          { label: "Scene 6",  value: "0xFFFFFFFF:P6" },
          { label: "Scene 7",  value: "0xFFFFFFFF:P7" },
          { label: "Scene 8",  value: "0xFFFFFFFF:P8" },
          { label: "Scene 9",  value: "0xFFFFFFFF:P9" },
          { label: "Scene 10", value: "0xFFFFFFFF:P10" },
          { label: "Scene 11", value: "0xFFFFFFFF:P11" },
          { label: "Scene 12", value: "0xFFFFFFFF:P12" }
        ]
      },
      {
        lightSystem: "GENERIC",
        controllers: [
          { value: "NOT USED"}
        ],
        scenes: [
          { label: "Scene 1",  value: "P1" },
          { label: "Scene 2",  value: "P2" },
          { label: "Scene 3",  value: "P3" },
          { label: "Scene 4",  value: "P4" },
          { label: "Scene 5",  value: "P5" },
          { label: "Scene 6",  value: "P6" },
          { label: "Scene 7",  value: "P7" },
          { label: "Scene 8",  value: "P8" },
          { label: "Scene 9",  value: "P9" },
          { label: "Scene 10", value: "P10" },
          { label: "Scene 11", value: "P11" },
          { label: "Scene 12", value: "P12" }
        ]
      }
    ];

    $httpBackend.whenGET('api/environment/lighting/lts1').respond(duetData.lts[6]);

    $httpBackend.whenPOST('api/environment/lighting/lts1').respond(function(method, url, data, headers) {
      var jsonData = angular.fromJson(data);

      duetData.lts[0].controller  = jsonData.controller;
      duetData.lts[0].sceneAddr[0].value  = jsonData.sceneAddr[0].value;

      return [200, jsonData, {}];
    });


    // Don't mock the html views
    $httpBackend.whenGET(/views\/\w+.*/).passThrough();

    // For everything else, don't mock
    $httpBackend.whenGET(/^\w+.*/).passThrough();
    $httpBackend.whenPOST(/^\w+.*/).passThrough();
  });
}());
