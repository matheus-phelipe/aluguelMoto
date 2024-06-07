import { View, Text, Image, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { icons } from '../constants'
import { router } from 'expo-router'
import CustomButton from './CustomButton'

const MotoCard = ({moto: {marca, modelo, thumbnail, preco}}) => {  
  return (
    <View className="flex-col items-center px-4 mb-14">
      <View className= "flex-row gap-3 items-start">
        <View className="justify-center items-center flex-row flex-1">
            <View className="justify-center flex-1 ml-3 gap-y-1">
                <Text className="text-sm text-white font-psemibold" 
                numberOfLines={1}>R$ {preco},00 
                </Text>
                <Text className="text-sm text-white font-psemibold" 
                numberOfLines={1}>{modelo}</Text>
                <Text className="text-xs text-gray-100 font-pregular" 
                numberOfLines={1}>{marca}</Text>
            </View>
        </View>

        <View className="pt-2">
            <Image source={icons.menu} className="w-5 
            h-5"
            resizeMode='contain' />
        </View>
      </View>

       <TouchableOpacity
        activeOpacity={0.7}
        onPress={() => router.push('/bookmark')}
        className="w-full h-60 rounded-xl mt-3
        relative justify-center items-center"
        
       >
        <Image source={{uri: thumbnail}} className="w-full 
        h-full rounded-xl mt-3"
        resizeMode="cover" 
        />

        <Image 
            source={icons.plus}
            className="w-12 h-12 absolute"
            resizeMode='contain'
        />

       </TouchableOpacity> 

    </View>
  )
}

export default MotoCard