import { useState } from 'react'
import { StyleSheet, View, TextInput, Pressable, useColorScheme, ScrollView } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { useRouter, useLocalSearchParams } from 'expo-router' // 1. Added useLocalSearchParams!
import { Colors } from "../constants/Colors"
import Spacer from '../components/Spacer'
import ThemedText from '../components/ThemedText'
import ThemedCard from '../components/ThemedCard'
import ThemedView from '../components/ThemedView'

const Stranger = () => {
    const colorScheme = useColorScheme()
    const theme = Colors[colorScheme] ?? Colors.light
    const router = useRouter()
    
    // 2. Catch the data sent from the Home page!
    const params = useLocalSearchParams()
    
    // 3. Set up fallbacks just in case the data is missing
    const sName = params.name || 'Anonymous'
    const sMood = params.mood || 'Unknown'
    const sNote = params.note || 'No note provided.'
    const sColor = params.color || Colors.primary
    const sIcon = params.icon || 'person'

    const [message, setMessage] = useState('')

    return (
        <ThemedView style={styles.container} safe={true}>
            
            {/* Header with Back Button */}
            <View style={styles.headerTopRow}>
                <Pressable onPress={() => router.back()} style={styles.backButton}>
                    <Ionicons name="arrow-back" size={28} color={theme.text} />
                </Pressable>
                <ThemedText title={true} style={styles.heading}>Send Support</ThemedText>
                <View style={{ width: 28 }} /> 
            </View>

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
                
                <Spacer height={30} />

                {/* Stranger's Current Vibe Card - NOW DYNAMIC! */}
                <View style={styles.profileCenter}>
                    <View style={[styles.avatarBig, { backgroundColor: sColor + '20' }]}>
                        <Ionicons name={sIcon} size={50} color={sColor} />
                    </View>
                    <Spacer height={15} />
                    <ThemedText style={styles.strangerName}>{sName}</ThemedText>
                    <ThemedText style={[styles.strangerMood, { color: sColor }]}>Feeling {sMood}</ThemedText>
                    
                    <Spacer height={20} />
                    <ThemedCard style={[styles.noteCard, { borderColor: theme.border }]}>
                        <ThemedText style={styles.noteText}>"{sNote}"</ThemedText>
                    </ThemedCard>
                </View>

                <Spacer height={40} />

                {/* Quick Actions */}
                <ThemedText style={styles.sectionTitle}>Quick Support</ThemedText>
                <Spacer height={10} />
                
                <View style={styles.quickActionRow}>
                    <Pressable 
                        style={({pressed}) => [styles.quickBtn, { backgroundColor: Colors.primary + '20' }, pressed && { opacity: 0.7 }]}
                        onPress={() => {
                            alert(`Virtual Hug sent to ${sName}!`) // Personalized alert!
                            router.back()
                        }}
                    >
                        <Ionicons name="heart" size={24} color={Colors.primary} />
                        <ThemedText style={[styles.quickBtnText, { color: Colors.primary }]}>Send Hug</ThemedText>
                    </Pressable>

                    <Pressable 
                        style={({pressed}) => [styles.quickBtn, { backgroundColor: '#55efc420' }, pressed && { opacity: 0.7 }]}
                        onPress={() => {
                            alert(`'Me Too' reaction sent to ${sName}!`)
                            router.back()
                        }}
                    >
                        <Ionicons name="people" size={24} color="#00b894" />
                        <ThemedText style={[styles.quickBtnText, { color: '#00b894' }]}>Relate</ThemedText>
                    </Pressable>
                </View>

                <Spacer height={30} />

                {/* Custom Message Input */}
                <ThemedText style={styles.sectionTitle}>Or write an anonymous message</ThemedText>
                <Spacer height={10} />
                
                <ThemedCard style={[styles.inputCard, { borderColor: theme.border }]}>
                    <TextInput
                        style={[styles.textInput, { color: theme.text }]}
                        placeholder={`Write something encouraging to ${sName}...`} // Personalized placeholder!
                        placeholderTextColor={theme.iconColor}
                        multiline={true}
                        numberOfLines={4}
                        textAlignVertical="top"
                        value={message}
                        onChangeText={setMessage}
                    />
                </ThemedCard>

                <Spacer height={20} />

                <Pressable 
                    style={({ pressed }) => [
                        styles.submitBtn, 
                        { backgroundColor: message.length > 0 ? Colors.primary : theme.border },
                        pressed && { opacity: 0.8 }
                    ]}
                    disabled={message.length === 0}
                    onPress={() => {
                        alert("Message sent anonymously!")
                        router.back()
                    }}
                >
                    <ThemedText style={styles.submitBtnText}>Send Message</ThemedText>
                </Pressable>

                <Spacer height={40} />
            </ScrollView>
        </ThemedView>
    )
}

export default Stranger

const styles = StyleSheet.create({
    container: { flex: 1 },
    headerTopRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 20, paddingTop: 10 },
    backButton: { padding: 5, marginLeft: -5 },
    heading: { fontSize: 24, fontWeight: 'bold' },
    scrollContent: { paddingHorizontal: 20 },
    
    profileCenter: { alignItems: 'center' },
    avatarBig: { width: 100, height: 100, borderRadius: 50, alignItems: 'center', justifyContent: 'center' },
    strangerName: { fontSize: 24, fontWeight: 'bold' },
    strangerMood: { fontSize: 16, fontWeight: 'bold', marginTop: 4 },
    noteCard: { padding: 15, borderRadius: 12, borderWidth: 1, width: '100%' },
    noteText: { fontSize: 16, fontStyle: 'italic', textAlign: 'center', opacity: 0.8 },
    
    sectionTitle: { fontSize: 16, fontWeight: 'bold' },
    quickActionRow: { flexDirection: 'row', justifyContent: 'space-between' },
    quickBtn: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', padding: 15, borderRadius: 12, marginHorizontal: 5 },
    quickBtnText: { marginLeft: 8, fontWeight: 'bold', fontSize: 16 },
    
    inputCard: { padding: 0, minHeight: 120, borderWidth: 1, borderRadius: 12 },
    textInput: { flex: 1, padding: 15, fontSize: 16 },
    submitBtn: { paddingVertical: 16, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
    submitBtnText: { color: '#FFF', fontSize: 16, fontWeight: 'bold' }
})