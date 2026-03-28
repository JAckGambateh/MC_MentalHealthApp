import { StyleSheet, Text, View, Image, useColorScheme, ImageBackground } from 'react-native'
import{Link} from 'expo-router'

import {Colors}from "../../constants/Colors"
import ThemedView from '../../components/ThemedView'
import Spacer from '../../components/Spacer'
import ThemedText from '../../components/ThemedText'
import ThemedButton from '../../components/ThemedButton'

const Register = () => {

    const handleSubmit =() => {
        console.log('registered')
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
                Register for an account
            </ThemedText>

            
            <ThemedButton onPress={handleSubmit}>
                <Text style={{color: '#f2f2f2'}}> Register </Text>
            </ThemedButton>

            <Spacer height={100} />

        <Link href="login" style={styles.link}>Back</Link>
        </View>
       </ImageBackground>
    )
}

export default Register

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
})