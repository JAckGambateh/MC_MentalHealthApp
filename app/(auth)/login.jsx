import { StyleSheet, Text, View, Image, useColorScheme, Pressable, ImageBackground } from 'react-native'
import{Link} from 'expo-router'

import {Colors}from "../../constants/Colors"
import ThemedView from '../../components/ThemedView'
import Spacer from '../../components/Spacer'
import ThemedText from '../../components/ThemedText'
import ThemedButton from '../../components/ThemedButton'

const Login = () => {

    const handleSubmit =() => {
        console.log('register submitted')
    }

    return(
        
        <ImageBackground 
                    source={require('../../assets/img/background.jpeg')} 
                    style={styles.container}
                    resizeMode="cover"
        >

        <View style={styles.container}>

            <Spacer/>
            <ThemedText title={true} style = {styles.title}>
                Login to your account
            </ThemedText>

            <ThemedButton onPress={handleSubmit}>
                <Text style={{color: '#f2f2f2'}}> Login </Text>
            </ThemedButton>

            <Spacer height={100} />
            <Link href='/register'>
            <ThemedText style={{textAlign: 'center'}}>
                Register instead
            </ThemedText>
            </Link>

            <Link href="/profile" style={styles.link}>
              <ThemedText>Profile page</ThemedText>
            </Link>

        </View>

        </ImageBackground>
    )
}

export default Login

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        textAlign: 'center',
        fontSize: 30,
        marginBottom: 30
    },
    btn: {
        backgroundColor: Colors.primary,
        padding: 15,
        borderRadius: 5,
    },
    pressed: {
        opacity: 0.8,
        transform: [{ scale: 0.98 }]
    },
})