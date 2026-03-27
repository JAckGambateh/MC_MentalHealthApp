import { StyleSheet, Text, View, Image } from 'react-native'
import Logo from '../assets/img/mentalHealthLogo.png'
import{Link} from 'expo-router'


const Home = () => {
    return (
        <View style={styles.container}>

            <Image source={Logo} style={styles.img} />

            <Text style={[styles.title, { color:'purple'}]}>The Numer 1</Text>
            <Text style={{marginTop: 10, marinBottom: 30}}>aaaaaa</Text>

            <View style={styles.card}>
                <Text>Hello,mamamia</Text>
            </View>
            <Link href="/page1" style={styles.link}>Page1</Link>
            <Link href="/page2" style={styles.link}>Page2</Link>
        </View>
    )
}
export default Home

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontWeight: 'bold',
        fontSize: 24,
    },
    img:{
        marginVertical: 20,
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