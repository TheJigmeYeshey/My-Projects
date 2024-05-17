import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Pressable, ActivityIndicator } from 'react-native';
import React, { useState, useEffect } from 'react';
import Title from './Title';

export default function Categories({navigation}) {
    const [categories, setCategories] = useState([])
    const [loading, setLoading] = useState(true)
  
    useEffect(() => {
      fetch("https://fakestoreapi.com/products/categories")
        .then((res) => res.json())
        .then((json) => {
          setCategories(json);
          setLoading(false)
        })
        .catch((error) => console.error('Error fetching categories:', error));
    }, []);
  
    console.log(categories)

    const handleCategoryPress = (category) => {
      navigation.navigate('Products', { category });
    };
  
    return (
        <View style={styles.container}>
        <Title title='Categories'/>
        {loading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : (
          <View style={styles.border}>
            {categories.map((category, i) => (        
              <Pressable 
                onPress={() => handleCategoryPress(category)}
                key={i}>
                  <View style={styles.category}>
                    <Text style={styles.text}>{category}</Text>
                  </View>
              </Pressable>
            ))}
          </View>
        )}
        <StatusBar style="auto" />
      </View>
    );
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'flex-start',
    },
    border: {
        marginTop: 10,
        borderWidth: 1,
        borderColor: 'grey',
        borderStyle: 'solid',
        height: 600,
        width: 300,
        alignItems: 'center',
        justifyContent: 'flex-start',
      },
    category: {
        backgroundColor: 'rgb(200,200,200)',
        width: 260,
        height: 60,
        borderColor: 'grey',
        borderWidth: 1,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        margin: 5,
        marginTop: 20,
    },
    text: {
        color: 'blue',
        fontSize: 40,
        fontWeight: 'bold',
      },
  });
  