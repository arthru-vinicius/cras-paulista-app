import { Ionicons } from '@expo/vector-icons';
import { Link, router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import * as FileSystem from 'expo-file-system';
import ImageViewer from '../../components/ImageViewer';

import { useFocusEffect } from '@react-navigation/native';


const PlaceholderImage = require('../../assets/images/images/profile/foto/empty.png');

const Profile = () => {

    const [selectedImage, setSelectedImage] = useState<string | undefined>(undefined);
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [Phone, setPhone] = useState('');

    

    useEffect(() => {
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


    useFocusEffect(
    React.useCallback(() => {
        const loadData = async () => {
        try {
            const storedNome = await AsyncStorage.getItem('@usuario_nome');
            const storedEmail = await AsyncStorage.getItem('@usuario_email');
            const storedPhone = await AsyncStorage.getItem('@my_phone');

            if (storedNome) setNome(storedNome);
            if (storedEmail) setEmail(storedEmail);
            if (storedPhone) setPhone(storedPhone);

        } catch (err) {
            console.error('Erro ao carregar nome/email:', err);
        }
        };

        loadData();
    }, [])
    );



  return (
     <View className="flex-1 w-full bg-fundo rounded-l-xl shadow-lg z-50">
            <View className='flex-row justify-start items-center p-4 bg-white mb-4'>
                <Ionicons name="chevron-back-outline" size={28} color="#444444" weight="regular" onPress={()=> router.back()}/>
                <Text className='text-3xl font-extrabold ml-2'>Meu perfil</Text>     
            </View>
            <Link href="/(profile)/editPhoto" className='mb-2'>
                <View className='flex-row h-18 p-4 bg-white items-center'>
                    <View className='flex-row w-11/12 justify-between items-center'>
                        <Text className='text-xl ml-4 font-bold'>Foto do Perfil</Text>  
                        <ImageViewer imgSource={PlaceholderImage} selectedImage={selectedImage} className='h-20 w-20'/>
                    </View>
                    <Ionicons  name="chevron-forward-outline" size={28} color="#676767" weight="regular"></Ionicons>  
                </View>   
            </Link>                  
            <Link href="/(profile)/editNome" className='mb-2'>
                <View className='flex-row h-16 p-4 bg-white items-center mb-2'>
                    <View className='flex-row justify-between w-11/12'>
                        <Text className='text-xl ml-4 font-bold'>Nome</Text>  
                        <Text className='text-md ml-4'>{nome}</Text>
                    </View>
                    <Ionicons className="self-end" name="chevron-forward-outline" size={28} color="#676767" weight="regular"></Ionicons>  
                </View>   
            </Link>                  
            <Link href="/(profile)/editEmail" className='mb-2'>
                <View className='flex-row h-16 p-4 bg-white items-center mb-2'>
                    <View className='flex-row  justify-between w-11/12'>
                        <Text className='text-xl ml-4 font-bold'>Email</Text>  
                        <Text className='text-md ml-4'>{email}</Text>  
                    </View>
                    <Ionicons className="self-end" name="chevron-forward-outline" size={28} color="#676767" weight="regular"></Ionicons>  
                </View>   
            </Link>                                               
    </View>
  )
}

export default Profile

const styles = StyleSheet.create({})