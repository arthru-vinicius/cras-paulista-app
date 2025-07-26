import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

const EditPhoto = () => {

  const router = useRouter();

  const [inputEmail, setInput] = useState('');

  const STORAGE_KEY = '@usuario_email';

    useEffect(() => {
    const loadData = async () => {
        try {
        const value = await AsyncStorage.getItem(STORAGE_KEY);
        if (value !== null) {
            setInput(value);
        }
        } catch (error) {
          const erro = 'Erro ao carregar:' + error;
          alert(erro);
        }
    };
    loadData();
    }, []);


  const isValidEmail = (email: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const saveData = async () => {
    if (!isValidEmail(inputEmail)) {
      alert('Digite um e-mail válido.');
      return;
    }

    try {
      await AsyncStorage.setItem(STORAGE_KEY, inputEmail);
      setEmail(inputEmail);
    } catch (error) {
      console.error('Erro ao salvar:', error);
    }
  };

  async function setEmail(inputEmail : any) {

      const accessToken = await AsyncStorage.getItem('accessToken');
      const user_id = await AsyncStorage.getItem('id');

      fetch(`https://cras-digital.fly.dev/api/v1/users/${user_id}/`, {
      method: 'PATCH',
      headers: {
        "Authorization": `Bearer ${accessToken}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        "email": inputEmail
      })
    })
      .then(response => response.json())
      .then(data => {
        console.log("Resposta da API:", data);
      })
      .catch(error => {
        console.error("Erro ao criar usuário:", error);
      });
  }

  return (
    <View className="flex-1 items-center w-full bg-fundo rounded-l-xl shadow-lg z-50">
      <View className="flex-row justify-between items-center w-full p-4 bg-white mb-4">
        <TouchableOpacity onPress={() => router.back()}>
                <Ionicons name="chevron-back-outline" size={28} color="#444444"/>
        </TouchableOpacity>
        <View className="flex-row justify-start items-center">
          <Text className="text-3xl font-extrabold ml-2">Editar Email</Text>
        </View>
        <TouchableOpacity
          className="flex-row items-center justify-center w-24 h-10 bg-primary rounded-md"
          onPress={saveData}
        >
          <Text className="font-semibold text-white">Salvar</Text>
        </TouchableOpacity>
      </View>

      <TextInput className=' w-11/12 mt-8 border-gray-400 border-b-2'
        value={inputEmail}
        onChangeText={setInput}></TextInput>
    </View>
  );
};

export default EditPhoto;

const styles = StyleSheet.create({});
