# NetPanzer SB

## Introduction

NetpanzerSB is a client application for the real-time tactical game [NetPanzer](http://www.netpanzer.info).
It is designed in order to keep in touch members of the community and to provide the following features:

- Server Browser
- Ranking 
- ShoutBox / Chat

This is an Android application developed with [Cordova](https://cordova.apache.org) and [JQuery Mobile](http://jquerymobile.com).

Data is consumed as JSON from the official netpanzer game site [http://www.netpanzer.info](http://www.netpanzer.info), with
the gentle concession of the owner of the site ( hi Lohengrin :D ).

## Project Layout

The layout follows the guideline of cordova, except the `www-src` directory, which is used for development.
In this dir you can find the main part of the application.

## Build and installation

Before building projects locally, you need to set up your SDK development environment to deploy Cordova apps for Android devices.

In order to install the [Cordova CLI tool](https://cordova.apache.org/docs/en/latest/reference/cordova-cli/index.html), follow these steps:

1. Download and install [Node.js](http://nodejs.org). Following installation, you should be able to invoke node or npm on your command line.

2. Install the cordova utility. In Unix, prefixing the additional sudo command may be necessary to install development utilities in otherwise restricted directories:

```
$> sudo npm install -g cordova
```

The installation log may produce errors for any uninstalled platform SDKs.

To deploy the App on an Emulator or Device (in the last case ensure you have Degub USB enabled) follow these steps:

```
$> cd netPanzerSB
$> npm install
$> grunt
$> cordova run android
```

## Debug

You can run the application in the browser with:

```
$> cordova run browser --target=chromium #you can specify the desidered target, default is google-chrome
```

By this way you can enter in the address bar of the browser `localhost:8000` to see the running app.
At this point you can hack on the source code too, or inspect using DevTools.

Other grunt tasks:

```
$> grunt build   # default task, optimize assets (css/js minification) and copy output into `www` dir
```

That's all!

## Build

You can build the apk with:

```
$> grunt  # compile and copy assets from www-src to www
$> cordova build android --verbose
```


## Collaborate!

1. Fork it

2. Create your feature branch (`git checkout -b my_new_feature`)

3. Commit your changes (`git commit -am 'Added some feature`)

4. Push to the branch (`git push origin my_new_feature`)

5. Create new Pull Request


## License

NetPanzerSB is released under a GPLv3 license, please look at LICENSE file.
