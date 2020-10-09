import React, { useEffect, useState } from 'react';
import {
  TextInput,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Image,
  TouchableOpacity,
  Text,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';

import api from '../../services/api';

import tindevLogo from '../../assets/logo.png';

interface ILogin {
  username: string;
}

const Login: React.FC = () => {
  const navigation = useNavigation();

  const [dev, setDev] = useState<ILogin>();

  useEffect(() => {
    AsyncStorage.getItem('@Tindev_userId').then((userId) => {
      if (userId) {
        navigation.navigate('Main', { userId });
      }
    });
  }, [navigation]);

  async function handleLogin() {
    try {
      const {
        data: { _id: id },
      } = await api.post('/devs', {
        username: dev?.username,
      });

      await AsyncStorage.setItem('@Tindev_userId', id);

      navigation.navigate('Main', { id });
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior="padding"
      enabled={Platform.OS === 'ios'}>
      <Image source={tindevLogo} />

      <TextInput
        style={styles.input}
        autoCapitalize="none"
        autoCorrect={false}
        placeholder="Digite seu usuário do GitHub"
        placeholderTextColor="#999"
        onChangeText={(text) => setDev({ username: text })}
      />

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Entrar</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 30,
  },

  input: {
    height: 46,
    alignSelf: 'stretch',
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 8,
    marginTop: 30,
    paddingHorizontal: 15,
  },

  button: {
    height: 46,
    alignSelf: 'stretch',
    backgroundColor: '#df4723',
    borderRadius: 8,
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },

  buttonText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default Login;
