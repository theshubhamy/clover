import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import React, {useRef, useState, useEffect} from 'react';
import Swiper from 'react-native-deck-swiper';
import Icon from 'react-native-vector-icons/Ionicons';

import {userSwipeProfiles} from '../services/userService';
import {useAuth} from '../context/AuthContext';

const SwiperCard = ({
  data,
  navigateToPreferences,
  handleRefresh,
  isLoading,
}) => {
  const {user} = useAuth();
  const swipeRef = useRef();
  const [cardsExhausted, setCardsExhausted] = useState(false);
  useEffect(() => {
    if (data?.length === 0) {
      setCardsExhausted(true);
    } else if (data?.length > 0) {
      setCardsExhausted(false);
    }
  }, [data]);
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
  if (isLoading) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text>Loading...</Text>
      </View>
    );
  }
  return (
    <>
      {cardsExhausted ? (
        <View className="flex-1 ">
          <View className="flex-1 p-4 bg-white">
            <View className="flex-1 mt-24 justify-center items-center gap-4">
              <Icon name="sad" size={80} color={'#2C272C'} />
              <Text className="text-3xl font-bold text-paper">
                No new profiles
              </Text>
              <Text className="text-lg text-center px-4 text-paper">
                Change your preferences to expand your search and see New
                Profiles
              </Text>
            </View>

            <View className="flex-1 justify-end my-4 bg-white">
              <View className="flex-column justify-between items-center gap-8">
                <TouchableOpacity
                  className="px-4 py-3 bg-primary rounded-full w-full"
                  style={styles.cardShadow}
                  onPress={navigateToPreferences}>
                  <Text className="text-white text-center text-lg font-medium">
                    Change my preferences
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  className="px-4 py-3 bg-secondary rounded-full w-full"
                  style={styles.cardShadow}
                  onPress={handleRefresh}>
                  <Text className="text-primary text-center text-lg font-medium">
                    Refresh
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      ) : (
        <>
          <View className="flex-1 -mt-8">
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
              onSwipedAll={() => setCardsExhausted(true)}
              overlayLabels={{
                left: {
                  element: (
                    <Icon name="close-circle" size={66} color={'#2C272C'} />
                  ),
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
                  className="relative bg-secondary h-2/3 rounded-xl">
                  <Image
                    source={require('../assets/user.png')}
                    className="absolute top-0 h-full w-full rounded-xl"
                  />
                  <View
                    className="absolute bottom-0 bg-whitegray w-full h-20 flex-row justify-between items-center px-6 py-2 rounded-b-xl"
                    style={styles.cardShadow}>
                    <View>
                      <Text className="text-xl font-bold">{card?.name}</Text>
                      <Text>{card?.phone}</Text>
                    </View>
                    <Text>{card?.age}</Text>
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
      )}
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
