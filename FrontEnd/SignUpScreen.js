import React, { useState } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Alert,
} from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import axios from 'axios';
import { styles } from './styles';

export const SignUpScreen = ({ navigation }) => {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [nickname, setNickname] = useState('');
  const [selectedGender, setSelectedGender] =
    useState(null);
  const [ageGroup, setAgeGroup] = useState('');
  const [mbti, setMbti] = useState('');

  const handleGenderSelection = (gender) => {
    setSelectedGender(gender);
  };

  const handleSignUp = async () => {
    if (id === nickname) {
      Alert.alert(
        '오류',
        'ID와 닉네임이 중복됩니다. 다시 입력해주세요'
      );
      setNickname('');
      return;
    }
    if (nickname.length < 2) {
      Alert.alert(
        '오류',
        '닉네임은 최소 2글자 이상이어야 합니다.'
      );
      setNickname('');
      return;
    }

    const userData = {
      uid: id,
      password: password,
      nickname: nickname,
      gender: selectedGender,
      age: ageGroup,
      mbti: mbti,
    };

    try {
      const response = await axios.post(
        'http://port-0-capstone-project-gj8u2llon19kg3.sel5.cloudtype.app/auth/signup',
        userData
      );

      if (response.status === 201) {
        console.log('회원가입 성공:', response.data);
        navigation.navigate('LoginScreen');
      } else {
        console.error('회원가입 실패:', response.data);
      }
    } catch (error) {
      console.error('회원가입 요청 오류:', error);
    }
  };

  return (
    <View style={styles.main_Page1}>
      <View style={styles.main_Row}>
        <View style={styles.back_view}>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('LoginScreen')
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
          <Text style={styles.back_text}>회원가입</Text>
        </View>
      </View>
      <View style={styles.signup_page_view}>
        <View style={styles.input_label_view}>
          <View style={styles.signup_page_label_view}>
            <Text style={styles.signup_page_label_text}>
              아이디
            </Text>
          </View>
          <TextInput
            placeholder="                                                                "
            value={id}
            onChangeText={(text) => setId(text)}
            style={styles.signup_page_inputfield}
          />
        </View>
        <View style={styles.input_label_view}>
          <View style={styles.signup_page_label_view}>
            <Text style={styles.signup_page_label_text}>
              비밀번호
            </Text>
          </View>
          <TextInput
            placeholder="비밀번호는 8 ~ 12자리"
            value={password}
            onChangeText={(text) => setPassword(text)}
            style={styles.signup_page_inputfield}
          />
        </View>
        <View style={styles.input_label_view}>
          <View style={styles.signup_page_label_view}>
            <Text style={styles.signup_page_label_text}>
              닉네임
            </Text>
          </View>
          <TextInput
            placeholder="닉네임은 최대 7자리까지"
            value={nickname}
            onChangeText={(text) => setNickname(text)}
            style={styles.signup_page_inputfield}
          />
        </View>
        <View style={styles.input_label_view}>
          <View style={styles.signup_page_label_view}>
            <Text style={styles.signup_page_label_text}>
              성별
            </Text>
          </View>
          <View style={styles.signup_page_gender_view}>
            <TouchableOpacity
              style={[
                styles.signup_page_gender_btn,
                selectedGender === 'M'
                  ? styles.selectedGender
                  : null,
              ]}
              onPress={() => handleGenderSelection('M')}
            >
              <Text style={styles.signup_page_gender_text}>
                남
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.signup_page_gender_btn,
                selectedGender === 'W'
                  ? styles.selectedGender
                  : null,
              ]}
              onPress={() => handleGenderSelection('W')}
            >
              <Text style={styles.signup_page_gender_text}>
                여
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.input_label_view}>
          <View style={styles.signup_page_label_view}>
            <Text style={styles.signup_page_label_text}>
              나이대
            </Text>
          </View>
          <TextInput
            placeholder="                                                                "
            value={ageGroup}
            onChangeText={(text) => setAgeGroup(text)}
            style={styles.signup_page_inputfield}
          />
        </View>
        <View style={styles.input_label_view}>
          <View style={styles.signup_page_label_view}>
            <Text style={styles.signup_page_label_text}>
              MBTI
            </Text>
          </View>
          <TextInput
            placeholder="                                                                "
            value={mbti}
            onChangeText={(text) => setMbti(text)}
            style={styles.signup_page_inputfield}
          />
        </View>
      </View>
      <TouchableOpacity onPress={handleSignUp}>
        <View style={styles.signup_page_signup_btn_view}>
          <Text style={styles.signup_page_signup_btn_text}>
            회원 가입하기
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

{
  /* <View style={styles.input_label_view}>
          <View style={styles.signup_page_label_view}>
            <Text style={styles.signup_page_label_text}>
              비밀번호 확인
            </Text>
          </View>
          <TextInput
            placeholder="위에 입력한 비밀번호와 동일하게 입력"
            value={password}
            onChangeText={(text) =>
              setConfirmPassword(text)
            }
            style={styles.signup_page_inputfield}
          />
        </View> */
}
