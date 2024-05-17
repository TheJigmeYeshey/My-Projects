import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View, Pressable } from 'react-native';
import List from '../components/List';
import { Ionicons } from "@expo/vector-icons";

export default function Home({navigation}) {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>My Todo List</Text>
        <Text style={styles.title}>_________________________________________</Text>

        <List/>

        
      </View>
      <Text style={styles.title}>_________________________________________</Text>
      <View style={styles.buttonContainer}>
      <Pressable 
          style={styles.pseudoButton} 
          onPress={() => navigation.navigate('Todo')}
          android_ripple={{color: '#ddd'}}
        >
          <Ionicons name="add-circle" size={20} color="black" />
          <Text style={styles.buttonText}> ADD NEW TODO</Text>
        </Pressable>
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-between', 
    paddingTop: 20,
    paddingBottom: 60, 
  },
  content: {
    alignItems: 'center',
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  todo: {
    width: 350,
    backgroundColor: 'rgb(0,244,230)',
    marginTop: 7,
    padding: 5,
    borderRadius: 5,
  },
  buttonContainer: {
    paddingTop: 5,
    alignSelf: 'stretch',
    paddingHorizontal: 20, 
  },
  pseudoButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ADD8E6',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    fontWeight: 'bold',
  }
});
