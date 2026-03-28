import { StyleSheet, Text, View, Image, useColorScheme } from 'react-native'

import {Colors}from "../../constants/Colors"
import ThemedView from '../../components/ThemedView'
import Spacer from '../../components/Spacer'
import ThemedText from '../../components/ThemedText'

const Message = () => {
    return (
        <ThemedView style={StyleSheet.container}>

            <ThemedText title={true} style={StyleSheet.heading}>
                Hihi
            </ThemedText>
            <Spacer />

        </ThemedView>
    )
}

export default Message

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    heading: {
        fontWeight: "bold",
        fontSize: 18,
        textAlign: "center",
    },
})