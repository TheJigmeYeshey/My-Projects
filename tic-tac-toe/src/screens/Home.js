import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import Board from '../components/Board';
import Title from '../components/Title';

export default function Home ({navigation}) {
  return (
    <View style={styles.container}>
      <Title title='Home'/>
      <Board/>
      <View style={styles.buttons}>
      <TouchableOpacity style={styles.button} onPress={()=>navigation.navigate('Load')}>
            <Text style={styles.buttonText}>Load</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={()=>navigation.navigate('Rules')}>
            <Text style={styles.buttonText}>Rules</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={()=>navigation.navigate('Credits')}>
            <Text style={styles.buttonText}>Credits</Text>
        </TouchableOpacity>
      </View>
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
  buttons: {
    flexDirection: 'row',
  },
  button: {
    backgroundColor: 'blue',
    padding: 10,
    marginBottom: 30,
    marginLeft: 5,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: 'blue',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
  }
});
