import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { styles, SCREEN_WIDTH } from './styles';
import { MaterialIcons } from '@expo/vector-icons';
export const AllCategoryScreen = ({
  navigation,
  route,
}) => {
  const { categories, titles } = route.params;
  const {
    userId,
    isLoggedIn,
    jwtToken,
    nickname,
    updateDM2,
  } = route.params;
  return (
    <View>
      <View style={styles.main_Row}>
        <View style={styles.back_view}>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('HomeScreen', {
                isLoggedIn: true,
                userId,
                jwtToken,
                nickname,
                updateDM2,
              })
            }
          >
            <AntDesign
              name="arrowleft"
              size={24}
              color="black"
            />
          </TouchableOpacity>
        </View>
        <View style={styles.back_title_view}>
          <Text style={styles.back_text}>
            모든 카테고리
          </Text>
        </View>
      </View>
      <View style={styles.AllCategory_View}>
        <View style={styles.Allcategory_category_View}>
          {categories.map((category, index) => (
            <View
              key={category}
              style={styles.Allcategory_category_text_view}
            >
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('CategoryScreen', {
                    isLoggedIn: true,
                    userId,
                    jwtToken,
                    nickname,
                    updateDM2,
                    category,
                    title: titles[index],
                  })
                }
              >
                <View style={styles.main_Row}>
                  <MaterialIcons
                    name="category"
                    size={24}
                    color="black"
                  />
                  <Text
                    style={styles.Allcategory_category_text}
                  >
                    {category}
                  </Text>
                </View>
                <Text style={styles.Allcategory_title_text}>
                  {titles[index]}
                </Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
};
