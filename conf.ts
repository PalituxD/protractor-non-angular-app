import {Config} from 'protractor';
var HtmlReporter = require('protractor-beautiful-reporter');
var VideoReporter = require('protractor-video-reporter');

export let config: Config = {
  framework: 'jasmine',
  capabilities: {
    browserName: 'chrome',
    shardTestFiles: true,
    maxInstances: 2
  },
  jasmineNodeOpts: {
    // If true, print colors to the terminal.
    showColors: true,
    // Default time to wait in ms before a test fails.
    defaultTimeoutInterval: 180000
  },
  onPrepare:()=>{
    jasmine.getEnv().addReporter(new HtmlReporter({
      baseDirectory: 'out/report', 
      screenshotsSubfolder: 'images',
      jsonsSubfolder: 'jsons',
      gatherBrowserLogs: false
    }).getJasmine2Reporter());
    jasmine.getEnv().addReporter(new VideoReporter({
      baseDirectory: '/Users/XXXXXX/dev/protractor/protractorBitbucket/protractor-non-angular-app/out/videos',
      singleVideo:false,
      // singleVideoPath: (result)=>{
      //   return result.fullName + '.mov';
      // },
      ffmpegCmd:'/usr/local/Cellar/ffmpeg/4.1.1/bin/ffmpeg',
      ffmpegArgs:[
        '-y',
        '-r', '30',
        '-f', 'avfoundation',
        '-i', '1',
        '-g', '300',
        '-vcodec', 'mpeg4'
      ]
    }));
  },
  specs: [ './specs/*.js' ],
  seleniumAddress: 'http://localhost:4444/wd/hub',
  noGlobals: false
};