import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  Alert,
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';

const Login = () => {
  const router = useRouter();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  async function logar() {
    try {
      const response = await fetch('https://cras-digital.fly.dev/api/v1/authentication/token/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        Alert.alert('Erro', 'Usuário ou senha inválidos');
        return;
      }

      await AsyncStorage.setItem('accessToken', data.access);
      await AsyncStorage.setItem('refreshToken', data.refresh);
      await AsyncStorage.setItem('id', data.user_id.toString());


      console.log('accessToken : ' + data.access);
      console.log('refreshToken : ' + data.refresh);
      console.log('id : ' + data.user_id);

      router.push('/welcome');
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível conectar');
      console.error(error);
    }
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View className='flex-1 bg-primary'>
          <ScrollView
            contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', alignItems: 'center' }}
            keyboardShouldPersistTaps="handled"
          >
            <Image source={require('../assets/images/images/Home/logo.png')} />
            <Text style={{ fontSize: 32, fontWeight: 'bold', color: '#fff', marginVertical: 16, textAlign: 'center' }}>
              CRAS Paulista
            </Text>

            <View style={{ width: '90%', marginBottom: 40 }}>
              <TextInput
                style={{
                  borderBottomWidth: 1,
                  borderBottomColor: '#fff',
                  color: '#fff',
                  marginBottom: 24,
                  paddingVertical: 8,
                }}
                placeholder="Usuário"
                placeholderTextColor="#fff"
                onChangeText={setUsername}
                value={username}
              />
              <TextInput
                style={{
                  borderBottomWidth: 1,
                  borderBottomColor: '#fff',
                  color: '#fff',
                  marginBottom: 24,
                  paddingVertical: 8,
                }}
                placeholder="Senha"
                placeholderTextColor="#fff"
                secureTextEntry
                onChangeText={setPassword}
                value={password}
              />
            </View>

            <TouchableOpacity
              style={{
                backgroundColor: '#fff',
                borderRadius: 30,
                paddingVertical: 12,
                paddingHorizontal: 48,
                alignItems: 'center',
              }}
              onPress={logar}
            >
              <Text className='text-2xl font-bold text-primary'>Entrar</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default Login;
