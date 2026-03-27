import { StyleSheet, Text, View } from 'react-native'
import{Link} from 'expo-router'

const Page1 = () => {
  return (
    <View style = {styles.container}>
      <Text style = {styles.title}>Page 1</Text>

      <Link href="/" style={styles.link}>Back Home</Link>
    </View>
  )
}

export default Page1

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