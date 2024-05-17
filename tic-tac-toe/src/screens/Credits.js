import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native';
import Title from '../components/Title';

export default function Credits ({navigation}) {
  return (
    <View style={styles.container}>
      <Title title='Credits'/>
        <View style={styles.blackBox}>
          <ScrollView>
            <Text style={styles.text}>
              Special Effects Wizardry by: Bob the Broomstick Wielder
  Coffee Consumption Consultant: Caffeine Carl
  Chief Happiness Officer: Smiley McLaughalot
  Master of Ceremonies: Sir Laughs-a-Lot
  Director of Procrastination: Queen of Delay
  Chaos Coordinator: Captain Clutterbug
  Executive Snack Manager: Snackie McSnackerson
  Head of Napping Department: Snooze Queen
  Supreme Sarcasm Specialist: Sir Sassy Pants
  Director of Unintentional Comedy: Chuckles McBlunder
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