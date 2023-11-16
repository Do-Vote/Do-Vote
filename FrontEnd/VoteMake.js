import React, { useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  FlatList,
  Alert,
} from 'react-native';
import { AntDesign, Entypo } from '@expo/vector-icons';
import { Platform, StatusBar } from 'react-native';
import Constants from 'expo-constants';
import { TextInput } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { styles } from './styles';

export const VoteMake = ({ navigation, route }) => {
  const {
    userId,
    isLoggedIn,
    jwtToken,
    nickname,
    updateDM2,
  } = route.params;
  const [titleInput, setTitleInput] = useState('');
  {
    /* 제목내용 */
  }

  const [description, setDescription] = useState('');
  {
    /* 본문내용 */
  }

  const [selectedCategory, setSelectedCategory] =
    useState('');
  {
    /* 선택한 카테고리 상태 */
  }
  const categories = [
    '선택',
    '고민거리',
    '시사',
    '스포츠',
    '게임&E스포츠',
    '반려동물',
    '연애',
  ];

  const [options, setOptions] = useState(['', '']);
  {
    /* 투표항목 초기값을 2개로 지정 */
  }

  const addOption = () => {
    if (options.length < 4) {
      setOptions([...options, '']);
    } else {
      Alert.alert(
        '알림',
        '투표항목은 최대 4개까지 등록 가능합니다.'
      );
    }
  };
  {
    /* 투표항목 추가로직 */
  }

  const removeOption = (indexToRemove) => {
    if (options.length > 2) {
      const newOptions = options.filter(
        (_, index) => index !== indexToRemove
      );
      setOptions(newOptions);
    } else {
      Alert.alert(
        '알림',
        '투표항목은 최소 2개 이상이어야 합니다.'
      );
    }
  };
  {
    /* 투표항목 삭제로직 */
  }

  const renderOptionItem = ({ item, index }) => (
    <View
      key={index}
      style={styles.VoteMake_View3_content_interval}
    >
      <View style={styles.VoteMake_View3_Votecontent}>
        <TextInput
          style={styles.VoteMake_View3_Votecontent1}
          placeholder={`투표항목 내용을 입력하세요`}
          value={item}
          onChangeText={(text) => {
            const newOptions = [...options];
            newOptions[index] = text;
            setOptions(newOptions);
          }}
        />
      </View>
      {/* 투표항목 추가 및 입력 버튼 */}

      <TouchableOpacity onPress={() => removeOption(index)}>
        <AntDesign name="minus" size={28} color="#4B89DC" />
      </TouchableOpacity>
      {/* 투표항목 추가 및 입력 버튼 */}
    </View>
  );

  const createVote = async () => {
    if (titleInput.trim() === '') {
      Alert.alert('알림', '제목을 입력하세요.');
    } else if (
      selectedCategory.trim() === '' ||
      selectedCategory === '선택'
    ) {
      Alert.alert('알림', '카테고리를 선택해주세요.');
    } else if (description.trim() === '') {
      Alert.alert('알림', '본문 내용을 입력해주세요.');
    } else if (
      options.some((option) => option.trim() === '')
    ) {
      Alert.alert('알림', '투표항목내용을 입력해주세요.');
    } else {
      const pollData = {
        users_id: nickname,
        title: titleInput,
        question: description,
        category: selectedCategory,
      };
      const choiceData = {
        choices: options.map((option, index) => ({
          text: option.trim(),
        })),
      };
      const data = {
        pollData: pollData,
        choiceData: [choiceData],
      };
      console.log(pollData);
      console.log(choiceData);
      try {
        const response = await axios.post(
          'https://port-0-capstone-backend-1d6du62aloxt3u8i.sel5.cloudtype.app/polls',
          data
        );

        if (response.status === 201) {
          console.log('투표 생성 성공:', response.data);
          navigation.navigate('HomeScreen', {
            isLoggedIn: true,
            userId,
            jwtToken,
            nickname,
            updateDM2: updateDM2,
          });
        } else {
          console.error('투표 생성 실패:', response.data);
        }
      } catch (error) {
        console.error('투표 생성 오류:', error);
      }
    }

    navigation.navigate('VoteBefore');
  };

  {
    /* 투표생성로직_제목,카테고리,본문,투표항목중 하나라도 선택안되면 투표생성불가 */
  }

  return (
    <View style={styles.status_x}>
      <ScrollView>
        <View>
          <View style={styles.main_Row12}>
            <View style={styles.back_view12}>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('HomeScreen', {
                    userId,
                    isLoggedIn,
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
                투표생성하기
              </Text>
            </View>
          </View>
          {/* 뒤로가기 버튼 */}
          <View style={styles.VoteMake_View1}>
            <View style={styles.VoteMake_View1_inputfield}>
              <Text
                style={styles.VoteMake_View1_title_input}
              >
                제목:
              </Text>
              <TextInput
                style={[
                  styles.VoteMake_View1_title_text,
                  titleInput,
                ]}
                placeholder="제목을 입력하세요"
                onChangeText={(text) => setTitleInput(text)}
              />
            </View>
            {/* 제목입력칸 */}

            <View
              style={styles.VoteMake_View1_category_View}
            >
              <View>
                <Text
                  style={styles.VoteMake_View_category_}
                >
                  카테고리
                </Text>
              </View>
              {/* 카테고리 문구 */}

              <View
                style={
                  styles.VoteMake_View1_category_Picker_View
                }
              >
                <Picker
                  selectedValue={selectedCategory}
                  style={
                    styles.VoteMake_View1_category_Picker
                  }
                  onValueChange={(itemValue, itemIndex) =>
                    setSelectedCategory(itemValue)
                  }
                >
                  {categories.map((category, index) => (
                    <Picker.Item
                      key={index}
                      label={category}
                      value={category}
                      style={
                        styles.VoteMake_View1_category_Picker1
                      } // 원하는 크기로 조절
                    />
                  ))}
                </Picker>
              </View>
            </View>
            {/* 카테고리 피커 */}

            <View style={styles.VoteMake_View2_content}>
              <Text style={styles.VoteMake_View2_titlename}>
                본문
              </Text>

              {/* 본문글씨 */}
              <TouchableOpacity
                style={styles.VoteMake_View2_content_View}
              >
                {/* 버튼 근처를 눌러도 터치가능 */}
                <AntDesign
                  name="picture"
                  size={28}
                  color="black"
                />
              </TouchableOpacity>
            </View>
            {/* 사진첨부버튼 */}
          </View>
          <View style={styles.VoteMake_View2_textcontent1}>
            <TextInput
              style={styles.VoteMake_View2_textcontent}
              multiline
              onChangeText={(text) => setDescription(text)}
              value={description}
              placeholder="본문 내용을 입력하세요"
            />
          </View>
          {/*본문 내용 입력}*/}

          <View>
            <FlatList
              data={options}
              renderItem={renderOptionItem}
              keyExtractor={(item, index) =>
                index.toString()
              }
            />
          </View>
          {/*추가된 투표항목}*/}

          <View style={styles.VoteMake_View3_Addcontent}>
            <TouchableOpacity
              style={styles.VoteMake_View3_contentbotton}
            >
              <Text
                style={styles.VoteMake_View3_contenttext}
              >
                투표항목을 추가하려면 + 버튼을 누르세요.
              </Text>
            </TouchableOpacity>
            {/*투표항목 추가문구버튼}*/}

            <TouchableOpacity
              style={styles.VoteMake_View3_contentaddbotton}
              onPress={addOption} // 플러스 버튼을 눌렀을 때만 addOption 함수 호출
            >
              <AntDesign
                name="plus"
                size={25}
                color="#4B89DC"
              />
            </TouchableOpacity>
          </View>
          {/* 투표항목추가 */}

          <View>
            <TouchableOpacity
              style={styles.VoteMake_View3_Makebotton}
              onPress={createVote}
            >
              <Text
                style={styles.VoteMake_View3_Makebottonname}
              >
                투표 생성하기
              </Text>
            </TouchableOpacity>
            {/* 투표생성하기버튼 */}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};
