import Constants from "expo-constants";
import { StatusBar } from "expo-status-bar";
import { StyleSheet } from "react-native";
import WebView from "react-native-webview";

const WEB_URL = __DEV__
  ? "http://localhost:3000/ko"
  : "https://juun.vercel.app/ko";

export default function App() {
  return (
    <>
      <WebView
        style={styles.container}
        source={{ uri: WEB_URL }}
        javaScriptEnabled
      />
      <StatusBar style="auto" />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Constants.statusBarHeight,
  },
});
