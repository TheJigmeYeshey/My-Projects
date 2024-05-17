import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Pressable, ActivityIndicator, Image, ScrollView, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';
import Title from './Title';
import Icon from 'react-native-vector-icons/Ionicons';
import { useDispatch, useSelector } from "react-redux";
import { addToCart,removeFromCart, clearCart } from '../redux/cartSlice';

export default function Item({ route, navigation }) {
    const [item, setItem] = useState({})
    const [loading, setLoading] = useState(true)
    const { id } = route.params
    const dispatch = useDispatch()

    useEffect(() => {
        fetch("https://fakestoreapi.com/products")
          .then((res) => res.json())
          .then((json) => {
            const filteredItem = json.find(product => product.id === id);
            setItem(filteredItem);
            setLoading(false);
          })
          .catch((error) => console.error('Error fetching products:', error));
      }, [id]);

    const handleAddToCart = () => {
      if (item && item.id) {
        dispatch(addToCart(item));
      }
    };

    console.log(item)
    return (

          <View style={styles.container}>
          <Title title="Product Details"/>
          {loading ? (
            <ActivityIndicator size="large" color="#0000ff" />
          ) : (
              <View style={styles.border}>
                  <ScrollView>
                      <Image
                          source={{ uri: item.image }}
                          style={styles.image}
                          onError={() => alert('Failed to load image.')}
                      />
                      <Text style={styles.title}>{item.title}</Text>
                      <View style={styles.infoBox}>
                          <Text style={styles.title}>RATE: {item.rating.rate}</Text>
                          <Text style={styles.title}>COUNT: {item.rating.count}</Text>
                          <Text style={styles.title}>PRICE: ${item.price}</Text>
                      </View>
                      <View style={styles.buttonsContainer}>
                        <TouchableOpacity style={styles.button} onPress={()=>navigation.goBack()}>
                          <Icon name="backspace" size={30} color="white" />
                          <Text style={styles.buttonText}>Back</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.button} onPress={handleAddToCart}>
                          <Icon name="cart" size={30} color="white" />
                          <Text style={styles.buttonText}>Add To Cart</Text>
                        </TouchableOpacity>
                      </View>
                      <View style={styles.description}>
                          <Text style={styles.title}>Description:</Text>
                          <View style={styles.descriptionBox}>
                              <Text>{item.description}</Text>
                          </View>
                      </View>
                  </ScrollView>
              </View>
          )}
          <StatusBar style="auto" />
        </View>
    );
  }

  const styles = StyleSheet.create({
    padding: {
      paddingTop: 50,
    },
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'flex-start',
    },
    description: {
        paddingTop: 10,
    },
    descriptionBox: {
        padding: 5,
        backgroundColor: 'rgb(200,200,200)',
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 10,
        marginTop: 10,
    },
    scrollView: {
        flex: 1,
    },
    border: {
        marginTop: 10,
        height: 620,
        width: 300,
        alignItems: 'center',
        justifyContent: 'flex-start',
      },
      title: {
        fontWeight: 'bold',
        fontSize: 15,
      },
      infoBox: {
        flexDirection: 'row',
        backgroundColor: '#87CEFA',
        width: 300,
        height: 40,
        borderColor: 'black',
        borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'space-between',
        borderRadius: 10,
        padding: 10
      },
    image: {
        height: 300,
        width: 300,
    },
    buttonsContainer: {
      flexDirection: 'row',
      justifyContent: 'space-around',
    },
    button: {
      backgroundColor: 'blue',
      padding: 10,
      marginTop: 10,
      borderRadius: 20,
      borderWidth: 2,
      borderColor: 'blue',
      flexDirection: 'row',
    },
    buttonText: {
      color: 'white',
      fontSize: 18,
      justifyContent: 'center',
    }
  });
  