import { Ionicons } from '@expo/vector-icons';
import { Link, router, useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';




import AsyncStorage from '@react-native-async-storage/async-storage';
import * as FileSystem from 'expo-file-system';

const PlaceholderImage = require('../../assets/images/images/profile/foto/empty.png');

const Agendar = () => {

    const [selectedImage, setSelectedImage] = useState<string | undefined>(undefined);

    const { item, imagemAleatoria } = useLocalSearchParams();

    const acao = item ? JSON.parse(item as string) : null;
    const imagem = imagemAleatoria ? JSON.parse(imagemAleatoria as string) : null;


    useEffect(() => {


    console.log('Ação selecionada:', acao);

    const loadImage = async () => {
      try {
        const savedImagePath = await AsyncStorage.getItem('@user_profile_image');

        if (savedImagePath) {
          const fileInfo = await FileSystem.getInfoAsync(savedImagePath);
          if (fileInfo.exists) {
            setSelectedImage(savedImagePath);
          } else {
            console.warn('Imagem salva não encontrada, usando placeholder');
          }
        }
      } catch (err) {
        console.error('Erro ao carregar imagem salva:', err);
      }
    };

    loadImage();
  }, []);


  return (
     <View className="flex-1 w-full bg-fundo rounded-l-xl shadow-lg z-50">
            <View className='flex-row justify-start items-center p-4 bg-white mb-4'>
                <Ionicons name="chevron-back-outline" size={28} color="#444444" weight="regular" onPress={()=> router.back()}/>
                <Text className='text-3xl font-extrabold ml-2'>Selecione localização</Text>     
            </View>        
            <View className="ml-8 flex-row items-center border-gray-300 border-b w-10/12">
                <Ionicons name="location-outline" size={28} color="#444444" />
                <TextInput
                    className="flex-1 ml-3 py-2 text-2xl text-white"
                    placeholder="Insira o endereço"
                    placeholderTextColor="#888"
                />
            </View>
            

            <Link href="/locationMaps" asChild>
                <TouchableOpacity className='flex-row w-10/12 h-14 ml-8  rounded-md items-center'>
                    <Ionicons name="map-outline" size={28} color="#2F80ED" weight="regular" />
                    <Text className="text-2xl ml-4"style={{color: '#2F80ED'}}>
                            Escolha no Mapa
                    </Text>
                </TouchableOpacity>
            </Link>
    </View>
  )
}

export default Agendar

const styles = StyleSheet.create({})