import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Pressable, ActivityIndicator, Image, ScrollView, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';
import Title from './Title';
import Icon from 'react-native-vector-icons/Ionicons';

export default function Products({ route, navigation }) {
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)
    const { category } = route.params
  
    useEffect(() => {
        fetch("https://fakestoreapi.com/products")
          .then((res) => res.json())
          .then((json) => {
            const filteredProducts = json.filter(product => product.category === category);
            setProducts(filteredProducts);
            setLoading(false);
          })
          .catch((error) => console.error('Error fetching products:', error));
      }, [category]);

      const handleProductPress = (id) => {
        navigation.navigate('Item', { id });
      };
  
    return (

      <View style={styles.container}>
        <Title title={ category }/>
        {loading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : (
            <View style={styles.overall}>
                <View style={styles.border}>
                      <ScrollView>
                          {products.map((product, i) => (        
                          <Pressable 
                              onPress={() => handleProductPress(product.id)}
                              key={i}>
                              <View style={styles.product}>
                                  <Image
                                          source={{ uri: product.image }}
                                          style={styles.image}
                                          onError={() => alert('Failed to load image.')}
                                  />
                                  <View style={styles.productDetails}>
                                      <Text style={styles.text}>{product.title}</Text>
                                      <Text style={styles.text}>PRICE: ${product.price}</Text>
                                  </View>
                              </View>
                          </Pressable>
                          ))}
                      </ScrollView>
                </View>
                <TouchableOpacity style={styles.button} onPress={()=>navigation.goBack()}>
                  <Icon name="backspace" size={30} color="white" />
                  <Text style={styles.buttonText}>Back</Text>
                </TouchableOpacity>
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
    overall: {
      alignItems: 'center',
    },
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'flex-start',
    },
    scrollView: {
        flex: 1,
    },
    border: {
        marginTop: 10,
        borderWidth: 1,
        borderColor: 'grey',
        borderStyle: 'solid',
        height: 530,
        width: 300,
        alignItems: 'center',
        justifyContent: 'flex-start',
      },
    product: {
        width: 285,
        height: 100,
        borderColor: 'grey',
        borderWidth: 1,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        margin: 5,
        flexDirection: 'row',
        padding: 10,
    },
    productDetails: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        marginLeft: 10,
      },
      text: {
        fontWeight: 'bold',
        flexShrink: 1,
        fontSize: 10,
      },
      
    image: {
        height: 50,
        width: 50,
    },
    button: {
      backgroundColor: 'blue',
      padding: 10,
      margin: 20,
      borderRadius: 20,
      borderWidth: 2,
      borderColor: 'blue',
      width:100,
      flexDirection: 'row',
    },
    buttonText: {
      color: 'white',
      fontSize: 18,
      justifyContent: 'center',
    }
  });
  