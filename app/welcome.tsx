import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { Link } from 'expo-router';

const welcome = () => {
  return (
        <View className='flex-1 justify-evenly items-center'>
            <Text className='w-60 text-center text-4xl font-bold text-black ' >Seu CRAS na sua Mão</Text>

            <Text className='w-60 text-center'>Todos os serviços do CRAS de Paulista na palma da sua mão</Text>

            <Image source={require('../assets/images/images/Welcome/welcomepng.png')}/>
        
            <Link href="/choose" asChild>
                <TouchableOpacity className='w-80 h-14 bg-primary rounded-md justify-center items-center'>
                    <Text className='text-xl font-bold text-white '>
                            Começar
                    </Text>
                </TouchableOpacity>
            </Link>
        </View>
  )
}

export default welcome

const styles = StyleSheet.create({})
