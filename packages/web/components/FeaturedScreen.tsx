import React from "react";
import {
  StyleSheet,
  FlatList,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useNavigation, NavigationContainer } from "@react-navigation/native";
import {
  StackNavigationProp,
  createStackNavigator,
} from "@react-navigation/stack";

interface Item {
  id: string;
  name: string;
  // Add other properties that an item would have
}

// Mock data
const categories: CategoryData[] = [];

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
          <Text style={styles.viewAllText}>See all items</Text>
        </TouchableOpacity>
      </View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {category.categoryItems?.map((item) => (
          <View style={styles.itemContainer} key={item.id}>
            <Text>{item.itemData?.name}</Text>
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
    // Styles for category container
  },
  categoryHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    // Additional styles
  },
  categoryTitle: {
    fontSize: 22,
    fontWeight: "bold",
    // Additional styles
  },
  viewAllText: {
    fontSize: 16,
    color: "#007bff", // Example color for "See all" link
    // Additional styles
  },
  itemContainer: {
    width: 120, // Example item width, adjust as needed
    marginHorizontal: 8,
    // Additional styles
  },
  // Additional styles as needed
});

export default FeaturedScreen;
