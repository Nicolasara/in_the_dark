import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';

type CategorySelectionScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'CategorySelection'>;

interface CategorySelectionScreenProps {
  navigation: CategorySelectionScreenNavigationProp;
  route: {
    params: {
      players: string[];
    };
  };
}

interface Category {
  id: string;
  name: string;
  description: string;
  icon: string; // We'll use emoji for now, but could be replaced with actual icons
}

const categories: Category[] = [
  {
    id: 'food',
    name: 'Food & Drinks',
    description: 'Guess different types of food and beverages',
    icon: '🍔',
  },
  {
    id: 'household',
    name: 'Household Items',
    description: 'Common items found around the house',
    icon: '🏠',
  },
  {
    id: 'jobs',
    name: 'Jobs & Professions',
    description: 'Different occupations and careers',
    icon: '💼',
  },
];

export const CategorySelectionScreen: React.FC<CategorySelectionScreenProps> = ({ navigation, route }) => {
  const { players } = route.params;

  const handleCategorySelect = (category: Category) => {
    navigation.navigate('Game', {
      players,
      category: category.id,
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Choose a Category</Text>
      <Text style={styles.subtitle}>Select what you want to play with</Text>

      <ScrollView style={styles.categoriesContainer}>
        {categories.map((category) => (
          <TouchableOpacity
            key={category.id}
            style={styles.categoryCard}
            onPress={() => handleCategorySelect(category)}
          >
            <Text style={styles.categoryIcon}>{category.icon}</Text>
            <View style={styles.categoryInfo}>
              <Text style={styles.categoryName}>{category.name}</Text>
              <Text style={styles.categoryDescription}>{category.description}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a1a',
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'center',
    marginTop: 20,
  },
  subtitle: {
    fontSize: 18,
    color: '#cccccc',
    textAlign: 'center',
    marginBottom: 30,
  },
  categoriesContainer: {
    flex: 1,
  },
  categoryCard: {
    flexDirection: 'row',
    backgroundColor: '#333',
    borderRadius: 12,
    padding: 20,
    marginBottom: 15,
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  categoryIcon: {
    fontSize: 40,
    marginRight: 20,
  },
  categoryInfo: {
    flex: 1,
  },
  categoryName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 5,
  },
  categoryDescription: {
    fontSize: 16,
    color: '#cccccc',
  },
}); 