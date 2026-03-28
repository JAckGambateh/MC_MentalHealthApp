import { StyleSheet, Text, View, Image, useColorScheme, Pressable, ImageBackground } from 'react-native' // 1. Added ImageBackground here
import Logo from '../assets/img/mentalHealthLogo.png'
import { Link } from 'expo-router'
import { Colors } from "../constants/Colors"
import ThemedView from '../components/ThemedView'
import Spacer from '../components/Spacer'
import ThemedText from '../components/ThemedText'
import { SafeAreaView } from 'react-native-safe-area-context'

const Home = () => {
    const colorScheme = useColorScheme()
    const theme = Colors[colorScheme] ?? Colors.light
    
    return (
        
        <ImageBackground 
            source={require('../assets/img/Home.jpeg')} 
            style={styles.container}
            resizeMode="cover"
        >
          <Spacer height={300}/>

            <ThemedText style={styles.title} title={true}>How your days ??? </ThemedText>

            <Spacer height={10}/>

            <Link href="/login" style={styles.link}>
            <ThemedText>Login here</ThemedText>
            </Link>

            <Link href="/register" style={styles.link}>
              <ThemedText>Register here</ThemedText>
            </Link>

            

        </ImageBackground> 
    )
}
export default Home

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        
    },
    title: {
        fontWeight: 'bold',
        fontSize: 30,
        marginTop: -15,
    },
    card: {
        backgroundColor: '#dbd5d5',
        padding: 20,
        borderRadius: 5,
        boxShadow: ' 4px 4px rgba(29, 1, 1, 0.1)',
    },
    link:{
        marginVertical:  10,
        borderBottomWidth: 1
    },
})