import { Stack } from 'expo-router'
import { Colors } from '../../constants/Colors'
import { StatusBar } from 'expo-status-bar'

export default function AuthLayout() {
    return(
        <>
            <StatusBar style="auto" />
            <Stack
             screenOptions={{ headerShown: false, animation: "none"}}
             />
        </>
    )
}