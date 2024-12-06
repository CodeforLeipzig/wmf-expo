# wmf-expo
'Wo ist Weihnachtsmarkt' mobile apps with [Expo](https://expo.dev)

## App stores
- [Apple App Store](https://apps.apple.com/de/app/wtf-is-wm/id6738749984)
- [Android Google Play Store](https://play.google.com/store/apps/details?id=com.sannsie.woistweihnachtsmarktinleipzig)

## Get started
This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).
1. download Expo Go App for [Android](https://play.google.com/store/apps/details?id=host.exp.exponent&referrer=www) or [iOS](https://itunes.apple.com/app/apple-store/id982107779)
2. clone repository
3. install dependencies `npm install`
4. Start the app `npx expo start` and scan the QR-Code with your phone to open the app in Expo Go

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

## Config
`eas update:configure`

## Install
`npx expo install`

## Update general to latest
`sudo npm install -g npm-check-updates`
`ncu -u`
`npm install`

## Update EAS
`sudo npm install -g eas-cli`
`npx expo install expo-updates`
`npx eas update:configure`
When initial run:
`npx eas build:configure`

## Optimize 
* `npm install -g sharp-cli`
* `npx expo-optimize`

## Pre-check
`npx expo-doctor`

## Build
* `npx eas build --platform android`
* `npx eas-cli@latest build --platform ios`
 
## Submit
* `npx eas submit --platform android`
* `npx eas submit --platform ios`
