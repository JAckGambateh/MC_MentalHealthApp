import { StyleSheet, View, ScrollView, Pressable, useColorScheme } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { useRouter } from 'expo-router'
import { Colors } from "../../constants/Colors"
import ThemedView from '../../components/ThemedView'
import ThemedText from '../../components/ThemedText'
import ThemedCard from '../../components/ThemedCard'
import Spacer from '../../components/Spacer'

// Summary data for the progress bars
const COMMUNITY_VIBE = [
    { id: 1, label: 'Exhausted', percent: '45%', color: '#ff7675', icon: 'battery-dead-outline' },
    { id: 2, label: 'Anxious', percent: '25%', color: '#a29bfe', icon: 'pulse-outline' },
    { id: 3, label: 'Okay', percent: '20%', color: '#b2bec3', icon: 'cloud-outline' },
    { id: 4, label: 'Great', percent: '10%', color: '#55efc4', icon: 'sunny-outline' },
]

// NEW: Live feed of individual strangers
const RECENT_LOGS = [
    { id: 's1', name: 'Stranger_402', mood: 'Exhausted', note: 'Midterms are draining me...', color: '#ff7675', icon: 'battery-dead' },
    { id: 's2', name: 'CoffeeAddict', mood: 'Anxious', note: 'Too much caffeine today 😅', color: '#a29bfe', icon: 'pulse' },
    { id: 's3', name: 'Stranger_89', mood: 'Okay', note: 'Just a normal Tuesday.', color: '#b2bec3', icon: 'cloud' },
]

const Main = () => {
    const colorScheme = useColorScheme()
    const theme = Colors[colorScheme] ?? Colors.light
    const router = useRouter()

    return (
        <ThemedView style={styles.container} safe={true}>
            
            <View style={styles.header}>
                <ThemedText title={true} style={styles.heading}>"Someone" mood</ThemedText>
                <ThemedText style={styles.subheading}>Sunday, March 29</ThemedText>
            </View>

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
                
                <Spacer height={20} />

                {/* 1. COMMUNITY OVERVIEW CHART */}
                <ThemedText style={styles.sectionTitle}>Today's Summary</ThemedText>
                <Spacer height={10} />
                
                <ThemedCard style={[styles.card, { borderColor: theme.border }]}>
                    {COMMUNITY_VIBE.map((vibe) => (
                        <View key={vibe.id} style={styles.vibeRow}>
                            <View style={styles.vibeLabelContainer}>
                                <Ionicons name={vibe.icon} size={16} color={vibe.color} style={{ marginRight: 5 }} />
                                <ThemedText style={styles.vibeLabel}>{vibe.label}</ThemedText>
                            </View>
                            <View style={[styles.barTrack, { backgroundColor: theme.border + '50' }]}>
                                <View style={[styles.barFill, { width: vibe.percent, backgroundColor: vibe.color }]} />
                            </View>
                            <ThemedText style={styles.vibePercent}>{vibe.percent}</ThemedText>
                        </View>
                    ))}
                </ThemedCard>

                <Spacer height={30} />

                {/* 2. LIVE CAMPUS FEED (Clickable!) */}
                <ThemedText style={styles.sectionTitle}>Live Feed</ThemedText>
                <Spacer height={10} />

                {RECENT_LOGS.map((log) => (
                    <Pressable 
                        key={log.id} 
                        style={({ pressed }) => [
                            styles.feedCardWrapper,
                            pressed && { opacity: 0.7, transform: [{ scale: 0.98 }] }
                        ]}
                        // Navigates to the stranger profile
                       onPress={() => router.push({ 
                            pathname: '/strangers', 
                            params: { 
                            name: log.name, 
                            mood: log.mood, 
                            note: log.note, 
                            color: log.color, 
                            icon: log.icon 
                        } 
                        })}
                    >
                        <ThemedCard style={[styles.feedCard, { borderColor: theme.border }]}>
                            <View style={[styles.feedIconBox, { backgroundColor: log.color + '20' }]}>
                                <Ionicons name={log.icon} size={24} color={log.color} />
                            </View>
                            <View style={styles.feedText}>
                                <View style={styles.feedHeader}>
                                    <ThemedText style={styles.feedName}>{log.name}</ThemedText>
                                    <ThemedText style={[styles.feedMoodBadge, { color: log.color }]}>{log.mood}</ThemedText>
                                </View>
                                <ThemedText style={styles.feedNote} numberOfLines={1}>"{log.note}"</ThemedText>
                            </View>
                        </ThemedCard>
                    </Pressable>
                ))}

                <Spacer height={30} />

                {/* 3. YOUR VIBE */}
                <ThemedText style={styles.sectionTitle}>Your Vibe</ThemedText>
                <Spacer height={10} />

                <ThemedCard style={[styles.card, styles.myMoodCard, { borderColor: theme.border }]}>
                    <View style={[styles.myMoodIconBox, { backgroundColor: '#b2bec320' }]}>
                        <Ionicons name="cloud-outline" size={32} color="#b2bec3" />
                    </View>
                    <View style={styles.myMoodText}>
                        <ThemedText style={styles.myMoodTitle}>You're feeling "Okay"</ThemedText>
                        <ThemedText style={styles.myMoodDesc}>Logged 2 hours ago</ThemedText>
                    </View>
                    <Pressable 
                        style={[styles.editButton, { backgroundColor: theme.background }]}
                        onPress={() => router.push('/mood')} 
                    >
                        <Ionicons name="pencil" size={18} color={theme.iconColor} />
                    </Pressable>
                </ThemedCard>

                <Spacer height={30} />

                {/* 4. DAILY BOOST (Removed the support button from here) */}
                <ThemedCard style={[styles.card, { borderColor: Colors.primary + '50', backgroundColor: Colors.primary + '10' }]}>
                    <Ionicons name="sparkles" size={24} color={Colors.primary} style={{ alignSelf: 'center', marginBottom: 10 }} />
                    <ThemedText style={styles.quoteText}>
                        "It is completely okay if the only thing you did today was breathe. Rest is productive too."
                    </ThemedText>
                </ThemedCard>

                <Spacer height={40} />
            </ScrollView>
        </ThemedView>
    )
}

export default Main

const styles = StyleSheet.create({
    container: { flex: 1 },
    header: { paddingHorizontal: 20, paddingTop: 10 },
    heading: { fontSize: 32, fontWeight: 'bold' },
    subheading: { fontSize: 16, opacity: 0.6, marginTop: 4 },
    scrollContent: { paddingHorizontal: 20 },
    sectionTitle: { fontSize: 18, fontWeight: 'bold' },
    card: { borderWidth: 1, borderRadius: 16, padding: 20 },
    
    // Community Bar Styles
    vibeRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 12 },
    vibeLabelContainer: { flexDirection: 'row', alignItems: 'center', width: 90 },
    vibeLabel: { fontSize: 14, fontWeight: '500' },
    barTrack: { flex: 1, height: 10, borderRadius: 5, marginHorizontal: 10, overflow: 'hidden' },
    barFill: { height: '100%', borderRadius: 5 },
    vibePercent: { fontSize: 12, fontWeight: 'bold', width: 35, textAlign: 'right' },
    
    // Feed Styles
    feedCardWrapper: { marginBottom: 12 },
    feedCard: { flexDirection: 'row', alignItems: 'center', padding: 15, borderRadius: 16, borderWidth: 1 },
    feedIconBox: { width: 45, height: 45, borderRadius: 12, alignItems: 'center', justifyContent: 'center', marginRight: 15 },
    feedText: { flex: 1 },
    feedHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 },
    feedName: { fontSize: 16, fontWeight: 'bold' },
    feedMoodBadge: { fontSize: 12, fontWeight: 'bold' },
    feedNote: { fontSize: 14, opacity: 0.7, fontStyle: 'italic' },

    // My Mood Styles
    myMoodCard: { flexDirection: 'row', alignItems: 'center', padding: 15 },
    myMoodIconBox: { width: 50, height: 50, borderRadius: 15, alignItems: 'center', justifyContent: 'center', marginRight: 15 },
    myMoodText: { flex: 1 },
    myMoodTitle: { fontSize: 16, fontWeight: 'bold', marginBottom: 4 },
    myMoodDesc: { fontSize: 13, opacity: 0.6 },
    editButton: { width: 36, height: 36, borderRadius: 18, alignItems: 'center', justifyContent: 'center' },
    
    // Affirmation Styles
    quoteText: { fontSize: 16, textAlign: 'center', fontStyle: 'italic', lineHeight: 24, paddingHorizontal: 10 },
})