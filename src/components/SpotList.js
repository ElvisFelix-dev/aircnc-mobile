import React, { useEffect, useState } from 'react';

import { View, Text, StyleSheet, TouchableOpacity, FlatList, Image } from 'react-native';

import api from '../services/api'

function SpotList({ tech }) {
    const [spots, setSpots] = useState([])


    useEffect(() => {
        async function loadSpots() {
            const response = await api.get('/spots', {
                params: { tech }
            })

            setSpots(response.data);
        }
        loadSpots();
    }, [])

   


    return (
        <View style={styles.container}>
            <Text style={styles.title}>Empresas que usam <Text style={styles.bold}>{tech}</Text></Text>

            <FlatList  
                style={styles.list}
                data={spots} 
                keyExtractor={ spot => spot._id }
                horizontal
                showsHorizontalScrollIndicator={false}
                renderItem={({ item }) => (
                    <View style={styles.listItem} >
                        <Image style={styles.thumbnail} source={{ uri: item.thumbnail_url }} />
                        <Text style={styles.company}>{item.company}</Text>
                        <Text style={styles.price}>{item.price ? `R$${item.price}/diária` : 'GRATUITO'}</Text>
                        <TouchableOpacity onPress={() => {}} style={styles.button}>
                            <Text style={styles.buttonText}>Solicitar reserva</Text>
                        </TouchableOpacity>
                    </View>
                )} 
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginTop: 30,
    },

    title: {
        fontSize: 20,
        color: '#fcfcf7',
        paddingHorizontal: 20,
        marginBottom: 15,
    },

    bold: {
        fontWeight: 'bold',
        color: '#fcfcf7',
    },

    list: {
        paddingHorizontal: 20,
    },

    listItem: {
        marginRight: 15,
    },

    thumbnail: {
        width: 200,
        height: 120,
        resizeMode: 'cover',
        borderRadius: 5,
    },

    company: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#fcfcf7',
        marginTop: 10,
    },

    price: {
       fontSize: 15,
       color: '#999',
       marginTop: 5, 
    },

    button: {
        height: 32,
        backgroundColor: '#f05a5b',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,
        marginTop: 15,
    },

    buttonText: {
        color: '#FFF',
        fontWeight: 'bold',
        fontSize: 15,
    }
})

export default SpotList;