import { Tabs } from 'expo-router'
import { Colors } from "../../constants/Colors"
import { useColorScheme } from 'react-native'
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons' 

const DashboardLayout = () => {
    const colorScheme = useColorScheme()
    const theme = Colors[colorScheme] ?? Colors.light

    return (
        <Tabs
            screenOptions={{
                headerShown: false,
                tabBarStyle: {
                    backgroundColor: theme.navBackground,
                    paddingTop: 10,
                    height: 90,
                    borderTopWidth: 0, 
                    elevation: 0,      
                },
                tabBarActiveTintColor: theme.iconColorFocused,
                tabBarInactiveTintColor: theme.iconColor,
            }}
        >
            <Tabs.Screen
                name="profile"
                options={{
                    title: 'Profile',
                    tabBarIcon: ({ focused, color }) => (
                        <Ionicons size={24} name={focused ? 'person' : 'person-outline'} color={color} />
                    )
                }}
            />

            <Tabs.Screen
                name="create"
                options={{
                    title: 'Add',
                    tabBarIcon: ({ focused, color }) => (
                        <Ionicons size={24} name={focused ? 'add-circle' : 'add-circle-outline'} color={color} />
                    )
                }}
            />

            <Tabs.Screen
                name="message"
                options={{
                    title: 'Message',
                    tabBarIcon: ({ focused, color }) => (
                        <Ionicons size={24} name={focused ? 'chatbubbles' : 'chatbubbles-outline'} color={color} />
                    )
                }}
            />

            <Tabs.Screen
                name="mood"
                options={{
                    title: 'Mood',
                    tabBarIcon: ({ focused, color }) => (
                        <MaterialCommunityIcons 
                            size={24} 
                            name={focused ? 'emoticon-neutral' : 'emoticon-neutral-outline'} 
                            color={color} 
                        />
                    )
                }}
            />

            <Tabs.Screen
                name="activity"
                options={{
                    title: 'Activity',
                    tabBarIcon: ({ focused, color }) => (
                        <Ionicons size={24} name={focused ? 'stats-chart' : 'stats-chart-outline'} color={color} />
                    )
                }}
            />
        </Tabs>
    )
}

export default DashboardLayout