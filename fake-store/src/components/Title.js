import { StyleSheet, Text, View } from 'react-native';

export default function Title ({title}){
    return (
    <View style={styles.titleBox}>
        <Text style={styles.text}>{title}</Text>
    </View>
    )
}

const styles = StyleSheet.create({

    titleBox: {
      backgroundColor: '#87CEFA',
      width: 300,
      height: 60,
      borderColor: 'black',
      borderWidth: 1,
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 50,
    },
    text: {
      color: 'white',
      fontSize: 40,
      fontWeight: 'bold',
    },
    
  });