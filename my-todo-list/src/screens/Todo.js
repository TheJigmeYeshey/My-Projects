import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View, TextInput, Pressable } from 'react-native';
import { Ionicons } from "@expo/vector-icons";

export default function Todo({navigation}) {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Add New Todo</Text>
        <Text style={styles.title}>_________________________________________</Text>
        <View style={styles.form}>
            <Text style={styles.title}>Title</Text>
            <TextInput
            style={styles.inputTitle}
            placeholder="Enter new todo"
            />
            <Text style={styles.title}>Description</Text>
            <TextInput
            style={styles.inputDescription}
            placeholder="Enter description"
            multiline={true}
            numberOfLines={4}
            />  
        </View>    
      </View>
      <View style={styles.buttonContainer}>
        <View style={styles.button} >
            <Pressable 
                style={styles.pseudoButton} 
                onPress={()=>navigation.goBack()}
                android_ripple={{color: '#ddd'}}
            >
                <Ionicons name="backspace-sharp" size={20} color="black" />
                <Text style={styles.buttonText}> CANCEL</Text>
            </Pressable>
        </View>
        <View style={styles.button} >
            <Pressable 
                style={styles.pseudoButton} 
                onPress={() => console.log("Button clicked")}
                android_ripple={{color: '#ddd'}}
            >
                <Ionicons name="save" size={20} color="black" />
                <Text style={styles.buttonText}> SAVE</Text>
            </Pressable>
        </View>
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
    flexDirection: 'row',
    paddingTop: 5,
    alignSelf: 'stretch',
    justifyContent: 'space-around',
    paddingHorizontal: 50, 
  },
  button: {
    margin: 20,
  },
  inputTitle: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    padding: 10,
    marginBottom: 20,
    marginTop: 10,
    alignSelf: 'stretch',
    borderRadius: 10,
  },
  inputDescription: {
    height: 100,
    borderColor: 'gray',
    borderWidth: 1,
    padding: 10,
    marginBottom: 20,
    marginTop: 10,
    alignSelf: 'stretch',
    borderRadius: 10,
    textAlign: 'left',
    textAlignVertical: 'top',
  },
  form: {
    width: 350,
    paddingTop: 10,
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
