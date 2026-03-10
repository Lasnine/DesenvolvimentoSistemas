import React from 'react';
import { View, Text, StyleSheet, Image, ImageBackground } from 'react-native';

export default function Index() {
  return (
    <ImageBackground
      source={require('../assets/images/fundo.jpg')}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.container}>
        <Image
          source={require('../assets/images/logo.png')}
          style={styles.logo}
        />
        <Text style={styles.title}>BAR CHERRY</Text>
        <Text style={styles.subtitle}>
          Bem-vindo ao nosso Bar Cereja!{"\n"}
          Aqui você pode gerenciar os produtos do cardápio.
        </Text>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,          
    width: '100%',   
    height: '100%',
  },
  container: {
    flex: 1,        
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  logo: {
    width: 200,
    height: 200,
    marginBottom: 20,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#b81414',
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    color: '#003700',
  },
});