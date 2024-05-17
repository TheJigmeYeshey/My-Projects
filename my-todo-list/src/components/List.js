import { Button, StyleSheet, Text, View } from 'react-native';

const tasks = ['Clean out cupboard', 'Pre-cut all vegetables', "Change cat's litterbox"]

export default function List() {
    return(
        <View>
            {tasks.map((s,i) => (        
                <View style={styles.todo} key={i}>
                    <Text>{s}</Text>
                </View>
            ))}
        </View>
    );
}

const styles = StyleSheet.create({

    todo: {
      width: 350,
      backgroundColor: '#E6BAAD',
      marginTop: 7,
      padding: 5,
      borderRadius: 5,
    },
  });
  