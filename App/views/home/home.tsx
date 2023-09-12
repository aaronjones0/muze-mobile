import { StyleSheet, Text, View } from "react-native";
import BubbleButton from "../../components/BubbleButton/BubbleButton";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        justifyContent: 'center',
        backgroundColor: '#262626',
        alignItems: 'center',
        color: '#F5F5F5'
    },
    text: {
        color: '#F5F5F5'
    }
})

export default function Home() {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Home</Text>
            <BubbleButton />
        </View>
    );
}