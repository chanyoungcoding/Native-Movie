import { useCallback } from "react"
import * as SplashScreen from 'expo-splash-screen';
import * as Font from 'expo-font';
import { useAssets } from "expo-asset";
import {Ionicons} from "@expo/vector-icons";
import { NavigationContainer, DarkTheme, DefaultTheme } from '@react-navigation/native';
import { useColorScheme } from "react-native";
import { ThemeProvider } from "styled-components/native";

import Root from "./navigation/Root";
import { darkTheme, lightTheme } from "./Styled";

SplashScreen.preventAutoHideAsync();

export default function App() {

  const isDark = useColorScheme() === "dark";

  const [assets] = useAssets([require('./testImg.jpeg')])
  const [fonts] = Font.useFonts(Ionicons.font)

  const onLayoutRootView = useCallback(async () => {
    if (assets && fonts) await SplashScreen.hideAsync();
  },[assets, fonts])

  if(!assets || !fonts) {
    return null;
  }

  return (
    <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
      <NavigationContainer theme={isDark ? DarkTheme : DefaultTheme} onReady={onLayoutRootView}>
        <Root/>
      </NavigationContainer>
    </ThemeProvider>
  )
}

