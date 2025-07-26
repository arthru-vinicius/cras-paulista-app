import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Link } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { FlatList, Image, StyleSheet, Text, View } from 'react-native';

const Notifications = () => {

    const [messages, setMessages] = useState([]);

    async function getMessages(){

        const accessToken = await AsyncStorage.getItem('accessToken');

        
        fetch('https://cras-digital.fly.dev/api/v1/services/',{
            method: 'GET',
            headers: {
                "Authorization": `Bearer ${accessToken}`,
                "Content-Type": "application/json"
            }
        })
        .then((response) => {
            if (!response.ok) {
                throw new Error('Erro na requisição');
            }
            return response.json();
        })
        .then(data =>{
            setMessages(data); 
            console.log('Dados recebidos:', messages);
        }).catch((err) => {
            console.log(err);
        });
    }
    
    function getCorPorStatus(status: string) {
        const cores = ['#FF8800', '#10a51a', '#E54545', '#7A5AF8', '#3C88EE', '#F97316', '#14B8A6'];
        const indice = Math.floor(Math.random() * cores.length);
        return cores[indice];
    }
    
    useEffect(() => {
        getMessages();
    }, []);
  return (
    <View className='flex-1 bg-white justify-between items-center'>
        <View className='bg-white h-16 w-full justify-between items-center'>
            <Text className='w-80 text-center text-3xl font-bold text-black '>Notificações</Text>
        </View>
        <View className='flex-1'>
            {messages.length === 0 ? (
                <View className='items-center'>
                        <Image source={require('../../assets/images/images/Notificacoes/sino.png')} />

                        <Text className=' text-center text-3xl font-bold text-black '> Sem notificações ainda</Text> 

                        <Text style={{width: 250, textAlign: 'center' }}>Você não tem nenhuma notificação no momento. Volte mais tarde.</Text>
                    </View>
                ) : (                   
                    <FlatList 
                        data={messages}
                        keyExtractor={(item) => item.id}
                        className="bg-[#F3F5FD] w-full"
                        renderItem={({item}) => {

                            const cor = getCorPorStatus(item.status);

                            return(
                                <View className=' w-full flex-row bg-white w-auto justify-between p-4 h-32 mt-3'>
                                    <View className='w-auto'>
                                        <Text className='text-lg font-bold text-black w-60 flex-wrap'>{item.name}</Text>
                                        <Text className='w-60 flex-wrap'>{item.description}</Text>
                                    </View>
                
                                    <View>
                                        <View 
                                            style={{backgroundColor: cor}}
                                            className='items-center w-12 h-12 rounded-lg items-center justify-center'>
                                                <Ionicons name="alert-circle-outline" size={32} color="#ffffff" weight="regular" />
                                        </View>
                                    </View>
                                </View>
                            )
                         }
                        }/>
                )
            }

        </View>
            
        <View className='bg-white h-14 flex-row justify-around items-center w-full'>
            <Link href="/dashboard" >
                <View className='flex-col justify-around items-center'>
                    <Ionicons name="home-outline" size={32} color="#676767" weight="regular" />
                    <Text>Início</Text>
                </View>
            </Link>
            <Link href="/(bottomtabs)/scheduling" >
                <View className='flex-col justify-around items-center'>
                    <Ionicons name="newspaper-outline" size={32} color="#676767" weight="regular" />
                    <Text>Agendamento</Text>
                </View>
            </Link>
                <Link href="/(bottomtabs)/actions" >
                <View className='flex-col justify-around items-center'>
                    <Ionicons name="gift-outline" size={32} color="#676767" weight="regular" />
                    <Text>Ações</Text>
                </View>
            </Link>
            <Link href="/(bottomtabs)/notifications" >
                <View className='flex-col justify-around items-center'>
                    <Ionicons name="notifications-outline" size={32} color="#676767" weight="regular" />
                    <Text>Notificações</Text>
                </View>
            </Link>
        </View>
    </View>
  )
}

export default Notifications

const styles = StyleSheet.create({})