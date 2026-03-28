import { View, useColorScheme, StyleSheet } from 'react-native' 
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context' 
import { Colors } from "../constants/Colors"

const ThemedView = ({ style, children, safe=false, ...props }) => {
  const colorScheme = useColorScheme()
  const theme = Colors[colorScheme] ?? Colors.light

  if (!safe) return(
    <View 
      style={[{ backgroundColor: theme.background, flex: 1 }, style]}
      {...props}
    >
      {children}
    </View> 
  )

  const insets = useSafeAreaInsets()

  return(
    <View 
      style={[{ 
        backgroundColor: theme.background, flex: 1, 
        paddingTop: insets.top,
        paddingBottom: insets.bottom,

      }, 
      style]}
      {...props}
    >
      {children}
    </View> 
  )
}

export default ThemedView