import { Ionicons } from '@expo/vector-icons';
import { Link, router, useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import * as FileSystem from 'expo-file-system';

const PlaceholderImage = require('../../assets/images/images/profile/foto/empty.png');

const Agendar = () => {
    const [selectedImage, setSelectedImage] = useState<string | undefined>(undefined);
    const [locationData, setLocationData] = useState<{
        latitude: number;
        longitude: number;
        endereco: string;
    } | null>(null);

    const { item, imagemAleatoria, latitude, longitude, endereco } = useLocalSearchParams();

    const acao = item ? JSON.parse(item as string) : null;
    const imagem = imagemAleatoria ? JSON.parse(imagemAleatoria as string) : null;

    useEffect(() => {
        console.log('Ação selecionada:', acao);

        // Verificar se recebeu parâmetros de localização
        if (latitude && longitude && endereco) {
            setLocationData({
                latitude: parseFloat(latitude as string),
                longitude: parseFloat(longitude as string),
                endereco: endereco as string,
            });
            console.log('Localização recebida:', {
                latitude: parseFloat(latitude as string),
                longitude: parseFloat(longitude as string),
                endereco: endereco as string,
            });
        }

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
    }, [latitude, longitude, endereco]);

    const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
        const R = 6371; // Raio da Terra em km
        const dLat = (lat2 - lat1) * Math.PI / 180;
        const dLon = (lon2 - lon1) * Math.PI / 180;
        const a = 
            Math.sin(dLat/2) * Math.sin(dLat/2) +
            Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
            Math.sin(dLon/2) * Math.sin(dLon/2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
        const distance = R * c; // Distância em km
        return distance;
    };

    const handleConfirmSchedule = async () => {
        const scheduleData = {
            categoria: acao,
            imagem: imagem,
            localizacao: locationData,
        };

        console.log('Dados para agendamento:', scheduleData);

        if (locationData) {
            try {
                console.log('Buscando CRAS mais próximo...');
                
                // Obter o token JWT do AsyncStorage
                    const accessToken = AsyncStorage.getItem('accessToken');
                
                if (!accessToken) {
                    throw new Error('Token de autenticação não encontrado. Faça login novamente.');
                }
                
                const response = await fetch('http://cras-digital.fly.dev/api/v1/cras-locations', {
                    method: 'GET',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${accessToken}`,
                    },
                });
                
                console.log('Status da resposta:', response.status);
                
                if (!response.ok) {
                    if (response.status === 401) {
                        // Token expirado ou inválido
                        await AsyncStorage.removeItem('@auth_token');
                        throw new Error('Sessão expirada. Faça login novamente.');
                    }
                    const errorText = await response.text();
                    console.log('Erro da API:', errorText);
                    throw new Error(`HTTP error! status: ${response.status} - ${errorText}`);
                }
                
                const crasLocations = await response.json();
                console.log('CRAS encontrados:', crasLocations);

                // Verificar se retornou dados válidos
                if (!crasLocations || !Array.isArray(crasLocations)) {
                    throw new Error('Dados inválidos retornados pela API');
                }

                // Encontrar o CRAS mais próximo
                let nearestCras = null;
                let minDistance = Infinity;

                crasLocations.forEach((cras: any) => {
                    const crasLat = parseFloat(cras.latitude);
                    const crasLon = parseFloat(cras.longitude);
                    
                    // Verificar se as coordenadas são válidas
                    if (isNaN(crasLat) || isNaN(crasLon)) {
                        console.warn('Coordenadas inválidas para CRAS:', cras);
                        return;
                    }
                    
                    const distance = calculateDistance(
                        locationData.latitude,
                        locationData.longitude,
                        crasLat,
                        crasLon
                    );

                    if (distance < minDistance) {
                        minDistance = distance;
                        nearestCras = { ...cras, distance: distance.toFixed(2) };
                    }
                });

                console.log('CRAS mais próximo:', nearestCras);

                if (!nearestCras) {
                    throw new Error('Nenhum CRAS válido encontrado');
                }

                // Atualizar scheduleData com o CRAS mais próximo
                const finalScheduleData = {
                    ...scheduleData,
                    crasMaisProximo: nearestCras,
                };

                // Navegar para a próxima tela passando todos os dados
                router.push({
                    pathname: '/scheduleAppointment',
                    params: {
                        scheduleData: JSON.stringify(finalScheduleData),
                    },
                });

            } catch (error) {
                console.error('Erro detalhado ao buscar CRAS:', error);
                
                // Verificar se é erro de autenticação
                if (error.message.includes('Token de autenticação') || error.message.includes('Sessão expirada')) {
                    alert(`${error.message}`);
                    // Redirecionar para tela de login se necessário
                    // router.push('/login');
                    return;
                }
                
                // Para outros erros, continuar sem o CRAS mais próximo
                alert(`Não foi possível encontrar o CRAS mais próximo. Erro: ${error.message}\n\nContinuando com o agendamento...`);
                
                // Navegar mesmo sem o CRAS
                router.push({
                    pathname: '/scheduleAppointment',
                    params: {
                        scheduleData: JSON.stringify(scheduleData),
                    },
                });
            }
        } else {
            alert('Por favor, selecione um endereço primeiro.');
        }
    };

    return (
        <View className="flex-1 w-full bg-fundo rounded-l-xl shadow-lg z-50">
            <View className='flex-row justify-start items-center p-4 bg-white mb-4'>
                <Ionicons name="chevron-back-outline" size={28} color="#444444" weight="regular" onPress={() => router.back()} />
                <Text className='text-3xl font-extrabold ml-2'>Agendar</Text>
            </View>

            <Text className='text-xl font-bold mx-8 my-4'>Categoria</Text>
            {acao && (
                <View className="bg-white w-32 h-32 ml-8 items-center justify-center rounded-xl">
                    <Image source={imagem} className="w-14 h-14" />
                    <Text className="text-black text-lg text-center font-bold w-28">{acao.name}</Text>
                </View>
            )}

            {/* Botão de endereço - mostra endereço se já selecionado ou permite selecionar */}
            <Link href="/selectLocation" asChild>
                <TouchableOpacity
                    className={`flex-row items-center justify-start ml-8 mt-4 w-10/12 h-14 pl-8 rounded-md ${
                        locationData ? 'bg-green-100 border-2 border-green-300' : 'bg-gray-300'
                    }`}
                >
                    <Ionicons 
                        name={locationData ? "location" : "location-outline"} 
                        size={28} 
                        color={locationData ? "#059669" : "#444444"} 
                    />
                    <View className="flex-1 ml-4">
                        <Text className={`font-semibold ${locationData ? 'text-green-700' : 'text-gray-700'}`}>
                            {locationData ? 'Endereço Selecionado' : 'Adicionar Endereço'}
                        </Text>
                        {locationData && (
                            <Text className="text-sm text-green-600 mt-1" numberOfLines={2}>
                                {locationData.endereco}
                            </Text>
                        )}
                    </View>
                </TouchableOpacity>
            </Link>

            <TouchableOpacity 
                className='w-10/12 h-14 ml-8 mt-12 bg-primary rounded-md justify-center items-center'
                onPress={handleConfirmSchedule}
            >
                <Text className='text-xl font-bold text-white '>
                    Confirmar
                </Text>
            </TouchableOpacity>
        </View>
    )
}

export default Agendar

const styles = StyleSheet.create({})