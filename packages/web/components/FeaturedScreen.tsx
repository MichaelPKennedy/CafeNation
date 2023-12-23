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

interface Category {
  id: string;
  name: string;
  items: Item[];
}

// Mock data
const categories: Category[] = [];

interface CategoryRowProps {
  category: Category;
}

export type RootStackParamList = {
  HomeScreen: undefined;
  CategoryItemsScreen: {
    categoryId: string;
    categoryName: string;
  };
};

const CategoryRow: React.FC<CategoryRowProps> = ({ category }) => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  const viewAll = () => {
    navigation.navigate("CategoryItemsScreen", {
      categoryId: category.id,
      categoryName: category.name,
    });
  };

  return (
    <View style={styles.categoryContainer}>
      <View style={styles.categoryHeader}>
        <Text style={styles.categoryTitle}>{category.name}</Text>
        <TouchableOpacity onPress={viewAll}>
          <Text style={styles.viewAllText}>
            See all {category.items.length}
          </Text>
        </TouchableOpacity>
      </View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {category.items.map((item) => (
          <View style={styles.itemContainer} key={item.id}>
            {/* Render your item component */}
            <Text>{item.name}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const FeaturedScreen = (data: MenuItem[]) => {
  return (
    <FlatList
      data={categories}
      renderItem={({ item }) => <CategoryRow category={item} />}
      keyExtractor={(item) => item.id}
    />
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
