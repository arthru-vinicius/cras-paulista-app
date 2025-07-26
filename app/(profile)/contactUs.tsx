import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import {
    Linking,
    SafeAreaView,
    StatusBar,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

const ContactUs = () => {

    const route = useRouter();

  const handlePhonePress = () => {
    Linking.openURL('tel:+5598777665544');
  };

  const handleEmailPress = () => {
    Linking.openURL('mailto:contact@pixel.com.br');
  };

  const handleSocialPress = (platform) => {
    const urls = {
      linkedin: 'https://linkedin.com/company/linkedin',
      facebook: 'https://facebook.com/facebook',
      twitter: 'https://twitter.com/twitter',
      instagram: 'https://instagram.com/instagram',
      whatsapp: 'https://wa.me/55814003 8212',
    };
    
    if (urls[platform]) {
      Linking.openURL(urls[platform]);
    }
  };

  const handleBackPress = () => {
    route.back()
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar barStyle="dark-content" backgroundColor="white" />
      
      <View className="flex-row items-center px-4 py-3">
        <TouchableOpacity onPress={handleBackPress} className="p-2">
          <Ionicons name="chevron-back" size={24} color="#000" />
        </TouchableOpacity>
      </View>

      <View className="flex-1 px-6 pt-8">
        <Text className="text-2xl font-semibold text-center text-gray-900 mb-4">
          Fale conosco
        </Text>

        <Text className="text-base text-center text-gray-500 mb-16 leading-6">
          Se você tiver alguma dúvida,{'\n'}teremos prazer em ajudar.
        </Text>

        <View className="space-y-8">
          <TouchableOpacity 
            onPress={handlePhonePress}
            className="items-center"
          >
            <View className="w-14 h-14 bg-blue-600 rounded-xl items-center justify-center mb-4">
              <Ionicons name="call" size={24} color="white" />
            </View>
            <Text className="text-gray-700 text-base">
              +55 98 77766-5544
            </Text>
          </TouchableOpacity>

          <TouchableOpacity 
            onPress={handleEmailPress}
            className="items-center"
          >
            <View className="w-14 h-14 bg-blue-600 rounded-xl items-center justify-center mb-4">
              <Ionicons name="mail" size={24} color="white" />
            </View>
            <Text className="text-gray-700 text-base">
              contact@pixel.com.br
            </Text>
          </TouchableOpacity>
        </View>

        <View className="mt-20">
          <Text className="text-center text-gray-600 text-base mb-6">
            Nos acompanhe
          </Text>
          
          <View className="flex-row justify-center space-x-4">
            <TouchableOpacity 
              onPress={() => handleSocialPress('linkedin')}
              className="w-12 h-12 bg-gray-800 rounded-lg items-center justify-center"
            >
              <Ionicons name="logo-linkedin" size={20} color="white" />
            </TouchableOpacity>
            
            <TouchableOpacity 
              onPress={() => handleSocialPress('facebook')}
              className="w-12 h-12 bg-gray-800 rounded-lg items-center justify-center"
            >
              <Ionicons name="logo-facebook" size={20} color="white" />
            </TouchableOpacity>
            
            <TouchableOpacity 
              onPress={() => handleSocialPress('twitter')}
              className="w-12 h-12 bg-gray-800 rounded-lg items-center justify-center"
            >
              <Ionicons name="logo-twitter" size={20} color="white" />
            </TouchableOpacity>
            
            <TouchableOpacity 
              onPress={() => handleSocialPress('instagram')}
              className="w-12 h-12 bg-gray-800 rounded-lg items-center justify-center"
            >
              <Ionicons name="logo-instagram" size={20} color="white" />
            </TouchableOpacity>
            
            <TouchableOpacity 
              onPress={() => handleSocialPress('whatsapp')}
              className="w-12 h-12 bg-gray-800 rounded-lg items-center justify-center"
            >
              <Ionicons name="logo-whatsapp" size={20} color="white" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Footer Logo/Text */}
        <View className="absolute bottom-8 left-0 right-0 items-center">
          <View className="flex-row items-center">
            <View className="w-6 h-6 bg-black rounded mr-2" />
            <Text className="text-black font-medium text-sm">
              pixel.io{'\n'}technologies
            </Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ContactUs;