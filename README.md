# NetPanzer SB

## Introduction

NetpanzerSB is a client application for the real-time tactical game [NetPanzer](http://www.netpanzer.info). It is designed in order to keep in touch members of the community and to provide the following features:

- Server Browser
- Ranking 
- ShoutBoox / Chat

This is an Android application developed with [PhoneGap](http://phonegap.com) and [JQuery Mobile](http://jquerymobile.com)

## Project Layout

The layout follows the guideline of phonegap, so the main part of the application you can find in `www` root folder.

## Build and installation

Before building projects locally, you need to set up your SDK development environment to deploy Cordova apps for Android devices.

In order to install the [Phonegap command-line tool](http://docs.phonegap.com/en/3.0.0/guide_cli_index.md.html#The%20Command-line%20Interface), follow these steps:

1. Download and install [Node.js](http://nodejs.org). Following installation, you should be able to invoke node or npm on your command line.

2. Install the phonegap utility. In Unix, prefixing the additional sudo command may be necessary to install development utilities in otherwise restricted directories:

```
$> sudo npm install -g phonegap
```

The installation log may produce errors for any uninstalled platform SDKs.

To test the App on an Emulator or Device (in the last case ensure you have Degub USB enabled)

```
$> cd netPanzerSB
$> phonegap run android
```

## Debug

[Debugging in PhoneGap](https://github.com/phonegap/phonegap/wiki/Debugging-in-PhoneGap) is recomended to read.

For the case we will describe the debug process through the [PhoneGap Emulator](http://emulate.phonegap.com/)

The PhoneGap Emulator requires two free, third-party tools.

1. Google Chrome Browser.
2. [Ripple Emulation Environment](https://chrome.google.com/webstore/detail/geelfhphabnejjhdalkjhgipohgpdnoc).

Once the extension is installed on Google Chrome, go to Settings > Extensions and enable the `Allow access to file URLs` checkbox for the Ripple Emulator extension. 

Then you need to open google chrome browser from command-line with the following profile:

```
$> google-chrome --disable-web-security --allow-file-access-from-files
```

The `--disable-web-security` parameter will allow chrome to do CORS, while the `--allow-file-access-from-files` parameter allow access files on filesystem via the `file://` protocol. So DO NOT navigate over the internet with this chrome profile, as it is very insecure!

To debug the application you need to build the project first, by using

```
$> phonegap build android
```

Now you can put in the address bar `file:///<path_to_netPanzerSB>/platforms/android/assets/www/index.html`, enable Ripple from the upper-right corner and hit Enter. You may notice some javascript alert messages: you have to ignore them by press 'Cancel' on each of them. (This is because PhoneGap generate platform specific `phonegap.js` file, so as we have built for android but we are using a desktop browser, this results into an incorrect platform file).

Once the ripple emulator has been loaded, you have to fire the `deviceready` event from the web interface.

That's all! You can now inspect using DevTools.


## Collaborate!

1. Fork it

2. Create your feature branch (`git checkout -b my_new_feature`)

3. Commit your changes (`git commit -am 'Added some feature`)

4. Push to the branch (`git push origin my_new_feature`)

5. Create new Pull Request


## License

NetPanzerSB is released under a GPLv3 license, please look at LICENSE file.
