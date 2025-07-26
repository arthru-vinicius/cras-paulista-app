import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Link } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';


const scheduling = () => {

    const [agendamentos, setAgendamentos] = useState('tab1');
    const [dados, setDados] = useState([]);

    async function getAppointments(){

         const accessToken = await AsyncStorage.getItem('accessToken');

        fetch( `https://cras-digital.fly.dev/api/v1/appointments/`,{
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
            setDados(data); 
            console.log('Dados recebidos:', dados);
        }).catch((err) => {
            
        });
    }

    function getCorPorStatus(status: string) {
        switch (status) {
      case 'pending':
        return '#FF8800';
      case 'confirmed':
        return '#10a51a';
      case 'completed':
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
        getAppointments();
    }, []);

  return (
    <View className='flex-1 bg-white justify-between items-center'>
            <View className='bg-white w-full justify-between items-center'>
                <Text className='w-80 text-center text-3xl font-bold text-black '>Agendamento</Text>
    
                <View className='w-full flex-row justify-evenly my-6'>
                    <TouchableOpacity onPress={() => setAgendamentos('tab1')}>
                        <Text className='text-lg'>Em Aberto</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setAgendamentos('tab2')}>
                        <Text className='text-lg'>Histórico</Text>
                    </TouchableOpacity>
                </View>
            </View>

            {agendamentos === 'tab1' ? (
                    <>
                    {dados.length === 0 ? (
                        <>
                            <Image source={require('../../assets/images/images/scheduling/scheduling.png')} />

                            <Text className=' text-center text-3xl font-bold text-black '> Sem agendamento ainda</Text> 

                            <Text style={{width: 250, textAlign: 'center' }}>Não existem agendamentos pendentes</Text>  
                        </>
                    ) : (
                        <FlatList   
                            data={dados}
                            keyExtractor={(item) => item.id}
                            className="bg-[#F3F5FD] w-full"
                            renderItem={({item}) => {

                            const cor = getCorPorStatus(item.status);

                            return item.status === 'pending' || item.status === 'confirmed' ? (
                                <View className='w-full flex-row bg-white justify-between p-4 h-32 mt-3'>
                                    <View className='w-auto'>
                                    <Text className='text-lg font-bold text-black'>{item.description}</Text>
                                    <Text>{item.professional}</Text>
                                    </View>

                                    <View>
                                    <View
                                        style={{ borderColor: cor }}
                                        className='items-center border w-40 rounded-xl'
                                    >
                                        <Text style={{ color: cor }} className='font-bold text-lg'>
                                        {item.status}
                                        </Text>
                                    </View>
                                    <Text className='mt-4 text-lg text-center'>{item.time}</Text>
                                    </View>
                                </View>
                            ) : (
                            <></>
                            );   
                        }}/> 
                    ) }                                              
                    </>
                ) : (
                    <>
                    {dados.length === 0 ? (
                        <>
                            <Image source={require('../../assets/images/images/scheduling/scheduling.png')} />

                            <Text className=' text-center text-3xl font-bold text-black '> Sem histórico ainda</Text> 

                            <Text style={{width: 250, textAlign: 'center' }}>Não existem histórico pendentes</Text>  
                        </>
                    ) : (
                       <FlatList
                            data={dados}
                            keyExtractor={(item) => item.id.toString()}
                            className="bg-[#F3F5FD] w-full"
                            renderItem={({ item }) => {
                                const cor = getCorPorStatus(item.status);

                                return item.status === 'completed' ? (
                                    <View className='w-full flex-row bg-white justify-between p-4 h-32 mt-3'>
                                        <View className='w-auto'>
                                        <Text className='text-lg font-bold text-black'>{item.description}</Text>
                                        <Text>{item.professional}</Text>
                                        </View>

                                        <View>
                                        <View
                                            style={{ borderColor: cor }}
                                            className='items-center border w-40 rounded-xl'
                                        >
                                            <Text style={{ color: cor }} className='font-bold text-lg'>
                                            {item.status}
                                            </Text>
                                        </View>
                                        <Text className='mt-4 text-lg text-center'>{item.time}</Text>
                                        </View>
                                    </View>
                                ) : (
                                <></>
                                );
                            }}
                            />

                    ) }                                              
                    </>
                )
            }
            
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

export default scheduling

const styles = StyleSheet.create({})