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

[Debugging in PhoneGap](https://github.com/phonegap/phonegap/wiki/Debugging-in-PhoneGap) recomended.

## Collaborate!

1. Fork it

2. Create your feature branch (`git checkout -b my_new_feature`)

3. Commit your changes (`git commit -am 'Added some feature`)

4. Push to the branch (`git push origin my_new_feature`)

5. Create new Pull Request
