# wmf-expo
'Wo ist Weihnachtsmarkt' mobile apps with [Expo](https://expo.dev)

## How to Run
# Welcome to your Expo app 👋

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Get started
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

## Update
`sudo npm install -g eas-cli`
`npx expo install expo-updates`
`npx eas update:configure`

## Optimize 
* `npm install -g sharp-cli`
* `npx expo-optimize`

## Build
* `npx eas build --platform android`
* `npx eas build --platform ios`
 
## Submit
* `npx eas submit --platform android --profile internal`
* `npx eas submit --platform ios --profile internal`
