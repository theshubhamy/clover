import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import React, {useRef} from 'react';
import Swiper from 'react-native-deck-swiper';
import Icon from 'react-native-vector-icons/Ionicons';

import {userSwipeProfiles} from '../services/userService';
import {useAuth} from '../context/AuthContext';
const SwiperCard = ({data}) => {
  const {user} = useAuth();

  const swipeRef = useRef();

  const swipeLeft = cardIndex => {
    if (!data[cardIndex]) {
      return;
    }
    const userswiped = data[cardIndex];
    userSwipeProfiles('passes', user.uid, userswiped);
  };
  const swipeRight = cardIndex => {
    if (!data[cardIndex]) {
      return;
    }
    const userswiped = data[cardIndex];
    userSwipeProfiles('likes', user.uid, userswiped);
  };

  return (
    <>
      <View className="flex-1 -mt-8 ">
        <Swiper
          ref={swipeRef}
          cards={data}
          containerStyle={styles.cardContainer}
          stackSize={10}
          cardIndex={0}
          verticalSwipe={false}
          animateCardOpacity
          onSwipedLeft={cardIndex => swipeLeft(cardIndex)}
          onSwipedRight={cardIndex => swipeRight(cardIndex)}
          overlayLabels={{
            left: {
              element: <Icon name="close-circle" size={66} color={'#2C272C'} />,
              title: 'NOPE',
              style: {
                label: {
                  backgroundColor: 'black',
                  borderColor: 'black',
                  color: 'white',
                  borderWidth: 1,
                },
                wrapper: {
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                },
              },
            },
            right: {
              element: <Icon name="heart" size={66} color={'#ff3a8e'} />,
              title: 'MATCH',
              style: {
                label: {
                  backgroundColor: 'black',
                  borderColor: 'black',
                  color: 'white',
                  borderWidth: 1,
                },
                wrapper: {
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                },
              },
            },
          }}
          renderCard={card => (
            <View
              key={card?.id}
              className="relative bg-secondary h-2/3 rounded-xl  ">
              <Image
                source={require('../assets/user.png')}
                className=" absolute top-0 h-full w-full rounded-xl"
              />
              <View
                className=" absolute bottom-0 bg-whitegray w-full h-20 flex-row justify-between items-center px-6 py-2 rounded-b-xl"
                style={styles.cardShadow}>
                <View>
                  <Text className="text-xl font-bold">{card.name}</Text>
                  <Text>{card.phone}</Text>
                </View>
                <Text>{card.age || '21'}</Text>
              </View>
            </View>
          )}
        />
      </View>
      <View className="flex justify-evenly flex-row py-6">
        <TouchableOpacity onPress={() => swipeRef?.current.swipeLeft()}>
          <Icon name="close-circle" size={66} color={'#2C272C'} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => swipeRef?.current.swipeRight()}>
          <Icon name="heart" size={66} color={'#ff3a8e'} />
        </TouchableOpacity>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: 'transparent',
  },
  cardBackground: {
    backgroundColor: '#fff', // Or any other solid color
  },
  cardShadow: {
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
});
export default SwiperCard;
