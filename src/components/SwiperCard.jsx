import {View, Text, StyleSheet, Image} from 'react-native';
import React from 'react';
import Swiper from 'react-native-deck-swiper';
const SwiperCard = ({data}) => {
  return (
    <Swiper
      cards={data}
      containerStyle={styles.cardContainer}
      stackSize={5}
      cardIndex={0}
      verticalSwipe={false}
      animateCardOpacity
      renderCard={card => (
        <View
          key={card?.id}
          className=" relative bg-secondary h-3/4 rounded-xl  ">
          <Image
            source={require('../assets/user.png')}
            className=" absolute top-0 h-full w-full rounded-xl"
          />
          <View className=" absolute bottom-0 bg-white w-full h-20 flex-row justify-between items-center px-6 py-2 rounded-b-xl">
            <View>
              <Text className="text-xl font-bold">{card.name}</Text>
              <Text>{card.phone}</Text>
            </View>
            <Text>{card.age || '21'}</Text>
          </View>
        </View>
      )}
    />
  );
};

//  yt video time 2:38:22
const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: 'transparent',
  },
});
export default SwiperCard;
