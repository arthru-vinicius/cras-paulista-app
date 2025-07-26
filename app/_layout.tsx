import { Stack } from "expo-router";
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import './globals.css';

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1, backgroundColor: '#ffffff' }}>
        <Stack screenOptions={{ headerShown: false }}/>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
