import { useState } from 'react'
import { StyleSheet, View, ScrollView, Pressable, useColorScheme } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { useRouter } from 'expo-router' // 1. Added useRouter import
import { Colors } from "../constants/Colors"
import ThemedView from '../components/ThemedView'
import ThemedText from '../components/ThemedText'
import ThemedCard from '../components/ThemedCard'
import Spacer from '../components/Spacer'

const INBOX_MESSAGES = [
    { id: 1, type: 'hug', title: 'Virtual Hug', text: 'Someone near the Library sent you a hug!', time: '10m ago', unread: true, icon: 'heart' },
    { id: 2, type: 'reply', title: 'New Support', text: '"Hang in there! Finals week is tough but you got this." - Anonymous', time: '2h ago', unread: true, icon: 'chatbubble-ellipses' },
    { id: 3, type: 'relate', title: 'Me Too', text: '12 other students related to your "Burnt Out" vibe today.', time: '5h ago', unread: false, icon: 'people' },
    { id: 4, type: 'reply', title: 'New Support', text: '"I felt the exact same way yesterday. Go grab a coffee!" - Anonymous', time: '1d ago', unread: false, icon: 'chatbubble-ellipses' },
]

const Message = () => {
    const colorScheme = useColorScheme()
    const theme = Colors[colorScheme] ?? Colors.light
    const router = useRouter() // 2. Initialized router
    const [activeTab, setActiveTab] = useState('inbox')

    return (
        <ThemedView style={styles.container} safe={true}>
            
            {/* 1. Header Area with Back Button */}
            <View style={styles.header}>
                <View style={styles.headerTopRow}>
                    {/* 3. The Back Button */}
                    <Pressable 
                        onPress={() => router.back()} 
                        style={({ pressed }) => [styles.backButton, pressed && { opacity: 0.5 }]}
                    >
                        <Ionicons name="arrow-back" size={28} color={theme.text} />
                    </Pressable>
                    <ThemedText title={true} style={styles.heading}>Support Inbox</ThemedText>
                    {/* Empty view to balance the flex layout so the heading stays centered */}
                    <View style={{ width: 28 }} /> 
                </View>
                
                <Spacer height={20} />
                
                {/* 2. Custom Tabs */}
                <View style={[styles.tabContainer, { backgroundColor: theme.border + '50' }]}>
                    <Pressable 
                        style={[styles.tab, activeTab === 'inbox' && { backgroundColor: theme.uiBackground, shadowColor: '#000', elevation: 2 }]}
                        onPress={() => setActiveTab('inbox')}
                    >
                        <ThemedText style={[styles.tabText, activeTab === 'inbox' && { fontWeight: 'bold' }]}>Received</ThemedText>
                    </Pressable>
                    
                    <Pressable 
                        style={[styles.tab, activeTab === 'sent' && { backgroundColor: theme.uiBackground, shadowColor: '#000', elevation: 2 }]}
                        onPress={() => setActiveTab('sent')}
                    >
                        <ThemedText style={[styles.tabText, activeTab === 'sent' && { fontWeight: 'bold' }]}>Sent Hugs</ThemedText>
                    </Pressable>
                </View>
            </View>

            <Spacer height={20} />

            {/* 3. Scrollable Message List */}
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
                
                {activeTab === 'inbox' ? (
                    INBOX_MESSAGES.map((msg) => (
                        <Pressable key={msg.id} style={styles.messageWrapper}>
                            <ThemedCard style={[styles.messageCard, { borderColor: theme.border }]}>
                                
                                <View style={[styles.iconCircle, { backgroundColor: msg.unread ? Colors.primary + '20' : theme.background }]}>
                                    <Ionicons name={msg.icon} size={24} color={msg.unread ? Colors.primary : theme.iconColor} />
                                </View>

                                <View style={styles.textContent}>
                                    <View style={styles.messageHeader}>
                                        <ThemedText style={[styles.messageTitle, msg.unread && { fontWeight: 'bold' }]}>
                                            {msg.title}
                                        </ThemedText>
                                        <ThemedText style={styles.timeText}>{msg.time}</ThemedText>
                                    </View>
                                    <ThemedText style={[styles.messagePreview, msg.unread && { color: theme.text }]} numberOfLines={2}>
                                        {msg.text}
                                    </ThemedText>
                                </View>

                                {msg.unread && <View style={[styles.unreadDot, { backgroundColor: Colors.primary }]} />}
                                
                            </ThemedCard>
                        </Pressable>
                    ))
                ) : (
                    <View style={styles.emptyState}>
                        <Ionicons name="paper-plane-outline" size={60} color={theme.iconColor} />
                        <Spacer height={15}/>
                        <ThemedText style={{ textAlign: 'center', opacity: 0.6 }}>
                            You haven't sent any anonymous support today. Check the Vibe Map to encourage someone!
                        </ThemedText>
                    </View>
                )}

                <Spacer height={40} />
            </ScrollView>

        </ThemedView>
    )
}

export default Message

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        paddingHorizontal: 20,
        paddingTop: 10,
    },
    // Added a row layout to keep the back button and title on the same line
    headerTopRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    backButton: {
        padding: 5,
        marginLeft: -5, // Pulls it slightly to the edge to align with the cards below
    },
    heading: {
        fontSize: 24, // Slightly smaller to fit nicely next to the arrow
        fontWeight: 'bold',
    },
    tabContainer: {
        flexDirection: 'row',
        borderRadius: 12,
        padding: 4,
    },
    tab: {
        flex: 1,
        paddingVertical: 10,
        borderRadius: 8,
        alignItems: 'center',
    },
    tabText: {
        fontSize: 14,
    },
    scrollContent: {
        paddingHorizontal: 20,
        paddingBottom: 20,
    },
    messageWrapper: {
        marginBottom: 12,
    },
    messageCard: {
        flexDirection: 'row',
        padding: 15,
        borderRadius: 16,
        alignItems: 'center',
        borderWidth: 1,
    },
    iconCircle: {
        width: 50,
        height: 50,
        borderRadius: 25,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 15,
    },
    textContent: {
        flex: 1,
    },
    messageHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 4,
    },
    messageTitle: {
        fontSize: 16,
        fontWeight: '600',
    },
    timeText: {
        fontSize: 12,
        opacity: 0.5,
    },
    messagePreview: {
        fontSize: 14,
        opacity: 0.7,
        lineHeight: 20,
    },
    unreadDot: {
        width: 10,
        height: 10,
        borderRadius: 5,
        marginLeft: 10,
    },
    emptyState: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 40,
        marginTop: 50,
    }
})