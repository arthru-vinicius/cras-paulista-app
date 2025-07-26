import * as Location from 'expo-location';
import { router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import MapView, { MapPressEvent, Marker } from 'react-native-maps';

export default function MapPicker() {
  const [location, setLocation] = useState<Location.LocationObject | null>(null);
  const [marker, setMarker] = useState<{ latitude: number; longitude: number } | null>(null);
  const [address, setAddress] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [loadingLocation, setLoadingLocation] = useState(true);

  // Get user location on load
  useEffect(() => {
    getCurrentLocation();
  }, []);

  const getCurrentLocation = async () => {
    try {
      setLoadingLocation(true);
      
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        alert('Permissão de localização negada');
        setLoadingLocation(false);
        return;
      }

      const current = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
      });
      
      setLocation(current);
      
      // Automaticamente marca a localização atual
      const currentCoords = {
        latitude: current.coords.latitude,
        longitude: current.coords.longitude,
      };
      setMarker(currentCoords);
      
      // Busca o endereço da localização atual
      await getAddressFromCoordinates(currentCoords);
      
    } catch (error) {
      console.error('Erro ao obter localização:', error);
      alert('Erro ao obter sua localização');
    } finally {
      setLoadingLocation(false);
    }
  };

  const getAddressFromCoordinates = async (coords: { latitude: number; longitude: number }) => {
    setLoading(true);
    try {
      const results = await Location.reverseGeocodeAsync(coords);

      if (results.length > 0) {
        const place = results[0];
        const fullAddress = `${place.street || ''}, ${place.name || ''}, ${place.city || ''} - ${place.region || ''}`;
        setAddress(fullAddress);
      } else {
        setAddress('Endereço não encontrado');
      }
    } catch (error) {
      console.error('Erro ao buscar endereço:', error);
      setAddress('Erro ao buscar endereço');
    } finally {
      setLoading(false);
    }
  };

  const handleMapPress = async (event: MapPressEvent) => {
    const { latitude, longitude } = event.nativeEvent.coordinate;
    setMarker({ latitude, longitude });
    await getAddressFromCoordinates({ latitude, longitude });
  };

  const handleUseCurrentLocation = () => {
    if (location) {
      const currentCoords = {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      };
      setMarker(currentCoords);
      getAddressFromCoordinates(currentCoords);
    }
  };

  const handleConfirm = () => {
    if (marker && address) {
      router.push({
        pathname: '/scheduleAppointemt',
        params: {
          latitude: marker.latitude,
          longitude: marker.longitude,
          endereco: address,
        },
      });
    }
  };

  if (loadingLocation) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#154e85" />
        <Text style={styles.loadingText}>Obtendo sua localização...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {location ? (
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          }}
          onPress={handleMapPress}
          showsUserLocation={true}
          showsMyLocationButton={false}
        >
          {marker && <Marker coordinate={marker} />}
        </MapView>
      ) : (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#154e85" />
          <Text style={styles.loadingText}>Erro ao carregar mapa</Text>
        </View>
      )}

      <View style={styles.infoContainer}>
        {loading ? (
          <Text style={styles.address}>Carregando endereço...</Text>
        ) : (
          <Text style={styles.address}>{address || 'Toque no mapa para selecionar um local'}</Text>
        )}

        <TouchableOpacity
          onPress={handleUseCurrentLocation}
          style={styles.locationButton}
        >
          <Text style={styles.locationButtonText}>📍 Usar Localização Atual</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={handleConfirm}
          style={[styles.button, !marker || !address ? { backgroundColor: '#ccc' } : {}]}
          disabled={!marker || !address}
        >
          <Text style={styles.buttonText}>Confirmar Local</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#666',
  },
  infoContainer: {
    position: 'absolute',
    bottom: 40,
    width: '90%',
    alignSelf: 'center',
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  address: {
    fontSize: 16,
    marginBottom: 10,
    color: '#333',
  },
  locationButton: {
    backgroundColor: '#f0f0f0',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  locationButtonText: {
    color: '#154e85',
    fontWeight: '600',
    fontSize: 14,
  },
  button: {
    backgroundColor: '#154e85',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});