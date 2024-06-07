import { StatusBar } from 'expo-status-bar';
import { Redirect, router} from 'expo-router';
import { ScrollView, Text, View, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {images} from '../constants';
import CustomButton from '../components/CustomButton';

import { useGlobalContext } from "../context/GlobalProvider";

export default function App() {
  const { loading, isLogged } = useGlobalContext();

  if (!loading && isLogged) return <Redirect href="/home" />;
  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView contentContainerStyle={{height : '100%'}}>
        <View className="w-full justify-center items-center
        min-h-[85vh] px-4">
           <Image
            source={images.logo}
            className="w-[230px] h-[84px]"
            resizeMode="contain"
           />

          <Image
            source={images.cardsMoto}
            className="max-w--[380px] w-full h-[300px]"
            resizeMode="contain"
           />

           <View className="relative mt-5">
            <Text className="text-3xl text-white 
            font-bold text-center">Descubra a liberdade
            sobre duas rodas com a{' '}<Text className="text-secondary-200">Mootour</Text>
            </Text>

            <Image
              source={images.path}
              className="w-[136px] h-[15px] absolute-bottom-2
              -right-12"
              resizeMode="contain"
            />
           </View>

           <Text className="text-sm font-pregular text-gray-100 mt-7 text-center">
           Viva Cada Momento ao Máximo: Mootour, sua Companhia em Todas as Jornadas!
          </Text>

          <CustomButton 
            title="Continue com o Email"
            handlePress={() => router.push('/sign-in')}
            containerStyles="w-full mt-7"
          />
        </View>
      </ScrollView>

      <StatusBar backgroundColor='#161622'
       style='light'/>
    </SafeAreaView>
  );
}