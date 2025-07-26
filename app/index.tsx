import { Image, Text, TouchableOpacity, View } from "react-native";

import { Link, useRouter } from "expo-router";


import { useEffect } from "react";


export default function Index() {

  const router = useRouter();

  useEffect(() => {
    const timeout = setTimeout(() => {
      router.push("/login"); // redireciona após 3 segundos
    }, 1000);

    return () => clearTimeout(timeout); // limpa o timeout se o componente for desmontado
  }, []);

  return (
    <View className="flex-1 justify-center items-center bg-primary">

      <Link href="/login" asChild>
      <TouchableOpacity className="justify-center items-center bg-primary">
          <Image source={require('../assets/images/images/Home/logo.png')}/>
        <Text className="text-5xl my-3 font-bold text-white">CRAS Paulista </Text>
      </TouchableOpacity>
      </Link>
    </View>
  );
}
