import { useEffect, useRef } from "react";
import { useColorScheme } from "react-native";
import { StyleSheet } from "react-native";
import { Share } from "react-native";
import WebView, { type WebViewMessageEvent } from "react-native-webview";

import type { NativeToWeb, WebToNative } from "../bridge/messages";
import { WEB_URL } from "../config";

export default function AppWebView() {
  const ref = useRef<WebView>(null);
  const colorScheme = useColorScheme();

  function send(msg: NativeToWeb) {
    ref.current?.postMessage(JSON.stringify(msg));
  }

  // Sync native theme to web on mount and when it changes
  useEffect(() => {
    send({
      type: "THEME",
      value: colorScheme === "unspecified" ? "light" : colorScheme,
    });
  }, [colorScheme]);

  function onMessage(e: WebViewMessageEvent) {
    let msg: WebToNative;
    try {
      msg = JSON.parse(e.nativeEvent.data);
    } catch {
      return;
    }

    if (msg.type === "SHARE") {
      Share.share({ url: msg.url, message: msg.title });
    }
  }

  return (
    <WebView
      ref={ref}
      source={{ uri: WEB_URL }}
      onMessage={onMessage}
      style={[
        StyleSheet.absoluteFill,
        { backgroundColor: colorScheme === "dark" ? "#000000" : "#ffffff" },
      ]}
      // Required for postMessage to work
      javaScriptEnabled
      // Prevent web page from navigating away from the app
      onShouldStartLoadWithRequest={(req) =>
        req.url.startsWith(WEB_URL) || __DEV__
      }
    />
  );
}
