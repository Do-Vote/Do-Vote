import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { styles, SCREEN_WIDTH } from './styles';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import axios from 'axios';

// 페이지 인디케이터(점)
export function PageIndicator({ currentPage, totalPages }) {
  const indicators = [];

  for (let i = 1; i <= totalPages; i++) {
    indicators.push(
      <View
        key={i}
        style={[
          styles.indicator,
          i === currentPage ? styles.activeIndicator : null,
        ]}
      >
        <Text
          style={[
            styles.indicatorText,
            i === currentPage,
            //</View> ? styles.activeIndicatorText
            // : styles.activeIndicatorText, //null,
          ]}
        ></Text>
      </View>
    );
  }

  return (
    <View style={styles.pageIndicatorContainer}>
      {indicators}
    </View>
  );
}

export const HomeScreen = ({ navigation, route }) => {
  const {
    isLoggedIn,
    userId,
    jwtToken,
    nickname,
    updateDM2,
  } = route.params;
  console.log('Received updateDM2:', updateDM2);
  console.log('t:', jwtToken);
  console.log('n:', nickname);
  //인디케이터
  const [updateDM, setUpdateDM] = useState(updateDM2);
  const [currentPage, setCurrentPage] = useState(1);
  const [messages, setMessages] = useState([]);
  const totalPages = 3; // 총 페이지 수

  const [unreadMessageCount, setUnreadMessageCount] =
    useState(0);
  const handleScroll = (event) => {
    const contentOffsetX =
      event.nativeEvent.contentOffset.x;
    const page = Math.ceil(
      contentOffsetX / SCREEN_WIDTH + 1
    ); // 스크롤 위치에 따라 페이지 계산
    setCurrentPage(page);
  };

  //
  const [count, setCount] = useState(0); // 초기값은 0
  const [isLiked, setIsLiked] = useState(false); // 버튼 상태 초기값은 좋아요하지 않음

  useEffect(() => {
    setUpdateDM(updateDM2);
  }, [updateDM2]);

  useEffect(() => {
    socket.onmessage = (event) => {
      const receivedMessage = event.data;
      console.log(
        '서버로부터 받은 메시지1 :',
        receivedMessage
      );
      console.log('u1 :', updateDM);
      // 메시지를 화면에 출력
      setMessages((prevMessages) => [
        ...prevMessages,
        receivedMessage,
      ]);
      // Check if the message contains "새로운 쪽지가 도착했습니다."
      const isNewMessage = receivedMessage.includes(
        '새로운 쪽지가 도착했습니다.'
      );
      console.log('isNewMessage:', isNewMessage);

      if (isNewMessage) {
        // Increment updateDM by 1
        setUpdateDM(updateDM + 1);
      }
      console.log('u2 :', updateDM);

      // 여긴 숫자 구하는거
      //숫자를 추출하여 상태로 저장
      const match = receivedMessage.match(
        /읽지 않은 쪽지의 개수: (\d+)/
      );

      if (match) {
        const count = parseInt(match[1], 10);
        setUnreadMessageCount(count);
      }
    };
  }, [updateDM]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          'http://port-0-capstone-project-gj8u2llon19kg3.sel5.cloudtype.app/message/read/all/' +
            nickname,
          {
            headers: {
              'AUTH-TOKEN': jwtToken,
            },
          }
        );

        if (response.status === 200) {
          // Assuming the response data is an array of messages
          const messagesData = response.data;

          // Extracting and mapping relevant data from the response
          const formattedMessages = messagesData.map(
            (message) => ({
              username: message.sender,
              time: message.sendTime,
              title: message.content,
              isRead: message.readStatus,
            })
          );

          setMessages(formattedMessages);
        } else {
          console.error(
            'Failed to fetch messages:',
            response.data
          );
        }
      } catch (error) {
        console.error('Error fetching messages:', error);
      }
    };

    // Call the fetchData function to fetch messages when the component mounts
    fetchData();
  }, [nickname]);

  const handleProfilePress = () => {
    if (isLoggedIn) {
      // 이미 로그인된 상태에서 이미지 클릭 시 ProfileScreen으로 넘어가기
      navigation.navigate('ProfileScreen', {
        isLoggedIn,
        userId,
        jwtToken,
        nickname,
        updateDM2: updateDM,
      });
      console.log('유저 페이지 이동:', userId);
      console.log('유저 페이지 이동:', isLoggedIn);
      console.log('nickname:', nickname);
      console.log('jwtToken:', jwtToken);
    }
  };
  const handlePress = () => {
    console.log('쪽지함으로 간다', updateDM);
    if (isLoggedIn) {
      navigation.navigate('DMboxScreen', {
        isLoggedIn: true,
        userId,
        jwtToken,
        nickname,
        updateDM2: updateDM + 1,
      });
      console.log('유저 페이지 이동:', userId);
      console.log('유저 페이지 이동:', isLoggedIn);
      console.log('nickname:', nickname);
      console.log('jwtToken:', jwtToken);
    }
  };
  // 버튼을 누를 때 실행되는 함수
  const handleToggleLike = () => {
    if (isLiked) {
      // 이미 좋아요한 상태라면 -1
      setCount(count - 1);
    } else {
      // 아직 좋아요하지 않은 상태라면 +1
      setCount(count + 1);
    }

    // 버튼 상태 토글
    setIsLiked(!isLiked);
  };
  const renderPost = (category, title) => (
    <TouchableOpacity
      key={title}
      onPress={() =>
        navigation.navigate('VoteBefore', {
          category,
          title,
          isLoggedIn,
          userId,
          jwtToken,
          nickname,
          updateDM2,
        })
      }
    >
      <View>
        <Image
          source={require('./assets/box.png')}
          style={styles.box}
        />
        <View style={styles.boxinbox}>
          <View>
            <Text style={styles.boxintitle}>
              {category}
            </Text>
            <Text style={styles.boxintext}>{title}</Text>
          </View>
          <TouchableOpacity onPress={handleToggleLike}>
            <Image
              source={require('./assets/good.png')}
              style={styles.goodbtn}
            />
            <Text style={styles.goodnum}>{count}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
  return (
    <View>
      <ScrollView vertical={true}>
        <View style={styles.main_Page}>
          <View style={styles.main_Row}>
            <Text style={styles.main_title}>
              투표는 투기장
            </Text>
            <View style={styles.after_login_view}>
              <TouchableOpacity onPress={handlePress}>
                <FontAwesome5
                  name="bell"
                  size={24}
                  color="black"
                  style={styles.alarm_btn}
                />
                <Text style={styles.alarm_text}>
                  {unreadMessageCount}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={handleProfilePress}
              >
                <Feather
                  name="user"
                  size={28}
                  color="black"
                  style={styles.profile_btn}
                />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.main_Row}>
            <Text style={styles.popular_vote_title}>
              인기 투표
            </Text>
          </View>
          <ScrollView
            horizontal={true}
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.scrollViewContent}
            onScroll={handleScroll}
          >
            {[
              {
                category: '축구',
                title: '맨유 우승 할까요?',
              },
              {
                category: '음식',
                title: '바다 회 vs 육 회',
              },
              {
                category: '고민거리',
                title: '저는 바보라고 생각하시나요?',
              },
            ].map(({ category, title }) =>
              renderPost(category, title)
            )}
          </ScrollView>
          <PageIndicator
            currentPage={currentPage}
            totalPages={totalPages}
          />
          <View style={styles.main_Row}>
            <Text style={styles.category_}>
              카테고리별 투표
            </Text>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('AllCategoryScreen', {
                  isLoggedIn,
                  userId,
                  jwtToken,
                  nickname,
                  updateDM2,
                  categories: [
                    '고민거리',
                    '시사',
                    '음식',
                    '연애',
                    '게임',
                    '동물',
                    '축구',
                  ],
                  titles: [
                    '오늘 저녁 뭐 먹을까요?',
                    '세상 이대로 괜찮을까?',
                    '애플파이 vs 블루베리파이',
                    '연상 vs 연하',
                    '롤 티어 어디부터 사람일까?',
                    '고양이 싫어하는 사람 있어?',
                    '맨유 우승 할까요?',
                  ],
                })
              }
            >
              <View style={styles.main_Row}>
                <Text style={styles.category_plus}>
                  더보기
                </Text>
                <AntDesign
                  name="right"
                  size={10}
                  color="#BDBDBD"
                  style={styles.category_arrow}
                />
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('SearchScreen', {
                  isLoggedIn,
                  userId,
                  jwtToken,
                  nickname,
                  updateDM2,
                })
              }
            >
              <MaterialCommunityIcons
                name="text-search"
                size={22}
                color="black"
                style={styles.category_search}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.category_box}>
            <View style={styles.category_title_box}>
              {[
                '고민거리',
                '시사',
                '음식',
                '연애',
                '게임',
                '동물',
                '축구',
              ].map((category) => (
                <TouchableOpacity
                  key={category}
                  onPress={() =>
                    navigation.navigate('CategoryScreen', {
                      category,
                      isLoggedIn,
                      userId,
                      jwtToken,
                      nickname,
                      updateDM2,
                    })
                  }
                >
                  <Text style={styles.category_title_text}>
                    {category}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
            <View style={styles.category__sub_title_box}>
              {[
                '오늘 저녁 뭐 먹을까요?',
                '세상 이대로 괜찮을까?',
                '애플파이 vs 블루베리파이',
                '연상 vs 연하',
                '롤 티어 어디부터 사람일까?',
                '고양이 싫어하는 사람 있어?',
                '맨유 우승 할까요?',
              ].map((title) => (
                <TouchableOpacity
                  key={title}
                  onPress={() =>
                    navigation.navigate('VoteBefore', {
                      category: '고민거리',
                      title,
                      isLoggedIn,
                      userId,
                      jwtToken,
                      nickname,
                      updateDM2,
                    })
                  }
                >
                  <Text
                    style={styles.category_sub_title_text}
                  >
                    {title}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>
      </ScrollView>
      <TouchableOpacity
        style={styles.write_post_btn}
        onPress={() =>
          navigation.navigate('VoteMake', {
            isLoggedIn,
            userId,
            jwtToken,
            nickname,
            updateDM2,
          })
        }
      >
        <Feather
          name="plus-square"
          size={45}
          color="#007BFF"
        />
      </TouchableOpacity>
    </View>
  );
};
