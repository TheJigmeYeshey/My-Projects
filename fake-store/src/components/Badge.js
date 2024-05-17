import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function CartIconWithBadge({ size, color }) {
  const totalQuantity = useSelector(state => state.cart.totalQuantity);
  
  return (
    <View>
      <Ionicons name="cart" size={size} color={color} />
      {totalQuantity > 0 && (
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{totalQuantity}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    position: 'absolute',
    right: -6,
    top: -3,
    backgroundColor: 'red',
    borderRadius: 8,
    width: 16,
    height: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    color: 'white',
    fontSize: 10,
    fontWeight: 'bold',
    textAlign: 'center',
  }
});
