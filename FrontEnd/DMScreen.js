import React, { useState } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { styles } from './styles';

export const DMScreen = ({ navigation, route }) => {
  const {
    isLoggedIn,
    userId,
    isRead,
    nickname,
    jwtToken,
    messageId,
    item,
    setUnreadMessageCount,
    updateDM2,
  } = route.params;

  const unreadMessageCount =
    route.params.unreadMessageCount;

  const hi = () => {
    navigation.navigate('DMboxScreen', {
      isLoggedIn: true,
      userId,
      isRead,
      nickname,
      jwtToken,
      unreadMessageCount,
      updateDM2: updateDM2 + 1,
    });
    console.log('DMbox로 간다 : ', updateDM2);
  };
  return (
    <View style={styles.main_page}>
      <View style={styles.main_Row}>
        <View style={styles.back_view}>
          <TouchableOpacity onPress={hi}>
            <AntDesign
              name="arrowleft"
              size={24}
              color="black"
            />
          </TouchableOpacity>
        </View>
      </View>

      <View>
        {/* 상단에 item.username의 값을 표시 */}
        <Text>{item.username}의 쪽지</Text>

        {/* 중간 부분에 item.title의 값을 표시 */}
        <Text>{item.title}</Text>

        {/* 그 외 DMScreen의 내용을 추가할 수 있습니다. */}
      </View>
    </View>
  );
};
