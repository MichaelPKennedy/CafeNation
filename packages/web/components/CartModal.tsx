import React, { useContext, useEffect } from "react";
import {
  Modal,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Button,
  Image,
} from "react-native";
import { CartContext } from "./CartContext"; // Assuming CartContext is in the same directory

const CartModal = ({ isVisible, onClose }) => {
  const { cartItems } = useContext(CartContext);

  const incrementQuantity = (id) => {
    // Implement logic to increase item quantity
  };

  const decrementQuantity = (id) => {
    // Implement logic to decrease item quantity
  };

  useEffect(() => {
    console.log(cartItems);
  }, []);

  return (
    <Modal
      animationType="slide"
      transparent={false}
      visible={isVisible}
      onRequestClose={onClose}
    >
      <View style={styles.modalView}>
        <Text style={styles.modalTitle}>Review order ({cartItems.length})</Text>
        <FlatList
          data={cartItems}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.itemContainer}>
              <Image source={{ uri: item.imageUrl }} style={styles.itemImage} />
              <View style={styles.itemDetails}>
                <Text style={styles.itemName}>{item.name}</Text>
                {item.size && <Text>Size: {item.size}</Text>}
                {item.flavor && <Text>Flavor: {item.flavor}</Text>}
                <Text>Price: ${parseFloat(item.price) / 100}</Text>
                <View style={styles.quantityContainer}>
                  <TouchableOpacity onPress={() => decrementQuantity(item.id)}>
                    <Text style={styles.quantityButton}>-</Text>
                  </TouchableOpacity>
                  <Text style={styles.quantity}>1</Text>
                  <TouchableOpacity onPress={() => incrementQuantity(item.id)}>
                    <Text style={styles.quantityButton}>+</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          )}
        />
        <Button title="Continue" onPress={onClose} color="#56C568" />
      </View>
    </Modal>
  );
};

// Styles
const styles = StyleSheet.create({
  modalView: {
    marginTop: 50,
    paddingHorizontal: 20,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  itemImage: {
    width: 75,
    height: 75,
    borderRadius: 37.5,
  },
  itemDetails: {
    marginLeft: 15,
    flex: 1,
  },
  itemName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  quantityButton: {
    fontSize: 20,
    padding: 10,
  },
  quantity: {
    fontSize: 16,
    marginHorizontal: 10,
  },
});

export default CartModal;
