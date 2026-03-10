import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';
import Swal from 'sweetalert2';

export default function Cadastro() {
  const [nome, setNome] = useState('');
  const [preco, setPreco] = useState('');
  const [descricao, setDescricao] = useState('');
  const [categoria, setCategoria] = useState('');
  const [stock, setStock] = useState(true); 

  const cadastrarProduto = async () => {
    if (!nome || !preco) {
      return Swal.fire({
        icon:'error',
        title:'Erro',
        text:'Preencha todos os campos',
      });
    }

    try {
      const response = await fetch('http://localhost:8080/product/registrar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            name: nome,
            description: descricao,
            price: Number(preco),
            stock: stock,
            category: categoria,
        }),
      });

      if (!response.ok) throw new Error('Erro ao cadastrar produto');

      const data = await response.json();

      Swal.fire({
        icon:'success',
        title:'Produto cadastrado',
        text: `Produto ${data.name} cadastrado com sucesso!`
      });
      setNome('');
      setPreco('');
      setDescricao('');
      setCategoria('');
      setStock(true);

    } catch (error: any) {
      Swal.fire({
        icon:'error',
        title:'Erro',
        text: error.message || 'Erro inesperado',
      });
    }
  };

  return (
    <ImageBackground source={require('../assets/images/fund.jpg')} style={styles.background} resizeMode="cover">

      <View style={styles.container}>
        <View style={styles.div}>
          <Text style={styles.title}>Cadastrar Produto</Text>

          <TextInput
            style={styles.input}
            placeholder="Nome do produto"
            value={nome}
            onChangeText={setNome}
          />

          <TextInput
            style={styles.input}
            placeholder="Preço"
            value={preco}
            onChangeText={setPreco}
            keyboardType="numeric"
          />

          <TextInput
            style={styles.input}
            placeholder="Descrição"
            value={descricao}
            onChangeText={setDescricao}
          />

          <TextInput
            style={styles.input}
            placeholder="Categoria"
            value={categoria}
            onChangeText={setCategoria}
          />

          <TouchableOpacity style={styles.button} onPress={cadastrarProduto}>
            <Text style={styles.buttonText}>Salvar</Text>
          </TouchableOpacity>
        </View>
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
  container:{
    flex:1,
    padding:20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  div: {
    opacity: 0.9, 
    width: '90%',
    padding: 20,
    borderRadius: 20,
    backgroundColor:'#ebcccc',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
  },

  title:{
    fontSize:28,
    fontWeight:'bold',
    marginBottom:20,
    color: '#b81414',
    textAlign: 'center',
  },
  input:{
    width: '70%',
    height: 50,
    borderWidth:1,
    borderColor:'black',
    padding:10,
    borderRadius:12,
    marginBottom:15,
    backgroundColor: '#fff',
  },
  button:{
    width: '20%',
    height:50,
    backgroundColor:'#b81414',
    borderRadius:12,
    justifyContent:'center',
    alignItems: 'center',
    marginTop:10,
  },
  buttonText:{
    color: '#fff',
    fontSize:16,
    fontWeight:'bold',
  }
});