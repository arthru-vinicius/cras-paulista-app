import { Ionicons } from '@expo/vector-icons';
import * as FileSystem from 'expo-file-system';
import * as ImagePicker from 'expo-image-picker';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import ImageViewer from '../../components/ImageViewer';

const PlaceholderImage = require('../../assets/images/images/profile/foto/empty.png');

const EditPhoto = () => {

  const router = useRouter();

  const [selectedImage, setSelectedImage] = useState<string | undefined>(undefined);

  useEffect(() => {
    const loadImage = async () => {
      try {
        const savedImagePath = await AsyncStorage.getItem('@user_profile_image');

        if (savedImagePath) {
          // Verifica se o arquivo ainda existe no sistema
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

  const pickImageAsync = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
    } else {
      alert('Você não selecionou nenhuma imagem.');
    }
  };

  const saveImage = async () => {
  if (!selectedImage) {
    alert('Nenhuma imagem selecionada!');
    return;
  }

  try {
    const fileName = selectedImage.split('/').pop();
    const isFromAppStorage = selectedImage.startsWith(FileSystem.documentDirectory || '');

    if (!FileSystem.documentDirectory) {
        console.error('Armazenamento não disponível');
        return;
    }

    const newPath = FileSystem.documentDirectory + fileName;

    if (!isFromAppStorage) {
      await FileSystem.copyAsync({
        from: selectedImage,
        to: newPath,
      });
    }

    await AsyncStorage.setItem('@user_profile_image', newPath);

    alert('Imagem salva com sucesso!');
    console.log('Imagem salva em:', newPath);
  } catch (error) {
    console.error('Erro ao salvar imagem:', error);
    alert('Erro ao salvar imagem');
  }
};


  return (
    <View className="flex-1 items-center w-full bg-fundo rounded-l-xl shadow-lg z-50">
      <View className="flex-row justify-between items-center w-full p-4 bg-white mb-4">
        <TouchableOpacity onPress={() => router.back()}>
                <Ionicons name="chevron-back-outline" size={28} color="#444444"/>
        </TouchableOpacity>
        <View className="flex-row justify-start items-center">
          <Text className="text-3xl font-extrabold ml-2">Editar foto</Text>
        </View>
        <TouchableOpacity
          className="flex-row items-center justify-center w-24 h-10 bg-primary rounded-md"
          onPress={saveImage}
        >
          <Text className="font-semibold text-white">Salvar</Text>
        </TouchableOpacity>
      </View>

      {/* Exibe a imagem salva ou a padrão */}
      <ImageViewer imgSource={PlaceholderImage} selectedImage={selectedImage} className='w-56 h-56'/>

      <TouchableOpacity
        className="flex-row items-center justify-start mt-8 w-72 h-14 bg-gray-300 pl-8 rounded-md"
        onPress={pickImageAsync}
      >
        <Ionicons name="image-outline" size={28} color="#444444" />
        <Text className="font-semibold ml-4">Escolha na galeria</Text>
      </TouchableOpacity>

      <TouchableOpacity className="flex-row items-center justify-start mt-4 w-72 h-14 bg-gray-300 pl-8 rounded-md">
        <Ionicons name="camera-outline" size={28} color="#444444" />
        <Text className="font-semibold ml-4">Tirar foto</Text>
      </TouchableOpacity>
    </View>
  );
};

export default EditPhoto;

const styles = StyleSheet.create({});
