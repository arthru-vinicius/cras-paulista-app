import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Link } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { FlatList, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

const Dashboard = () => {

    const [acoes, setAcoes] = useState([]);
    const [toggleBar, setToggleBar] = useState(false);

    async function getServices(){
        const accessToken = await AsyncStorage.getItem('accessToken');

        fetch(`https://cras-digital.fly.dev/api/v1/services/`,{
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
            
            acoes.forEach((acao)=>{
                console.log('Dados recebidos:', acao);
            });

        }).catch((err) => {
            
        });
    }

    useEffect(() => {
        getServices();
    }, []);

    const imagens = [
        require('../../assets/images/images/SquareIcons/foto1.png'),
        require('../../assets/images/images/SquareIcons/foto2.png'),
        require('../../assets/images/images/SquareIcons/foto3.png'),
    ];

  return (
    <View className='flex-1 bg-fundo'>
        <View className='h-40 flex-row bg-primary items-center justify-between px-4'>
            <View className='flex-row '>
                <Image source={require('../../assets/images/images/Home/logo.png')} className='w-20 h-20'/>

                <Text className='text-4xl font-bold text-white w-40 mx-1'>CRAS Paulista</Text>
            </View>

            <TouchableOpacity className='w-10' onPress={() => setToggleBar(prev => !prev)}>
                <Ionicons name="menu" size={32} color="#fff" weight="regular" />
            </TouchableOpacity>

        </View>

            {toggleBar && (
                <View className="absolute top-0 bottom-0 right-0 w-full bg-fundo rounded-l-xl shadow-lg z-50">
                    <View className='flex-row justify-between p-4 bg-white mb-4'>
                         <Text className='text-3xl font-extrabold'>CRAS Paulista</Text>
                        <Ionicons name="close-outline" size={28} color="#676767" weight="regular" onPress={() => setToggleBar(prev => !prev)}/>
                    </View>
                    <Link href="/(profile)/profile" className='flex-row h-23 p-4 bg-white items-center mb-2'>
                        <View className='flex-row bg-white items-center'>
                            <View className='flex-row w-11/12'>
                                <Ionicons name="person-outline" size={28} color="#676767" weight="regular" onPress={() => setToggleBar(prev => !prev)}/>
                                <Text className='text-xl ml-4'>Meu perfil</Text>  
                            </View>
                            <Ionicons className="self-end" name="chevron-forward-outline" size={28} color="#676767" weight="regular"/>                      
                        </View>   
                    </Link>
                    <Link href="/(profile)/contactUs" className='flex-row h-23 p-4 bg-white items-center mb-2'>
                    <View className='flex-row bg-white items-center'>
                        <View className='flex-row w-11/12'>
                            <Ionicons name="people-outline" size={28} color="#676767" weight="regular" />
                            <Text className='text-xl ml-4'>Fale conosco</Text>  
                        </View>
                        <Ionicons className="self-end" name="chevron-forward-outline" size={28} color="#676767" weight="regular" />                      
                    </View>  
                    </Link>

                    <View className='flex-row h-23 p-4 bg-white items-center mb-2'>
                        <View className='flex-row w-11/12'>
                            <Ionicons name="share-social-outline" size={28} color="#676767" weight="regular" />
                            <Text className='text-xl ml-4'>Compartilhe</Text>  
                        </View>
                        <Ionicons className="self-end" name="chevron-forward-outline" size={28} color="#676767" weight="regular" />                      
                    </View>  
                    <View className='flex-row h-23 p-4 bg-white items-center mb-2'>
                        <View className='flex-row w-11/12'>
                            <Ionicons name="log-out-outline" size={28} color="#676767" weight="regular" />
                            <Text className='text-xl ml-4'>Sair</Text>  
                        </View>
                        <Ionicons className="self-end" name="chevron-forward-outline" size={28} color="#676767" weight="regular" />                      
                    </View>                  
                </View>
            )}  

            <View className='bg-white w-11/12 h-14 px-2 flex-row items-center self-center my-[-4%] rounded-md'>
                <Ionicons name="search" size={28} color="#676767" weight="regular" />
                <TextInput className='text-gray-600 text-xl w-10/12 rounded-md'/>
            </View> 

            <View className='my-10 flex-1'>
                <Text className='w-80 text-start text-3xl px-4 font-bold text-black '> Serviços </Text>
                {acoes.length === 0 ?(
                    <>
                        <Text>Sem ações no momento</Text>
                    </>
                    ):(
                        <FlatList 
                            data={acoes}
                            keyExtractor={(item) => item.id}
                            numColumns={3} 
                            className="bg-[#F3F5FD] w-full px-6"
                            renderItem={({item}) => {

                                const imagemAleatoria = imagens[Math.floor(Math.random() * imagens.length)];

                                    return (
                                        <Link
                                            className="my-4 mx-2"
                                            href={{
                                                pathname: '/scheduleAppointemt',
                                                params: { item: JSON.stringify(item), imagemAleatoria : imagemAleatoria }
                                            }}
                                            asChild
                                            >
                                            <TouchableOpacity className="bg-white w-32 h-32 items-center justify-center rounded-md">
                                                <Image source={imagemAleatoria} className="w-14 h-14" />
                                                <Text className="text-black text-lg text-center font-bold w-28">{item.name}</Text>
                                            </TouchableOpacity>
                                        </Link>
                                    )
                                }
                            }
                        />
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

export default Dashboard

const styles = StyleSheet.create({})