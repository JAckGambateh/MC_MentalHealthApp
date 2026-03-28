import { useState } from 'react'
import { StyleSheet, View, TextInput, ScrollView, Pressable, useColorScheme } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { Colors } from "../../constants/Colors"
import ThemedView from '../../components/ThemedView'
import ThemedText from '../../components/ThemedText'
import ThemedCard from '../../components/ThemedCard'
import Spacer from '../../components/Spacer'

// List of available moods to map through
const MOODS = [
    { id: 1, icon: 'thunderstorm-outline', label: 'Heavy', color: '#ff7675' },
    { id: 2, icon: 'rainy-outline', label: 'Down', color: '#74b9ff' },
    { id: 3, icon: 'cloud-outline', label: 'Okay', color: '#b2bec3' },
    { id: 4, icon: 'partly-sunny-outline', label: 'Good', color: '#55efc4' },
    { id: 5, icon: 'sunny-outline', label: 'Great', color: '#fdcb6e' },
]

// Mock data for the weekly calendar strip
const WEEK_DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

const Mood = () => {
    const colorScheme = useColorScheme()
    const theme = Colors[colorScheme] ?? Colors.light
    
    // React State to remember user inputs
    const [selectedMood, setSelectedMood] = useState(null)
    const [diaryEntry, setDiaryEntry] = useState('')

    return (
        <ThemedView style={styles.container} safe={true}>
            <ScrollView showsVerticalScrollIndicator={false}>
                
                {/* 1. Header & Weekly Calendar Strip */}
                <View style={styles.header}>
                    <ThemedText title={true} style={styles.heading}>How's your vibe today?</ThemedText>
                    <ThemedText style={styles.subheading}>March 29, 2026</ThemedText>
                </View>

                <Spacer height={20} />

                {/* Horizontal Weekly Strip */}
                <View style={styles.calendarStrip}>
                    {WEEK_DAYS.map((day, index) => (
                        <View key={index} style={[
                            styles.dayCircle, 
                            // Highlight "Today" (Sunday) as an example
                            index === 6 && { backgroundColor: Colors.primary }
                        ]}>
                            <ThemedText style={[
                                styles.dayText,
                                index === 6 && { color: '#FFF', fontWeight: 'bold' }
                            ]}>{day.charAt(0)}</ThemedText>
                        </View>
                    ))}
                </View>

                <Spacer height={40} />

                {/* 2. Mood Selector */}
                <ThemedText style={styles.sectionTitle}>Select your mood</ThemedText>
                <Spacer height={15} />
                
                <View style={styles.moodRow}>
                    {MOODS.map((mood) => {
                        const isSelected = selectedMood === mood.id;
                        return (
                            <Pressable 
                                key={mood.id} 
                                style={[
                                    styles.moodButton, 
                                    { backgroundColor: theme.uiBackground, borderColor: theme.border },
                                    isSelected && { borderColor: mood.color, backgroundColor: mood.color + '20' } // Adds a light tint when selected
                                ]}
                                onPress={() => setSelectedMood(mood.id)}
                            >
                                <Ionicons 
                                    name={isSelected ? mood.icon.replace('-outline', '') : mood.icon} 
                                    size={32} 
                                    color={isSelected ? mood.color : theme.iconColor} 
                                />
                                <ThemedText style={[styles.moodLabel, isSelected && { color: mood.color, fontWeight: 'bold' }]}>
                                    {mood.label}
                                </ThemedText>
                            </Pressable>
                        )
                    })}
                </View>

                <Spacer height={40} />

                {/* 3. Diary / Journal Entry */}
                <ThemedText style={styles.sectionTitle}>Private Diary</ThemedText>
                <Spacer height={15} />
                
                <ThemedCard style={styles.diaryCard}>
                    <TextInput
                        style={[styles.textInput, { color: theme.text }]}
                        placeholder="Why do you feel this way? (Optional & Anonymous)"
                        placeholderTextColor={theme.iconColor}
                        multiline={true}
                        numberOfLines={6}
                        textAlignVertical="top" 
                        value={diaryEntry}
                        onChangeText={setDiaryEntry}
                    />
                </ThemedCard>

                    <Spacer height={40} />

                {/* 4. Submit Button */}
                <Pressable 
                    
                    style={({ pressed }) => [
                        styles.submitBtn, 
                        { backgroundColor: selectedMood ? Colors.primary : theme.border },
                        pressed && { opacity: 0.7 } 
                    ]}
                    disabled={!selectedMood} 

                    onPress={() => alert("Today Mood Uploaded!")} 
                >
                    <ThemedText style={styles.submitBtnText}>
                        Log My Vibe
                    </ThemedText>
                </Pressable>

                <Spacer height={50} />

            </ScrollView>
        </ThemedView>
    )
}

export default Mood

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20,
    },
    header: {
        marginTop: 10,
    },
    heading: {
        fontSize: 28,
        fontWeight: 'bold',
    },
    subheading: {
        fontSize: 16,
        opacity: 0.6,
        marginTop: 5,
    },
    calendarStrip: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 10,
    },
    dayCircle: {
        width: 35,
        height: 35,
        borderRadius: 17.5,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(150,150,150,0.1)',
    },
    dayText: {
        fontSize: 14,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '600',
    },
    moodRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    moodButton: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 60,
        height: 80,
        borderRadius: 15,
        borderWidth: 1,
    },
    moodLabel: {
        fontSize: 12,
        marginTop: 8,
    },
    diaryCard: {
        padding: 0, // Remove default padding so the TextInput takes the full space
        minHeight: 150,
        borderWidth: 1,
        borderColor: 'rgba(150,150,150,0.2)',
    },
    textInput: {
        flex: 1,
        padding: 15,
        fontSize: 16,
    },
    submitBtn: {
        paddingVertical: 18,
        borderRadius: 15,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 3,
    },
    submitBtnText: {
        color: '#FFF',
        fontSize: 18,
        fontWeight: 'bold',
    }
})