import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";

const ChooseItemScreen = ({ route, navigation }) => {
  const { item, itemOptions } = route.params;
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState({});

  const getOptionNameById = (optionId) => {
    return itemOptions.find((option) => option.id === optionId)?.name;
  };

  const getOptionValueNameById = (optionId, valueId) => {
    const option = itemOptions.find((option) => option.id === optionId);
    return option?.values.find((value) => value.id === valueId)?.name;
  };

  const renderSizeOptions = () => {
    if (!item.itemData.variations) return null;
    const sizeOptions = item.itemData.variations
      .map((variation) => variation.itemVariationData.itemOptionValues)
      .flat()
      .filter(
        (optionValue) => getOptionNameById(optionValue?.itemOptionId) === "size"
      )
      .map((optionValue) => ({
        ...optionValue,
        name: getOptionValueNameById(
          optionValue?.itemOptionId,
          optionValue?.itemOptionValueId
        ),
      }))
      .filter(
        (item, index, self) =>
          index === self.findIndex((t) => t.name === item.name)
      );

    if (sizeOptions.length === 0) return null;

    return (
      <>
        <View style={styles.sizeOptionsTextContainer}>
          <Text style={styles.sizeOptionsText}>Size Options</Text>
        </View>
        <View style={styles.sizeOptionsContainer}>
          {sizeOptions.map((sizeOption) => (
            <TouchableOpacity
              key={`${sizeOption.itemOptionId}-${sizeOption.itemOptionValueId}`}
              style={[
                styles.sizeOption,
                selectedSize === sizeOption.itemOptionValueId &&
                  styles.sizeOptionSelected,
              ]}
              onPress={() => setSelectedSize(sizeOption.itemOptionValueId)}
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
      .map((variation) => variation.itemVariationData.itemOptionValues)
      .flat()
      .filter(
        (optionValue) =>
          getOptionNameById(optionValue?.itemOptionId) === "flavors"
      )
      .map((optionValue) => ({
        ...optionValue,
        name: getOptionValueNameById(
          optionValue?.itemOptionId,
          optionValue?.itemOptionValueId
        ),
      }))
      .filter(
        (item, index, self) =>
          index === self.findIndex((t) => t.name === item.name)
      );

    if (flavorOptions.length === 0) return null;

    return (
      <>
        <View style={styles.flavorOptionsTextContainer}>
          <Text style={styles.flavorOptionsText}>Flavor Options</Text>
        </View>
        <View style={styles.flavorOptionsContainer}>
          {flavorOptions.map((flavorOption) => (
            <TouchableOpacity
              key={`${flavorOption.itemOptionId}-${flavorOption.itemOptionValueId}`}
              style={[
                styles.flavorOption,
                selectedOptions[flavorOption.itemOptionValueId] &&
                  styles.flavorOptionSelected,
              ]}
              onPress={() =>
                setSelectedOptions({
                  ...selectedOptions,
                  [flavorOption.itemOptionValueId]:
                    !selectedOptions[flavorOption.itemOptionValueId],
                })
              }
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

      {/* Item Name */}
      <Text style={styles.itemName}>{item.itemData?.name}</Text>

      {/* Item Description */}
      <Text style={styles.description}>
        {item.itemData?.descriptionPlaintext}
      </Text>

      {renderSizeOptions()}

      {renderFlavorOptions()}

      <TouchableOpacity style={styles.addToOrderButton}>
        <Text style={styles.addToOrderText}>Add to order</Text>
      </TouchableOpacity>
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
});

export default ChooseItemScreen;
