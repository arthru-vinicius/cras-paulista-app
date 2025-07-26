import { Ionicons } from '@expo/vector-icons'
import { router } from 'expo-router'
import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'

const EditName = () => {
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
          onPress={() => console.log('a')}
        >
          <Text className="font-semibold text-white">Salvar</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default EditName

const styles = StyleSheet.create({})