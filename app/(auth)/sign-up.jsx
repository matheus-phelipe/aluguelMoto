import { View, Text, ScrollView, Image, Alert } from 'react-native'
import { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import {Link, router} from 'expo-router';

import { images } from '../../constants';
import FormField from '../../components/FormField';
import CustomButton from '../../components/CustomButton';
import { createUser } from '../../lib/appwrite';

const SingUp = () => {
  const [isSubmitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });

  const submit = async () => {
    if (form.username === "" || form.email === "" || form.password === "") {
      Alert.alert("Error", "Preencha todos os campos!");
    }

    setSubmitting(true);
    try {
      const result = await createUser(form.email, form.password, form.username);

      router.replace("/home");
    } catch (error) {
      Alert.alert("Error", error.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView>
        <View className="w-full justify-center 
        min-h-[85vh] px-4 my-6">
          <Image
            source={images.logo}
            className="w-[135px] h-[55px]"
            resizeMode="contain"
           />

          <Text className="text-2xl text-white text-semibold
          mt-3 font-psemibold"> Cadastre-se no Mootour</Text>


          <FormField
            title="Nome completo"
            value={form.username}
            handleChangeText={(e) => setForm({ ...form,
              username: e})}
            otherStyles="mt-10"
          />

          <FormField
            title="Email"
            value={form.email}
            handleChangeText={(e) => setForm({ ...form,
              email: e})}
            otherStyles="mt-7"
            keyboardType="email-address"
          />

          <FormField
            title="Senha"
            value={form.password}
            handleChangeText={(e) => setForm({ ...form,
              password: e})}
            otherStyles="mt-7"
          />

          <CustomButton
            title="Cadastrar"
            handlePress={submit}
            containerStyles="mt-7"
            isLoading={isSubmitting}
          />

          <View className="justify-center pt-5 flex-row gap-2">
              <Text className="text-lg text-gray-100 font-pregular">
                Já possui uma conta? 
              </Text>
              <Link href="/sign-in" className="text-lg font-psemibold text-secondary">Faça o login</Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default SingUp