import { StyleSheet, View, ScrollView, Pressable, useColorScheme } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { Colors } from "../../constants/Colors"
import ThemedView from '../../components/ThemedView'
import ThemedText from '../../components/ThemedText'
import ThemedCard from '../../components/ThemedCard'
import Spacer from '../../components/Spacer'

// Data for the suggested activities
const ACTIVITIES = [
    { id: 1, title: 'Rest & Sleep', desc: 'Set a calming alarm and get 8 solid hours.', icon: 'moon', color: '#a29bfe' },
    { id: 2, title: 'Move Your Body', desc: 'Take a 15-minute walk or do a quick stretch.', icon: 'fitness', color: '#fab1a0' },
    { id: 3, title: 'Social Connection', desc: 'Call a friend or grab a coffee with someone.', icon: 'people', color: '#fd79a8' },
    { id: 4, title: 'Therapy & Journal', desc: 'Write your thoughts or speak to a professional.', icon: 'book', color: '#00cec9' },
    { id: 5, title: 'Medication & Health', desc: 'Stay on track with your daily health routines.', icon: 'medical', color: '#55efc4' },
    { id: 6, title: 'Deep Breathing', desc: 'Take 5 minutes to focus on your breath.', icon: 'leaf', color: '#81ecec' },
]

const Activity = () => {
    const colorScheme = useColorScheme()
    const theme = Colors[colorScheme] ?? Colors.light

    return (
        <ThemedView style={styles.container} safe={true}>
            
            {/* Header Section */}
            <View style={styles.header}>
                <ThemedText title={true} style={styles.heading}>Self-Care</ThemedText>
                <ThemedText style={styles.subheading}>
                    University life is hectic. Pick an activity below to recharge your mind and body today.
                </ThemedText>
            </View>

            <Spacer height={20} />

            {/* Scrollable List of Activities */}
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
                
                {ACTIVITIES.map((item) => (
                    <Pressable 
                        key={item.id} 
                        style={({ pressed }) => [
                            styles.cardWrapper,
                            pressed && { opacity: 0.7, transform: [{ scale: 0.98 }] } // Soft press animation
                        ]}
                    >
                        <ThemedCard style={[styles.activityCard, { borderColor: theme.border }]}>
                            
                            {/* Left Side: Colorful Icon Background */}
                            <View style={[styles.iconBox, { backgroundColor: item.color + '20' }]}>
                                <Ionicons name={item.icon} size={28} color={item.color} />
                            </View>

                            {/* Middle: Text Content */}
                            <View style={styles.textContent}>
                                <ThemedText style={styles.activityTitle}>{item.title}</ThemedText>
                                <ThemedText style={styles.activityDesc}>{item.desc}</ThemedText>
                            </View>

                            {/* Right Side: Arrow to indicate it is clickable */}
                            <Ionicons name="chevron-forward" size={20} color={theme.iconColor} style={{ opacity: 0.5 }} />

                        </ThemedCard>
                    </Pressable>
                ))}

                <Spacer height={40} />
                
            </ScrollView>

        </ThemedView>
    )
}

export default Activity

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        paddingHorizontal: 20,
        paddingTop: 10,
    },
    heading: {
        fontSize: 32,
        fontWeight: 'bold',
    },
    subheading: {
        fontSize: 16,
        opacity: 0.7,
        marginTop: 8,
        lineHeight: 22,
    },
    scrollContent: {
        paddingHorizontal: 20,
        paddingBottom: 20,
    },
    cardWrapper: {
        marginBottom: 15,
    },
    activityCard: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 15,
        borderRadius: 16,
        borderWidth: 1,
    },
    iconBox: {
        width: 54,
        height: 54,
        borderRadius: 14,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 15,
    },
    textContent: {
        flex: 1,
        paddingRight: 10,
    },
    activityTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 4,
    },
    activityDesc: {
        fontSize: 14,
        opacity: 0.7,
        lineHeight: 20,
    }
})