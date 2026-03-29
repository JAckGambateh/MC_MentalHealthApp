import { useState } from 'react'
import { StyleSheet, View, TextInput, ScrollView, Pressable, useColorScheme, Image } from 'react-native'
import { Colors } from "../../constants/Colors"
import { Ionicons } from '@expo/vector-icons'
import Spacer from '../../components/Spacer'
import ThemedView from '../../components/ThemedView'
import ThemedText from '../../components/ThemedText'
import ThemedCard from '../../components/ThemedCard'

// Your updated MOODS array!
const MOODS = [
    { id: 0, image: require('../../assets/img/happy.png'), label: 'Happy', color: '#ecb1b1' },
    { id: 1, image: require('../../assets/img/energetic.png'), label: 'Energy', color: '#b076c2' },
    { id: 2, image: require('../../assets/img/sad.png'), label: 'Sad', color: '#c2dde9' },
    { id: 3, image: require('../../assets/img/cry.png'), label: 'Cry', color: '#708fac' },
    { id: 4, image: require('../../assets/img/angry.png'), label: 'Angry', color: '#fdcb6e' },
    { id: 5, image: require('../../assets/img/sleepy.png'), label: 'Sleepy', color: '#a6a4c2' },
    { id: 6, image: require('../../assets/img/unknown.png'), label: 'Others', color: '#cecece' }, 
]

const Mood = () => {
    const colorScheme = useColorScheme()
    const theme = Colors[colorScheme] ?? Colors.light
    
    const [moodIndex, setMoodIndex] = useState(2) 
    const [customMood, setCustomMood] = useState('')
    const [diaryEntry, setDiaryEntry] = useState('')

    const currentMood = MOODS[moodIndex] 

    return (
        <ThemedView style={styles.container} safe={true}>
            <ScrollView showsVerticalScrollIndicator={false}>
                
                {/* 1. Header */}
                <View style={styles.header}>
                    <ThemedText title={true} style={styles.heading}>Today's Vibe</ThemedText>
                    <ThemedText style={styles.subheading}>Sunday, March 29</ThemedText>
                </View>

                <Spacer height={40} />

                {/* 2. Big Emotion Image Area */}
                <View style={styles.imageContainer}>
                    <View style={[styles.bigCircle, { backgroundColor: currentMood.color + '20' }]}>
                        <Image 
                            source={currentMood.image} 
                            style={styles.bigEmotionImage} 
                            resizeMode="contain" 
                        />
                    </View>
                    
                    <Spacer height={20} />
                    
                    <ThemedText style={styles.questionText}>How do you feel today?</ThemedText>
                    <ThemedText style={[styles.moodHighlightText, { color: currentMood.color }]}>
                        {moodIndex === 5 && customMood.length > 0 ? customMood : currentMood.label}
                    </ThemedText>
                </View>

                <Spacer height={30} />

                {/* 3. The Scrollable Colored Buttons */}
                <View>
                    <ScrollView 
                        horizontal={true} 
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={styles.moodScrollContent}
                    >
                        {MOODS.map((mood, idx) => {
                            const isSelected = moodIndex === idx;
                            return (
                                <Pressable 
                                    key={mood.id} 
                                    style={[
                                        styles.moodBox, 
                                        { backgroundColor: mood.color },
                                        isSelected && { borderWidth: 4, borderColor: theme.uiBackground, transform: [{ scale: 1.05 }] }
                                    ]}
                                    onPress={() => setMoodIndex(idx)}
                                >
                                    {/* SMALL IMAGE - Now much bigger! */}
                                    <Image 
                                        source={mood.image} 
                                        style={styles.smallEmotionImage} 
                                        resizeMode="contain" 
                                    />
                                    <Spacer height={8} />
                                    {/* Removed the weather text to make room for the bigger image */}
                                    <ThemedText style={styles.boxLabelText}>{mood.label}</ThemedText>
                                </Pressable>
                            )
                        })}
                    </ScrollView>
                </View>

                <Spacer height={20} />

                {/* 4. The Custom Emotion Input */}
                {moodIndex === 6 && (
                    <View style={{ marginBottom: 20 }}>
                        <ThemedText style={styles.sectionTitle}>Name your emotion</ThemedText>
                        <Spacer height={10} />
                        <ThemedCard style={[styles.diaryCard, { minHeight: 60, padding: 0 }]}>
                            <TextInput
                                style={[styles.textInput, { color: theme.text, padding: 15 }]}
                                placeholder="E.g., Overwhelmed, Excited, Burnt Out..."
                                placeholderTextColor={theme.iconColor}
                                value={customMood}
                                onChangeText={setCustomMood}
                                maxLength={20}
                            />
                        </ThemedCard>
                    </View>
                )}

                {/* 5. Diary / Journal Entry */}
                <ThemedText style={styles.sectionTitle}>Private Diary</ThemedText>
                <Spacer height={15} />
                
                <ThemedCard style={styles.diaryCard}>
                    <TextInput
                        style={[styles.textInput, { color: theme.text }]}
                        placeholder="Why do you feel this way? (Optional)"
                        placeholderTextColor={theme.iconColor}
                        multiline={true}
                        numberOfLines={5}
                        textAlignVertical="top" 
                        value={diaryEntry}
                        onChangeText={setDiaryEntry}
                    />
                </ThemedCard>

                <Spacer height={40} />

                {/* 6. Submit Button */}
                <Pressable 
                    style={({ pressed }) => [
                        styles.submitBtn, 
                        { backgroundColor: currentMood.color },
                        pressed && { opacity: 0.7 } 
                    ]}
                    disabled={moodIndex === 5 && customMood.trim() === ''}
                    onPress={() => alert(`Logged vibe as: ${moodIndex === 5 ? customMood : currentMood.label}!`)} 
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
    },
    header: {
        alignItems: 'center', 
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
    
    // Big Image Styles
    imageContainer: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    bigCircle: {
        width: 250,
        height: 250,
        borderRadius: 125,
        alignItems: 'center',
        justifyContent: 'center',
    },
    bigEmotionImage: {
        width: 200,
        height: 200,
    },
    questionText: {
        fontSize: 20,
        fontWeight: '600',
    },
    moodHighlightText: {
        fontSize: 32,
        fontWeight: '900',
        marginTop: 5,
        textTransform: 'uppercase',
        textAlign: 'center',
    },

    // Colored Box Buttons
    moodScrollContent: {
        paddingHorizontal: 20,
        paddingVertical: 10,
        gap: 12,
    },
    moodBox: {
        width: 120, // Made the box slightly wider to fit the bigger face
        height: 120, // Made it slightly taller
        borderRadius: 16,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    smallEmotionImage: {
        // HUGE CHANGE: Increased from 45x45 to 65x65!
        width: 65,
        height: 65,
        marginBottom: 0,
    },
    boxLabelText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#1d1e1c', 
        marginTop: 2,
    },

    // Diary & Inputs
    sectionTitle: {
        fontSize: 18,
        fontWeight: '600',
        paddingHorizontal: 20,
    },
    diaryCard: {
        padding: 0, 
        minHeight: 120,
        borderWidth: 1,
        borderColor: 'rgba(150,150,150,0.2)',
        marginHorizontal: 20,
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
        marginHorizontal: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 3,
    },
    submitBtnText: {
        color: '#1d1e1c',
        fontSize: 18,
        fontWeight: 'bold',
    }
})