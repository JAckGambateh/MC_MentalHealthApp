import { StyleSheet, View, useColorScheme, Pressable } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { useRouter } from 'expo-router' 
import { Colors } from "../../constants/Colors"
import Spacer from '../../components/Spacer'
import ThemedText from '../../components/ThemedText'
import ThemedCard from '../../components/ThemedCard'
import ThemedView from '../../components/ThemedView' 

const Profile = () => {
    const colorScheme = useColorScheme()
    const theme = Colors[colorScheme] ?? Colors.light
    const router = useRouter() 

    return (
        <ThemedView style={styles.container} safe={true}>
            
            <View style={styles.header}>
                <ThemedText title={true} style={styles.heading}>My Profile</ThemedText>
            </View>

            <Spacer height={20} />

            <View style={styles.avatarContainer}>
                <View style={[styles.avatarBackground, { backgroundColor: Colors.profile || Colors.primary }]}>
                    <Ionicons name="happy" size={55} color={theme.uiBackground} />
                </View>
                <Spacer height={15} />
                <ThemedText style={styles.name}>Anonymous Student</ThemedText>
                <ThemedText style={styles.handle}>Joined March 2026</ThemedText>
            </View>

            <Spacer height={30} />

            <ThemedCard style={[styles.statsCard, { borderColor: theme.border }]}>
                <View style={styles.statBox}>
                    <ThemedText style={styles.statNumber}>12</ThemedText>
                    <ThemedText style={styles.statLabel}>Moods Logged</ThemedText>
                </View>
                
                <View style={[styles.divider, { backgroundColor: theme.border }]} />
                
                <View style={styles.statBox}>
                    <ThemedText style={styles.statNumber}>20</ThemedText>
                    <ThemedText style={styles.statLabel}>Hugs Sent</ThemedText>
                </View>
            </ThemedCard>

            <Spacer height={40} />

            {/* Menu Options */}
            <View style={styles.menuContainer}>
                
                <Pressable style={[styles.menuItem, { borderBottomColor: theme.border }]}>
                    <View style={styles.menuItemLeft}>
                        <Ionicons name="settings-outline" size={24} color={theme.iconColor} />
                        <ThemedText style={styles.menuText}>Account Settings</ThemedText>
                    </View>
                    <Ionicons name="chevron-forward" size={20} color={theme.iconColor} />
                </Pressable>

                <Pressable 
                    style={[styles.menuItem, { borderBottomColor: theme.border }]}
                    onPress={() => router.push('/inbox')}
                >
                    <View style={styles.menuItemLeft}>
                        <Ionicons name="chatbubbles-outline" size={24} color={theme.iconColor} />
                        <ThemedText style={styles.menuText}>Inbox</ThemedText>
                    </View>
                    <Ionicons name="chevron-forward" size={20} color={theme.iconColor} />
                </Pressable>

                <Pressable style={[styles.menuItem, { borderBottomColor: theme.border }]}>
                    <View style={styles.menuItemLeft}>
                        <Ionicons name="notifications-outline" size={24} color={theme.iconColor} />
                        <ThemedText style={styles.menuText}>Reminders</ThemedText>
                    </View>
                    <Ionicons name="chevron-forward" size={20} color={theme.iconColor} />
                </Pressable>

                <Spacer height={20} />
                
                <Pressable style={[styles.menuItem, { borderBottomColor: theme.border }]} onPress={() => router.replace('/')}>
                    <View style={styles.menuItemLeft}>
                        <Ionicons name="log-out-outline" size={24} color={Colors.warning} />
                        <ThemedText style={[styles.menuText, { color: Colors.warning }]}>Log Out</ThemedText>
                    </View>
                </Pressable>

            </View>
        </ThemedView>
    )
}

export default Profile

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20,
    },
    header: {
        alignItems: 'center',
        paddingVertical: 10,
    },
    heading: {
        fontWeight: "bold",
        fontSize: 24,
    },
    avatarContainer: {
        alignItems: 'center',
    },
    avatarBackground: {
        width: 100,
        height: 100,
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
    },
    name: {
        fontSize: 22,
        fontWeight: 'bold',
    },
    handle: {
        fontSize: 14,
        marginTop: 2,
        opacity: 0.7,
    },
    statsCard: {
        flexDirection: 'row',
        borderRadius: 20,
        paddingVertical: 20,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1, 
    },
    statBox: {
        flex: 1,
        alignItems: 'center',
    },
    statNumber: {
        fontSize: 24,
        fontWeight: '900',
        color: Colors.primary,
    },
    statLabel: {
        fontSize: 12,
        marginTop: 4,
    },
    divider: {
        width: 1,
        height: '70%',
        opacity: 0.5,
    },
    menuContainer: {
        flex: 1,
    },
    menuItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 15,
        borderBottomWidth: 1,
    },
    menuItemLeft: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    menuText: {
        fontSize: 16,
        marginLeft: 15,
        fontWeight: '500',
    }
})