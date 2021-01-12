import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import Book from './pages/Book'
import List from './pages/List'
import Login from './pages/Login'

const Router = createStackNavigator()

export default function Routes() {
    return (
        <Router.Navigator
            screenOptions={{
             headerShown: false,
            cardStyle: { backgroundColor: '#312e38' }
            }}
        >

            <Router.Screen name="Login" component={Login} />
            <Router.Screen name="List" component={List} />
            <Router.Screen name="Book" component={Book} />
        </Router.Navigator>
    );
}