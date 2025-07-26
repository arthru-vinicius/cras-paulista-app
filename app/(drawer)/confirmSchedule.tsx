import { Ionicons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ConfirmSchedule = () => {
    const [scheduleData, setScheduleData] = useState<any>(null);
    const { scheduleData: scheduleDataParam } = useLocalSearchParams();

    useEffect(() => {
        if (scheduleDataParam) {
            try {
                const data = JSON.parse(scheduleDataParam as string);
                setScheduleData(data);
                console.log('Dados recebidos para confirmação:', data);
            } catch (error) {
                console.error('Erro ao parsear dados do agendamento:', error);
                Alert.alert('Erro', 'Dados inválidos recebidos');
                router.back();
            }
        }
    }, [scheduleDataParam]);

    const handleConfirmAppointment = async () => {
        try {
            // Aqui você faria a requisição para criar o agendamento

            const accesstoken = await AsyncStorage.getItem('accessToken');

            console.log(scheduleDataParam);

            const now = new Date();

            const date = now.toISOString().split('T')[0]; // "2025-07-25"
            const time = now.toTimeString().split(' ')[0].slice(0, 5); // "14:32"

            console.log('Date:', date);
            console.log('Time:', time);
            
           fetch(`https://cras-digital.fly.dev/api/v1/appointments/`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accesstoken}`,
                },
                body: JSON.stringify({
                    date: date,  // formato esperado: "YYYY-MM-DD"
                    time: time,  // formato esperado: "HH:MM" ou "HH:MM:SS"
                    description: `Agendamento para ${scheduleData.categoria?.name} no ${scheduleData.crasMaisProximo.name} (${scheduleData.crasMaisProximo.distance}km de distância)`
                })
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                console.log('Agendamento criado com sucesso:', data);
                // Aqui você pode navegar para uma tela de confirmação
                // router.push('/appointmentConfirmation');
            })
            .catch(error => {
                console.error('Erro ao criar agendamento:', error);
                alert(`Erro ao criar agendamento: ${error.message}`);
            });


            console.log('Confirmando agendamento:', scheduleData);
            
            // Simular requisição
            Alert.alert(
                'Agendamento Confirmado!',
                'Seu agendamento foi realizado com sucesso.',
                [
                    {
                        text: 'OK',
                        onPress: () => {
                            router.push('/scheduling'); 
                        }
                    }
                ]
            );
        } catch (error) {
            console.error('Erro ao confirmar agendamento:', error);
            Alert.alert('Erro', 'Não foi possível confirmar o agendamento. Tente novamente.');
        }
    };

    const handleEdit = () => {
        router.back();
    };

    if (!scheduleData) {
        return (
            <View className="flex-1 justify-center items-center bg-fundo">
                <Text className="text-lg">Carregando...</Text>
            </View>
        );
    }

    return (
        <ScrollView className="flex-1 bg-fundo">
            {/* Header */}
            <View className='flex-row justify-start items-center p-4 bg-white mb-4'>
                <Ionicons 
                    name="chevron-back-outline" 
                    size={28} 
                    color="#444444" 
                    onPress={() => router.back()}
                />
                <Text className='text-3xl font-extrabold ml-2'>Confirmar Agendamento</Text>     
            </View>

            <View className="px-6">
                {/* Categoria Selecionada */}
                <View className="bg-white rounded-xl p-4 mb-4 shadow-sm">
                    <Text className="text-xl font-bold text-gray-800 mb-3">Serviço Solicitado</Text>
                    <View className="flex-row items-center">
                        {scheduleData.imagem && (
                            <Image source={scheduleData.imagem} className="w-16 h-16 mr-4" />
                        )}
                        <View className="flex-1">
                            <Text className="text-lg font-semibold text-gray-700">
                                {scheduleData.categoria?.name || 'Serviço não especificado'}
                            </Text>
                        </View>
                    </View>
                </View>

                {/* Localização do Usuário */}
                {scheduleData.localizacao && (
                    <View className="bg-white rounded-xl p-4 mb-4 shadow-sm">
                        <Text className="text-xl font-bold text-gray-800 mb-3">Sua Localização</Text>
                        <View className="flex-row items-start">
                            <Ionicons name="location" size={24} color="#059669" className="mr-3 mt-1" />
                            <View className="flex-1">
                                <Text className="text-base text-gray-700 leading-5">
                                    {scheduleData.localizacao.endereco}
                                </Text>
                                <Text className="text-sm text-gray-500 mt-2">
                                    Coordenadas: {scheduleData.localizacao.latitude.toFixed(6)}, {scheduleData.localizacao.longitude.toFixed(6)}
                                </Text>
                            </View>
                        </View>
                    </View>
                )}

                {/* CRAS Mais Próximo */}
                {scheduleData.crasMaisProximo && (
                    <View className="bg-white rounded-xl p-4 mb-4 shadow-sm">
                        <Text className="text-xl font-bold text-gray-800 mb-3">CRAS Responsável</Text>
                        <View className="flex-row items-start">
                            <Ionicons name="business" size={24} color="#1d4ed8" className="mr-3 mt-1" />
                            <View className="flex-1">
                                <Text className="text-base font-semibold text-gray-700 mb-2">
                                    {scheduleData.crasMaisProximo.name}
                                </Text>
                                
                                <View className="flex-row items-center mb-1">
                                    <Ionicons name="navigate" size={16} color="#6b7280" />
                                    <Text className="text-sm text-gray-600 ml-2">
                                        {scheduleData.crasMaisProximo.distance} km de distância
                                    </Text>
                                </View>

                                {scheduleData.crasMaisProximo.phone && (
                                    <View className="flex-row items-center mb-1">
                                        <Ionicons name="call" size={16} color="#6b7280" />
                                        <Text className="text-sm text-gray-600 ml-2">
                                            {scheduleData.crasMaisProximo.phone}
                                        </Text>
                                    </View>
                                )}

                                {scheduleData.crasMaisProximo.zip_code && (
                                    <View className="flex-row items-center">
                                        <Ionicons name="mail" size={16} color="#6b7280" />
                                        <Text className="text-sm text-gray-600 ml-2">
                                            CEP: {scheduleData.crasMaisProximo.zip_code}
                                        </Text>
                                    </View>
                                )}
                            </View>
                        </View>
                    </View>
                )}

                {/* Resumo */}
                <View className="bg-blue-50 rounded-xl p-4 mb-6 border-l-4 border-blue-400">
                    <Text className="text-lg font-bold text-blue-800 mb-2">ℹ️ Informações Importantes</Text>
                    <Text className="text-sm text-blue-700 leading-5">
                        • Você será atendido no CRAS mais próximo da sua localização{'\n'}
                        • Mantenha seus documentos em dia{'\n'}
                        • Em caso de dúvidas, entre em contato pelo telefone informado
                    </Text>
                </View>

                <View className="flex-row mb-8">
                    <TouchableOpacity 
                        className="flex-1 h-14 bg-gray-300 rounded-md justify-center items-center"
                        onPress={handleEdit}
                    >
                        <Text className="text-lg font-semibold text-gray-700">
                            Editar
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity 
                        className="flex-1 h-14 w-10 bg-primary rounded-md justify-center items-center"
                        onPress={handleConfirmAppointment}
                    >
                        <Text className="text-lg font-bold text-white">
                            Confirmar Agendamento
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
    );
};

export default ConfirmSchedule;

const styles = StyleSheet.create({});