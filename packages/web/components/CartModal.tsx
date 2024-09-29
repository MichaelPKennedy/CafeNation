import React, { useContext } from "react";
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
import { CartContext } from "./CartContext";
import { FontAwesome } from "@expo/vector-icons";

const CartModal = ({
  isVisible,
  onClose,
}: {
  isVisible: boolean;
  onClose: () => void;
}) => {
  const { cartItems, addToCart, removeFromCart, checkout } =
    useContext(CartContext);

  const [totalAmount, setTotalAmount] = React.useState(0);

  React.useEffect(() => {
    const calculatedTotal = cartItems.reduce((sum, item) => {
      return sum + item.price * item.quantity;
    }, 0);
    setTotalAmount(calculatedTotal);
  }, [cartItems]);

  const incrementQuantity = (id: string) => {
    const item = cartItems.find((item) => item.id === id);
    if (item) {
      addToCart(item);
    }
  };

  const decrementQuantity = (id: string) => {
    removeFromCart(id);
  };

  const handlePlaceOrder = async () => {
    try {
      await checkout(totalAmount);
      onClose();
    } catch (error) {
      console.error("Error placing order:", error);
    }
  };

  return (
    <Modal
      animationType="slide"
      transparent={false}
      visible={isVisible}
      onRequestClose={onClose}
    >
      <View style={styles.modalView}>
        <TouchableOpacity onPress={onClose} style={styles.backButton}>
          <FontAwesome
            name="angle-left"
            size={24}
            color="black"
            style={styles.backIcon}
          />
        </TouchableOpacity>
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
                <Text>Price: ${item.price / 100}</Text>
                <View style={styles.quantityContainer}>
                  <TouchableOpacity onPress={() => decrementQuantity(item.id)}>
                    <Text style={styles.quantityButton}>-</Text>
                  </TouchableOpacity>
                  <Text style={styles.quantity}>{item.quantity}</Text>
                  <TouchableOpacity onPress={() => incrementQuantity(item.id)}>
                    <Text style={styles.quantityButton}>+</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          )}
        />
        <View style={styles.totalContainer}>
          <Text style={styles.totalText}>
            Total: ${(totalAmount / 100).toFixed(2)}
          </Text>
        </View>
        <Button
          title="Place Order"
          onPress={handlePlaceOrder}
          color="#56C568"
        />
        <Button title="Continue Shopping" onPress={onClose} color="#4A90E2" />
      </View>
    </Modal>
  );
};

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
  backButton: {
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 20,
    padding: 10,
    borderRadius: 20,
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ddd",
  },
  backIcon: {
    marginTop: -2.5,
  },
  totalContainer: {
    marginTop: 20,
    marginBottom: 20,
  },
  totalText: {
    fontSize: 20,
    fontWeight: "bold",
  },
  buttonContainer: {
    marginTop: 20,
    marginBottom: 20,
  },
  button: {
    marginBottom: 10,
  },
});

export default CartModal;
