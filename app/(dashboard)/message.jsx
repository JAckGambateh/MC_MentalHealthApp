import { useState } from 'react'
import { StyleSheet, View, TextInput, ScrollView, Pressable, useColorScheme } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { Colors } from "../../constants/Colors"
import ThemedView from '../../components/ThemedView'
import Spacer from '../../components/Spacer'
import ThemedText from '../../components/ThemedText'

// Mock Data for ongoing chats with strangers
const MOCK_CHATS = [
    { id: '1', name: 'Stranger_892', message: 'Finals week is going to destroy my sleep schedule 😭', time: '10:42 AM', unread: 2, avatarColor: '#ff7675' },
    { id: '2', name: 'TechGhost', message: 'Honestly same. Have you started researching sensors for the FYP yet?', time: '9:15 AM', unread: 0, avatarColor: '#74b9ff' },
    { id: '3', name: 'CoffeeAddict', message: 'Thanks for the advice earlier!', time: 'Yesterday', unread: 0, avatarColor: '#55efc4' },
    { id: '4', name: 'Stranger_104', message: 'Does anyone actually understand Bayes Theorem? Im lost.', time: 'Monday', unread: 1, avatarColor: '#fdcb6e' },
    { id: '5', name: 'MidnightCoder', message: 'React Native layouts are driving me crazy lol', time: 'Sunday', unread: 0, avatarColor: '#b2bec3' },
]

const Message = () => {
    const colorScheme = useColorScheme()
    const theme = Colors[colorScheme] ?? Colors.light
    
    // State to hold what the user types in the search bar
    const [searchQuery, setSearchQuery] = useState('')

    return (
        <ThemedView style={styles.container} safe={true}>
            
            {/* 1. Header & Search Bar Area */}
            <View style={styles.headerContainer}>
                <ThemedText title={true} style={styles.heading}>Chats</ThemedText>
                
                <Spacer height={15} />

                {/* Search Bar Input */}
                <View style={[styles.searchBar, { backgroundColor: theme.uiBackground, borderColor: theme.border }]}>
                    <Ionicons name="search" size={20} color={theme.iconColor} style={styles.searchIcon} />
                    <TextInput 
                        style={[styles.searchInput, { color: theme.text }]}
                        placeholder="Search users or strangers..."
                        placeholderTextColor={theme.iconColor}
                        value={searchQuery}
                        onChangeText={setSearchQuery}
                    />
                    {/* Clear button appears only if user is typing */}
                    {searchQuery.length > 0 && (
                        <Pressable onPress={() => setSearchQuery('')}>
                            <Ionicons name="close-circle" size={20} color={theme.iconColor} />
                        </Pressable>
                    )}
                </View>
            </View>

            <Spacer height={10} />

            {/* 2. Scrollable List of Chats */}
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.chatList}>
                {MOCK_CHATS.map((chat) => (
                    <Pressable 
                        key={chat.id} 
                        style={({ pressed }) => [
                            styles.chatRow,
                            pressed && { backgroundColor: theme.uiBackground + '50' } // Slight highlight when pressed
                        ]}
                    >
                        {/* Avatar */}
                        <View style={[styles.avatar, { backgroundColor: chat.avatarColor }]}>
                            <Ionicons name="person" size={24} color="#FFF" />
                        </View>

                        {/* Middle Text: Name & Last Message */}
                        <View style={styles.chatTextContainer}>
                            <ThemedText style={styles.chatName}>{chat.name}</ThemedText>
                            <ThemedText 
                                style={[styles.chatPreview, chat.unread > 0 && { color: theme.text, fontWeight: '600' }]} 
                                numberOfLines={1}
                            >
                                {chat.message}
                            </ThemedText>
                        </View>

                        {/* Right Side: Time & Unread Badge */}
                        <View style={styles.chatMeta}>
                            <ThemedText style={[styles.chatTime, chat.unread > 0 && { color: Colors.primary, fontWeight: 'bold' }]}>
                                {chat.time}
                            </ThemedText>
                            
                            {chat.unread > 0 && (
                                <View style={[styles.unreadBadge, { backgroundColor: Colors.primary }]}>
                                    <ThemedText style={styles.unreadText}>{chat.unread}</ThemedText>
                                </View>
                            )}
                        </View>
                    </Pressable>
                ))}
                
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
    headerContainer: {
        paddingHorizontal: 20,
        paddingTop: 10,
    },
    heading: {
        fontSize: 28,
        fontWeight: 'bold',
    },
    searchBar: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 15,
        height: 45,
        borderRadius: 12,
        borderWidth: 1,
    },
    searchIcon: {
        marginRight: 10,
    },
    searchInput: {
        flex: 1,
        fontSize: 16,
        height: '100%',
    },
    chatList: {
        paddingHorizontal: 10,
    },
    chatRow: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 12,
        paddingHorizontal: 10,
        borderRadius: 12,
    },
    avatar: {
        width: 50,
        height: 50,
        borderRadius: 25,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 15,
    },
    chatTextContainer: {
        flex: 1,
        justifyContent: 'center',
    },
    chatName: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 4,
    },
    chatPreview: {
        fontSize: 14,
        opacity: 0.6,
    },
    chatMeta: {
        alignItems: 'flex-end',
        justifyContent: 'center',
        marginLeft: 10,
    },
    chatTime: {
        fontSize: 12,
        opacity: 0.5,
        marginBottom: 6,
    },
    unreadBadge: {
        width: 20,
        height: 20,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    unreadText: {
        color: '#FFF',
        fontSize: 10,
        fontWeight: 'bold',
    }
})