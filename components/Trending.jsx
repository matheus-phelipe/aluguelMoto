import { View, Text, FlatList, TouchableOpacity, ImageBackground, Image } from 'react-native'
import React, { useState } from 'react'
import  * as Animatable from 'react-native-animatable';
import { icons } from '../constants';
import { router } from 'expo-router';

const zoomIn = {
  0: {
    scale: 0.9
  },
  1: {
    scale: 1.1,
  }
}

const zoomOut = {
  0: {
    scale: 1.1
  },
  1: {
    scale: 0.9,
  }
}


const TrendingItem = ({ activeItem, item}) => {
  return (
    <Animatable.View
      className="mr-5"
      animation={activeItem == item.$id ? zoomIn : zoomOut}
      duration={500}
    >

      <TouchableOpacity
        className="relative justify-center items-center" 
        activeOpacity={0.7}
        onPress={() => router.push('/bookmark')} 
      >
        <Text className="text-white">
          {item.modelo}
        </Text>

        <ImageBackground
          source={{uri: item.thumbnail}}
          className="w-52 h-72 rounded-[35px] my-5
          overflow-hidden shadow-lg shadow-black"
          resizeMode='cover'
        />

        <Image
          source={ icons.plus }
          className="w-12 h-12 absolute"
          resizeMode='contain'
        />

      </TouchableOpacity>
    </Animatable.View>
  )
}

const Trending = ({ motos }) => {
  const [activeItem, setActiveItem] = useState(motos[0]);

  const viewableItemsChanged = ({ viewableItems}) => {
    if(viewableItems.length > 0) {
      setActiveItem(viewableItems[0].key)
    }
  }
  return (
    <FlatList 
        data={motos}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => (
          <TrendingItem
            activeItem={activeItem} 
            item={item}
          />
        )}
        onViewableItemsChanged={viewableItemsChanged}
        viewabilityConfig={{
          itemVisiblePercentThreshold: 70
        }}
        contentOffset={{x:170}}
        horizontal
    />
  )
}

export default Trending