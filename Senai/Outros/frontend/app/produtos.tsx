import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, ImageBackground, Alert, TextInput } from 'react-native';
import Swal from 'sweetalert2';

interface Produto {
  _id: string;     
  name: string;
  price: number;
  description: string;
  category: string;
  stock: boolean;
}

export default function Produtos() {
    const [produtos, setProdutos] = useState<Produto[]>([]);
    const [loading, setLoading] = useState(false);
    const backendUrl = 'http://localhost:8080/product/bar'; 
    const fetchProdutos = async () => {
        try {
            setLoading(true);
            const response = await fetch(backendUrl);
            const data = await response.json();
            setProdutos(data);
        } 
        catch (error) {
            console.error(error);
            Swal.fire({ icon:'error', title:'Erro', text:'Não foi possível carregar os produtos' });
        } 
        finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProdutos();
    }, []);

    const excluir = async (id: string) => {
        try {
            const response = await fetch(`${backendUrl}/${id}`, { method: 'DELETE' });
            if (!response.ok) throw new Error('Erro ao excluir');
            Swal.fire({ icon:'success', title:'Produto excluído' });
            setProdutos(produtos.filter(p => p._id !== id));
        } 
        catch (error) {
            console.error(error);
            Swal.fire({ icon:'error', title:'Erro', text:'Não foi possível excluir o produto' });
        }
    };
    const editar = async (produto: Produto) => {
    const novoNome = prompt('Novo nome', produto.name);
    const novoPreco = prompt('Novo preço', produto.price.toString());

    if (!novoNome || !novoPreco) return;

    try {
    const response = await fetch(`${backendUrl}/${produto._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...produto, name: novoNome, price: Number(novoPreco) }),
    });

    if (!response.ok) throw new Error('Erro ao atualizar');
        const data = await response.json();
        Swal.fire({ icon:'success', title:'Produto atualizado' });
        setProdutos(produtos.map(p => p._id === produto._id ? data : p));
    } 
    catch (error) {
        console.error(error);
        Swal.fire({ icon:'error', title:'Erro', text:'Não foi possível atualizar o produto' });
    }
  };

  return (
    <ImageBackground
      source={require('../assets/images/fundo.jpg')}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.container}>
        <Text style={styles.title}>Produtos</Text>

        {loading && <Text>Carregando produtos...</Text>}

        <FlatList
          data={produtos}
          keyExtractor={item => item._id}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Text style={styles.nome}>{item.name}</Text>
              <Text>R$ {item.price}</Text>
              <Text>{item.description}</Text>

              <View style={styles.actions}>
                <TouchableOpacity style={styles.editar} onPress={() => editar(item)}>
                  <Text>Editar</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.excluir} onPress={() => excluir(item._id)}>
                  <Text>Excluir</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        />
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
    background: { 
        flex: 1,
         width: '100%', 
         height: '100%' 
        },
    container:{ 
        flex:1, 
        padding:20 
    },
    title:{ 
        fontSize:28, 
        fontWeight:'bold', 
        marginBottom:20, 
        color: '#b81414' 
    },
    card:{
        borderWidth:1,
        borderRadius:10,
        padding:15,
        marginBottom:10,
        backgroundColor:'#f1d7d7'
    },
    nome:{ 
        fontWeight:'bold', 
        fontSize:16 
    },
    actions:{ 
        flexDirection:'row', 
        marginTop:10 
    },
    editar:{
        backgroundColor:'#DEDEDE',
        padding:5,
        borderRadius:5,
        marginRight:10
    },
    excluir:{
        backgroundColor:'#FFB3B3',
        padding:5,
        borderRadius:5
    }
});