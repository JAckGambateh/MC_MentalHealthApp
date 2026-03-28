import { StyleSheet, Text, View, useColorScheme } from 'react-native'
import { Slot, Stack } from 'expo-router'
import {Colors}from "../constants/Colors"
import { StatusBar } from 'expo-status-bar'


const RootLayout = () => {
  const colorScheme = useColorScheme()
  const theme = Colors[colorScheme] ?? Colors.light

  return (
    <>
      <StatusBar value="auto"/>
      <Stack screenOptions={{
        headerStyle:{backgroundColor: theme.navBackground},
        headerTintColor: theme.title,
        headerTitleStyle: { fontWeight: 'bold' },
        headerTitleAlign: 'center',
        headerBackVisible: false,
      }}>
        <Stack.Screen name="(auth)" options={{headerShown: false}}/>
        <Stack.Screen name="(dashboard)" options={{headerShown: false}}/>

        <Stack.Screen name="index" options={{ title: 'Home', headerShown: false}} />
        <Stack.Screen name="page1" options={{ title: 'to be updated'}} />
        <Stack.Screen name="page2" options={{ title: 'same', headerShown: false}} />
      </Stack>
    </>
  )
}

export default RootLayout

const styles = StyleSheet.create({})