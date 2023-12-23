import React from "react";
import {
  StyleSheet,
  FlatList,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Image,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

interface CategoryRowProps {
  category: MenuItem;
}

export type RootStackParamList = {
  HomeScreen: undefined;
  CategoryItemsScreen: {
    categoryId: string;
    categoryName: string | undefined;
  };
};

const CategoryRow: React.FC<CategoryRowProps> = ({ category }) => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  console.log("category in categoryRow", category);

  const viewAll = () => {
    navigation.navigate("CategoryItemsScreen", {
      categoryId: category.id,
      categoryName: category?.categoryData?.name,
    });
  };

  return (
    <View style={styles.categoryContainer}>
      <View style={styles.categoryHeader}>
        <Text style={styles.categoryTitle}>{category.categoryData?.name}</Text>
        <TouchableOpacity onPress={viewAll}>
          <Text style={styles.viewAllText}>
            See all {category.categoryItems?.length} items
          </Text>
        </TouchableOpacity>
      </View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {category.categoryItems?.map((item) => (
          <View style={styles.itemContainer} key={item.id}>
            {item.imageUrl && (
              <Image source={{ uri: item.imageUrl }} style={styles.itemImage} />
            )}
            <Text style={styles.itemName}>{item.itemData?.name}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const FeaturedScreen: React.FC<FeaturedScreenProps> = ({ data }) => {
  const categories = data?.filter((item) => item.categoryData);
  if (categories) {
    for (const category of categories) {
      category.categoryItems = [];
      for (const item of data) {
        if (
          item.itemData &&
          item.itemData.categories.some((cat) => cat.id === category.id)
        ) {
          category.categoryItems.push(item);
        }
      }
    }
  }

  return (
    categories && (
      <FlatList
        data={categories}
        renderItem={({ item }) => <CategoryRow category={item} />}
        keyExtractor={(item) => item.id}
      />
    )
  );
};

const styles = StyleSheet.create({
  categoryContainer: {
    //add top border
    borderBottomWidth: 0.5,
    paddingTop: 20,
    paddingBottom: 10,
  },
  categoryHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
  },
  categoryTitle: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10,
    marginLeft: 5,
  },
  viewAllText: {
    fontSize: 17,
    fontWeight: "bold",
    color: "green",
  },
  itemContainer: {
    width: 145,
    marginHorizontal: 8,
  },
  itemImage: {
    width: 145,
    height: 145,
    borderRadius: 72.5,
    marginBottom: 12,
  },
  itemName: {
    fontSize: 14,
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default FeaturedScreen;
