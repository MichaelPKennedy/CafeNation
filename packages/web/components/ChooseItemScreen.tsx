import React, { useState, useEffect, useContext } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { CartContext } from "./CartContext";
import { UserContext } from "./UserContext";
import {
  ItemVariation,
  ItemOptionData,
  ItemOptionValue,
  TransformedItemOptionValue,
} from "./types";

const ChooseItemScreen = ({
  route,
  navigation,
}: {
  route: any;
  navigation: any;
}) => {
  const { item, itemOptions } = route.params;
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedFlavor, setSelectedFlavor] = useState("");
  const [selectedVariation, setSelectedVariation] =
    useState<ItemVariation | null>(null);
  const [showAddedMessage, setShowAddedMessage] = useState(false);

  const { user, signIn, signOut } = useContext(UserContext);
  const { addToCart, cartItems } = useContext(CartContext);

  useEffect(() => {
    updateVariation();
  }, [selectedSize, selectedFlavor]);

  const handleAddToOrder = async () => {
    if (selectedVariation) {
      const itemToAdd = {
        id: selectedVariation.id,
        name: item.itemData.name,
        price: Number(selectedVariation.itemVariationData.priceMoney.amount),
        size: selectedSize,
        flavor: selectedFlavor,
        imageUrl: item.imageUrl,
        quantity: 1,
        currency: "USD",
      };

      if (user) {
        try {
          // TODO: add cart item to database
          // await addCartItemToDatabase(itemToAdd);
          // addToCart(itemToAdd);
          setShowAddedMessage(true);
          setTimeout(() => setShowAddedMessage(false), 2000);
        } catch (error) {
          console.error("Error updating cart in database", error);
        }
      } else {
        addToCart(itemToAdd);
        setShowAddedMessage(true);
        setTimeout(() => setShowAddedMessage(false), 2000);
      }
    }
  };

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        if (!user) {
          return;
        }
        // TODO: fetch cart items from database
        // const fetchedItems = await getCartItemsFromDatabase();
        // setCartItems(fetchedItems);
      } catch (error) {
        console.error("Error fetching cart items", error);
      }
    };

    fetchCartItems();
  }, []);

  const handleSizeSelection = (size: string) => {
    setSelectedSize(size);
  };

  const handleFlavorSelection = (flavor: string) => {
    setSelectedFlavor(flavor);
  };

  const getOptionNameById = (optionId: string) => {
    return itemOptions.find((option: ItemOptionData) => option.id === optionId)
      ?.name;
  };

  const getOptionValueNameById = (optionId: string, valueId: string) => {
    const option = itemOptions.find(
      (option: ItemOptionData) => option.id === optionId
    );
    return option?.values.find((value: ItemOptionValue) => value.id === valueId)
      ?.name;
  };

  const setDefaultVariation = () => {
    const sizeOptions = extractOptions("size");
    const flavorOptions = extractOptions("flavors");

    const defaultSize = sizeOptions.length > 0 ? sizeOptions[0].name : null;
    const defaultFlavor =
      flavorOptions.length > 0 ? flavorOptions[0].name : null;

    setSelectedSize(defaultSize);
    setSelectedFlavor(defaultFlavor);
  };

  const extractOptions = (type: string) => {
    return item.itemData.variations
      .map((v: ItemVariation) => v.itemVariationData.itemOptionValues)
      .flat()
      .filter(
        (ov: ItemOptionValue) => getOptionNameById(ov?.itemOptionId) === type
      )
      .map((ov: ItemOptionValue) => ({
        ...ov,
        name: getOptionValueNameById(ov?.itemOptionId, ov?.itemOptionValueId),
      }))
      .filter(
        (
          v: { itemOptionId: string; itemOptionValueId: string; name: string },
          i: number,
          a: { itemOptionId: string; itemOptionValueId: string; name: string }[]
        ) => i === a.findIndex((t) => t.name === v.name)
      );
  };

  const updateVariation = () => {
    const matchedVariation = item.itemData.variations.find(
      (variation: ItemVariation) => {
        const variationName = variation.itemVariationData.name.toLowerCase();
        return (
          (!selectedSize ||
            variationName.includes(selectedSize.toLowerCase())) &&
          (!selectedFlavor ||
            variationName.includes(selectedFlavor.toLowerCase()))
        );
      }
    );
    setSelectedVariation(matchedVariation);
  };

  useEffect(() => {
    setDefaultVariation();
  }, [item]);

  useEffect(() => {
    updateVariation();
  }, [selectedSize, selectedFlavor]);

  const renderSizeOptions = () => {
    if (!item.itemData.variations) return null;
    const sizeOptions = item.itemData.variations
      .map(
        (variation: ItemVariation) =>
          variation.itemVariationData.itemOptionValues
      )
      .flat()
      .filter(
        (optionValue: ItemOptionValue) =>
          getOptionNameById(optionValue?.itemOptionId) === "size"
      )
      .map((optionValue: ItemOptionValue) => ({
        ...optionValue,
        name: getOptionValueNameById(
          optionValue?.itemOptionId,
          optionValue?.itemOptionValueId
        ),
      }))
      .filter(
        (
          v: TransformedItemOptionValue,
          i: number,
          a: TransformedItemOptionValue[]
        ) => i === a.findIndex((t) => t.name === v.name)
      );

    if (sizeOptions.length === 0) return null;

    return (
      <>
        <View style={styles.sizeOptionsTextContainer}>
          <Text style={styles.sizeOptionsText}>Size Options</Text>
        </View>
        <View style={styles.sizeOptionsContainer}>
          {sizeOptions.map((sizeOption: TransformedItemOptionValue) => (
            <TouchableOpacity
              key={`${sizeOption.itemOptionId}-${sizeOption.itemOptionValueId}`}
              style={[
                styles.sizeOption,
                selectedSize === sizeOption.name && styles.sizeOptionSelected,
              ]}
              onPress={() => handleSizeSelection(sizeOption.name)}
            >
              <Text>{sizeOption.name}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </>
    );
  };

  const renderFlavorOptions = () => {
    const flavorOptions = item.itemData.variations
      .map(
        (variation: ItemVariation) =>
          variation.itemVariationData.itemOptionValues
      )
      .flat()
      .filter(
        (optionValue: ItemOptionValue) =>
          getOptionNameById(optionValue?.itemOptionId) === "flavors"
      )
      .map((optionValue: ItemOptionValue) => ({
        ...optionValue,
        name: getOptionValueNameById(
          optionValue?.itemOptionId,
          optionValue?.itemOptionValueId
        ),
      }))
      .filter(
        (
          v: TransformedItemOptionValue,
          i: number,
          a: TransformedItemOptionValue[]
        ) => i === a.findIndex((t) => t.name === v.name)
      );

    if (flavorOptions.length === 0) return null;

    return (
      <>
        <View style={styles.flavorOptionsTextContainer}>
          <Text style={styles.flavorOptionsText}>Flavor Options</Text>
        </View>
        <View style={styles.flavorOptionsContainer}>
          {flavorOptions.map((flavorOption: TransformedItemOptionValue) => (
            <TouchableOpacity
              key={`${flavorOption.itemOptionId}-${flavorOption.itemOptionValueId}`}
              style={[
                styles.flavorOption,
                selectedFlavor === flavorOption.name &&
                  styles.flavorOptionSelected,
              ]}
              onPress={() => handleFlavorSelection(flavorOption.name)}
            >
              <Text>{flavorOption.name}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </>
    );
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <FontAwesome
            name="angle-left"
            size={24}
            color="black"
            style={styles.backIcon}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.imageContainer}>
        <Image source={{ uri: item.imageUrl }} style={styles.itemImage} />
      </View>

      <Text style={styles.itemName}>{item.itemData?.name}</Text>

      <Text style={styles.description}>
        {item.itemData?.descriptionPlaintext}
      </Text>

      {renderSizeOptions()}

      {renderFlavorOptions()}

      {selectedVariation && (
        <Text style={styles.priceText}>
          Price: $
          {Number(selectedVariation.itemVariationData.priceMoney.amount) / 100}
        </Text>
      )}

      <TouchableOpacity
        style={styles.addToOrderButton}
        onPress={handleAddToOrder}
      >
        <Text style={styles.addToOrderText}>Add to order</Text>
      </TouchableOpacity>

      {showAddedMessage && (
        <View style={styles.addedMessageContainer}>
          <Text style={styles.addedMessageText}>Added to cart!</Text>
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: 16,
    paddingHorizontal: 16,
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
  backText: {
    fontSize: 24,
    fontWeight: "bold",
  },
  imageContainer: {
    width: 225,
    height: 225,
    borderRadius: 112.5,
    overflow: "hidden",
    alignSelf: "center",
  },
  itemImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  itemName: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 16,
  },
  description: {
    fontSize: 18,
    padding: 18,
    textAlign: "center",
  },
  addToOrderButton: {
    backgroundColor: "#000",
    padding: 10,
    margin: 10,
    alignItems: "center",
    borderRadius: 8,
  },
  addToOrderText: {
    fontSize: 20,
    color: "#fff",
    fontWeight: "bold",
  },
  sizeOption: {
    backgroundColor: "#f0f0f0",
    padding: 10,
    margin: 5,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#dcdcdc",
    alignItems: "center",
    justifyContent: "center",
  },
  sizeOptionSelected: {
    backgroundColor: "#e0e0e0",
    borderColor: "#c0c0c0",
  },
  sizeOptionsText: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "left",
    marginTop: 10,
  },
  sizeOptionsTextContainer: {
    borderBottomWidth: 0.5,
    width: "90%",
    alignSelf: "center",
    paddingBottom: 10,
    marginBottom: 9,
    paddingRight: 10,
    paddingLeft: 10,
  },
  sizeOptionsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 10,
  },
  flavorOption: {
    backgroundColor: "#f0f0f0",
    padding: 10,
    margin: 5,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#dcdcdc",
    alignItems: "center",
    justifyContent: "center",
  },

  flavorOptionSelected: {
    backgroundColor: "#e0e0e0",
    borderColor: "#c0c0c0",
  },
  flavorOptionsText: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "left",
    marginTop: 10,
  },
  flavorOptionsTextContainer: {
    borderBottomWidth: 0.5,
    width: "90%",
    alignSelf: "center",
    paddingBottom: 10,
    marginBottom: 9,
    paddingRight: 10,
    paddingLeft: 10,
  },
  flavorOptionsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 10,
  },
  priceText: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    margin: 10,
  },
  addedMessageContainer: {
    position: "absolute",
    top: 20,
    right: 20,
    alignItems: "center",
    zIndex: 1000,
  },
  addedMessageText: {
    backgroundColor: "white",
    color: "green",
    padding: 10,
    borderRadius: 5,
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default ChooseItemScreen;
