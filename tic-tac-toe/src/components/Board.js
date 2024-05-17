import { StyleSheet, Text, View, TouchableOpacity, Alert } from 'react-native';
import React, { useState, useEffect } from 'react';
import { checkState } from '../datamodel/Game.js';c
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect} from '@react-navigation/native';

const initialBoard = ['', '', '', '', '', '', '', '', ''];

export default function Board() {

    const [history, setHistory] = useState([{ board: initialBoard, status: 'X to play', winningIndices: [] }])
    const [currentMove, setCurrentMove] = useState(0);

    useFocusEffect(
        React.useCallback(() => {
          loadGameState();
        }, [])
      );

    const resetGame = () => {
        setHistory([{ board: initialBoard, status: 'X to play', winningIndices: [] }]);
        setCurrentMove(0);
    };

    const saveGameState = async () => {
        try {
            const existingSavesJson = await AsyncStorage.getItem('gameState')
            let existingSaves = existingSavesJson ? JSON.parse(existingSavesJson) : []
            
            existingSaves.push(history[history.length-1])

            const newSavesJson = JSON.stringify(existingSaves);
            await AsyncStorage.setItem('gameState', newSavesJson);
    
            console.log('Game saved');
        } catch (e) {
            console.error('Failed to save the game state', e);
        }
        
    };

    const showSaveAlert = () => {
        Alert.alert(
            "Save Game",
            "Do you want to save the current game?",
            [
                {
                    text: "Cancel",
                    onPress: () => console.log("Cancel Pressed")
                },
                { text: "Save Game", onPress: () => {
                    saveGameState()
                }}
            ],

            { cancelable: false}
        )

    }

    const loadGameState = async () => {

        resetGame()
    
        try {
            const savesJson = await AsyncStorage.getItem('gameState');
            if (savesJson) {
                const saves = JSON.parse(savesJson);
                if (saves.length > 0) {
                    const latestSave = saves[saves.length - 1];
                    setHistory([latestSave]);
                    setCurrentMove(0);
                } else {
                    console.log('No saved game states found.');
                }
            } else {
                console.log('No game state saved.');
            }
        } catch (e) {
            console.error('Failed to load the game state', e);
        }
    }

    console.log(history)

    const handlePress = (index) => {
        const current = history[currentMove];
        const board = current.board;

        if (board[index] !== '' || current.status.includes('wins')) {
            return;
            
        }
        const nextValue = current.status.includes('X') ? 'X' : 'O';
        const updatedBoard = [...board];
        updatedBoard[index] = nextValue;

        const result = checkState(updatedBoard);
        const newHistory = history.slice(0, currentMove + 1);

        setHistory([...newHistory, { board: updatedBoard, status: result.result, winningIndices: result.winningIndices }]);
        setCurrentMove(newHistory.length);

    };

    const goToMove = (move) => {
        setCurrentMove(move);
    };

    const current = history[currentMove];

    return (
        <View>
            <View style={styles.buttons}>
                <TouchableOpacity 
                    style={currentMove === 0 ? styles.buttonw : styles.button}
                    onPress={() => currentMove > 0 && goToMove(currentMove - 1)}
                >
                    <Text style={styles.buttonText}>{'<'}</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                    style={styles.button} 
                    onPress={() => {
                        setHistory([{ board: initialBoard, status: 'X to play', winningIndices: [] }]);
                        setCurrentMove(0);
                    }}
                >
                    <Text style={styles.buttonText}>NEW GAME</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={currentMove === history.length - 1 ? styles.buttonw : styles.button}
                    onPress={() => resetGame()}
                >
                    <Text style={styles.buttonText}>{'>'}</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.statusContainer}>
                <Text style={styles.statusText}>{current.status}</Text>
            </View>
            <View style={styles.orangeBox}>
                {current.board.map((cell, i) => (
                    <TouchableOpacity key={i} style={current.winningIndices.includes(i) ? styles.winningCell : styles.greenBox} onPress={() => handlePress(i)}>
                        <Text style={styles.text}>{cell}</Text>
                    </TouchableOpacity>
                ))}
            </View>
            <View style={styles.buttons}>
                <TouchableOpacity 
                    style={!(current.status.includes('wins') || current.status.includes('tie')) ? styles.buttonw : styles.button}
                    onPress={() => {
                        showSaveAlert();
                        resetGame() 
                    }}
                    disabled={!(current.status.includes('wins') || current.status.includes('tie'))}
                >
                    <Text style={styles.buttonText}>SAVE</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
        statusContainer: {
        backgroundColor: 'grey',
        padding: 10,
        alignItems: 'center',
    },
    statusText: {
        color: 'white',
        fontSize: 20,
    },
    orangeBox: {
      flexDirection: 'row',
      backgroundColor: 'orange',
      width: 300,
      height: 300,
      alignItems: 'center',
      justifyContent: 'center',
      borderColor: 'black',
      borderWidth: 1,
      borderRadius: 10,
      flexWrap: 'wrap',
      paddingTop: 30,
    },
    greenBox: {
      backgroundColor: 'green',
      width: 80,
      height: 80,
      borderColor: 'black',
      borderWidth: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    winningCell: {
        backgroundColor: 'red',
        width: 80,
        height: 80,
        borderColor: 'black',
        borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'center',
      },
    text: {
      color: 'white',
      fontSize: 50,
      fontWeight: 'bold',
    },
    buttons: {
      flexDirection: 'row',
      justifyContent: 'space-around'

    },
    button: {
      backgroundColor: 'blue',
      padding: 10,
      margin: 20,
      borderRadius: 20,
      borderWidth: 2,
      borderColor: 'blue',
    },
    buttonw: {
      backgroundColor: 'grey',
      padding: 10,
      margin: 20,
      borderRadius: 20,
      borderWidth: 2,
      borderColor: 'blue',
    },
    buttonText: {
      color: 'white',
      fontSize: 18,
    }
    
  });