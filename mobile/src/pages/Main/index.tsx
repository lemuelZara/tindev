import React, { useEffect, useState } from 'react';
import { Text, View, Image, SafeAreaView, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useRoute, RouteProp, useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';

import api from '../../services/api';

import tindevLogo from '../../assets/logo.png';
import like from '../../assets/like.png';
import dislike from '../../assets/dislike.png';

interface IDevPlate {
  id: string;
  name: string;
  bio: string;
  avatar: string;
}

type ParamList = {
  Main: {
    userId: string;
  };
};

const Main: React.FC = () => {
  const navigation = useNavigation();
  const route = useRoute<RouteProp<ParamList, 'Main'>>();

  const [devs, setDevs] = useState<IDevPlate[]>([]);

  useEffect(() => {
    async function loadDevs(): Promise<void> {
      const { data } = await api.get('/devs', {
        headers: {
          user_id: route.params.userId,
        },
      });

      const newDataDevs = data.map((dev: any) => {
        return {
          id: dev._id,
          ...dev,
        };
      });

      setDevs(newDataDevs);
    }

    loadDevs();
  }, [route.params.userId]);

  async function handleLike(): Promise<void> {
    const [dev, ...restDevs] = devs;

    await api.post(`/devs/${dev.id}/likes`, null, {
      headers: {
        user_id: route.params.userId,
      },
    });

    setDevs(restDevs);
  }

  async function handleDislike(): Promise<void> {
    const [dev, ...restDevs] = devs;

    await api.post(`/devs/${dev.id}/dislikes`, null, {
      headers: {
        user_id: route.params.userId,
      },
    });

    setDevs(restDevs);
  }

  async function handleLogout(): Promise<void> {
    await AsyncStorage.clear();

    navigation.navigate('Login');
  }

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity onPress={handleLogout}>
        <Image style={styles.logo} source={tindevLogo} />
      </TouchableOpacity>

      <View style={styles.cardsContainer}>
        {devs.length === 0 ? (
          <Text style={styles.empty}>Acabou... D:</Text>
        ) : (
          devs.map((dev, index) => (
            <View
              key={dev.id}
              style={[styles.card, { zIndex: devs.length - index }]}>
              <Image
                style={styles.avatar}
                source={{
                  uri: dev.avatar,
                }}
              />

              <View style={styles.footer}>
                <Text style={styles.name}>{dev.name}</Text>
                <Text style={styles.bio} numberOfLines={3}>
                  {dev.bio}
                </Text>
              </View>
            </View>
          ))
        )}
      </View>

      <View style={styles.buttonsContainer}>
        <TouchableOpacity
          style={styles.button}
          disabled={devs.length === 0}
          onPress={handleLike}>
          <Image source={like} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          disabled={devs.length === 0}
          onPress={handleDislike}>
          <Image source={dislike} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  logo: {
    marginTop: 30,
  },

  cardsContainer: {
    flex: 1,
    alignSelf: 'stretch',
    justifyContent: 'center',
    marginTop: 20,
    maxHeight: 500,
  },

  card: {
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 8,
    margin: 30,
    overflow: 'hidden',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },

  avatar: {
    flex: 1,
    height: 300,
  },

  footer: {
    backgroundColor: '#FFF',
    paddingHorizontal: 20,
    paddingVertical: 15,
  },

  name: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#333',
  },

  bio: {
    fontSize: 14,
    color: '#999',
    marginTop: 4,
    lineHeight: 18,
  },

  buttonsContainer: {
    flexDirection: 'row',
    marginBottom: 50,
  },

  button: {
    width: 75,
    height: 75,
    borderRadius: 15,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 20,
    elevation: 2,
  },

  empty: {
    alignSelf: 'center',
    color: '#999',
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default Main;
