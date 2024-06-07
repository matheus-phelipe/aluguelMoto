import { View, Text, FlatList, Image, RefreshControl, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

import { images } from '../../constants'
import SearchInput from '../../components/SearchInput'
import Trending from '../../components/Trending'
import EmptyState from '../../components/EmptyState'
import { getAllComentarios, getAllMotos, getCurrentUser } from '../../lib/appwrite'
import useAppwrite from '../../lib/useAppwrite'
import MotoCard from '../../components/MotoCard'
import ComentariosCard from '../../components/ComentariosCard'

const Home = () => {
  const { data: motos, refetch} = useAppwrite(getAllMotos);
  const { data: comentarios} = useAppwrite(getAllComentarios);
  const { data: user, refetch1 } = useAppwrite(getCurrentUser);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    await refetch1();
    setRefreshing(false);
  }

  return (
    <SafeAreaView className="bg-primary h-full">
        <FlatList
          data={comentarios}
          keyExtractor={(item) => item.$id}
          renderItem={({ item }) => (
            <ComentariosCard 
            comentarios={item}
            />
          )}
          ListHeaderComponent={() => (
            <View className="my-6 px-4 space-y-6">
              <View className="justify-between items-start
              flex-row mb-6">
                <View>
                  <Text className="font-pmedium text-sm text-gray-100">
                    Bem-vindo de volta
                  </Text>
                  <Text 
                   className="text-2xl font-psemibold text-white"
                   numberOfLines={1}
                   ellipsizeMode="tail">
                  {user && user.username ? 
                      (user.username.length > 15 ? `${user.username.substring(0, 15)}...` : user.username) 
                       : ''}
                  </Text>
                </View>

                <View className="mt-1.5">
                  <Image 
                    source={images.logoSmall}
                    className="w-14 h-10"
                    resizeMode='contain'
                  />
                </View>
              </View>

              <SearchInput/>

             <View className="w-full flex-1 pt-5 pb-8">
                <Text className="text-gray-100 text-lg
                font-pregular mb-3">
                  Motos na sua região
                </Text>

                <Trending motos={ motos ?? []} />
             </View>
             <Text className="text-gray-100 text-lg
                font-pregular mb-3">
                  Comentários sobre a Mootour
                </Text>
            </View>
          )}

          ListEmptyComponent={() => (
            <EmptyState 
              title="Nenhuma moto encontrada"
              subtitle="Nenhuma moto encontrada na sua localidade, entre em contato com o suporte para mais informações."
            />
          )}
          refreshControl={<RefreshControl refreshing={refreshing}
           onRefresh={onRefresh}/>}
        />
    </SafeAreaView>
  )
}

export default Home