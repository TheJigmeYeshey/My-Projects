import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Image, Text, View, TouchableOpacity, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Title from './Title';
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart, clearCart } from '../redux/cartSlice';

export default function Cart() {
  const dispatch = useDispatch();
  const itemsInCart = useSelector(state => state.cart.items)
  const totalQuantity = useSelector(state => state.cart.totalQuantity)
  const totalPrice = useSelector(state => state.cart.totalPrice)

  const handleAddToCart = (product) => {
      dispatch(addToCart(product));
  };

  const handleRemoveFromCart = (product) => {
      dispatch(removeFromCart(product));
  };

  const renderItem = ({item}) => (
    <View style={styles.product}>
      <Image
        source={{ uri: item.product.image }}
        style={styles.image}
        onError={() => alert('Failed to load image.')}
      />
      <View style={styles.productDetails}>
          <Text style={styles.text}>{item.product.title}</Text>
          <Text style={styles.text}>PRICE: ${item.product.price}</Text>
          <View style={styles.quantity}>
            <TouchableOpacity style={styles.button} onPress={() => handleAddToCart(item.product)}>
              <Icon name="add" size={20} color="black" />
            </TouchableOpacity>
            <Text style={styles.text}>Quantity: {item.quantity}</Text>
            <TouchableOpacity style={styles.button} onPress={() => handleRemoveFromCart(item.product)}>
              <Icon name="remove-outline" size={20} color="black" />
            </TouchableOpacity>
          </View>
      </View>
    </View>
  )


  return (
      <View style={styles.container}>
        <Title title='Cart'/>
        <View style={styles.totalBox}>
          <Text style={styles.totalText}>Items: {totalQuantity}</Text>
          <Text style={styles.totalText}> Total Price: ${totalPrice}</Text>
        </View>
        <View style={styles.border}>
        {itemsInCart.length > 0 ? (
            <FlatList
              data={itemsInCart}
              renderItem={renderItem}
              keyExtractor={item => item.product.id.toString()}
              style={styles.list}
            />
        ) : (
          <Text style={styles.totalText}>Your shopping cart is empty</Text>
        )}
        </View>
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
    totalBox: {
      marginTop: 10,
      backgroundColor: '#17CEFA',
      width: 300,
      height: 60,
      borderColor: 'black',
      borderWidth: 1,
      borderRadius: 10,
      alignItems: 'center',
      justifyContent: 'space-around',
      flexDirection: 'row'
    },
    totalText: {
      fontSize: 15,
      fontWeight: 'bold',
    },
    border: {
        marginTop: 10,
        height: 550,
        width: 300,
        alignItems: 'center',
        justifyContent: 'flex-start',
      },
    quantity: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingLeft: 30,
      paddingRight: 30,
    },
    button: {
      backgroundColor: "green",
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
        fontSize: 10,
        fontWeight: 'bold',
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
  });
  