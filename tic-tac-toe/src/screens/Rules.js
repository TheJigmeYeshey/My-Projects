import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import Title from '../components/Title';

export default function Rules ({navigation}) {
  return (
    <View style={styles.container}>
      <Title title='Rules'/>
        <View style={styles.blackBox}>
        < ScrollView>
            <Text style={styles.text}>
              Players take turns putting their marks in empty squares. The first player to get 3 of her marks in a row (up, down, across, or diagonally) is the winner. When all 9 squares are full, the game is over. If no player has 3 marks in a row, the game ends in a tie.Players take turns putting their marks in empty squares. The first player to get 3 of her marks in a row (up, down, across, or diagonally) is the winner. When all 9 squares are full, the game is over. If no player has 3 marks in a row, the game ends in a tie.
              Players take turns putting their marks in empty squares. The first player to get 3 of her marks in a row (up, down, across, or diagonally) is the winner. When all 9 squares are full, the game is over. If no player has 3 marks in a row, the game ends in a tie.
            </Text>
        </ScrollView>
        </View>
        <TouchableOpacity style={styles.button} onPress={()=>navigation.goBack()}>
            <Text style={styles.buttonText}>Back</Text>
        </TouchableOpacity>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgb(144,144,144)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 20,
    borderColor: 'white',
  }, 
  blackBox: {
    backgroundColor: 'rgb(50,50,50)',
    borderColor: 'blue',
    height: 400,
    width: 300,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: 'blue',
    padding: 20,
  },
  text: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: 'blue',
    padding: 10,
    margin: 30,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: 'blue',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
  }
});