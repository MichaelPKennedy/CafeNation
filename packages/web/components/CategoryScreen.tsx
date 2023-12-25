import React from "react";
import {
  StyleSheet,
  FlatList,
  Text,
  View,
  Image,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useMenuData } from "./MenuDataContext";
import { FontAwesome } from "@expo/vector-icons";

const ItemComponent: React.FC<{ item: MenuItem }> = ({ item }) => {
  return (
    <View style={styles.itemContainer}>
      {item.imageUrl && (
        <Image source={{ uri: item.imageUrl }} style={styles.itemImage} />
      )}
      <Text style={styles.itemName}>{item.itemData?.name}</Text>
    </View>
  );
};

const CategoryScreen = ({ route, navigation }) => {
  const menuData = useMenuData();
  const { selectedCategory } = useNavigation().getState().routes[1].params;

  const handleBackPress = () => {
    navigation.goBack();
  };

  const categoryData = menuData.data?.find((item) => {
    return (
      item.type === "CATEGORY" && item.categoryData?.name === selectedCategory
    );
  });
  const data = categoryData?.categoryItems || [];

  const renderItem = ({ item, index }) => {
    //check if the last item should be styled differently
    const isLastItem = data.length % 2 !== 0 && index === data.length - 1;

    const selectItem = (selectedItem) => {
      navigation.navigate("ChooseItemScreen", {
        item: selectedItem,
        itemOptions: menuData.itemOptions,
      });
    };

    return (
      <TouchableOpacity
        style={[styles.itemContainer, isLastItem && styles.lastItemAlone]}
        onPress={() => selectItem(item)}
      >
        <ItemComponent item={item} />
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={handleBackPress} style={styles.backButton}>
          <FontAwesome
            name="angle-left"
            size={24}
            color="black"
            style={styles.backIcon}
          />
        </TouchableOpacity>
        <Text style={styles.categoryTitle}>{selectedCategory}</Text>
      </View>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        numColumns={2}
        columnWrapperStyle={styles.row}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    borderBottomWidth: 0.5,
    marginBottom: 10,
  },
  container: {},
  categoryTitle: {
    fontSize: 27,
    fontWeight: "bold",
    marginBottom: 10,
    marginLeft: 20,
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

  lastItemAlone: {
    marginRight: "50%",
  },
  itemContainer: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: 5,
  },
  itemImage: {
    width: "100%",
    aspectRatio: 1,
    borderRadius: 1000,
  },
  itemName: {
    fontSize: 14,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 8,
  },
  row: {
    flex: 1,
    justifyContent: "space-between",
    paddingHorizontal: 8,
  },
});

export default CategoryScreen;
