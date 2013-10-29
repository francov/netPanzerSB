# NetPanzer SB

## Introduction

NetpanzerSB is a client application for the real-time tactical game [NetPanzer](http://www.netpanzer.info). It is designed in order to keep in touch members of the community and to provide the following features:

- Server Browser
- Ranking 
- ShoutBoox / Chat

This is an Android application developed with [PhoneGap](http://phonegap.com) and [JQuery Mobile](http://jquerymobile.com)

## Project Layout

The layout follows the guideline of phonegap, except the `www-src` directory, which is used for development. In this dir you can find the main part of the application.

## Build and installation

Before building projects locally, you need to set up your SDK development environment to deploy Cordova apps for Android devices.

In order to install the [Phonegap command-line tool](http://docs.phonegap.com/en/3.0.0/guide_cli_index.md.html#The%20Command-line%20Interface), follow these steps:

1. Download and install [Node.js](http://nodejs.org). Following installation, you should be able to invoke node or npm on your command line.

2. Install the phonegap utility. In Unix, prefixing the additional sudo command may be necessary to install development utilities in otherwise restricted directories:

```
$> sudo npm install -g phonegap
```

The installation log may produce errors for any uninstalled platform SDKs.

To deploy the App on an Emulator or Device (in the last case ensure you have Degub USB enabled) follow these steps:

```
$> cd netPanzerSB
$> npm install
$> grunt
$> phonegap run android
```

## Debug

[Debugging in PhoneGap](https://github.com/phonegap/phonegap/wiki/Debugging-in-PhoneGap) is recomended to read.

For the case we will describe the debug process through the [PhoneGap Emulator](http://emulate.phonegap.com/)

The PhoneGap Emulator requires two free, third-party tools.

1. Google Chrome Browser.
2. [Ripple Emulation Environment](https://chrome.google.com/webstore/detail/geelfhphabnejjhdalkjhgipohgpdnoc).

Once the extension is installed on Google Chrome, enable Ripple from the upper-right corner.

There's a grunt task which spawn a static webserver into the `www-src` dir of the project, so you can run:

```
$> grunt serve:dev
```

By this way you can enter in the address bar of the browser `localhost:8000` to see the running app. At this point you can hack on the source code too, or inspect using DevTools.

Other grunt tasks:

```
$> grunt serve:dev   # serve through a static webserver from `www-src` dir.
$> grunt serve:prod   # optimize assets (css/js minification) and serve through a static webserver from `www` dir.
$> grunt build   # default task, optimize assets (css/js minification) and copy output into `www` dir
```

That's all!


## Collaborate!

1. Fork it

2. Create your feature branch (`git checkout -b my_new_feature`)

3. Commit your changes (`git commit -am 'Added some feature`)

4. Push to the branch (`git push origin my_new_feature`)

5. Create new Pull Request


## License

NetPanzerSB is released under a GPLv3 license, please look at LICENSE file.
