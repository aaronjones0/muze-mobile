import { Button, Image, Pressable, StyleSheet } from "react-native";

const styles = StyleSheet.create({
  icon: {
    height: 24,
    width: 24,
  },
  pressableCommon: {
    height: 56,
    width: 56,
    borderRadius: 9999,
    backgroundColor: '#262626',
    flex: 0,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: 'black',
    shadowOpacity: 0.5,
    borderColor: '#171717',
    borderWidth: 1
  },
})

export default function BubbleButton() {
  return (
    <Pressable style={({ pressed }) => [
      {
        shadowOffset: pressed ? { width: 0, height: 0 } : { width: 0, height: 6 },
        shadowRadius: pressed ? 2 : 12,
      },
      styles.pressableCommon
    ]}>
      <Image style={styles.icon} source={require('../../../assets/Add.png')} />
    </Pressable>
  )
}