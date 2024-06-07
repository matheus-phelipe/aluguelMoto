import { View, Text, Image, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { icons } from '../constants'
import { router } from 'expo-router'

const ComentariosCard = ({comentarios: {title, descricao, fotoMoto, createdId, creator: {username, avatar}}}) => {  
  return (
    <View className="flex flex-col  px-4 mb-14 mt-3">
      <View className="flex flex-row gap-3 items-start border-b border-black-200 pb-2 mb-10">
        <View className="flex justify-center items-center flex-row flex-1">
          <View className="w-[46px] h-[46px] rounded-lg border border-secondary flex justify-center items-center p-0.5">
            <Image
              source={{ uri: avatar }}
              className="w-full h-full rounded-lg"
              resizeMode="cover"
            />
          </View>

          <View className="flex justify-center flex-1 ml-3 gap-y-1">
          <Text
              className="text-xs text-gray-100 font-pregular"
              numberOfLines={1}
            >
              {username}
            </Text>
            <Text
              className="font-psemibold text-sm text-white"
              numberOfLines={1}
            >
              {title}
            </Text>
          </View>
        </View>

        <View className="pt-2">
          <Image source={icons.menu} className="w-5 h-5" resizeMode="contain" />
        </View>
      </View>

       <TouchableOpacity
        activeOpacity={0.7}
        onPress={() => router.push('/bookmark')}
        className="w-full h-60 rounded-xl mt-3
        relative justify-center"
        
       >
        <Text
         className="font-psemibold text-sm text-white"
        >
         {descricao}
        </Text>
        <Image source={{uri: fotoMoto}} className="w-full 
        h-full rounded-xl mt-3"
        resizeMode="cover" 
        />

       </TouchableOpacity> 

    </View>
  )
}

export default ComentariosCard