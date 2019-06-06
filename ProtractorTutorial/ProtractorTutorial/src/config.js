var HtmlReporter = require('protractor-beautiful-reporter');
const { SpecReporter } = require('jasmine-spec-reporter');
var date = new Date();
var resultsFolderName = date.getUTCDate() + "-" + (date.getUTCMonth() + 1) + "-" + date.getUTCFullYear() + "-" + date.getUTCHours();
var screenShotsFolder = process.cwd() + '/testResults/' + resultsFolderName + '/screenshots/';
var testResultsPath = process.cwd() + '/testResults/' + resultsFolderName + '/';

exports.config = {
    multiCapabilities: [
        {
            'browserName': 'firefox',
            specs: ['poc1.js'],
        }
    ],

    
    // multiCapabilities: [ {
    //     browserName: 'chrome',
    //     shardTestFiles: true,
    //     seleniumAddress: 'http://10.188.231.31:5041/wd/hub',
    //     specs: ['poc2.js'],
    //     maxInstances: 1
    // }],
    
    // onPrepare: function () {
    //     // Add a screenshot reporter and store screenshots to `/tmp/screenshots`:
    //     jasmine.getEnv().addReporter(new HtmlReporter({
    //         baseDirectory: 'tmp/screenshots'
    //     }).getJasmine2Reporter());
    // }

    directConnect: true,
    framework: 'jasmine',
    jasmineNodeOpts: {
      showColors: true,
      defaultTimeoutInterval: 60000,
      keepAlive: true,
      print: function () { }
    },
    onPrepare() {
      require('ts-node').register({
        project: require('path').join(__dirname, './tsconfig.e2e.json')
      });
      var jasmineReporters = require('jasmine-reporters');
      jasmine.getEnv().addReporter(new SpecReporter({ spec: { displayStacktrace: true } }));
      jasmine.getEnv().addReporter(new jasmineReporters.JUnitXmlReporter({
        consolidateAll: true,
        savePath: testResultsPath,
        filePrefix: 'xmlresults'
      }));
  
  
      // create screenshots for failed tests
      var fs = require('fs-extra');
  
      fs.emptyDir(screenShotsFolder, function (err) {
        console.log(err);
      });
      jasmine.getEnv().addReporter({
        specDone: function (result) {
          if (result.status === 'failed') {
            browser.getCapabilities().then(function (caps) {
              var browserName = caps.get('browserName');
  
              browser.takeScreenshot().then(function (png) {
                var stream = fs.createWriteStream(screenShotsFolder + browserName + '-' + result.fullName + '.png');
                stream.write(new Buffer(png, 'base64'));
                stream.end();
              });
            });
          }
        }
      });
    },
    //HTMLReport called once tests are finished
    onComplete: function () {
      var browserName, browserVersion;
      var capsPromise = browser.getCapabilities();
  
      capsPromise.then(function (caps) {
        browserName = caps.get('browserName');
        browserVersion = caps.get('version');
  
        var HTMLReport = require('protractor-html-reporter');
  
        testConfig = {
          reportTitle: 'Protractor test Report ' + browser.baseUrl,
          outputPath: testResultsPath,
          screenshotPath: screenShotsFolder,
          testBrowser: browserName,
          browserVersion: browserVersion,
          modifiedSuiteName: false,
          screenshotsOnlyOnFailure: true
        };
        new HTMLReport().from(testResultsPath + 'xmlresults.xml', testConfig);
      });
    }
};

