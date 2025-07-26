import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { Link } from "expo-router";

const choose = () => {
  return (
        <View className='flex-1 justify-evenly items-center'>

            <Image source={require('../assets/images/images/Welcome/welcomepng.png')}/>

            <Text className='w-80 text-center text-3xl font-bold text-black ' >Escolha um serviço</Text>

            <Text className='w-96 text-xl text-center'>Encontre o serviço que necessita de atendimento facilmente, com uma variedade de opções disponíveis ao seu alcance.</Text>
        <View className='w-full flex-row justify-around'>
             <Link href="/(drawer)/dashboard" asChild>
                <TouchableOpacity className=' justify-center items-center'>
                    <Text className='text-xl font-bold text-primary '>
                            Pular
                    </Text>
                </TouchableOpacity>
            </Link>

            <Link href="/(drawer)/dashboard" asChild>
                <TouchableOpacity className='w-44 h-14 bg-primary rounded-md justify-center items-center'>
                    <Text className='text-xl font-bold text-white '>
                            Começar
                    </Text>
                </TouchableOpacity>
            </Link>
        </View>
           
        </View>
  )
}

export default choose

const styles = StyleSheet.create({})