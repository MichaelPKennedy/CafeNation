import React, { useContext, useState } from "react";
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

import { CartItemType } from "./types";

const CartModal = ({
  isVisible,
  onClose,
}: {
  isVisible: boolean;
  onClose: () => void;
}) => {
  const {
    cartItems,
    addToCart,
    removeFromCart,
    clearCart,
    checkout,
    orderStatus,
    showSuccessModal,
    setShowSuccessModal,
    setOrderStatus,
  } = useContext(CartContext);
  const [showPaymentOptions, setShowPaymentOptions] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState("");
  const [isPaymentView, setIsPaymentView] = useState(false);

  const [calculatedTotal, setCalculatedTotal] = React.useState(0);

  React.useEffect(() => {
    const calculatedTotal = cartItems.reduce((sum, item) => {
      return sum + item.price * item.quantity;
    }, 0);
    setCalculatedTotal(calculatedTotal);
  }, [cartItems]);

  const incrementQuantity = (item: CartItemType) => {
    addToCart(item);
  };

  const decrementQuantity = (id: string) => {
    removeFromCart(id);
  };

  const handleSelectPayment = (paymentMethod: string) => {
    setSelectedPayment(paymentMethod);
  };

  const handleProceedToPayment = () => {
    setIsPaymentView(true);
    setShowPaymentOptions(true);
    setOrderStatus("");
  };

  const handlePlaceOrder = async () => {
    if (!selectedPayment) {
      console.error("No payment method selected");
      return;
    }

    try {
      setOrderStatus("processing");
      const fakeSourceId = "cnon:card-nonce-ok";
      await checkout(calculatedTotal, fakeSourceId);
      setOrderStatus("completed");
      onClose(); // Close the cart modal
      setShowSuccessModal(true); // Show the success modal
    } catch (error) {
      console.error("Error placing order:", error);
      setOrderStatus("failed");
    }
  };

  const renderOrderStatus = () => {
    switch (orderStatus) {
      case "processing":
        return <Text style={styles.orderStatus}>Processing your order...</Text>;
      case "completed":
        return (
          <Text style={styles.orderStatus}>Order placed successfully!</Text>
        );
      case "failed":
        return (
          <Text style={styles.orderStatus}>
            Order failed. Please try again.
          </Text>
        );
      default:
        return null;
    }
  };

  const renderPaymentOptions = () => (
    <View>
      <Text style={styles.sectionTitle}>Select Payment Method</Text>
      <TouchableOpacity
        style={[
          styles.paymentOption,
          selectedPayment === "Test Credit Card" && styles.selectedPayment,
        ]}
        onPress={() => handleSelectPayment("Test Credit Card")}
      >
        <Text>Test Credit Card (4111 1111 1111 1111)</Text>
      </TouchableOpacity>
      {renderOrderStatus()}
      <TouchableOpacity
        style={[styles.button, styles.greenButton]}
        onPress={handlePlaceOrder}
        disabled={!selectedPayment || orderStatus === "processing"}
      >
        <Text style={styles.buttonText}>Place Order</Text>
      </TouchableOpacity>
    </View>
  );

  const renderSuccessModal = () => (
    <Modal
      animationType="slide"
      transparent={true}
      visible={showSuccessModal}
      onRequestClose={() => {
        setShowSuccessModal(false);
        handleClose();
      }}
    >
      <View style={styles.centeredView}>
        <View style={styles.successModalView}>
          <Text style={styles.successModalText}>
            Order Placed Successfully!
          </Text>
          <Button
            title="Close"
            onPress={() => {
              setShowSuccessModal(false);
              handleClose();
            }}
          />
        </View>
      </View>
    </Modal>
  );

  const renderItem = ({ item }: { item: CartItemType }) => (
    <View style={styles.itemContainer}>
      <Image source={{ uri: item.imageUrl }} style={styles.itemImage} />
      <View style={styles.itemDetails}>
        <Text style={styles.itemName}>{item.name}</Text>
        <Text>${(item.price / 100 || 0).toFixed(2)}</Text>
        <Text>Quantity: {item.quantity}</Text>
      </View>
      <View style={styles.quantityContainer}>
        <TouchableOpacity onPress={() => decrementQuantity(item.id)}>
          <Text style={styles.quantityButton}>-</Text>
        </TouchableOpacity>
        <Text>{item.quantity}</Text>
        <TouchableOpacity onPress={() => incrementQuantity(item)}>
          <Text style={styles.quantityButton}>+</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const handleBackToCart = () => {
    setIsPaymentView(false);
    setShowPaymentOptions(false);
  };

  const handleClose = () => {
    setIsPaymentView(false);
    setShowPaymentOptions(false);
    setSelectedPayment("");
    setOrderStatus("");
    onClose();
  };

  return (
    <>
      <Modal
        animationType="slide"
        transparent={false}
        visible={isVisible}
        onRequestClose={handleClose}
      >
        <View style={styles.modalView}>
          <TouchableOpacity onPress={handleClose} style={styles.backButton}>
            <FontAwesome
              name="angle-left"
              size={24}
              color="black"
              style={styles.backIcon}
            />
          </TouchableOpacity>
          <Text style={styles.modalTitle}>Your Cart</Text>
          {!isPaymentView && cartItems.length > 0 ? (
            <>
              <FlatList
                data={cartItems}
                keyExtractor={(item) => item.id}
                renderItem={renderItem}
              />
              <TouchableOpacity onPress={clearCart}>
                <Text style={{ color: "red", textAlign: "center" }}>
                  Clear Cart
                </Text>
              </TouchableOpacity>
              <View style={styles.totalContainer}>
                <Text style={styles.totalText}>
                  Total: ${(calculatedTotal / 100).toFixed(2)}
                </Text>
              </View>
              <TouchableOpacity
                style={[styles.button, styles.greenButton]}
                onPress={handleProceedToPayment}
              >
                <Text style={styles.buttonText}>Proceed to Payment</Text>
              </TouchableOpacity>
            </>
          ) : (
            showPaymentOptions && renderPaymentOptions()
          )}
          {!isPaymentView && (
            <>
              {!cartItems.length && (
                <Text style={styles.emptyCartText}>Your cart is empty</Text>
              )}
              <Button
                title="Continue Shopping"
                onPress={handleClose}
                color="#4A90E2"
              />
            </>
          )}
        </View>
      </Modal>
      {renderSuccessModal()}
    </>
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
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  paymentOption: {
    padding: 15,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 5,
    marginBottom: 10,
  },
  selectedPayment: {
    borderColor: "#56C568",
    backgroundColor: "#e6f7e6",
  },
  orderStatus: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 10,
    color: "#56C568",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  successModalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  successModalText: {
    marginBottom: 15,
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
  },
  greenButton: {
    backgroundColor: "#56C568",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  blackButton: {
    backgroundColor: "black",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  emptyCartText: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
});

export default CartModal;
