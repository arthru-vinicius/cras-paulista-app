import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Link } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { FlatList, Image, StyleSheet, Text, View } from 'react-native';


const Actions = () => {

    const [acoes, setAcoes] = useState([]);

    async function getServices(){

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
            setAcoes(data); 
            console.log('Dados recebidos:', acoes);
        }).catch((err) => {
            
        });
    }
    
    function getCorPorStatus(status: string) {
    switch (status) {
        case 'pending':
        return '#FF8800';
        case 'confirmed':
        return '#10a51a';
        case 'Finalizado':
        return '#10a51a';
        case 'cancelled':
        return '#E54545';
        case 'Retorno':
        return '#7A5AF8';
        case 'completed ':
        return '#3C88EE';
        default:
        return '#000000';
    }
    }
    
    useEffect(() => {
        getServices();
    }, []);

   return (
    <View className='flex-1 justify-between items-center'>
        <View className='bg-white h-16 w-full justify-between items-center'>
            <Text className='w-80 text-center text-3xl font-bold text-black '>Ações</Text>
        </View>
            <View className='flex-1 px-4'>
                {acoes.length === 0 ? (
                    <View className='flex-1 justify-center items-center'>
                        <Image source={require('../../assets/images/images/scheduling/scheduling.png')} />

                        <Text className=' text-center text-3xl font-bold text-black '>Não existem ações ainda</Text> 

                        <Text style={{width: 400, textAlign: 'center' }}> Sem ações ativas no momento.Volte mais tarde.</Text>

                    </View>
                ) : (
                    <FlatList   
                        data={acoes}
                        keyExtractor={(item) => item.id}
                        className="bg-[#F3F5FD] w-full"
                        renderItem={({item}) => {

                        const cor = getCorPorStatus(item.status);

                        return (
                            <View className=' w-full flex-row bg-white w-auto justify-between p-4 h-32 mt-3'>
                                <View className='w-auto'>
                                    <Text className='text-lg font-bold text-black w-60 flex-wrap'>{item.name}</Text>
                                    <Text className='w-60 flex-wrap'>{item.description}</Text>
                                </View>
            
                                <View>
                                    <View 
                                        style={{borderColor: cor}}
                                        className='items-center border w-40 rounded-xl'>
                                        <Text 
                                            style={{color: cor}}
                                            className='font-bold text-lg'>{item.status}</Text>
                                    </View>
                                    <Text className='mt-4 text-lg text-center'>{item.time}</Text>
                                </View>
                            </View>
                        )      
                    }}/>
                )}                                              
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
     );
}


export default Actions

const styles = StyleSheet.create({})