import { Platform, StatusBar, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import { WebView, WebViewMessageEvent, WebViewProps } from "react-native-webview";
import React, { useRef } from 'react';
import { useSafeAreaInsets } from "react-native-safe-area-context";
import * as Location from 'expo-location';

const whiteList = [
  "https://wo-ist-weihnachtsmarkt.codeforleipzig.de",
  "https://weihnachtsmaerkte.codeforleipzig.de",
  "https://leipziger-weihnachtsmaerkte.netlify.app",
];

// The bundled typings of react-native-webview declare `WebView` as a class with
// a default type argument of `undefined`, which makes its props resolve to
// `never` under the React 19 types (every JSX prop errors with
// "not assignable to never"). The runtime component is actually a forwardRef
// component, so use an explicitly typed alias for the JSX usage. `WebView`
// itself remains usable as the instance type (e.g. for `useRef<WebView>`).
const WebViewComponent = WebView as unknown as React.ForwardRefExoticComponent<
  WebViewProps & React.RefAttributes<WebView>
>;

export const getGeoLocationJS = () => {
  const geoLocCode = require('./assets/GeoLocation.js')
  return `
    (function() {
      ${geoLocCode}
    })();
  `;
};

const WebViewScreen = () => {
  const webviewRef = useRef<WebView>(null);
  const locationSubscriptions = new Map<number, Location.LocationSubscription>();
  let nextWatchId = 1;
  const insets = useSafeAreaInsets();

  const handleMessage = async (event: WebViewMessageEvent) => {
    try {
      const data = JSON.parse(event.nativeEvent.data);

      switch (data.event) {
        case 'getCurrentPosition': {
          try {
            const location = await Location.getCurrentPositionAsync({});

            postMessage({
              event: 'currentPosition',
              data: location,
            });
          } catch (error) {
            postMessage({
              event: 'currentPositionError',
              data: error,
            });
          }
          break;
        }
        case 'watchPosition': {
          const watchId = nextWatchId++;
          try {
            const subscription = await Location.watchPositionAsync(
              {},
              location => {
                postMessage({
                  event: 'watchPosition',
                  watchId,
                  data: location,
                });
              },
              error => {
                postMessage({
                  event: 'watchPositionError',
                  watchId,
                  data: error,
                });
              }
            );
            locationSubscriptions.set(watchId, subscription);
            postMessage({
              event: 'watchPositionStarted',
              watchId,
            });
          } catch (error) {
            postMessage({
              event: 'watchPositionError',
              watchId,
              data: error,
            });
          }
          break;
        }
        case 'clearWatch': {
          const subscription = locationSubscriptions.get(data.watchId);
          if (subscription) {
            subscription.remove();
            locationSubscriptions.delete(data.watchId);
          }
          break;
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <WebViewComponent
        ref={webviewRef}
        geolocationEnabled={ true }
        injectedJavaScript={ getGeoLocationJS() }
        javaScriptEnabled={ true }
        onMessage={handleMessage}
        startInLoadingState={ true } 
        style={[styles.webView, { marginTop: insets.top }]}
        source={{ uri: "https://leipziger-weihnachtsmaerkte.netlify.app" }}
        originWhitelist={whiteList}
        allowsBackForwardNavigationGestures
        sharedCookiesEnabled
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  webView: {
    flex: 1,
  },
});

export default WebViewScreen;
