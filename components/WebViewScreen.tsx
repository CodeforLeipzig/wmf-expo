import { StyleSheet, Text, View } from "react-native";
import { WebView } from "react-native-webview";
import React, { useRef } from 'react';
import { useSafeAreaInsets } from "react-native-safe-area-context";
import * as Location from 'expo-location';

const whiteList = [
  "https://wo-ist-weihnachtsmarkt.codeforleipzig.de",
  "https://weihnachtsmaerkte.codeforleipzig.de",
  "https://leipziger-weihnachtsmaerkte.netlify.app",
];

export const getGeoLocationJS = () => {
  const geoLocCode = require('./GeoLocation.js')
  return `
    (function() {
      ${geoLocCode}
    })();
  `;
};

type EventType =
  | {
      event: 'getCurrentPosition'
      fun: (
        success: (pos: Location.LocationObject) => void,
        error: (error: any) => void
      ) => Promise<void>
      successCode: string
      errorCode: string
      input?: undefined
    }
  | {
      event: 'watchPosition'
      fun: (
        success: (pos: Location.LocationObject) => void,
        error: (error: any) => void
      ) => Promise<void>
      successCode: string
      errorCode: string
      input?: undefined
    }
  | {
      event: 'clearWatch'
      fun: (taskName: string) => Promise<void>
      input: (param: { taskName: string }) => string
      successCode?: undefined
      errorCode?: undefined
    }

const eventTypes: EventType[] = [
  {
    event: 'getCurrentPosition',
    fun: (success, error) =>
      Location.getCurrentPositionAsync({})
        .then(success)
        .catch(error),
    successCode: 'currentPosition',
    errorCode: 'currentPositionError'
  },
  {
    event: 'watchPosition',
    fun: (success, error) =>
      Location.watchPositionAsync(
        { accuracy: Location.Accuracy.High, timeInterval: 1000, distanceInterval: 1 },
        success,
        error
      )
        .then(() => {})
        .catch(error),
    successCode: 'watchPosition',
    errorCode: 'watchPositionError'
  },
  {
    event: 'clearWatch',
    fun: (taskName) => Location.stopLocationUpdatesAsync(taskName),
    input: (param: { taskName: string }) => param.taskName
  }
]

const WebViewScreen = () => {
  const webviewRef = useRef<WebView>(null);
  const insets = useSafeAreaInsets();

  return (
    <WebView
      geolocationEnabled={ true }
      injectedJavaScript={ getGeoLocationJS() }
      javaScriptEnabled={ true }
      onMessage={ event => {
        try {
          const data = JSON.parse(event.nativeEvent.data);
          const postMessage = (msg: {}) => {
            webviewRef.current?.postMessage(JSON.stringify(msg));
          }
          const eventType = eventTypes.find(eventType => data?.event && data.event == eventType.event);
          if (eventType) {
            if (eventType.successCode) {
              eventType.fun(
                input => postMessage({ event: eventType.successCode, data: input }),
                error => postMessage({ event: eventType.errorCode, data: error })
              );
            } else if (eventType.input) {
              eventType.fun(eventType.input(data));
            }
          }    
        } catch (e) {
          console.log(e);
        }
      }}
      ref={webviewRef}
      startInLoadingState={ true } 
      style={[styles.webView, { marginTop: insets.top }]}
      source={{ uri: "https://leipziger-weihnachtsmaerkte.netlify.app" }}
      originWhitelist={whiteList}
      allowsBackForwardNavigationGestures
      sharedCookiesEnabled
    />
  );
};

const styles = StyleSheet.create({
  webView: {
    flex: 1,
  },
});

export default WebViewScreen;
