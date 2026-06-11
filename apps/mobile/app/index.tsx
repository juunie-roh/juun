import Constants from "expo-constants";
import { StyleSheet } from "react-native";
import WebView from "react-native-webview";

const WEB_URL = __DEV__
  ? "http://localhost:3000/ko"
  : "https://juun.vercel.app/ko";

export default function HomeScreen() {
  return (
    <WebView
      style={styles.container}
      source={{ uri: WEB_URL }}
      javaScriptEnabled
    />
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, marginTop: Constants.statusBarHeight },
});
