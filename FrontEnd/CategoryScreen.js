import { Text, View, TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { styles } from './styles';

export const CategoryScreen = ({ navigation, route }) => {
  const {
    userId,
    isLoggedIn,
    jwtToken,
    nickname,
    updateDM2,
  } = route.params;
  return (
    <View style={styles.main_page}>
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
            {route.params.category}
          </Text>
        </View>
        <View style={styles.standard_view}>
          <Text style={styles.standard_text}>정렬기준</Text>
        </View>
      </View>
      <View style={styles.category_post_view}>
        <View style={styles.category_post_box}>
          <View style={styles.category_post_text}>
            <Text style={styles.category_post_title}>
              제목은 이렇게 들어갈 예정
            </Text>
            <Text style={styles.category_post_sub}>
              본문은 아래에 동일한 라인으로 폰트사이즘나
              축소 최대 두줄 가능함, 두 줄 이상일 시 짤려서
              나타나도록 할 예정
            </Text>
          </View>
          <View style={styles.category_post_like}>
            <AntDesign
              name="like2"
              size={20}
              color="#007BFF"
            />
            <Text style={styles.category_post_like_text}>
              좋아요 수 | n시간/ n분/ n일 전
            </Text>
          </View>
        </View>
        <View style={styles.category_post_box}>
          <View style={styles.category_post_text}>
            <Text style={styles.category_post_title}>
              제목은 이렇게 들어갈 예정
            </Text>
            <Text style={styles.category_post_sub}>
              본문은 아래에 동일한 라인으로 폰트사이즘나
              축소 최대 두줄 가능함, 두 줄 이상일 시 짤려서
              나타나도록 할 예정
            </Text>
          </View>
          <View style={styles.category_post_like}>
            <AntDesign
              name="like2"
              size={20}
              color="#007BFF"
            />
            <Text style={styles.category_post_like_text}>
              좋아요 수 | n시간/ n분/ n일 전
            </Text>
          </View>
        </View>
        <View style={styles.category_post_box}>
          <View style={styles.category_post_text}>
            <Text style={styles.category_post_title}>
              제목은 이렇게 들어갈 예정
            </Text>
            <Text style={styles.category_post_sub}>
              본문은 아래에 동일한 라인으로 폰트사이즘나
              축소 최대 두줄 가능함, 두 줄 이상일 시 짤려서
              나타나도록 할 예정
            </Text>
          </View>
          <View style={styles.category_post_like}>
            <AntDesign
              name="like2"
              size={20}
              color="#007BFF"
            />
            <Text style={styles.category_post_like_text}>
              좋아요 수 | n시간/ n분/ n일 전
            </Text>
          </View>
        </View>
        <View style={styles.category_post_box}>
          <View style={styles.category_post_text}>
            <Text style={styles.category_post_title}>
              제목은 이렇게 들어갈 예정
            </Text>
            <Text style={styles.category_post_sub}>
              본문은 아래에 동일한 라인으로 폰트사이즘나
              축소 최대 두줄 가능함, 두 줄 이상일 시 짤려서
              나타나도록 할 예정
            </Text>
          </View>
          <View style={styles.category_post_like}>
            <AntDesign
              name="like2"
              size={20}
              color="#007BFF"
            />
            <Text style={styles.category_post_like_text}>
              좋아요 수 | n시간/ n분/ n일 전
            </Text>
          </View>
        </View>
        <View style={styles.category_post_box}>
          <View style={styles.category_post_text}>
            <Text style={styles.category_post_title}>
              제목은 이렇게 들어갈 예정
            </Text>
            <Text style={styles.category_post_sub}>
              본문은 아래에 동일한 라인으로 폰트사이즈만
              축소 최대 두줄 가능함, 두 줄 이상일 시 짤려서
              나타나도록 할 예정
            </Text>
          </View>
          <View style={styles.category_post_like}>
            <AntDesign
              name="like2"
              size={20}
              color="#007BFF"
            />
            <Text style={styles.category_post_like_text}>
              좋아요 수 | n시간/ n분/ n일 전
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};
