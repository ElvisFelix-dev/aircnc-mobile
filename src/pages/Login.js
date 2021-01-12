import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {View, 
        Image, 
        StyleSheet, 
        Text, TextInput, 
        TouchableOpacity, 
        KeyboardAvoidingView, 
        Platform} 
    from 'react-native';

import api from '../services/api'

import logo from '../assets/logo.png'

export default function Login({ navigation }) {
    const [email, setEmail] = useState('');
    const [techs, setTechs] = useState('');

    useEffect(() => {
        AsyncStorage.getItem('user').then(user => {
            if (user) {
                navigation.navigate('List')
            }
        })
    }, [])


    async function handleSubmit() {
        const response = await api.post('/sessions', {
            email
        })

        const { _id } = response.data;

        await AsyncStorage.setItem('user', _id);
        await AsyncStorage.setItem('techs', techs);

        navigation.navigate('List')
    }


    return (
        <KeyboardAvoidingView enabled={Platform.OS === 'ios'} behavior="padding" style={styles.container} >
            <Image source={logo} />

            <View style={styles.form}>
                <Text style={styles.label} >SEU MELHOR EMAIL *</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Seu e-mail"
                    placeholderTextColor="#fcfcf7"
                    keyboardType="email-address" 
                    autoCapitalize="none"
                    autoCorrect={false}
                    value={email}
                    onChangeText={setEmail}
                />


                <Text style={styles.label}>TECNOLOGIAS *</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Tecnologias de interesse"
                    placeholderTextColor="#fcfcf7" 
                    autoCapitalize="words"
                    autoCorrect={false}
                    value={techs}
                    onChangeText={setTechs}
                />

                <TouchableOpacity onPress={handleSubmit} style={styles.button}>
                    <Text style={styles.buttonText}>Encontrar spots</Text>
                </TouchableOpacity>
            </View>

        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },

    form: {
        alignSelf: 'stretch',
        paddingHorizontal: 30,
        marginTop:30
    },

    label: {
        fontWeight: 'bold',
        color: '#FFF',
        marginBottom: 8,
    },

    input: {
        borderWidth: 1,
        borderColor: '#fcfcf7',
        paddingHorizontal: 20,
        fontSize: 16,
        color: '#FFF',
        height: 44,
        marginBottom: 28,
        borderRadius: 5,
    },

    button: {
        height: 42,
        backgroundColor: '#f05a5b',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,
    },

    buttonText: {
        color: '#FFF',
        fontWeight: 'bold',
        fontSize: 18,
    }
})