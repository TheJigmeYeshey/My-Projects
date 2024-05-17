import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, Alert, ScrollView } from 'react-native';
import React, { useState, useEffect } from 'react';
import { checkState } from '../datamodel/Game.js';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Title from '../components/Title';

export default function Load ({navigation}) {
    const [saves, setSaves] = useState([]); 

    useEffect(() => {
        loadStates();
      }, []);

    const loadStates = async () => {
        try {
            const savesJson = await AsyncStorage.getItem('gameState');
            if (savesJson != null) {
                const saves = JSON.parse(savesJson);
                setSaves(saves);
            } else {
                console.log('No game state saved.');
            }
        } catch (e) {
            console.error('Failed to load the game state', e);
        }
    }

    const counter = (board) => {
        return 9 - board.filter(x => x === "").length
    }

    const load = (index) => {

        const newSaves = [...saves]
        const selectedSave = newSaves.splice(index, 1)[0]
        newSaves.push(selectedSave)
        setSaves(newSaves)

        save(newSaves)
    }

    const deleteSave = (index) => {
      const newSaves = [...saves]
      newSaves.splice(index, 1)[0]
      setSaves(newSaves)

      save(newSaves)
    }

    const save = async (updatedSave) => {
        try {
            const newSavesJson = JSON.stringify(updatedSave);
            await AsyncStorage.setItem('gameState', newSavesJson);
            console.log('Game state saved after loading.');
        } catch (e) {
            console.error('Failed to save the game state after loading', e);
        }
    }

    console.log(JSON.stringify(saves))
    
    return (
      <View style={styles.container}>
        <Title title='Load'/>
          <View style={styles.blackBox}>
            <ScrollView>
            {saves.map((save, i) => (
                    <View key={i} style={styles.save}>
                        <Text style={styles.text}>({i+1}) Result: {save.status}</Text>
                        <Text style={styles.text}>       Steps: {counter(save.board)}</Text>
                        <View style={styles.buttonContainer}>
                            <TouchableOpacity style={styles.button} onPress={()=>{
                                load(i)
                                navigation.navigate('Home')
                            }}>
                                <Text style={styles.buttonText}>Load</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.button}>
                                <Text style={styles.buttonText } onPress={()=>deleteSave(i)}>Delete</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                ))}
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
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center'
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
    },
    save: {
        color: 'grey',
        padding: 20,
    }
  });